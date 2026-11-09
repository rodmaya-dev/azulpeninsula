"use client";

import { useActionState, useState } from "react";

import {
  crearCuentaAsesor,
  type AltaAsesorState,
} from "@/app/invitacion/actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth-policy";
import {
  altaAsesorSchema,
  erroresPorCampo,
  type CampoAlta,
} from "@/lib/validations/alta-asesor";

type Valores = Record<CampoAlta, string>;

const ESTADO_INICIAL: AltaAsesorState = { status: "idle" };

const VALORES_INICIALES: Valores = {
  nombre: "",
  telefono: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

interface ConfigCampo {
  id: CampoAlta;
  etiqueta: string;
  type: string;
  autoComplete: string;
  ayuda?: string;
}

const CAMPOS: ConfigCampo[] = [
  { id: "nombre", etiqueta: "Nombre completo", type: "text", autoComplete: "name" },
  {
    id: "telefono",
    etiqueta: "Teléfono (WhatsApp)",
    type: "tel",
    autoComplete: "tel-national",
    ayuda: "10 dígitos. Es el número al que te escribirán los interesados.",
  },
  {
    id: "email",
    etiqueta: "Correo de acceso",
    type: "email",
    autoComplete: "email",
    ayuda: "Con este correo iniciarás sesión.",
  },
  {
    id: "password",
    etiqueta: "Contraseña",
    type: "password",
    autoComplete: "new-password",
    ayuda: `Mínimo ${PASSWORD_MIN_LENGTH} caracteres. Una frase de varias palabras funciona bien.`,
  },
  {
    id: "confirmarPassword",
    etiqueta: "Confirmar contraseña",
    type: "password",
    autoComplete: "new-password",
  },
];

export function AltaAsesorForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(
    crearCuentaAsesor.bind(null, token),
    ESTADO_INICIAL,
  );
  const [valores, setValores] = useState<Valores>(VALORES_INICIALES);
  const [tocado, setTocado] = useState<Partial<Record<CampoAlta, boolean>>>({});

  // Mismo schema que valida el servidor: una sola definición de "válido".
  const resultado = altaAsesorSchema.safeParse(valores);
  const erroresCliente = resultado.success
    ? {}
    : erroresPorCampo(resultado.error.issues);

  const yaIntentoEnviar = state.status === "error";
  const errorVisible = (campo: CampoAlta): string | undefined =>
    tocado[campo] || yaIntentoEnviar
      ? (erroresCliente[campo] ??
        (state.status === "error" ? state.fieldErrors?.[campo] : undefined))
      : undefined;

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {CAMPOS.map((campo) => (
        <div key={campo.id}>
          <label
            htmlFor={campo.id}
            className="text-sm font-medium text-text-dark"
          >
            {campo.etiqueta}
          </label>
          <input
            id={campo.id}
            name={campo.id}
            type={campo.type}
            autoComplete={campo.autoComplete}
            value={valores[campo.id]}
            onChange={(e) =>
              setValores((previos) => ({
                ...previos,
                [campo.id]: e.target.value,
              }))
            }
            onBlur={() =>
              setTocado((previos) => ({ ...previos, [campo.id]: true }))
            }
            aria-invalid={Boolean(errorVisible(campo.id))}
            className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
          />
          {campo.ayuda && (
            <span className="mt-1 block text-xs text-text-mid">
              {campo.ayuda}
            </span>
          )}
          <span className="mt-1 block text-xs text-red-600">
            {errorVisible(campo.id)}
          </span>
        </div>
      ))}

      <button
        type="submit"
        disabled={!resultado.success || isPending}
        className="w-full rounded bg-azul-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Creando cuenta…" : "Crear cuenta"}
      </button>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}
    </form>
  );
}