import "server-only";

import { randomUUID } from "node:crypto";

import { hashPassword } from "better-auth/crypto";

import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { hashToken } from "@/lib/invitaciones/token";
import { generarSlugBase } from "@/lib/slug";

// 32 bytes en base64url sin relleno = 43 caracteres. Descartar lo que no
// tenga esta forma evita consultas inútiles a la base.
const FORMATO_TOKEN = /^[A-Za-z0-9_-]{43}$/;

export interface DatosAlta {
  nombre: string;
  telefono: string;
  email: string;
  password: string;
}

export type ResultadoAlta =
  | { ok: true }
  | { ok: false; motivo: "invitacion_invalida" | "correo_en_uso" | "error" };

class InvitacionNoValidaError extends Error {}

export async function invitacionVigente(token: string): Promise<boolean> {
  if (!FORMATO_TOKEN.test(token)) return false;

  const invitacion = await db.invitacion.findUnique({
    where: { tokenHash: hashToken(token) },
    select: { usadaEn: true, expiraEn: true },
  });

  return (
    invitacion !== null &&
    invitacion.usadaEn === null &&
    invitacion.expiraEn > new Date()
  );
}

async function slugDisponible(
  tx: Prisma.TransactionClient,
  nombre: string,
): Promise<string> {
  const base = generarSlugBase(nombre);
  const existentes = new Set(
    (
      await tx.asesor.findMany({
        where: { slug: { startsWith: base } },
        select: { slug: true },
      })
    ).map((asesor) => asesor.slug),
  );

  if (!existentes.has(base)) return base;
  for (let n = 2; n < 1000; n++) {
    const candidato = `${base}-${n}`;
    if (!existentes.has(candidato)) return candidato;
  }
  throw new Error("No se pudo generar un slug único");
}

export async function crearAsesorDesdeInvitacion(
  token: string,
  datos: DatosAlta,
): Promise<ResultadoAlta> {
  if (!(await invitacionVigente(token))) {
    return { ok: false, motivo: "invitacion_invalida" };
  }

  const correoOcupado = await db.user.findUnique({
    where: { email: datos.email },
    select: { id: true },
  });
  if (correoOcupado) return { ok: false, motivo: "correo_en_uso" };

  // El hash (scrypt) es costoso: se calcula antes de abrir la transacción
  // para no mantener bloqueos mientras tanto.
  const passwordHash = await hashPassword(datos.password);
  const tokenHash = hashToken(token);
  const userId = randomUUID();

  try {
    // Todo o nada: usuario, credencial, perfil de asesor y consumo de la
    // invitación van en una sola transacción.
    await db.$transaction(
      async (tx) => {
        const slug = await slugDisponible(tx, datos.nombre);

        await tx.user.create({
          data: {
            id: userId,
            name: datos.nombre,
            email: datos.email,
            emailVerified: false,
            role: "ASESOR",
          },
        });
        await tx.account.create({
          data: {
            id: randomUUID(),
            accountId: userId,
            providerId: "credential",
            userId,
            password: passwordHash,
          },
        });
        await tx.asesor.create({
          data: {
            slug,
            userId,
            nombre: datos.nombre,
            telefono: datos.telefono,
          },
        });

        // Consumo atómico: si otra petición ganó la carrera, este UPDATE
        // espera su bloqueo, reevalúa el WHERE y afecta 0 filas -> rollback.
        // El CHECK de la tabla obliga a marcar usada_en y usada_por_id juntos,
        // por eso va al final, cuando el usuario ya existe.
        const consumida = await tx.invitacion.updateMany({
          where: { tokenHash, usadaEn: null, expiraEn: { gt: new Date() } },
          data: { usadaEn: new Date(), usadaPorId: userId },
        });
        if (consumida.count !== 1) throw new InvitacionNoValidaError();
      },
      // Margen para el arranque en frío de Neon (el primer request tardó 6 s).
      { maxWait: 10_000, timeout: 15_000 },
    );
    return { ok: true };
  } catch (error) {
    if (error instanceof InvitacionNoValidaError) {
      return { ok: false, motivo: "invitacion_invalida" };
    }
    // Solo el mensaje: el objeto de error podría arrastrar datos del formulario.
    console.error(
      "Falló el alta de asesor:",
      error instanceof Error ? error.message : "error desconocido",
    );
    return { ok: false, motivo: "error" };
  }
}