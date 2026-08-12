"use client";

import { useEffect, useRef } from "react";
import type { Ente } from "@/types/ente";

interface EnteModalProps {
  ente: Ente | null;
  onClose: () => void;
}

/**
 * Modal controlado por el padre (ente === null significa cerrado).
 * Cierra con Escape, con click en el backdrop, y bloquea el scroll del
 * body mientras está abierto — mismo patrón que cualquier modal accesible,
 * sin dependencias externas todavía (Framer Motion llega en el paso de
 * animaciones).
 */
export function EnteModal({ ente, onClose }: EnteModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ente) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ente, onClose]);

  if (!ente) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-azul-deep/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ente-modal-titulo"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-8 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            id="ente-modal-titulo"
            className="font-display text-2xl text-azul-mid"
          >
            {ente.nombre}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-full p-1 text-text-light transition-colors hover:bg-sand-light hover:text-azul-mid"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-sm text-text-mid">{ente.descripcion}</p>

        <h4 className="mt-6 text-xs font-medium uppercase tracking-wide text-text-light">
          Funciones principales
        </h4>
        <ul className="mt-3 space-y-2.5">
          {ente.funciones.map((funcion) => (
            <li key={funcion} className="flex gap-2.5 text-sm text-text-dark">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-azul-accent" />
              {funcion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
