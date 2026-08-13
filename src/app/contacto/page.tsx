import type { Metadata } from "next";
import { ContactForm } from "@/components/contacto/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a la administración de Azul Península en Puerto Vallarta.",
};

export default function ContactoPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-container gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-text-light">
            Estamos para ayudarte
          </span>
          <h1 className="mt-2 font-display text-4xl text-azul-mid">Contacto</h1>
          <p className="mt-3 max-w-sm text-text-mid">
            Escríbenos y te respondemos a la brevedad.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-text-light">Dirección</dt>
              <dd className="mt-1 text-text-dark">
                {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality},{" "}
                {siteConfig.address.addressRegion}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-text-light">Teléfono</dt>
              <dd className="mt-1 text-text-dark">
                <a href={`tel:${siteConfig.telefono}`} className="hover:text-azul-accent">
                  {siteConfig.telefono}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-text-light">Correo</dt>
              <dd className="mt-1 text-text-dark">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-azul-accent">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-black/5 p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}