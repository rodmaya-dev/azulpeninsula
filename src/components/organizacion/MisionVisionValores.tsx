const VALORES = [
  {
    icono: "🤝🏼",
    titulo: "Honestidad",
    texto: "Actuar con transparencia y veracidad en todas nuestras acciones y decisiones.",
  },
  {
    icono: "💚",
    titulo: "Empatía",
    texto: "Fomentar la comprensión y el respeto mutuo entre todos los miembros de la comunidad.",
  },
  {
    icono: "✨",
    titulo: "Orden y limpieza",
    texto: "Mantener nuestros espacios comunes y áreas verdes limpios y ordenados.",
  },
  {
    icono: "🙌🏼",
    titulo: "Respeto",
    texto: "Tratar a todos los miembros de la comunidad con dignidad y respeto.",
  },
  {
    icono: "⚖️",
    titulo: "Responsabilidad",
    texto: "Asumir la responsabilidad de nuestras acciones y trabajar por el bien común.",
  },
  {
    icono: "🤲🏼",
    titulo: "Colaboración",
    texto: "Fomentar la participación y cooperación entre vecinos y la Asociación para lograr nuestros objetivos.",
  },
  {
    icono: "📈",
    titulo: "Mejora continua",
    texto: "Buscar constantemente formas de mejorar nuestros servicios y procesos en beneficio de la comunidad.",
  },
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
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <span className="text-xs font-medium uppercase tracking-wide text-text-light">
                Misión
              </span>
              <p className="mt-3 text-text-mid">
                Administrar los recursos del Fraccionamiento Azul Península de
                manera eficiente y transparente, con el objetivo de mejorar la
                calidad de vida de nuestros vecinos y generar un entorno
                agradable y seguro para vivir. Buscamos incrementar la
                plusvalía de nuestras propiedades y fomentar una convivencia
                armoniosa y respetuosa entre todos los miembros de la
                comunidad.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <span className="text-xs font-medium uppercase tracking-wide text-text-light">
                Visión
              </span>
              <p className="mt-3 text-text-mid">
                Ser una comunidad modelo en la que la honestidad, la empatía y
                el respeto sean los pilares fundamentales de nuestra
                convivencia. Queremos que Azul Península sea un lugar donde
                nuestros vecinos se sientan orgullosos de vivir y donde la
                calidad de vida sea una realidad para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-azul-deep px-6 py-16 text-white">
        <div className="mx-auto max-w-container text-center">
          <h2 className="font-display text-3xl">Nuestros valores</h2>
        </div>

        {/* flex-wrap + justify-center en vez de grid: con 7 elementos, un
            grid de 4 columnas deja el último huérfano a la izquierda. Con
            flex-wrap, esa última fila de un solo elemento se centra sola —
            el mismo efecto que el CSS original comentaba "a mano". */}
        <div className="mx-auto mt-10 flex max-w-container flex-wrap justify-center gap-x-10 gap-y-10">
          {VALORES.map((valor) => (
            <div key={valor.titulo} className="w-40 text-center">
              <span className="text-3xl" aria-hidden="true">
                {valor.icono}
              </span>
              <h4 className="mt-3 font-display text-lg">{valor.titulo}</h4>
              <p className="mt-1 text-sm text-azul-light">{valor.texto}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}