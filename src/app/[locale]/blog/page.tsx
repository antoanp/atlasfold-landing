import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogIndexJsonLd } from "@/components/blog/blog-json-ld";
import { getAllPosts, getTagSummaries, isLocale, type Locale } from "@/lib/blog";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string }> };

const HUB = paths.blog.hub;

function baseUrl() {
  return process.env.BASE_URL ?? "https://atlasfold.com";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const url = `${baseUrl()}/${locale}/${HUB}`;

  return {
    title: `${t("indexTitle")} — Atlas Fold`,
    description: t("indexTagline"),
    alternates: {
      canonical: url,
      languages: {
        bg: `${baseUrl()}/bg/${HUB}`,
        en: `${baseUrl()}/en/${HUB}`,
        "x-default": `${baseUrl()}/bg/${HUB}`,
      },
    },
    openGraph: {
      title: `${t("indexTitle")} — Atlas Fold`,
      description: t("indexTagline"),
      url,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
      images: [{ url: `${baseUrl()}/images/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("indexTitle")} — Atlas Fold`,
      description: t("indexTagline"),
      images: [`${baseUrl()}/images/og-image.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "bg";
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);
  const tags = getTagSummaries(locale);

  return (
    <>
      <BlogIndexJsonLd posts={posts} baseUrl={baseUrl()} />
      <Navbar />
      <main className="min-h-screen bg-page">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Editorial hero */}
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
              {t("indexEyebrow")}
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              {t("indexTitle")}
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary">
              {t("indexTagline")}
            </p>

            {tags.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link
                      href={`/${locale}/${HUB}/tema/${tag.slug}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 font-body text-xs text-text-secondary transition-colors hover:border-gray-300 hover:text-text-primary"
                    >
                      {tag.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Grid */}
            {posts.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <ArticleCard key={`${post.key}-${post.locale}`} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-12 font-body text-base text-text-secondary">{t("emptyState")}</p>
            )}

            {/* CTA */}
            <LeadCtaSection namespace="blog" className="mt-16" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
