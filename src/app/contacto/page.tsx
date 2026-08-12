import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
};

// Página temporal — se reemplaza con el formulario + Resend + Zod.
export default function ContactoPage() {
  return (
    <section className="px-6 py-24 text-center">
      <span className="text-xs font-medium uppercase tracking-wide text-text-light">
        Próximamente
      </span>
      <h1 className="mt-3 font-display text-3xl text-azul-mid">Contacto</h1>
      <p className="mx-auto mt-3 max-w-md text-text-mid">
        Mientras tanto, escríbenos a{" "}
        <a
          href="mailto:direccion.azul@outlook.com"
          className="text-azul-accent underline"
        >
          direccion.azul@outlook.com
        </a>
        .
      </p>
    </section>
  );
}
