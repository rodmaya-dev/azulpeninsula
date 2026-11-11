"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import {
  VIGENCIA_INVITACION_HORAS,
  generarToken,
  hashToken,
} from "@/lib/invitaciones/token";
import { exigirRol } from "@/lib/session";
import {
  crearInvitacionSchema,
  revocarInvitacionSchema,
} from "@/lib/validations/invitacion";

export type CrearInvitacionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; enlace: string; expiraEn: string };

function urlBase(): string {
  const url = process.env.BETTER_AUTH_URL;
  if (!url) throw new Error("BETTER_AUTH_URL no está definida");
  return url.replace(/\/$/, "");
}

// Las Server Actions son endpoints públicos: cada una verifica el rol por su
// cuenta, no basta con que la página que las muestra esté protegida.
export async function crearInvitacion(
  _estadoPrevio: CrearInvitacionState,
  formData: FormData,
): Promise<CrearInvitacionState> {
  const { usuario } = await exigirRol("ADMIN");

  const etiquetaCruda = formData.get("etiqueta");
  const validacion = crearInvitacionSchema.safeParse({
    etiqueta: typeof etiquetaCruda === "string" ? etiquetaCruda : undefined,
  });
  if (!validacion.success) {
    return {
      status: "error",
      message: validacion.error.issues[0]?.message ?? "Revisa los datos.",
    };
  }

  try {
    const token = generarToken();
    const expiraEn = new Date(
      Date.now() + VIGENCIA_INVITACION_HORAS * 60 * 60 * 1000,
    );

    // En la base solo queda el hash: el enlace completo se muestra una vez.
    await db.invitacion.create({
      data: {
        tokenHash: hashToken(token),
        etiqueta: validacion.data.etiqueta,
        creadaPorId: usuario.id,
        expiraEn,
      },
    });

    revalidatePath("/admin");
    return {
      status: "success",
      enlace: `${urlBase()}/invitacion/${token}`,
      expiraEn: expiraEn.toISOString(),
    };
  } catch (error) {
    console.error("No se pudo crear la invitación:", error);
    return { status: "error", message: "No se pudo generar la invitación." };
  }
}

export async function revocarInvitacion(formData: FormData): Promise<void> {
  await exigirRol("ADMIN");

  const validacion = revocarInvitacionSchema.safeParse({
    id: formData.get("id"),
  });
  if (!validacion.success) return;

  // Solo se borran las no usadas: las usadas son historial y se conservan.
  await db.invitacion.deleteMany({
    where: { id: validacion.data.id, usadaEn: null },
  });
  revalidatePath("/admin");
}