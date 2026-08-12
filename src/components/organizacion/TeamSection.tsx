import type { Ente } from "@/types/ente";

export function TeamSection({ ente }: { ente: Ente }) {
  if (ente.miembros.length === 0) return null;

  return (
    <section id={ente.id} className="border-t border-black/5 py-16">
      <div className="mx-auto max-w-container px-6">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          {ente.nombre}
        </span>
        <h2 className="mt-2 font-display text-3xl text-azul-mid">
          {ente.descripcion}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {ente.miembros.map((miembro) => (
            <li
              key={miembro.id}
              className="border-b border-black/5 pb-4"
            >
              <p className="font-medium text-text-dark">{miembro.nombre}</p>
              <p className="text-sm text-text-light">{miembro.cargo}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
