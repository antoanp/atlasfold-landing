import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string }> };

const PATH = paths.areas.hub;
const NAMESPACE = "areasHubPage";

type Area = { name: string; href: string; body: string };
type LinkItem = { label: string; href: string };

const h2 = "font-display text-2xl font-extrabold text-text-primary lg:text-3xl";
const body = "font-body text-base leading-relaxed text-text-secondary";
const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const ogImage = `${baseUrl}/images/og-image.png`;

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
      type: "website",
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

/** Hub page listing every Sofia district page. */
export default async function AreasHubPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const pageUrl = `${baseUrl}/${locale}/${PATH}`;

  const areas = t.raw("areas.items") as Area[];
  const paragraphs = t.raw("how.paragraphs") as string[];
  const related = t.raw("related.items") as LinkItem[];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("metadataTitle"),
    description: t("metadataDesc"),
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: "Atlas Fold", url: `${baseUrl}/${locale}` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: areas.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.name,
        url: `${baseUrl}/${locale}${a.href}`,
      })),
    },
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
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
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

            <div className={`mt-10 space-y-4 ${body}`}>
              <p>{t("hook.p1")}</p>
              <p>{t("hook.p2")}</p>
            </div>

            <section className="mt-14">
              <h2 className={h2}>{t("areas.title")}</h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2">
                {areas.map((area) => (
                  <li key={area.href}>
                    <Link
                      href={`/${locale}${area.href}`}
                      className="block h-full rounded-2xl border border-gray-100 bg-card p-6 shadow-sm transition-colors hover:bg-gray-50"
                    >
                      <h3 className="font-display text-lg font-bold text-text-primary">{area.name}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">{area.body}</p>
                      <span className="mt-3 inline-block font-body text-sm font-semibold text-accent">
                        {t("areas.cta")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className={h2}>{t("how.title")}</h2>
              <div className={`mt-6 space-y-4 ${body}`}>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className={h2}>{t("other.title")}</h2>
              <p className={`mt-6 ${body}`}>{t("other.body")}</p>
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

            <LeadCtaSection namespace={NAMESPACE} className="mt-14" />

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
