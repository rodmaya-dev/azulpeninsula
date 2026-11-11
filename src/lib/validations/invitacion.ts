import { z } from "zod";

export const crearInvitacionSchema = z.object({
  // Nota interna del admin ("para Gaby"). Vacío se guarda como NULL.
  etiqueta: z
    .string()
    .trim()
    .max(80, "La etiqueta admite máximo 80 caracteres")
    .optional()
    .transform((valor) => (valor ? valor : undefined)),
});

export const revocarInvitacionSchema = z.object({
  id: z.string().uuid(),
});