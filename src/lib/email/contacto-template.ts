import { MOTIVO_LABEL, type ContactoInput } from "@/lib/validations/contacto";

// Nunca insertes texto de un formulario público directo en HTML sin
// escaparlo — si alguien manda "<script>" como nombre o mensaje, esto
// evita que se interprete como HTML dentro del correo.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactoEmailHtml(datos: ContactoInput): string {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #0d1f35;">
    <div style="background: #0a1628; padding: 24px; text-align: center;">
      <span style="color: #ffffff; font-size: 20px; font-weight: 500;">Azul Península</span>
    </div>
    <div style="padding: 24px; border: 1px solid #e8dcc8;">
      <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #8aa0b0; margin: 0 0 4px;">
        Nuevo mensaje de contacto
      </p>
      <h2 style="margin: 0 0 20px; font-size: 20px;">${escapeHtml(datos.nombre)}</h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #8aa0b0; width: 100px;">Motivo</td>
          <td style="padding: 6px 0;">${MOTIVO_LABEL[datos.motivo]}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #8aa0b0;">Correo</td>
          <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(datos.email)}" style="color:#2a6fa8;">${escapeHtml(datos.email)}</a></td>
        </tr>
        ${
          datos.telefono
            ? `<tr><td style="padding: 6px 0; color: #8aa0b0;">Teléfono</td><td style="padding: 6px 0;">${escapeHtml(datos.telefono)}</td></tr>`
            : ""
        }
      </table>

      <p style="margin: 20px 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #8aa0b0;">
        Mensaje
      </p>
      <p style="white-space: pre-wrap; line-height: 1.5;">${escapeHtml(datos.mensaje)}</p>
    </div>
  </div>
  `;
}

export function renderContactoEmailText(datos: ContactoInput): string {
  return [
    "Nuevo mensaje de contacto — Azul Península",
    "",
    `Nombre: ${datos.nombre}`,
    `Motivo: ${MOTIVO_LABEL[datos.motivo]}`,
    `Correo: ${datos.email}`,
    datos.telefono ? `Teléfono: ${datos.telefono}` : null,
    "",
    "Mensaje:",
    datos.mensaje,
  ]
    .filter(Boolean)
    .join("\n");
}