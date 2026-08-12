"use client";

import { useState } from "react";
import { entes } from "@/data/entes";
import { EnteModal } from "./EnteModal";
import type { Ente } from "@/types/ente";

function findEnte(id: string): Ente {
  const ente = entes.find((e) => e.id === id);
  if (!ente) {
    throw new Error(`Ente "${id}" no existe en src/data/entes.ts`);
  }
  return ente;
}

function OrgBox({
  ente,
  variant = "default",
  onClick,
}: {
  ente: Ente;
  variant?: "top" | "default";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        variant === "top"
          ? "min-w-[220px] rounded bg-azul-mid px-6 py-3.5 text-center text-sm font-medium tracking-wide text-white shadow-sm transition-transform hover:-translate-y-0.5"
          : "min-w-[180px] rounded border border-azul-mid/20 bg-white px-6 py-3.5 text-center text-sm font-medium tracking-wide text-azul-mid shadow-sm transition-all hover:-translate-y-0.5 hover:border-azul-accent hover:bg-azul-accent hover:text-white"
      }
    >
      {ente.nombre}
    </button>
  );
}

export function OrgChart() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedEnte = selectedId ? findEnte(selectedId) : null;

  return (
    <>
      <div className="flex flex-col items-center gap-0">
        <OrgBox
          ente={findEnte("asamblea")}
          variant="top"
          onClick={() => setSelectedId("asamblea")}
        />
        <div className="h-8 w-px bg-azul-mid/30" />
        <div className="flex flex-wrap justify-center gap-8">
          <OrgBox
            ente={findEnte("directors")}
            onClick={() => setSelectedId("directors")}
          />
          <OrgBox
            ente={findEnte("council")}
            onClick={() => setSelectedId("council")}
          />
        </div>
        <div className="h-8 w-px bg-azul-mid/30" />
        <OrgBox
          ente={findEnte("management")}
          onClick={() => setSelectedId("management")}
        />
      </div>

      <EnteModal ente={selectedEnte} onClose={() => setSelectedId(null)} />
    </>
  );
}
