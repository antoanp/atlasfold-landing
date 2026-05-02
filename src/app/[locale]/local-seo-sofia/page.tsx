import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCaptureCtaButton } from "@/components/lead-capture/lead-capture-cta-button";

type Props = { params: Promise<{ locale: string }> };

const PATH = "local-seo-sofia";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "localSeoSofiaPage" });
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

type Niche = { label: string; body: string };
type FlagItem = string;
type RelatedItem = { label: string; href: string };

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

export default async function LocalSeoSofiaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "localSeoSofiaPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const pageUrl = `${baseUrl}/${locale}/${PATH}`;

  const niches = t.raw("whoWins.niches") as Niche[];
  const redFlags = t.raw("chooseAgency.redFlags.items") as FlagItem[];
  const greenFlags = t.raw("chooseAgency.greenFlags.items") as FlagItem[];
  const related = t.raw("related.items") as RelatedItem[];

  const napPhoneTel = t("nap.phone").replace(/\s/g, "");

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
      "@type": "City",
      name: locale === "bg" ? "София" : "Sofia",
      addressCountry: "BG",
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
        name: t("breadcrumb.current"),
        item: pageUrl,
      },
    ],
  };

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
            {/* Breadcrumb */}
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
                <li className="text-text-primary">{t("breadcrumb.current")}</li>
              </ol>
            </nav>

            {/* Badge + H1 */}
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

            {/* Hero image */}
            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src="/images/sofia_google_maps_3pack.jpg"
                alt={t("image1Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
              />
            </figure>

            {/* Hook */}
            <div className="mt-10 space-y-4 font-body text-base leading-relaxed text-text-secondary">
              <p>{t("hook.p1")}</p>
              <p>{t("hook.p2")}</p>
            </div>

            {/* NAP block */}
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

            {/* H2: What is local SEO */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("whatIs.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("whatIs.p1")}</p>
                <p>{t("whatIs.p2")}</p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {t("whatIs.local.title")}
                  </h3>
                  <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-text-secondary">
                    <p>{t("whatIs.local.p1")}</p>
                    <p>{t("whatIs.local.p2")}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {t("whatIs.vsPaid.title")}
                  </h3>
                  <div className="mt-3 space-y-3 font-body text-sm leading-relaxed text-text-secondary">
                    <p>{t("whatIs.vsPaid.p1")}</p>
                    <p>{t("whatIs.vsPaid.p2")}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* H2: Who wins */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("whoWins.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("whoWins.p1")}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {niches.map((niche) => (
                  <div
                    key={niche.label}
                    className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm"
                  >
                    <p className="font-display text-sm font-bold text-text-primary">
                      {niche.label}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                      {niche.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("whoWins.p2")}
              </p>
            </section>

            {/* Second image */}
            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src="/images/gbp_optimization_sofia_example.jpg"
                alt={t("image2Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                loading="lazy"
              />
            </figure>

            {/* H2: How Google ranks */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("howGoogle.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("howGoogle.intro")}
              </p>

              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("howGoogle.relevance.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("howGoogle.relevance.p1")}</p>
                    <p>{t("howGoogle.relevance.p2")}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("howGoogle.authority.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("howGoogle.authority.p1")}</p>
                    <p>{t("howGoogle.authority.p2")}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("howGoogle.distance.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("howGoogle.distance.p1")}</p>
                    <p>{t("howGoogle.distance.p2")}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Third image */}
            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src="/images/local_seo_sofia_results_90days.jpg"
                alt={t("image3Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                loading="lazy"
              />
            </figure>

            {/* H2: vs Ads */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("vsAds.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("vsAds.p1")}</p>
                <p>{t("vsAds.p2")}</p>
                <p>{t("vsAds.p3")}</p>
              </div>
            </section>

            {/* H2: Engagement timeline */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("engagement.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("engagement.intro")}
              </p>

              <ol className="mt-8 space-y-6">
                <li className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("engagement.month1.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("engagement.month1.p1")}</p>
                    <p>{t("engagement.month1.p2")}</p>
                  </div>
                </li>

                <li className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("engagement.month2.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("engagement.month2.p1")}</p>
                    <p>{t("engagement.month2.p2")}</p>
                  </div>
                </li>

                <li className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    {t("engagement.month3.title")}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                    <p>{t("engagement.month3.p1")}</p>
                    <p>{t("engagement.month3.p2")}</p>
                  </div>
                </li>
              </ol>
            </section>

            {/* Fourth image */}
            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src="/images/atlas_fold_seo_agency_sofia_process.jpg"
                alt={t("image4Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                loading="lazy"
              />
            </figure>

            {/* H2: Choose agency */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("chooseAgency.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("chooseAgency.intro")}
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <p className="font-display text-sm font-bold text-red-600">
                    {t("chooseAgency.redFlags.label")}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {redFlags.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-0.5 shrink-0 text-red-500">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <p className="font-display text-sm font-bold text-success">
                    {t("chooseAgency.greenFlags.label")}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {greenFlags.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                      >
                        <span className="mt-0.5 shrink-0 text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 font-body text-sm leading-relaxed text-text-secondary">
                <Link
                  href={`/${locale}/seo-optimization-sofia`}
                  className="font-semibold text-accent hover:underline"
                >
                  {locale === "bg"
                    ? "Прочетете повече: SEO оптимизация в София — стълбовете и процесът →"
                    : "Read more: SEO optimization in Sofia — the pillars and process →"}
                </Link>
              </p>
            </section>

            {/* FAQ */}
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

            {/* CTA */}
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

            {/* Related links */}
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
