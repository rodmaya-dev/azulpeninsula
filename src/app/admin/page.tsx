import type { Metadata } from "next";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { exigirRol } from "@/lib/session";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const { usuario } = await exigirRol("ADMIN");

  return (
    <section className="bg-sand-light px-4 py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <h1 className="font-display text-3xl text-azul-deep">
          Panel de administración
        </h1>
        <p className="mt-2 text-sm text-text-mid">
          Sesión iniciada como {usuario.nombre} ({usuario.email}), rol{" "}
          {usuario.rol}.
        </p>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}