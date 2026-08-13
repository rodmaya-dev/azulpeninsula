"use client";

import { useActionState } from "react";
import { enviarContacto, type ContactoState } from "@/app/actions/contacto";
import { MOTIVO_LABEL } from "@/lib/validations/contacto";

const ESTADO_INICIAL: ContactoState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(enviarContacto, ESTADO_INICIAL);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot anti-spam — invisible para personas, visible para bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="empresa">No llenar este campo</label>
        <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="nombre" className="text-sm font-medium text-text-dark">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        {state.fieldErrors?.nombre && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.nombre}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-text-dark">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="telefono" className="text-sm font-medium text-text-dark">
          Teléfono <span className="text-text-light">(opcional)</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="motivo" className="text-sm font-medium text-text-dark">
          Motivo
        </label>
        <select
          id="motivo"
          name="motivo"
          required
          defaultValue="general"
          className="mt-1 w-full rounded border border-black/10 bg-white px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        >
          {Object.entries(MOTIVO_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="text-sm font-medium text-text-dark">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        {state.fieldErrors?.mensaje && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.mensaje}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-azul-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid disabled:opacity-60"
      >
        {isPending ? "Enviando…" : "Enviar mensaje"}
      </button>

      {state.status === "success" && (
        <p role="status" className="text-sm text-green-700">
          {state.message}
        </p>
      )}
      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}
    </form>
  );
}