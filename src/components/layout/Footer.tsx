"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.inicio" },
  { href: "/nosotros", labelKey: "nav.nosotros" },
  { href: "/departamentos", labelKey: "nav.departamentos" },
  { href: "/contacto", labelKey: "nav.contacto" },
  { href: "/asesores", labelKey: "nav.asesores" },
];

export function Footer() {
  const { t } = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-sand-light">
      <div className="mx-auto grid max-w-container gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl text-azul-mid">Azul Península</p>
          <p className="mt-1 text-sm text-text-mid">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-text-light">
            {t("footer.nav")}
          </h4>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-text-mid hover:text-azul-mid"
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-text-light">
            {t("footer.contacto")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-text-mid">
            <li>
              <a href="tel:+523223817651" className="hover:text-azul-mid">
                +52 (322) 381-7651
              </a>
            </li>
            <li>
              <a
                href="mailto:direccion.azul@outlook.com"
                className="hover:text-azul-mid"
              >
                direccion.azul@outlook.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-wide text-text-light">
            {t("footer.legal")}
          </h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/aviso-privacidad" className="text-sm text-text-mid hover:text-azul-mid">
                {t("footer.aviso")}
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="text-sm text-text-mid hover:text-azul-mid">
                {t("footer.terminos")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-5">
        <div className="mx-auto flex max-w-container flex-col gap-1 text-xs text-text-light md:flex-row md:justify-between">
          <span>© {year} Azul Península.</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
