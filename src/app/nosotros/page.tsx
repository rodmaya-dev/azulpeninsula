import type { Metadata } from "next";
import { entes } from "@/data/entes";
import { OrgChart } from "@/components/organizacion/OrgChart";
import { TeamSection } from "@/components/organizacion/TeamSection";
import { MisionVisionValores } from "@/components/organizacion/MisionVisionValores";
import { Principios } from "@/components/organizacion/Principios";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la estructura organizacional de Azul Península: Asamblea de Propietarios, Mesa Directiva, Consejo de Vigilancia y Gerencia Operativa.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="bg-sand-light px-6 py-20 text-center">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          Administración
        </span>
        <h1 className="mt-3 font-display text-4xl italic text-azul-mid md:text-5xl">
          Nosotros
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-text-mid">
          Conoce la estructura que administra y cuida Azul Península.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-container">
          <span className="text-xs font-medium uppercase tracking-wide text-text-light">
            Administración
          </span>
          <h2 className="mt-2 font-display text-3xl text-azul-mid">
            Estructura organizacional
          </h2>
          <p className="mt-2 max-w-xl text-sm text-text-mid">
            Toca cualquier ente para ver sus funciones.
          </p>

          <div className="mt-12">
            <OrgChart />
          </div>
        </div>
      </section>

      {entes.map((ente) => (
        <TeamSection key={ente.id} ente={ente} />
      ))}
      <MisionVisionValores />
      <Principios />
    </>
  );
}
