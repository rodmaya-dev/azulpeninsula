import type { Metadata } from "next";
import { departamentos } from "@/data/departamentos";
import { CatalogoDepartamentos } from "@/components/departamentos/CatalogoFiltros";

export const metadata: Metadata = {
  title: "Departamentos en renta y venta",
  description:
    "Departamentos disponibles en renta y venta en Azul Península, Puerto Vallarta. Consulta precios, amenidades y contacta directo al asesor.",
};

export default function DepartamentosPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-container">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          Puerto Vallarta, Jalisco
        </span>
        <h1 className="mt-2 font-display text-4xl text-azul-mid">
          Departamentos
        </h1>
        <p className="mt-2 max-w-xl text-text-mid">
          Oportunidades de renta y venta dentro del fraccionamiento.
        </p>

        <div className="mt-10">
          <CatalogoDepartamentos departamentos={departamentos} />
        </div>
      </div>
    </section>
  );
}