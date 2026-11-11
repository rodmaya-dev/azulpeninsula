import type { Metadata } from "next";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { exigirRol } from "@/lib/session";

export const metadata: Metadata = {
  title: "Mi panel",
  robots: { index: false, follow: false },
};

export default async function PanelPage() {
  const { usuario } = await exigirRol("ASESOR");

  return (
    <section className="bg-sand-light px-4 py-24 md:py-32">
      <div className="mx-auto max-w-container">
        <h1 className="font-display text-3xl text-azul-deep">
          Hola, {usuario.nombre}
        </h1>
        <p className="mt-2 text-sm text-text-mid">
          Aquí podrás publicar y administrar tus departamentos. Esta sección
          estará disponible pronto.
        </p>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </section>
  );
}