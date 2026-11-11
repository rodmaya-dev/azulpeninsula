import { randomUUID } from "node:crypto";

import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { config } from "dotenv";
import { z } from "zod";

import { PrismaClient } from "../src/generated/prisma/client";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../src/lib/auth-policy";

// Este script corre fuera de Next.js, así que carga .env.local por su cuenta.
config({ path: ".env.local" });

const entradaSchema = z.object({
  ADMIN_EMAIL: z.string().trim().toLowerCase().email(),
  ADMIN_NAME: z.string().trim().min(1).max(120),
  ADMIN_PASSWORD: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
  DIRECT_URL: z.string().min(1),
});

function leerEntrada() {
  const resultado = entradaSchema.safeParse(process.env);
  if (!resultado.success) {
    // Solo se imprimen nombres de variable y motivo, nunca sus valores.
    const detalle = resultado.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    console.error(`Variables de entorno inválidas:\n${detalle}`);
    process.exit(1);
  }
  return resultado.data;
}

async function main(): Promise<void> {
  const entrada = leerEntrada();

  // Script de una sola vez: usa la conexión directa, no el pooler.
  const adapter = new PrismaPg({ connectionString: entrada.DIRECT_URL });
  const prisma = new PrismaClient({ adapter });

  try {
    const correoOcupado = await prisma.user.findUnique({
      where: { email: entrada.ADMIN_EMAIL },
      select: { id: true },
    });
    const adminsExistentes = await prisma.user.count({
      where: { role: "ADMIN" },
    });

    // Idempotente: nunca pisa una contraseña ni crea un segundo admin.
    if (correoOcupado || adminsExistentes > 0) {
      console.log("Ya existe el administrador; no se modificó nada.");
      return;
    }

    const userId = randomUUID();
    const passwordHash = await hashPassword(entrada.ADMIN_PASSWORD);

    // Usuario y credencial van juntos o no van: una sola transacción.
    await prisma.$transaction([
      prisma.user.create({
        data: {
          id: userId,
          name: entrada.ADMIN_NAME,
          email: entrada.ADMIN_EMAIL,
          emailVerified: true,
          role: "ADMIN",
        },
      }),
      prisma.account.create({
        data: {
          id: randomUUID(),
          accountId: userId,
          providerId: "credential",
          userId,
          password: passwordHash,
        },
      }),
    ]);

    console.log(`Administrador creado: ${entrada.ADMIN_EMAIL}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});