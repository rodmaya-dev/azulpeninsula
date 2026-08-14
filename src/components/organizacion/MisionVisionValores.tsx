import { Reveal } from "@/components/ui/Reveal";

const VALORES = [
  { icono: "🤝🏼", titulo: "Honestidad", texto: "Actuar con transparencia y veracidad en todas nuestras acciones y decisiones." },
  { icono: "💚", titulo: "Empatía", texto: "Fomentar la comprensión y el respeto mutuo entre todos los miembros de la comunidad." },
  { icono: "✨", titulo: "Orden y limpieza", texto: "Mantener nuestros espacios comunes y áreas verdes limpios y ordenados." },
  { icono: "🙌🏼", titulo: "Respeto", texto: "Tratar a todos los miembros de la comunidad con dignidad y respeto." },
  { icono: "⚖️", titulo: "Responsabilidad", texto: "Asumir la responsabilidad de nuestras acciones y trabajar por el bien común." },
  { icono: "🤲🏼", titulo: "Colaboración", texto: "Fomentar la participación y cooperación entre vecinos y la Asociación para lograr nuestros objetivos." },
  { icono: "📈", titulo: "Mejora continua", texto: "Buscar constantemente formas de mejorar nuestros servicios y procesos en beneficio de la comunidad." },
] as const;

export function MisionVisionValores() {
  return (
    <>
      <section className="border-t border-black/5 bg-sand-light px-6 py-16">
        <div className="mx-auto max-w-container">
          <span className="text-xs font-medium uppercase tracking-wide text-text-light">
            Asociación Civil Dirección y Administración Azul
          </span>
          <h2 className="mt-2 font-display text-3xl text-azul-mid">
            Misión, Visión y Valores
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg bg-white p-8 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-text-light">
                  Misión
                </span>
                <p className="mt-3 text-text-mid">
                  Administrar los recursos del Fraccionamiento Azul Península
                  de manera eficiente y transparente, con el objetivo de
                  mejorar la calidad de vida de nuestros vecinos y generar un
                  entorno agradable y seguro para vivir. Buscamos incrementar
                  la plusvalía de nuestras propiedades y fomentar una
                  convivencia armoniosa y respetuosa entre todos los
                  miembros de la comunidad.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg bg-white p-8 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wide text-text-light">
                  Visión
                </span>
                <p className="mt-3 text-text-mid">
                  Ser una comunidad modelo en la que la honestidad, la
                  empatía y el respeto sean los pilares fundamentales de
                  nuestra convivencia. Queremos que Azul Península sea un
                  lugar donde nuestros vecinos se sientan orgullosos de
                  vivir y donde la calidad de vida sea una realidad para
                  todos.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-azul-deep px-6 py-16 text-white">
        <div className="mx-auto max-w-container text-center">
          <h2 className="font-display text-3xl">Nuestros valores</h2>
        </div>

        {/* Banner deslizante: el array se duplica una vez para que el loop
            sea continuo (ver el keyframe "marquee" en globals.css). Pausa
            al pasar el cursor, para poder leer un valor sin que se mueva. */}
        <div className="mt-10 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...VALORES, ...VALORES].map((valor, i) => (
              <div key={`${valor.titulo}-${i}`} className="w-40 shrink-0 text-center">
                <span className="text-3xl" aria-hidden="true">
                  {valor.icono}
                </span>
                <h4 className="mt-3 font-display text-lg">{valor.titulo}</h4>
                <p className="mt-1 text-sm text-azul-light">{valor.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}