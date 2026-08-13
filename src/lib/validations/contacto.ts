import { z } from "zod";

export const MOTIVOS_CONTACTO = ["general", "renta", "venta", "residente"] as const;
export type MotivoContacto = (typeof MOTIVOS_CONTACTO)[number];

export const MOTIVO_LABEL: Record<MotivoContacto, string> = {
  general: "Información general",
  renta: "Interesado en renta",
  venta: "Interesado en venta",
  residente: "Soy residente",
};

export const contactoSchema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre completo").max(100),
  email: z.string().trim().email("Correo inválido"),
  telefono: z.string().trim().max(20).optional().or(z.literal("")),
  motivo: z.enum(MOTIVOS_CONTACTO, { message: "Elige un motivo" }),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(2000),
});

export type ContactoInput = z.infer<typeof contactoSchema>;