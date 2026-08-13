import Image from "next/image";
import { departamentos } from "@/data/departamentos";
import type { Asesor } from "@/types/asesor";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0]?.toUpperCase())
    .join("");
}

export function AsesorCard({ asesor }: { asesor: Asesor }) {
  const disponibles = departamentos.filter(
    (d) => d.asesorId === asesor.id && d.estatus === "disponible",
  ).length;

  return (
    <div className="rounded-lg border border-black/5 bg-white p-6 text-center shadow-sm">
      {asesor.fotoUrl ? (
        <Image
          src={asesor.fotoUrl}
          alt={asesor.nombre}
          width={80}
          height={80}
          className="mx-auto rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-azul-mid text-lg font-medium text-white">
          {iniciales(asesor.nombre)}
        </div>
      )}

      <h3 className="mt-4 font-display text-xl text-azul-mid">{asesor.nombre}</h3>

      {asesor.totalResenas > 0 ? (
        <p className="mt-1 text-sm text-text-mid">
          ★ {asesor.ratingPromedio.toFixed(1)} · {asesor.totalResenas}{" "}
          {asesor.totalResenas === 1 ? "reseña" : "reseñas"}
        </p>
      ) : (
        <p className="mt-1 text-sm text-text-light">Aún sin reseñas</p>
      )}

      {disponibles > 0 && (
        <p className="mt-1 text-xs text-text-light">
          {disponibles}{" "}
          {disponibles === 1 ? "departamento disponible" : "departamentos disponibles"}
        </p>
      )}

      <div className="mt-5 flex justify-center gap-3">
        <a
          href={`https://wa.me/${asesor.telefono}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-azul-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-azul-mid"
        >
          WhatsApp
        </a>
        <a
          href={`mailto:${asesor.email}`}
          className="rounded border border-azul-mid/20 px-4 py-2 text-sm font-medium text-azul-mid transition-colors hover:bg-sand-light"
        >
          Correo
        </a>
      </div>
    </div>
  );
}