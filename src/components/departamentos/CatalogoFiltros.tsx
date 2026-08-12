"use client";

import { useState } from "react";
import type { Departamento, TipoOperacion } from "@/types/departamento";
import { DepartamentoCard } from "./DepartamentoCard";

type Filtro = "todos" | TipoOperacion;

const TABS: { value: Filtro; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "renta", label: "Renta" },
  { value: "venta", label: "Venta" },
];

export function CatalogoDepartamentos({
  departamentos,
}: {
  departamentos: Departamento[];
}) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const visibles = departamentos.filter(
    (d) => filtro === "todos" || d.operacion === filtro,
  );

  return (
    <div>
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFiltro(tab.value)}
            aria-pressed={filtro === tab.value}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filtro === tab.value
                ? "bg-azul-mid text-white"
                : "bg-sand-light text-text-mid hover:bg-sand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="mt-10 text-sm text-text-light">
          No hay departamentos en esta categoría por ahora.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((depto) => (
            <DepartamentoCard key={depto.id} depto={depto} />
          ))}
        </div>
      )}
    </div>
  );
}