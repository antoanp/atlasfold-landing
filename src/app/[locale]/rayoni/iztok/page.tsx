import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCaptureCtaButton } from "@/components/lead-capture/lead-capture-cta-button";
import { paths, localePath } from "@/lib/paths";

type Props = { params: Promise<{ locale: string }> };

const PATH = paths.areas.iztok;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "iztokAreaPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    alternates: {
      canonical: `${baseUrl}/${locale}/${PATH}`,
      languages: {
        bg: `${baseUrl}/bg/${PATH}`,
        en: `${baseUrl}/en/${PATH}`,
        "x-default": `${baseUrl}/bg/${PATH}`,
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      url: `${baseUrl}/${locale}/${PATH}`,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "article",
      images: [
        {
          url: `${baseUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("metadataTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      images: [`${baseUrl}/images/og-image.png`],
    },
    robots: { index: true, follow: true },
  };
}

type SearchPattern = { label: string; body: string };
type RelatedItem = { label: string; href: string };

export default async function IztokAreaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "iztokAreaPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const pageUrl = `${baseUrl}/${locale}/${PATH}`;

  const patterns = t.raw("howSearchesWork.patterns") as SearchPattern[];
  const streets = t.raw("landmarks.streets") as string[];
  const landmarks = t.raw("landmarks.landmarks") as string[];
  const serviceItems = t.raw("services.items") as string[];
  const struggleItems = t.raw("struggles.items") as string[];
  const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;
  const related = t.raw("related.items") as RelatedItem[];

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
    areaServed: {
      "@type": "Place",
      name: locale === "bg" ? "Изток, София" : "Iztok, Sofia",
      containedInPlace: {
        "@type": "City",
        name: locale === "bg" ? "София" : "Sofia",
        addressCountry: "BG",
      },
    },
    url: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: t(`faq.items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.items.${key}.answer`),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.areas"),
        item: `${baseUrl}/${locale}/${paths.areas.hub}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("breadcrumb.current"),
        item: pageUrl,
      },
    ],
  };

  const napPhoneTel = t("nap.phone").replace(/\s/g, "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <main className="min-h-screen bg-page">
        <article className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 font-body text-sm text-text-secondary"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="transition-colors hover:text-text-primary"
                  >
                    {t("breadcrumb.home")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-text-secondary">{t("breadcrumb.areas")}</li>
                <li aria-hidden="true">/</li>
                <li className="text-text-primary">{t("breadcrumb.current")}</li>
              </ol>
            </nav>

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

            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src="/images/sofia_iztok_borisova_gradina.webp"
                alt={t("image1Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
              />
            </figure>

            <div className="mt-10 space-y-4 font-body text-base leading-relaxed text-text-secondary">
              <p>{t("hook.p1")}</p>
              <p>{t("hook.p2")}</p>
            </div>

            <section className="mt-10 rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
              <p className="font-display text-sm font-semibold uppercase tracking-wide text-text-secondary">
                {t("nap.title")}
              </p>
              <address className="mt-4 space-y-1 font-body text-sm not-italic leading-relaxed text-text-primary">
                <p className="font-bold">{t("nap.name")}</p>
                <p>{t("nap.city")}</p>
                <p>
                  <a
                    href={`tel:${napPhoneTel}`}
                    className="text-accent hover:underline"
                  >
                    {t("nap.phoneDisplay")}
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
                <p className="font-medium">{t("nap.hours")}</p>
              </address>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("whyCompetitive.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("whyCompetitive.p1")}</p>
                <p>{t("whyCompetitive.p2")}</p>
                <p>{t("whyCompetitive.p3")}</p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("howSearchesWork.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("howSearchesWork.intro")}
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {patterns.map((pattern) => (
                  <div
                    key={pattern.label}
                    className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm"
                  >
                    <p className="font-display text-sm font-bold text-text-primary">
                      {pattern.label}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                      {pattern.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("howSearchesWork.outro")}
              </p>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("landmarks.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("landmarks.intro")}
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <p className="font-display text-sm font-bold text-text-primary">
                    {t("landmarks.streetsLabel")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {streets.map((street) => (
                      <li
                        key={street}
                        className="rounded-full border border-gray-200 px-3 py-1 font-body text-xs text-text-secondary"
                      >
                        {street}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <p className="font-display text-sm font-bold text-text-primary">
                    {t("landmarks.landmarksLabel")}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {landmarks.map((landmark) => (
                      <li
                        key={landmark}
                        className="rounded-full border border-gray-200 px-3 py-1 font-body text-xs text-text-secondary"
                      >
                        {landmark}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("landmarks.outro")}
              </p>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("proximity.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("proximity.p1")}</p>
                <p>{t("proximity.p2")}</p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("services.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("services.intro")}
              </p>
              <ul className="mt-4 space-y-3">
                {serviceItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-0.5 shrink-0 text-success">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6">
                <Link
                  href={localePath(locale, paths.services.seoOptimization)}
                  className="font-body text-sm font-semibold text-accent hover:underline"
                >
                  {t("services.linkLabel")}
                </Link>
              </p>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("struggles.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("struggles.intro")}
              </p>
              <ol className="mt-6 space-y-4 border-l-2 border-gray-200 pl-6">
                {struggleItems.map((item, i) => (
                  <li
                    key={i}
                    className="font-body text-base leading-relaxed text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("struggles.outro")}
              </p>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("faq.title")}{" "}
                <span className="font-accent italic">
                  {t("faq.titleAccent")}
                </span>
              </h2>
              <div className="mt-6 space-y-4">
                {faqKeys.map((key) => (
                  <details
                    key={key}
                    className="group rounded-2xl border border-gray-100 bg-card p-6 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none font-display text-base font-bold text-text-primary">
                      {t(`faq.items.${key}.question`)}
                    </summary>
                    <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                      {t(`faq.items.${key}.answer`)}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-14 rounded-2xl border border-gray-100 bg-card px-6 py-12 text-center shadow-sm lg:px-12">
              <h2 className="font-display text-3xl font-extrabold lg:text-4xl">
                {t("cta.title")}{" "}
                <span className="font-accent italic">
                  {t("cta.titleAccent")}
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-secondary">
                {t("cta.body")}
              </p>
              <LeadCaptureCtaButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">
                {t("cta.button")}
              </LeadCaptureCtaButton>
            </section>

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
        </article>
      </main>
      <Footer />
    </>
  );
}
