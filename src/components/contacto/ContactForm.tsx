"use client";

import { useActionState, useState } from "react";
import { enviarContacto, type ContactoState } from "@/app/actions/contacto";
import {
  contactoSchema,
  MOTIVO_LABEL,
  type MotivoContacto,
} from "@/lib/validations/contacto";

const ESTADO_INICIAL: ContactoState = { status: "idle" };

interface FormValues {
  nombre: string;
  email: string;
  telefono: string;
  motivo: MotivoContacto;
  mensaje: string;
}

const VALORES_INICIALES: FormValues = {
  nombre: "",
  email: "",
  telefono: "",
  motivo: "general",
  mensaje: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(enviarContacto, ESTADO_INICIAL);
  const [valores, setValores] = useState<FormValues>(VALORES_INICIALES);
  const [tocado, setTocado] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  // Mismo schema que usa el servidor (src/lib/validations/contacto.ts) —
  // así "qué es un email válido" se define en un solo lugar, nunca dos
  // reglas separadas que con el tiempo se desincronizan.
  const resultado = contactoSchema.safeParse(valores);
  const erroresCliente: Partial<Record<keyof FormValues, string>> = {};
  if (!resultado.success) {
    for (const issue of resultado.error.issues) {
      const campo = issue.path[0];
      if (typeof campo === "string" && !erroresCliente[campo as keyof FormValues]) {
        erroresCliente[campo as keyof FormValues] = issue.message;
      }
    }
  }
  const esValido = resultado.success;

  const actualizarCampo = <K extends keyof FormValues>(campo: K, valor: FormValues[K]) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
  };

  const marcarTocado = (campo: keyof FormValues) => {
    setTocado((prev) => ({ ...prev, [campo]: true }));
  };

  // Un campo muestra su error si el usuario ya interactuó con él, O si ya
  // hubo un intento de envío (state.status === "error") — así no le
  // marcamos "Nombre inválido" en rojo antes de que haya escrito nada.
  const yaIntentoEnviar = state.status === "error";
  const errorVisible = (campo: keyof FormValues) =>
    tocado[campo] || yaIntentoEnviar
      ? (erroresCliente[campo] ?? state.fieldErrors?.[campo])
      : undefined;

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
          value={valores.nombre}
          onChange={(e) => actualizarCampo("nombre", e.target.value)}
          onBlur={() => marcarTocado("nombre")}
          aria-invalid={Boolean(errorVisible("nombre"))}
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        <span className="mt-1 block text-xs text-red-600">{errorVisible("nombre")}</span>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-text-dark">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={valores.email}
          onChange={(e) => actualizarCampo("email", e.target.value)}
          onBlur={() => marcarTocado("email")}
          aria-invalid={Boolean(errorVisible("email"))}
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        <span className="mt-1 block text-xs text-red-600">{errorVisible("email")}</span>
      </div>

      <div>
        <label htmlFor="telefono" className="text-sm font-medium text-text-dark">
          Teléfono <span className="text-text-light">(opcional)</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={valores.telefono}
          onChange={(e) => actualizarCampo("telefono", e.target.value)}
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
          value={valores.motivo}
          onChange={(e) => actualizarCampo("motivo", e.target.value as MotivoContacto)}
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
          value={valores.mensaje}
          onChange={(e) => actualizarCampo("mensaje", e.target.value)}
          onBlur={() => marcarTocado("mensaje")}
          aria-invalid={Boolean(errorVisible("mensaje"))}
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
        <span className="mt-1 block text-xs text-red-600">{errorVisible("mensaje")}</span>
      </div>

      <button
        type="submit"
        disabled={!esValido || isPending}
        className="rounded bg-azul-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid disabled:cursor-not-allowed disabled:opacity-50"
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