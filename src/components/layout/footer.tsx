import { useTranslations } from "next-intl";

const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.9126632691127!2d23.383908128435476!3d42.66320613113495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa876de694daf7%3A0x63d66f377fe1257b!2sBlock%2056%20Flower%20home%204!5e0!3m2!1sen!2sbg!4v1773070246059!5m2!1sen!2sbg";

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

          <div>
            <p className="mb-3 font-display text-sm font-bold">
              {t("mapTitle")}
            </p>
            <div className="h-56 overflow-hidden rounded-2xl border border-gray-100">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
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
