import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asesores",
};

// Página temporal — directorio real de asesores llega más adelante.
export default function AsesoresPage() {
  return (
    <section className="px-6 py-24 text-center">
      <span className="text-xs font-medium uppercase tracking-wide text-text-light">
        Próximamente
      </span>
      <h1 className="mt-3 font-display text-3xl text-azul-mid">Asesores</h1>
      <p className="mx-auto mt-3 max-w-md text-text-mid">
        Estamos construyendo el directorio de asesores.
      </p>
    </section>
  );
}
