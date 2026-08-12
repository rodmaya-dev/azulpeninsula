"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
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
const DEFAULT_LOCALE: Locale = "es";

function isLocale(value: string | null): value is Locale {
  return value === "es" || value === "en";
}

// useSyncExternalStore es la forma correcta de leer una fuente externa
// como localStorage dentro de React — evita el patrón "leer en useEffect
// y hacer setState" (que ESLint ahora marca como error: react-hooks/
// set-state-in-effect, porque puede disparar renders en cascada) y
// resuelve la hidratación servidor/cliente de forma segura:
// getServerSnapshot le da a Next.js un valor consistente durante el
// render en servidor, donde `window` ni siquiera existe.
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = (next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
    // El evento "storage" del navegador solo se dispara en OTRAS pestañas,
    // nunca en la que hizo el cambio. Lo disparamos manualmente aquí para
    // que useSyncExternalStore vuelva a leer el snapshot en esta misma
    // pestaña — de paso, si el sitio está abierto en dos pestañas a la
    // vez, cambiar el idioma en una sincroniza automáticamente la otra.
    window.dispatchEvent(new Event("storage"));
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
