"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /**
   * Explicit per-locale hrefs for the current page. Required only where the URL
   * slug differs by language (the blog). Everywhere else the switcher swaps the
   * locale segment of the current path.
   */
  alternates?: Record<string, string | undefined>;
};

/** Site-wide bg | en switcher. Server-rendered hrefs — no hydration flash. */
export function LocaleSwitcher({ className, alternates }: Props) {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav.locale");

  const hrefFor = (locale: string): string => {
    const explicit = alternates?.[locale];
    if (explicit) return explicit;
    // On the unprefixed root, `src/proxy.ts` re-resolves "/" by Accept-Language, so a
    // bare "/" cannot deterministically switch language. Always target the explicit
    // locale-prefixed home ("/bg" or "/en") — these pass straight through the proxy
    // and match the page's canonical URL.
    const base = pathname === "/" ? "" : pathname;
    return `/${locale}${base}`;
  };

  return (
    <div
      className={cn("flex items-center gap-1.5 font-body text-sm", className)}
      role="group"
      aria-label={t("switchLabel")}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="text-gray-300">/</span>}
          {locale === active ? (
            <span aria-current="true" className="font-semibold uppercase text-text-primary">
              {locale}
            </span>
          ) : (
            <Link
              href={hrefFor(locale)}
              hrefLang={locale}
              className="uppercase text-text-secondary transition-colors hover:text-text-primary"
            >
              {locale}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
