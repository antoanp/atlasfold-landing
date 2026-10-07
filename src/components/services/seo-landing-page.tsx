import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";

type Namespace =
  | "seoServicesPage"
  | "seoAgencyPage"
  | "internetMarketingPage"
  | "marketingAgencyPage";

type Card = { title: string; body: string };
type Section = {
  title: string;
  paragraphs?: string[];
  cards?: Card[];
  ordered?: boolean;
  items?: string[];
  outro?: string;
};
type LinkItem = { label: string; href: string };

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

const h2 =
  "font-display text-2xl font-extrabold text-text-primary lg:text-3xl";
const body = "font-body text-base leading-relaxed text-text-secondary";

function baseUrl() {
  return process.env.BASE_URL ?? "https://atlasfold.com";
}

export async function buildSeoLandingMetadata(
  locale: string,
  namespace: Namespace,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const base = baseUrl();
  const ogImage = `${base}/images/og-image.png`;

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    alternates: {
      canonical: `${base}/${locale}/${path}`,
      languages: {
        bg: `${base}/bg/${path}`,
        en: `${base}/en/${path}`,
        "x-default": `${base}/bg/${path}`,
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      url: `${base}/${locale}/${path}`,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: t("metadataTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Shared layout for the "SEO услуги" and "SEO агенция" pages.
 * Copy lives in messages/*.json under the given namespace; sections are data-driven.
 */
export async function SeoLandingPage({
  locale,
  namespace,
  path,
}: {
  locale: string;
  namespace: Namespace;
  path: string;
}) {
  const t = await getTranslations({ locale, namespace });
  const base = baseUrl();
  const pageUrl = `${base}/${locale}/${path}`;

  const sections = t.raw("sections") as Section[];
  const related = t.raw("related.items") as LinkItem[];
  const areaLinks = t.raw("localReferences.links") as LinkItem[];
  const hook = t.raw("hook") as string[];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t("serviceType"),
    name: t("metadataTitle"),
    description: t("serviceDescription"),
    provider: { "@type": "LocalBusiness", "@id": `${base}/#business`, name: "Atlas Fold" },
    areaServed: { "@type": "City", name: locale === "bg" ? "София" : "Sofia" },
    url: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t(`faq.items.${key}.question`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.items.${key}.answer`) },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${base}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />
      <main className="min-h-screen bg-page">
        <article className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-8 font-body text-sm text-text-secondary">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={`/${locale}`} className="transition-colors hover:text-text-primary">
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
                src={t("imageSrc")}
                alt={t("image1Alt")}
                width={1200}
                height={630}
                className="h-auto w-full"
                priority
              />
            </figure>

            <div className={`mt-10 space-y-4 ${body}`}>
              {hook.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {sections.map((s) => (
              <section key={s.title} className="mt-14">
                <h2 className={h2}>{s.title}</h2>

                {s.paragraphs && (
                  <div className={`mt-6 space-y-4 ${body}`}>
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}

                {s.cards && s.ordered && (
                  <ol className="mt-6 grid gap-4 md:grid-cols-2">
                    {s.cards.map((c) => (
                      <li key={c.title} className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                        <h3 className="font-display text-lg font-bold text-text-primary">{c.title}</h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">{c.body}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {s.cards && !s.ordered && (
                  <div className="mt-6 space-y-6">
                    {s.cards.map((c) => (
                      <div key={c.title} className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
                        <h3 className="font-display text-xl font-bold text-text-primary">{c.title}</h3>
                        <p className={`mt-4 ${body}`}>{c.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {s.items && (
                  <ul className="mt-4 space-y-3">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-secondary">
                        <span className="mt-0.5 shrink-0 text-success">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.outro && <p className={`mt-4 ${body}`}>{s.outro}</p>}
              </section>
            ))}

            <section className="mt-14">
              <h2 className={h2}>{t("localReferences.title")}</h2>
              <div className={`mt-6 space-y-4 ${body}`}>
                <p>{t("localReferences.p1")}</p>
                <p>{t("localReferences.p2")}</p>
                <p className="flex flex-wrap gap-x-4 gap-y-2">
                  {areaLinks.map((l) => (
                    <Link key={l.href} href={`/${locale}${l.href}`} className="font-semibold text-accent hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className={h2}>
                {t("faq.title")}{" "}
                <span className="font-accent italic">{t("faq.titleAccent")}</span>
              </h2>
              <div className="mt-6 space-y-4">
                {FAQ_KEYS.map((key) => (
                  <details key={key} className="group rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
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

            <LeadCtaSection namespace={namespace} className="mt-14" />

            <section className="mt-14 border-t border-gray-200 pt-10">
              <h2 className="font-display text-lg font-bold text-text-primary">{t("related.title")}</h2>
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
