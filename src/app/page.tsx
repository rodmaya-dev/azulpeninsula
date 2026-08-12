"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { departamentos } from "@/data/departamentos";

/**
 * Home provisional: solo valida que el andamiaje (fuentes, tokens, i18n,
 * datos tipados) funciona de punta a punta. El diseño real del hero
 * (imagen de fondo, animaciones) llega en el último paso del roadmap.
 */
export default function Home() {
  const { t } = useTranslations();
  const disponibles = departamentos.filter((d) => d.estatus === "disponible").length;

  return (
    <>
      <section className="bg-azul-deep px-6 py-28 text-center text-white">
        <span className="text-xs uppercase tracking-[0.2em] text-azul-light">
          Puerto Vallarta, Jalisco
        </span>
        <h1 className="mt-4 font-display text-4xl italic md:text-6xl">
          {t("hero.titulo")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-text-light">
          {t("hero.subtitulo")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/departamentos"
            className="rounded bg-azul-accent px-6 py-3 text-sm font-medium transition-colors hover:bg-azul-light"
          >
            {t("hero.cta1")}
          </Link>
          <Link
            href="/nosotros"
            className="rounded border border-white/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
          >
            {t("hero.cta2")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-16">
        <span className="text-xs font-medium uppercase tracking-wide text-text-light">
          {t("home.deptos.label")}
        </span>
        <h2 className="mt-2 font-display text-3xl text-azul-mid">
          {t("home.deptos.titulo")}
        </h2>
        <p className="mt-2 max-w-xl text-text-mid">{t("home.deptos.texto")}</p>
        <p className="mt-6 text-sm text-text-light">
          {disponibles} de {departamentos.length} departamentos disponibles ahora mismo.
        </p>
      </section>
    </>
  );
}
