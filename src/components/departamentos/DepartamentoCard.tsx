import Image from "next/image";
import Link from "next/link";
import type { Departamento } from "@/types/departamento";
import { formatPrecio, ESTATUS_LABEL, OPERACION_LABEL } from "@/lib/format";

export function DepartamentoCard({ depto }: { depto: Departamento }) {
  const portada = depto.imagenes[0];
  const disponible = depto.estatus === "disponible";

  return (
    <Link
      href={`/departamentos/${depto.slug}`}
      className="group block overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-sand-light">
        {portada ? (
          <Image
            src={portada}
            alt={depto.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-text-light">
            Fotos próximamente
          </div>
        )}

        <span className="absolute left-3 top-3 rounded bg-azul-deep/85 px-2.5 py-1 text-xs font-medium text-white">
          {OPERACION_LABEL[depto.operacion]}
        </span>

        {!disponible && (
          <span className="absolute right-3 top-3 rounded bg-white/90 px-2.5 py-1 text-xs font-medium text-text-mid">
            {ESTATUS_LABEL[depto.estatus]}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display text-xl text-azul-mid">{depto.titulo}</h3>
        <p className="mt-1 text-sm text-text-mid">
          {depto.recamaras} rec · {depto.m2} m² · piso {depto.piso}
        </p>
        <p className="mt-3 font-medium text-text-dark">
          {formatPrecio(depto.precio)}
          {depto.operacion === "renta" && (
            <span className="text-sm font-normal text-text-light"> /mes</span>
          )}
        </p>
      </div>
    </Link>
  );
}