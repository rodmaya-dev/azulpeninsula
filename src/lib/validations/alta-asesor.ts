import { z } from "zod";

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/auth-policy";

export const CAMPOS_ALTA = [
  "nombre",
  "telefono",
  "email",
  "password",
  "confirmarPassword",
] as const;
export type CampoAlta = (typeof CAMPOS_ALTA)[number];

// Acepta "322 123 4567", "322-123-4567" o "+52 322 123 4567" y guarda 52 + 10
// dígitos: el formato que usan los enlaces wa.me y el CHECK de la base.
const telefonoSchema = z
  .string()
  .transform((valor) => valor.replace(/\D/g, ""))
  .transform((digitos) =>
    digitos.length === 12 && digitos.startsWith("52")
      ? digitos.slice(2)
      : digitos,
  )
  .pipe(z.string().regex(/^\d{10}$/, "Escribe un teléfono de 10 dígitos"))
  .transform((digitos) => `52${digitos}`);

export const altaAsesorSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "Escribe tu nombre completo")
      .max(120, "El nombre es demasiado largo"),
    telefono: telefonoSchema,
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Escribe un correo válido")
      .max(254, "El correo es demasiado largo"),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
      )
      .max(PASSWORD_MAX_LENGTH, "La contraseña es demasiado larga"),
    confirmarPassword: z.string(),
  })
  .refine((datos) => datos.password === datos.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });

function esCampoAlta(valor: unknown): valor is CampoAlta {
  return (
    typeof valor === "string" &&
    (CAMPOS_ALTA as readonly string[]).includes(valor)
  );
}

// Compartido por el formulario (cliente) y la acción (servidor).
export function erroresPorCampo(
  issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }>,
): Partial<Record<CampoAlta, string>> {
  const errores: Partial<Record<CampoAlta, string>> = {};
  for (const issue of issues) {
    const campo = issue.path[0];
    if (esCampoAlta(campo) && !errores[campo]) errores[campo] = issue.message;
  }
  return errores;
}