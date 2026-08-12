"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Locale, type TranslationKey } from "./dictionaries";

/**
 * Decisión de arquitectura: Context API + localStorage (mismo mecanismo que
 * ya tenías en main.js), NO next-intl con rutas /es /en por ahora.
 *
 * Por qué: next-intl con locale en la URL es superior para SEO multi-idioma
 * (hreflang, contenido indexado por idioma), pero reestructura TODAS las
 * rutas del sitio. Eso lo vale la pena resolverlo junto con el trabajo de
 * SEO de Departamentos (roadmap paso 4), no aquí en el andamiaje base.
 * Migrar de este Context a next-intl más adelante es un cambio localizado
 * a esta carpeta — ningún componente que usa `useTranslations()` cambia.
 */

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "ap_lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => dictionaries[locale][key],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslations debe usarse dentro de <I18nProvider>");
  }
  return ctx;
}
