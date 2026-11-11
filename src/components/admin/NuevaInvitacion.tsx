"use client";

import { useActionState, useState } from "react";

import {
  crearInvitacion,
  type CrearInvitacionState,
} from "@/app/admin/actions";
import { formatearFechaHora } from "@/lib/invitaciones/estado";

const ESTADO_INICIAL: CrearInvitacionState = { status: "idle" };

export function NuevaInvitacion() {
  const [state, formAction, isPending] = useActionState(
    crearInvitacion,
    ESTADO_INICIAL,
  );
  const [copiado, setCopiado] = useState(false);

  async function copiar(enlace: string) {
    try {
      await navigator.clipboard.writeText(enlace);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="font-display text-2xl text-azul-deep">
        Invitar a un asesor
      </h2>
      <p className="mt-1 text-sm text-text-mid">
        El enlace es de un solo uso y vence en 48 horas.
      </p>

      <form action={formAction} className="mt-4 flex flex-wrap items-end gap-3">
        <div className="min-w-60 flex-1">
          <label
            htmlFor="etiqueta"
            className="text-sm font-medium text-text-dark"
          >
            Etiqueta <span className="text-text-light">(opcional)</span>
          </label>
          <input
            id="etiqueta"
            name="etiqueta"
            type="text"
            maxLength={80}
            placeholder="Para quién es"
            className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-azul-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Generando…" : "Generar enlace"}
        </button>
      </form>

      {state.status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {state.message}
        </p>
      )}

      {state.status === "success" && (
        <div role="status" className="mt-4 space-y-3">
          <p className="text-sm font-medium text-green-700">
            Enlace generado. Cópialo ahora: no se vuelve a mostrar.
          </p>
          <input
            readOnly
            value={state.enlace}
            onFocus={(e) => e.currentTarget.select()}
            aria-label="Enlace de invitación"
            className="w-full rounded border border-black/10 bg-sand-light px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => copiar(state.enlace)}
              className="rounded border border-azul-accent px-5 py-2 text-sm font-medium text-azul-accent transition-colors hover:bg-azul-accent hover:text-white"
            >
              {copiado ? "Copiado" : "Copiar enlace"}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hola, te invito a registrarte como asesor en Azul Península. Este enlace es personal, de un solo uso y vence el ${formatearFechaHora(state.expiraEn)}: ${state.enlace}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-azul-accent px-5 py-2 text-sm font-medium text-azul-accent transition-colors hover:bg-azul-accent hover:text-white"
            >
              Enviar por WhatsApp
            </a>
          </div>
          <p className="text-xs text-text-mid">
            Vence el {formatearFechaHora(state.expiraEn)}.
          </p>
        </div>
      )}
    </div>
  );
}