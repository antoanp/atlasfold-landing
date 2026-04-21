import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "internetMarketingPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const path = "internet-marketing-service";

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}/${path}`,
      languages: {
        bg: `${baseUrl}/bg/${path}`,
        en: `${baseUrl}/en/${path}`,
        "x-default": `${baseUrl}/bg/${path}`,
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      url: `${baseUrl}/${locale}/${path}`,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function InternetMarketingServicePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "internetMarketingPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t("serviceType"),
    name: t("metadataTitle"),
    description: t("serviceDescription"),
    provider: {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#business`,
      name: "Atlas Fold",
    },
    areaServed: { "@type": "City", name: locale === "bg" ? "София" : "Sofia" },
    url: `${baseUrl}/${locale}/internet-marketing-service`,
  };

  const features = t.raw("features") as string[];
  const related = t.raw("related.items") as { label: string; href: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-page">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}`}
              className="mb-10 inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              {t("backToHome")}
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
              {t("badge")}
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight lg:text-6xl">
              {t("headline")}{" "}
              <span className="font-accent italic">{t("headlineAccent")}</span>
            </h1>

            <p className="mt-6 font-body text-lg font-semibold text-text-primary">
              {t("subheadline")}
            </p>

            <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
              {t("intro")}
            </p>

            <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
              {t("body")}
            </p>

            <div className="mt-10 rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-body text-sm text-text-primary">
                    <span className="mt-0.5 shrink-0 text-success">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 rounded-2xl border border-gray-100 bg-card px-8 py-12 text-center shadow-sm">
              <h2 className="font-display text-3xl font-extrabold lg:text-4xl">
                {t("ctaTitle")}
              </h2>
              <Link
                href={`/${locale}#pricing`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t("ctaButton")}
              </Link>
            </div>

            <section className="mt-14 border-t border-gray-200 pt-10">
              <h2 className="font-display text-lg font-bold text-text-primary">
                {t("related.title")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {related.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 font-body text-sm text-text-primary transition-colors hover:bg-gray-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
