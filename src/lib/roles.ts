import { z } from "zod";

// Se usa tanto en servidor como en cliente, por eso no importa "server-only".
export const rolSchema = z.enum(["ADMIN", "ASESOR"]);
export type Rol = z.infer<typeof rolSchema>;

export const RUTA_INICIAL: Record<Rol, string> = {
  ADMIN: "/admin",
  ASESOR: "/panel",
};