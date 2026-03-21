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
  const t = await getTranslations({ locale, namespace: "termsPage" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDesc"),
    robots: { index: true, follow: true },
  };
}

type Props = { params: Promise<{ locale: string }> };

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });

  const richTags = {
    highlight: (chunks: any) => (
      <strong className="text-text-primary">{chunks}</strong>
    ),
    emailLink: (chunks: any) => (
      <a
        href="mailto:antoan@atlasfold.com"
        className="text-accent hover:underline"
      >
        {chunks}
      </a>
    ),
    phoneLink: (chunks: any) => (
      <a href="tel:0877268727" className="text-accent hover:underline">
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
          <p className="mt-4 font-body text-text-secondary">{t("intro")}</p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section1.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t("section1.p1")}
            </p>
            <ul className="mt-4 space-y-2 font-body text-text-secondary">
              {t.raw("section1.items").map((_: any, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">▸</span>
                  <span>{t.rich(`section1.items.${i}`, richTags)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              {t("section1.p2")}
            </p>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section2.title")}
            </h2>
            <p className="mb-4 font-body leading-relaxed text-text-secondary">
              {t("section2.p1")}
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 font-body text-sm">
              <table className="w-full">
                <thead className="bg-card">
                  <tr>
                    {t
                      .raw("section2.tableHeaders")
                      .map((th: string, i: number) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left font-bold text-text-primary"
                        >
                          {th}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-text-secondary">
                  {t
                    .raw("section2.tableRows")
                    .map((row: string[], i: number) => (
                      <tr key={i}>
                        {row.map((td, j) => (
                          <td key={j} className="px-4 py-3">
                            {td}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-4 space-y-2 font-body leading-relaxed text-text-secondary">
              {t.raw("section2.items").map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section3.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t.rich("section3.p1", richTags)}
            </p>
            <p className="mt-4 font-body font-bold text-text-primary">
              {t("section3.p2")}
            </p>
            <ul className="mt-2 space-y-2 font-body leading-relaxed text-text-secondary">
              {t.raw("section3.items").map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              {t.rich("section3.p3", richTags)}
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section4.title")}
            </h2>
            <ul className="space-y-2 font-body leading-relaxed text-text-secondary">
              {t.raw("section4.items").map((_: any, i: number) => (
                <li key={i} className="flex gap-2">
                  <span>•</span>
                  <span>{t.rich(`section4.items.${i}`, richTags)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section5.title")}
            </h2>
            <ul className="space-y-2 font-body leading-relaxed text-text-secondary">
              {t.raw("section5.items").map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section6.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t("section6.p1")}
            </p>
          </section>

          {/* 7 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section7.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t("section7.p1")}
            </p>
          </section>

          {/* 8 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              {t("section8.title")}
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              {t.rich("section8.p1", richTags)}
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
