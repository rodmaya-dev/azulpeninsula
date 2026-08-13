const PRINCIPIOS = [
  {
    titulo: "Servir a la comunidad",
    texto: "Nuestra labor es servir a los vecinos y trabajar por su bienestar, sin buscar reconocimiento personal.",
  },
  {
    titulo: "Actuar con integridad",
    texto: "Tomar decisiones y actuar con integridad, ética y transparencia en todo momento.",
  },
  {
    titulo: "Mantener informada a la comunidad",
    texto: "Mantener a los vecinos informados sobre las decisiones y acciones de la Asociación, abiertos a sus sugerencias.",
  },
] as const;

export function Principios() {
  return (
    <section className="border-t border-black/5 px-6 py-16">
      <div className="mx-auto max-w-container">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          Mesa Directiva
        </span>
        <h2 className="mt-2 font-display text-3xl text-azul-mid">
          Principios que nos guían
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRINCIPIOS.map((principio) => (
            <div key={principio.titulo} className="border-l-2 border-azul-accent pl-5">
              <h4 className="font-display text-lg text-text-dark">{principio.titulo}</h4>
              <p className="mt-2 text-sm text-text-mid">{principio.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}