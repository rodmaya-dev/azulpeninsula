import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js lee .env.local, pero la CLI de Prisma no: se carga explícitamente.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // La CLI (migrate, studio) usa la conexión DIRECTA; la app usará el pooler.
  datasource: { url: env("DIRECT_URL") },
});