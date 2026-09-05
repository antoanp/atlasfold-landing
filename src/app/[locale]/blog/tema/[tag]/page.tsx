import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArticleCard } from "@/components/blog/article-card";
import {
  getAllPosts,
  getTagBySlug,
  getTagSummaries,
  isLocale,
  type Locale,
} from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string; tag: string }> };

const HUB = paths.blog.hub;
const BASE_URL = process.env.BASE_URL ?? "https://atlasfold.com";

export const dynamicParams = false;

export function generateStaticParams() {
  const out: { locale: Locale; tag: string }[] = [];
  for (const locale of routing.locales) {
    for (const { slug } of getTagSummaries(locale)) out.push({ locale, tag: slug });
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale)) return {};
  const label = getTagBySlug(locale, tag);
  if (!label) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  const count = getAllPosts(locale).filter((p) => p.tags.includes(label)).length;

  return {
    title: `${label} — ${t("indexTitle")} — Atlas Fold`,
    description: t("indexTagline"),
    alternates: { canonical: `${BASE_URL}/${locale}/${HUB}/tema/${tag}` },
    robots: { index: count >= 2, follow: true },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { locale: rawLocale, tag } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const label = getTagBySlug(locale, tag);
  if (!label) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale).filter((p) => p.tags.includes(label));
  if (posts.length === 0) notFound();

  // Tags have no cross-locale mapping — send the switcher to each locale's hub.
  const hubAlternates = { bg: `/bg/${HUB}`, en: `/en/${HUB}` };

  return (
    <>
      <Navbar localeAlternates={hubAlternates} />
      <main className="min-h-screen bg-page">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
              {t("tagLabel")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              {label}
            </h1>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={`${post.key}-${post.locale}`} post={post} />
              ))}
            </div>

            <div className="mt-12">
              <Link
                href={`/${locale}/${HUB}`}
                className="font-body text-sm font-medium text-accent hover:underline"
              >
                ← {t("backToBlog")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer localeAlternates={hubAlternates} />
    </>
  );
}
