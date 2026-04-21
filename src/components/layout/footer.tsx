import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const neighborhoods = t.raw("serviceAreas.neighborhoods") as string[];
  const featuredAreaLinks = t.raw("serviceAreas.featuredLinks") as {
    label: string;
    href: string;
  }[];

  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* NAP block */}
          <div>
            <span className="font-display text-xl font-bold">{t("logo")}</span>
            <p className="mt-2 font-body text-sm text-text-secondary">
              {t("tagline")}
            </p>
            <address className="mt-6 space-y-1 font-body text-sm not-italic leading-relaxed">
              <p className="font-bold">{t("nap.name")}</p>
              <p>
                {t("nap.city")}, {t("nap.country")}
              </p>
              <p>
                <a
                  href={`tel:${t("nap.phone").replace(/\s/g, "")}`}
                  className="text-accent hover:underline"
                >
                  {t("nap.phone")}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${t("nap.email")}`}
                  className="text-accent hover:underline"
                >
                  {t("nap.email")}
                </a>
              </p>
              <p className="font-medium text-text-primary">{t("nap.hours")}</p>
            </address>
          </div>

          {/* Services links */}
          <div>
            <p className="font-body text-sm font-semibold text-text-primary">
              {t("services.title")}
            </p>
            <nav className="mt-4 flex flex-col gap-2 font-body text-sm text-text-secondary">
              <Link
                href={`/${locale}/seo-optimization-sofia`}
                className="hover:text-text-primary"
              >
                {t("services.seoOptimization")}
              </Link>
              <Link
                href={`/${locale}/internet-marketing-service`}
                className="hover:text-text-primary"
              >
                {t("services.internetMarketing")}
              </Link>
              <Link
                href={`/${locale}/marketing-agency`}
                className="hover:text-text-primary"
              >
                {t("services.marketingAgency")}
              </Link>
            </nav>
          </div>

          {/* Service areas */}
          <div>
            <p className="font-body text-sm font-semibold text-text-primary">
              {t("serviceAreas.title")}
            </p>
            <p className="mt-1 font-body text-xs text-text-secondary">
              {t("serviceAreas.label")}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {neighborhoods.map((name) => (
                <span
                  key={name}
                  className="inline-block rounded-full border border-gray-200 px-2 py-0.5 font-body text-xs text-text-secondary"
                >
                  {name}
                </span>
              ))}
            </div>
            {featuredAreaLinks.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-1">
                {featuredAreaLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="font-body text-xs font-medium text-accent hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-200 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-wrap gap-6 font-body text-sm text-text-secondary">
            <Link href={`/${locale}/terms`} className="hover:text-text-primary">
              {t("links.terms")}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-text-primary"
            >
              {t("links.privacy")}
            </Link>
            <Link
              href={`/${locale}/cookie`}
              className="hover:text-text-primary"
            >
              {t("links.cookie")}
            </Link>
          </div>
          <p className="font-body text-xs text-text-secondary">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
