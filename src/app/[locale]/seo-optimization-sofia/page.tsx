import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type Props = { params: Promise<{ locale: string }> };

const PATH = "seo-optimization-sofia";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoOptimizationPage" });
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

type Reason = string;
type OnPageItem = string;
type MetricItem = string;
type Step = { title: string; body: string };
type FaqItem = { question: string; answer: string };
type RelatedItem = { label: string; href: string };

/**
 * SEO Optimization Sofia Page.
 *
 * Rank-3 service page. Primary keyword: "seo optimization sofia".
 */
export default async function SeoOptimizationSofiaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seoOptimizationPage" });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const pageUrl = `${baseUrl}/${locale}/${PATH}`;

  const reasons = t.raw("whyGenericFails.reasons") as Reason[];
  const onPageItems = t.raw("pillars.onPage.items") as OnPageItem[];
  const measureItems = t.raw("measure.items") as MetricItem[];
  const steps = t.raw("process.steps") as Step[];
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
    areaServed: { "@type": "City", name: locale === "bg" ? "София" : "Sofia" },
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
                src="/images/og-image.png"
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

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("whatItMeans.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("whatItMeans.p1")}</p>
                <p>{t("whatItMeans.p2")}</p>
                <p>{t("whatItMeans.p3")}</p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("whyGenericFails.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("whyGenericFails.p1")}</p>
                <p>{t("whyGenericFails.p2")}</p>
                <ol className="mt-4 space-y-4 border-l-2 border-gray-200 pl-6">
                  {reasons.map((reason, i) => (
                    <li
                      key={i}
                      className="font-body text-base leading-relaxed text-text-secondary"
                    >
                      {reason}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("pillars.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("pillars.intro")}
              </p>

              <div className="mt-8 rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {t("pillars.gbp.title")}
                </h3>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                  <p>{t("pillars.gbp.p1")}</p>
                  <p>{t("pillars.gbp.p2")}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {t("pillars.onPage.title")}
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
                  {t("pillars.onPage.intro")}
                </p>
                <ul className="mt-4 space-y-3">
                  {onPageItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                    >
                      <span className="mt-0.5 shrink-0 text-success">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
                  {t("pillars.onPage.outro")}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {t("pillars.citations.title")}
                </h3>
                <div className="mt-4 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                  <p>{t("pillars.citations.p1")}</p>
                  <p>{t("pillars.citations.p2")}</p>
                  <p>{t("pillars.citations.p3")}</p>
                </div>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("measure.title")}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-text-secondary">
                {t("measure.intro")}
              </p>
              <ul className="mt-4 space-y-3">
                {measureItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-0.5 shrink-0 text-success">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-base leading-relaxed text-text-secondary">
                {t("measure.outro")}
              </p>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("process.title")}
              </h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {steps.map((step) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm"
                  >
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("localReferences.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("localReferences.p1")}</p>
                <p>{t("localReferences.p2")}</p>
                <p>
                  <Link
                    href={`/${locale}/areas/lozenets`}
                    className="font-semibold text-accent hover:underline"
                  >
                    {t("localReferences.areaLinkLabel")}
                  </Link>
                </p>
              </div>
            </section>

            <section id="pricing-details" className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-text-primary lg:text-3xl">
                {t("pricing.title")}
              </h2>
              <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-text-secondary">
                <p>{t("pricing.p1")}</p>
                <p>{t("pricing.p2")}</p>
              </div>
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
              <Link
                href={`/${locale}#pricing`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {t("cta.button")}
              </Link>
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
