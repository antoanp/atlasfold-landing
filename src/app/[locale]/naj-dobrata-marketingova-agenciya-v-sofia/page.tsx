import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string }> };

const PATH = paths.pages.bestMarketingAgency;
const NAMESPACE = "bestAgencyPage" as const;
const PUBLISHED = "2026-10-08";

type Stat = { label: string; before: string; after: string };
type Question = { title: string; body: string };
type LinkItem = { label: string; href: string };

const h2 = "font-display text-2xl font-extrabold text-text-primary lg:text-3xl";
const body = "font-body text-base leading-relaxed text-text-secondary";

const base = () => process.env.BASE_URL ?? "https://atlasfold.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });
  const b = base();
  const image = `${b}${t("image.src")}`;

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    alternates: {
      canonical: `${b}/${locale}/${PATH}`,
      languages: {
        bg: `${b}/bg/${PATH}`,
        en: `${b}/en/${PATH}`,
        "x-default": `${b}/bg/${PATH}`,
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      url: `${b}/${locale}/${PATH}`,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "article",
      images: [{ url: image, width: 1608, height: 586, alt: t("metadataTitle") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDesc"),
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BestMarketingAgencySofiaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NAMESPACE });
  const b = base();
  const pageUrl = `${b}/${locale}/${PATH}`;
  const imageUrl = `${b}${t("image.src")}`;
  const founderId = `${b}/#founder`;

  const stats = t.raw("stats.items") as Stat[];
  const questions = t.raw("questions.items") as Question[];
  const related = t.raw("related.items") as LinkItem[];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: t("person.name"),
    alternateName: t("person.alternateName"),
    jobTitle: t("person.jobTitle"),
    description: t("person.description"),
    url: pageUrl,
    image: imageUrl,
    worksFor: { "@type": "Organization", "@id": `${b}/#organization`, name: "Atlas Fold" },
    knowsAbout: t.raw("person.knowsAbout") as string[],
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "bg" ? "София" : "Sofia",
      addressCountry: "BG",
    },
    sameAs: ["https://www.instagram.com/atlas.fold/"],
    mainEntityOfPage: pageUrl,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("metadataTitle"),
    description: t("metadataDesc"),
    url: pageUrl,
    inLanguage: locale,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    primaryImageOfPage: imageUrl,
    about: { "@type": "LocalBusiness", "@id": `${b}/#business`, name: "Atlas Fold" },
    author: { "@id": founderId },
    publisher: { "@id": `${b}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${b}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: pageUrl },
    ],
  };

  return (
    <>
      {[personSchema, webPageSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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

            <div className={`mt-6 space-y-4 ${body}`}>
              <p className="text-lg font-semibold text-text-primary">{t("intro")}</p>
            </div>

            <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
              <Image
                src={t("image.src")}
                alt={t("image.alt")}
                width={1608}
                height={586}
                className="h-auto w-full"
                priority
              />
              <figcaption className="px-6 py-4 font-body text-sm text-text-secondary">
                {t("image.caption")}
              </figcaption>
            </figure>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                  <dt className="font-body text-sm text-text-secondary">{s.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-extrabold text-text-primary">
                    <span className="sr-only">{t("stats.beforeSr")}</span>
                    {s.before} <span aria-hidden="true">→</span>{" "}
                    <span className="sr-only">{t("stats.afterSr")}</span>
                    {s.after}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-14">
              <h2 className={h2}>{t("questions.title")}</h2>
              <p className={`mt-6 ${body}`}>{t("questions.intro")}</p>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {questions.map((q) => (
                  <li key={q.title} className="rounded-2xl border border-gray-100 bg-card p-6 shadow-sm">
                    <h3 className="font-display text-lg font-bold text-text-primary">{q.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">{q.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-14">
              <h2 className={h2}>{t("verify.title")}</h2>
              <p className={`mt-6 ${body}`}>{t("verify.body")}</p>
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
