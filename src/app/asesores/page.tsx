import type { Metadata } from "next";
import { asesores } from "@/data/asesores";
import { AsesorCard } from "@/components/asesores/AsesorCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Asesores",
  description:
    "Conoce a los asesores inmobiliarios de Azul Península en Puerto Vallarta y contáctalos directamente.",
};

export default function AsesoresPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-container">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          Puerto Vallarta, Jalisco
        </span>
        <h1 className="mt-2 font-display text-4xl text-azul-mid">Asesores</h1>
        <p className="mt-2 max-w-xl text-text-mid">
          Contacta directo a nuestros asesores para rentar o comprar dentro de Azul Península.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {asesores.map((asesor, i) => (
            <Reveal key={asesor.id} delay={Math.min(i * 0.08, 0.4)}>
              <AsesorCard asesor={asesor} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}