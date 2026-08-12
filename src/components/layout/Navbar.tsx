"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.inicio" },
  { href: "/nosotros", labelKey: "nav.nosotros" },
  { href: "/departamentos", labelKey: "nav.departamentos" },
  { href: "/contacto", labelKey: "nav.contacto" },
  { href: "/asesores", labelKey: "nav.asesores" },
];

export function Navbar() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img src="/favicon.svg" alt="Azul Península" className="h-8 w-8" />
          <span className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-wide text-text-light">
              Fraccionamiento
            </span>
            <span className="font-display text-lg text-azul-mid">Azul Península</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, labelKey }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-azul-accent" : "text-text-mid hover:text-azul-mid"
                  }`}
                >
                  {t(labelKey)}
                </Link>
              </li>
            );
          })}
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <button
          type="button"
          aria-label="Menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-azul-mid transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-6 bg-azul-mid transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-azul-mid transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-black/5 px-6 pb-4 md:hidden">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm font-medium text-text-mid hover:text-azul-mid"
              >
                {t(labelKey)}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <LanguageSwitch />
          </li>
        </ul>
      )}
    </nav>
  );
}
