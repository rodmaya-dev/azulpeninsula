"use client";

import { useTranslations } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/dictionaries";

const LOCALES: Locale[] = ["es", "en"];

export function LanguageSwitch() {
  const { locale, setLocale } = useTranslations();

  return (
    <div className="flex overflow-hidden rounded border border-azul-mid/20">
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`px-2.5 py-1 text-xs font-medium tracking-wide transition-colors ${
            locale === code
              ? "bg-azul-mid text-white"
              : "bg-transparent text-azul-mid hover:bg-sand-light"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
