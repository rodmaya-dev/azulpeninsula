"use server";

import { Resend } from "resend";
import { contactoSchema } from "@/lib/validations/contacto";
import {
  renderContactoEmailHtml,
  renderContactoEmailText,
} from "@/lib/email/contacto-template";
import { siteConfig } from "@/lib/site-config";

export interface ContactoState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Sin dominio propio verificado en Resend, esta es la única dirección
// desde la que se puede enviar. El día que haya dominio y se verifique
// en el dashboard de Resend, esta es la única línea que cambia.
const REMITENTE = process.env.RESEND_FROM ?? "Azul Península <onboarding@resend.dev>";

export async function enviarContacto(
  _prevState: ContactoState,
  formData: FormData,
): Promise<ContactoState> {
  // Honeypot: campo oculto que los bots suelen rellenar y las personas
  // nunca ven ni tocan. Si llega con contenido, es spam — respondemos
  // éxito falso para no delatar la detección, pero no enviamos nada.
  const honeypot = formData.get("empresa");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
  }

  const parsed = contactoSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    motivo: formData.get("motivo"),
    mensaje: formData.get("mensaje"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const datos = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY no está configurada en el entorno.");
    return {
      status: "error",
      message: `El formulario no está disponible en este momento. Escríbenos directo a ${siteConfig.email}.`,
    };
  }

  // resend.emails.send NO lanza excepción en errores de la API — regresa
  // { data, error }. Hay que revisar "error" explícitamente; el try/catch
  // de abajo solo cubre fallas de red o de configuración del SDK.
  try {
    const { error } = await resend.emails.send({
      from: REMITENTE,
      to: siteConfig.email,
      replyTo: datos.email,
      subject: `Nuevo contacto: ${datos.nombre}`,
      html: renderContactoEmailHtml(datos),
      text: renderContactoEmailText(datos),
    });

    if (error) {
      console.error("Resend rechazó el envío:", error);
      return {
        status: "error",
        message: `No pudimos enviar tu mensaje. Escríbenos directo a ${siteConfig.email}.`,
      };
    }
  } catch (error) {
    console.error("Error de red/configuración enviando con Resend:", error);
    return {
      status: "error",
      message: `No pudimos enviar tu mensaje. Escríbenos directo a ${siteConfig.email}.`,
    };
  }

  return { status: "success", message: "¡Gracias! Te contactaremos pronto." };
}