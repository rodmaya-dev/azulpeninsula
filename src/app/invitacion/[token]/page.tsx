import type { Metadata } from "next";
import Link from "next/link";

import { AltaAsesorForm } from "@/components/invitacion/AltaAsesorForm";
import { invitacionVigente } from "@/lib/invitaciones/alta";

export const metadata: Metadata = {
  title: "Invitación",
  robots: { index: false, follow: false },
  // El token va en la URL: que no viaje en el encabezado Referer.
  referrer: "no-referrer",
};

export default async function InvitacionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  // Mismo mensaje para enlace inexistente, usado o vencido: no se revela cuál.
  const vigente = await invitacionVigente(token);

  return (
    <section className="bg-sand-light px-4 py-24 md:py-32">
      <div className="mx-auto max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-sm">
        {vigente ? (
          <>
            <h1 className="font-display text-3xl text-azul-deep">
              Crea tu cuenta de asesor
            </h1>
            <p className="mt-2 mb-6 text-sm text-text-mid">
              Fuiste invitado a publicar tus departamentos en Azul Península.
            </p>
            <AltaAsesorForm token={token} />
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl text-azul-deep">
              Enlace no válido
            </h1>
            <p className="mt-2 text-sm text-text-mid">
              Este enlace no es válido o ya venció. Pide uno nuevo a la
              administración.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm font-medium text-azul-accent hover:underline"
            >
              Ir al inicio
            </Link>
          </>
        )}
      </div>
    </section>
  );
}