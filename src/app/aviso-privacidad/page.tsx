import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
};

// Pendiente: contenido legal real del aviso de privacidad.
export default function AvisoPrivacidadPage() {
  return (
    <section className="px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-azul-mid">
        Aviso de privacidad
      </h1>
      <p className="mx-auto mt-3 max-w-md text-text-mid">
        Contenido pendiente de redactar.
      </p>
    </section>
  );
}
