import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de uso",
};

// Pendiente: contenido legal real de términos de uso.
export default function TerminosPage() {
  return (
    <section className="px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-azul-mid">Términos de uso</h1>
      <p className="mx-auto mt-3 max-w-md text-text-mid">
        Contenido pendiente de redactar.
      </p>
    </section>
  );
}
