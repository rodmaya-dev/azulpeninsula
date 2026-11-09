import { z } from "zod";

import { PASSWORD_MAX_LENGTH } from "@/lib/auth-policy";

// En el login solo se exige que haya valor: la longitud mínima se aplica al
// crear la contraseña, no al entrar.
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Escribe un correo válido"),
  password: z
    .string()
    .min(1, "Escribe tu contraseña")
    .max(PASSWORD_MAX_LENGTH, "La contraseña es demasiado larga"),
});

export type LoginInput = z.infer<typeof loginSchema>;