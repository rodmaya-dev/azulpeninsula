"use server";

import { redirect } from "next/navigation";

import { crearAsesorDesdeInvitacion } from "@/lib/invitaciones/alta";
import {
  altaAsesorSchema,
  erroresPorCampo,
  type CampoAlta,
} from "@/lib/validations/alta-asesor";

export type AltaAsesorState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      fieldErrors?: Partial<Record<CampoAlta, string>>;
    };

function texto(formData: FormData, campo: string): string {
  const valor = formData.get(campo);
  return typeof valor === "string" ? valor : "";
}

// El token llega como primer argumento (bind en el formulario). No se confía
// en él: crearAsesorDesdeInvitacion valida su forma y su hash contra la base.
export async function crearCuentaAsesor(
  token: string,
  _estadoPrevio: AltaAsesorState,
  formData: FormData,
): Promise<AltaAsesorState> {
  const validacion = altaAsesorSchema.safeParse({
    nombre: texto(formData, "nombre"),
    telefono: texto(formData, "telefono"),
    email: texto(formData, "email"),
    password: texto(formData, "password"),
    confirmarPassword: texto(formData, "confirmarPassword"),
  });
  if (!validacion.success) {
    return {
      status: "error",
      fieldErrors: erroresPorCampo(validacion.error.issues),
    };
  }

  const resultado = await crearAsesorDesdeInvitacion(token, {
    nombre: validacion.data.nombre,
    telefono: validacion.data.telefono,
    email: validacion.data.email,
    password: validacion.data.password,
  });

  if (resultado.ok) redirect("/login?cuenta=creada");

  switch (resultado.motivo) {
    case "correo_en_uso":
      return {
        status: "error",
        fieldErrors: { email: "Ese correo ya tiene una cuenta." },
      };
    case "invitacion_invalida":
      return {
        status: "error",
        message:
          "Este enlace ya no es válido. Pide uno nuevo a la administración.",
      };
    default:
      return {
        status: "error",
        message: "No se pudo crear la cuenta. Inténtalo de nuevo.",
      };
  }
}