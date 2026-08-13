"use client";

import { useState } from "react";
import Image from "next/image";
import { MAX_IMAGENES_CARRUSEL } from "@/types/departamento";

interface CarouselProps {
  imagenes: string[];
  alt: string;
}

export function Carousel({ imagenes, alt }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const total = imagenes.length;

  if (total === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-sand-light text-sm text-text-light">
        Fotos próximamente
      </div>
    );
  }

  const goTo = (i: number) => setIndex((i + total) % total);

  // noUncheckedIndexedAccess hace que imagenes[index] sea `string | undefined`
  // a los ojos de TypeScript, aunque el guard de arriba (total === 0) ya
  // garantiza en tiempo de ejecución que hay al menos una imagen. Este
  // guard extra no debería dispararse nunca — solo satisface al compilador
  // sin recurrir a un "as string" que apagaría la verificación.
  const currentImage = imagenes[index];
  if (!currentImage) return null;

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-sand-light outline-none"
      role="group"
      aria-roledescription="carrusel"
      aria-label={alt}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <Image
        key={currentImage}
        src={currentImage}
        alt={`${alt} — foto ${index + 1} de ${total}`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        priority={index === 0}
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Foto siguiente"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imagenes.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a foto ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}