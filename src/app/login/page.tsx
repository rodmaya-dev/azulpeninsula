import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { RUTA_INICIAL } from "@/lib/roles";
import { obtenerSesion } from "@/lib/session";

export const metadata: Metadata = {
  title: "Acceso",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const sesion = await obtenerSesion();
  if (sesion) redirect(RUTA_INICIAL[sesion.usuario.rol]);

  return (
    <section className="bg-sand-light px-4 py-24 md:py-32">
      <div className="mx-auto max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-azul-deep">Acceso</h1>
        <p className="mt-2 mb-6 text-sm text-text-mid">
          Solo para el administrador y los asesores del fraccionamiento.
        </p>
        <LoginForm />
      </div>
    </section>
  );
}