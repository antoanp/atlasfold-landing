import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiePage" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    robots: { index: true, follow: true },
  };
}

type Props = { params: Promise<{ locale: string }> };

export default async function CookiePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiePage" });

  const richTags = {
    highlight: (chunks: any) => (
      <strong className="text-text-primary">{chunks}</strong>
    ),
    italic: (chunks: any) => <em>{chunks}</em>,
    emailLink: (chunks: any) => (
      <a
        href="mailto:antoan@atlasfold.com"
        className="text-accent hover:underline"
      >
        {chunks}
      </a>
    ),
    vercelLink: (chunks: any) => (
      <a
        href="https://vercel.com/docs/analytics/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        {chunks}
      </a>
    ),
    googleLink: (chunks: any) => (
      <a
        href="https://policies.google.com/technologies/cookies"
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline"
      >
        {chunks}
      </a>
    ),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-page">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Back link */}
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

          <p className="mb-2 font-body text-sm text-text-secondary">
            {t("lastUpdated")}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">
            {t("title")}
          </h1>
          <p className="mt-4 font-body leading-relaxed text-text-secondary">
            {t.rich("intro", richTags)}
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section1.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t("section1.p1")}
            </p>
          </section>

          {/* 2 — the main point */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section2.title")}
            </h2>

            {/* Highlight callout */}
            <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-5">
              <p className="font-body font-semibold text-green-800">
                {t("section2.highlightTitle")}
              </p>
              <p className="mt-1 font-body text-sm text-green-700">
                {t("section2.highlightDesc")}
              </p>
            </div>

            <p className="mt-6 font-body leading-relaxed text-text-secondary">
              {t.rich("section2.p1", richTags)}
            </p>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              {t("section2.p2")}
            </p>
            <ul className="mt-3 space-y-1 font-body text-text-secondary">
              {t.raw("section2.items").map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              {t.rich("section2.p3", richTags)}
            </p>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section3.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t.rich("section3.p1", richTags)}
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section4.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t("section4.p1")}
            </p>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section5.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t.rich("section5.p1", richTags)}
            </p>
          </section>

          <hr className="my-10 border-gray-200" />

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
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
        </div>
      </main>
      <Footer />
    </>
  );
}
