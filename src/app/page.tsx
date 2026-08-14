"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { departamentos } from "@/data/departamentos";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  const { t } = useTranslations();
  const disponibles = departamentos.filter((d) => d.estatus === "disponible").length;

  return (
    <>
      {/* El hero NO se anima al cargar (a diferencia del resto de la
          página) — es lo primero que la persona ve; retrasar su aparición
          con un fade solo demora la percepción de carga. La imagen usa
          priority para que Next la cargue de inmediato, no perezosamente
          (es el candidato a LCP — Largest Contentful Paint — de esta
          página, así que cargarla tarde penaliza directamente el SEO). */}
      <section className="relative overflow-hidden bg-azul-deep px-6 py-32 text-center text-white">
        <Image
          src="/img/hero/street_ap.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-azul-deep/80 via-azul-deep/70 to-azul-deep" />

        <div className="relative">
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
        </div>
      </section>

      <Reveal>
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
      </Reveal>
    </>
  );
}