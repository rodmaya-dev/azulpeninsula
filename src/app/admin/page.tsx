import type { Metadata } from "next";

import { revocarInvitacion } from "@/app/admin/actions";
import { NuevaInvitacion } from "@/components/admin/NuevaInvitacion";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { db } from "@/lib/db";
import {
  estadoInvitacion,
  formatearFechaHora,
  type EstadoInvitacion,
} from "@/lib/invitaciones/estado";
import { exigirRol } from "@/lib/session";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

const TEXTO_ESTADO: Record<EstadoInvitacion, string> = {
  pendiente: "Pendiente",
  usada: "Usada",
  vencida: "Vencida",
};

const CLASE_ESTADO: Record<EstadoInvitacion, string> = {
  pendiente: "bg-azul-light/20 text-azul-mid",
  usada: "bg-green-100 text-green-800",
  vencida: "bg-black/5 text-text-mid",
};

export default async function AdminPage() {
  const { usuario } = await exigirRol("ADMIN");

  const invitaciones = await db.invitacion.findMany({
    orderBy: { creadaEn: "desc" },
    take: 50,
    select: {
      id: true,
      etiqueta: true,
      creadaEn: true,
      expiraEn: true,
      usadaEn: true,
    },
  });

  return (
    <section className="bg-sand-light px-4 py-24 md:py-32">
      <div className="mx-auto max-w-container space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-azul-deep">
              Panel de administración
            </h1>
            <p className="mt-2 text-sm text-text-mid">
              Sesión iniciada como {usuario.nombre} ({usuario.email}), rol{" "}
              {usuario.rol}.
            </p>
          </div>
          <LogoutButton />
        </div>

        <NuevaInvitacion />

        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-2xl text-azul-deep">Invitaciones</h2>

          {invitaciones.length === 0 ? (
            <p className="mt-3 text-sm text-text-mid">
              Todavía no hay invitaciones.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-text-mid">
                  <tr className="border-b border-black/10">
                    <th className="py-2 pr-4 font-medium">Etiqueta</th>
                    <th className="py-2 pr-4 font-medium">Creada</th>
                    <th className="py-2 pr-4 font-medium">Vence</th>
                    <th className="py-2 pr-4 font-medium">Estado</th>
                    <th className="py-2 font-medium">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invitaciones.map((invitacion) => {
                    const estado = estadoInvitacion(invitacion);
                    return (
                      <tr
                        key={invitacion.id}
                        className="border-b border-black/5"
                      >
                        <td className="py-2 pr-4">
                          {invitacion.etiqueta ?? "—"}
                        </td>
                        <td className="py-2 pr-4">
                          {formatearFechaHora(invitacion.creadaEn)}
                        </td>
                        <td className="py-2 pr-4">
                          {formatearFechaHora(invitacion.expiraEn)}
                        </td>
                        <td className="py-2 pr-4">
                          <span
                            className={`rounded px-2 py-0.5 text-xs font-medium ${CLASE_ESTADO[estado]}`}
                          >
                            {TEXTO_ESTADO[estado]}
                          </span>
                        </td>
                        <td className="py-2 text-right">
                          {estado === "pendiente" && (
                            <form action={revocarInvitacion}>
                              <input
                                type="hidden"
                                name="id"
                                value={invitacion.id}
                              />
                              <button
                                type="submit"
                                className="text-sm font-medium text-red-600 hover:underline"
                              >
                                Revocar
                              </button>
                            </form>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}