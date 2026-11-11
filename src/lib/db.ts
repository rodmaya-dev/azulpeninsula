import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

function crearCliente(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL no está definida");
  }
  // La app usa el pooler de Neon; la conexión directa es solo para migraciones.
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// En desarrollo, el hot reload reevalúa los módulos y abriría un cliente
// (y un pool de conexiones) nuevo en cada cambio. Se guarda en globalThis.
const globalParaPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalParaPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  globalParaPrisma.prisma = db;
}