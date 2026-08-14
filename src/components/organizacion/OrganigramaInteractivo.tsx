"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  activo,
  variant = "default",
  onClick,
}: {
  ente: Ente;
  activo: boolean;
  variant?: "top" | "default";
  onClick: () => void;
}) {
  const base =
    variant === "top"
      ? "min-w-[220px] rounded px-6 py-3.5 text-center text-sm font-medium tracking-wide shadow-sm transition-all hover:-translate-y-0.5"
      : "min-w-[180px] rounded border px-6 py-3.5 text-center text-sm font-medium tracking-wide shadow-sm transition-all hover:-translate-y-0.5";

  const estado =
    variant === "top"
      ? activo
        ? "bg-azul-accent text-white"
        : "bg-azul-mid text-white"
      : activo
        ? "border-azul-accent bg-azul-accent text-white"
        : "border-azul-mid/20 bg-white text-azul-mid hover:border-azul-accent hover:bg-azul-accent hover:text-white";

  return (
    <button type="button" onClick={onClick} className={`${base} ${estado}`}>
      {ente.nombre}
    </button>
  );
}

export function OrganigramaInteractivo() {
  // expandedId: qué ente tiene su lista de miembros visible (acordeón —
  // solo uno a la vez, por eso es un solo valor y no un Set).
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // modalEnteId: qué ente tiene su modal de funciones abierto. Es
  // independiente de expandedId a propósito — el modal ya no se abre
  // desde el botón del organigrama, sino desde dentro de la sección
  // desplegada (ver el <button> con el título más abajo).
  const [modalEnteId, setModalEnteId] = useState<string | null>(null);

  const handleClick = (ente: Ente) => {
    if (ente.miembros.length === 0) {
      setModalEnteId(ente.id);
      return;
    }
    setExpandedId((prev) => (prev === ente.id ? null : ente.id));
  };

  const enteExpandido = expandedId ? findEnte(expandedId) : null;
  const enteModal = modalEnteId ? findEnte(modalEnteId) : null;

  return (
    <>
      <div className="flex flex-col items-center gap-0">
        <OrgBox
          ente={findEnte("asamblea")}
          variant="top"
          activo={false}
          onClick={() => handleClick(findEnte("asamblea"))}
        />
        <div className="h-8 w-px bg-azul-mid/30" />
        <div className="flex flex-wrap justify-center gap-8">
          <OrgBox
            ente={findEnte("directors")}
            activo={expandedId === "directors"}
            onClick={() => handleClick(findEnte("directors"))}
          />
          <OrgBox
            ente={findEnte("council")}
            activo={expandedId === "council"}
            onClick={() => handleClick(findEnte("council"))}
          />
        </div>
        <div className="h-8 w-px bg-azul-mid/30" />
        <OrgBox
          ente={findEnte("management")}
          activo={expandedId === "management"}
          onClick={() => handleClick(findEnte("management"))}
        />
      </div>

      <AnimatePresence mode="wait">
        {enteExpandido && (
          <motion.div
            key={enteExpandido.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-10 rounded-lg bg-sand-light p-8">
              <button
                type="button"
                onClick={() => setModalEnteId(enteExpandido.id)}
                className="group text-left"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-text-light">
                  {enteExpandido.nombre}
                </span>
                <h3 className="mt-1 font-display text-2xl text-azul-mid group-hover:text-azul-accent">
                  {enteExpandido.descripcion}{" "}
                  <span className="text-sm font-sans font-normal text-azul-accent underline decoration-dotted underline-offset-4">
                    Ver funciones
                  </span>
                </h3>
              </button>

              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {enteExpandido.miembros.map((miembro) => (
                  <li
                    key={miembro.id}
                    className="rounded-lg border border-black/5 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="font-medium text-text-dark">{miembro.nombre}</p>
                    <p className="mt-0.5 text-sm text-text-light">{miembro.cargo}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <EnteModal ente={enteModal} onClose={() => setModalEnteId(null)} />
    </>
  );
}