// Sin "server-only": lo usan páginas del servidor y componentes del cliente.

export type EstadoInvitacion = "pendiente" | "usada" | "vencida";

interface FechasInvitacion {
  expiraEn: Date;
  usadaEn: Date | null;
}

export function estadoInvitacion(
  invitacion: FechasInvitacion,
  ahora: Date = new Date(),
): EstadoInvitacion {
  if (invitacion.usadaEn) return "usada";
  return invitacion.expiraEn <= ahora ? "vencida" : "pendiente";
}

// Vercel corre en UTC: se fija la zona para que la hora sea la de Puerto Vallarta.
export function formatearFechaHora(fecha: Date | string): string {
  return new Date(fecha).toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "medium",
    timeStyle: "short",
  });
}