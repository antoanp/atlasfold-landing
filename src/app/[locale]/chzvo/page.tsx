import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCaptureCtaButton } from "@/components/lead-capture/lead-capture-cta-button";
import { FaqPageAccordion } from "@/components/faq/accordion";
import { FaqPageJsonLd } from "@/components/faq/json-ld";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string }> };

const PATH = paths.legal.faq;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
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

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });

  return (
    <>
      <FaqPageJsonLd locale={locale} />
      <Navbar />
      <main className="min-h-screen bg-page">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

            <div className="flex flex-col items-center text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
                {t("badge")}
              </span>
              <h1 className="font-display text-3xl font-extrabold lg:text-5xl">
                {t("title")}{" "}
                <span className="font-accent italic">{t("titleAccent")}</span>
              </h1>
              <p className="mt-4 max-w-xl font-body text-base text-text-secondary">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Accordion */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <FaqPageAccordion />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-100 bg-card px-8 py-12 text-center shadow-sm">
              <h2 className="font-display text-3xl font-extrabold lg:text-4xl">
                {t("cta.title")}{" "}
                <span className="font-accent italic">
                  {t("cta.titleAccent")}
                </span>
              </h2>
              <p className="mt-3 font-body text-base text-text-secondary">
                {t("cta.subtitle")}
              </p>
              <LeadCaptureCtaButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">
                {t("cta.button")}
              </LeadCaptureCtaButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
