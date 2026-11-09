"use client";

import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";

import { authClient } from "@/lib/auth-client";
import { RUTA_INICIAL, rolSchema } from "@/lib/roles";
import { loginSchema } from "@/lib/validations/login";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function alEnviar(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensaje(null);

    const validacion = loginSchema.safeParse({ email, password });
    if (!validacion.success) {
      setMensaje(validacion.error.issues[0]?.message ?? "Revisa los datos.");
      return;
    }

    setEnviando(true);
    try {
      // Se envía desde el navegador a propósito: así la petición pasa por
      // /api/auth y se aplica el límite de intentos configurado.
      const { data, error } = await authClient.signIn.email(validacion.data);

      if (error) {
        setMensaje(
          error.status === 429
            ? "Demasiados intentos. Espera un minuto e inténtalo de nuevo."
            : "Correo o contraseña incorrectos.",
        );
        return;
      }

      const rol = rolSchema.safeParse(data?.user.role);
      router.replace(rol.success ? RUTA_INICIAL[rol.data] : "/");
      router.refresh();
    } catch {
      setMensaje("No se pudo iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={alEnviar} className="space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-text-dark">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-text-dark">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border border-black/10 px-3 py-2 text-sm focus:border-azul-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded bg-azul-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azul-mid disabled:cursor-not-allowed disabled:opacity-50"
      >
        {enviando ? "Entrando…" : "Entrar"}
      </button>

      {mensaje && (
        <p role="alert" className="text-sm text-red-600">
          {mensaje}
        </p>
      )}
    </form>
  );
}