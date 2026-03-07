import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <span className="font-display text-xl font-bold">{t("logo")}</span>
            <p className="mt-2 font-body text-sm text-text-secondary">
              {t("tagline")}
            </p>
            <address className="mt-6 space-y-1 font-body text-sm not-italic leading-relaxed">
              <p className="font-bold">{t("nap.name")}</p>
              <p>{t("nap.street")}</p>
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
            </address>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-gray-200 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex gap-6 font-body text-sm text-text-secondary">
            {/* TODO: Placeholder — replace with Link when route exists */}
            <a href="#" className="hover:text-text-primary">
              {t("links.terms")}
            </a>
            {/* TODO: Placeholder — replace with Link when route exists */}
            <a href="#" className="hover:text-text-primary">
              {t("links.privacy")}
            </a>
          </div>
          <p className="font-body text-xs text-text-secondary">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
