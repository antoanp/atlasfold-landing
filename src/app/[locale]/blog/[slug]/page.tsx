import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";
import { Prose, proseComponents } from "@/components/blog/prose";
import { PostMeta } from "@/components/blog/post-meta";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ArticleJsonLd } from "@/components/blog/blog-json-ld";
import {
  getAdjacentPosts,
  getAlternates,
  getPost,
  getRelatedPosts,
  getStaticParams,
  getToc,
  isLocale,
  tagToSlug,
  type Locale,
} from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { paths } from "@/lib/paths";

type Props = { params: Promise<{ locale: string; slug: string }> };

const HUB = paths.blog.hub;
const BASE_URL = process.env.BASE_URL ?? "https://atlasfold.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticParams();
}

type MdxRemoteOptions = NonNullable<Parameters<typeof MDXRemote>[0]["options"]>;

const mdxOptions: MdxRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};

  const { meta } = post;
  const url = `${BASE_URL}${meta.href}`;
  const alt = getAlternates(meta.key);
  const languages: Record<string, string> = {};
  for (const [loc, href] of Object.entries(alt)) {
    if (href) languages[loc] = `${BASE_URL}${href}`;
  }
  if (alt.bg) languages["x-default"] = `${BASE_URL}${alt.bg}`;

  const image = meta.ogImage ? `${BASE_URL}${meta.ogImage}` : `${BASE_URL}/images/og-image.png`;

  return {
    title: `${meta.title} — Atlas Fold`,
    description: meta.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${meta.title} — Atlas Fold`,
      description: meta.description,
      url,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "article",
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [meta.author],
      tags: meta.tags,
      images: [{ url: image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} — Atlas Fold`,
      description: meta.description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  const post = getPost(locale, slug);
  if (!post) notFound();

  const { meta, body } = post;
  const t = await getTranslations({ locale, namespace: "blog" });

  const toc = getToc(body);
  const related = getRelatedPosts(locale, meta.key);
  const { older, newer } = getAdjacentPosts(locale, slug);

  const alt = getAlternates(meta.key);
  const switcherAlternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    switcherAlternates[loc] = alt[loc] ?? `/${loc}/${HUB}`;
  }

  return (
    <>
      <ArticleJsonLd post={meta} baseUrl={BASE_URL} />
      <Navbar localeAlternates={switcherAlternates} />
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
                  <Link href={`/${locale}`} className="transition-colors hover:text-text-primary">
                    {t("breadcrumbHome")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/${locale}/${HUB}`}
                    className="transition-colors hover:text-text-primary"
                  >
                    {t("breadcrumbBlog")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-text-primary">{meta.title}</li>
              </ol>
            </nav>

            {meta.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/${locale}/${HUB}/tema/${tagToSlug(tag)}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 font-body text-xs text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight lg:text-6xl">
              {meta.title}
            </h1>
            <p className="mt-6 font-body text-lg font-semibold text-text-primary">
              {meta.description}
            </p>
            <PostMeta
              date={meta.date}
              updated={meta.updated}
              author={meta.author}
              readingMinutes={meta.readingMinutes}
            />

            {meta.ogImage ? (
              <figure className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-card shadow-sm">
                <Image
                  src={meta.ogImage}
                  alt={meta.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full"
                  priority
                />
              </figure>
            ) : null}

            <TableOfContents items={toc} />

            <div className="mt-10">
              <Prose>
                <MDXRemote source={body} components={proseComponents} options={mdxOptions} />
              </Prose>
            </div>

            {/* CTA */}
            <LeadCtaSection namespace="blog" className="mt-16" />

            {/* Related */}
            {related.length > 0 ? (
              <section className="mt-14 border-t border-gray-200 pt-10">
                <h2 className="font-display text-lg font-bold text-text-primary">
                  {t("relatedTitle")}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={r.href}
                        className="font-body text-sm font-medium text-accent hover:underline"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Prev / next */}
            {older || newer ? (
              <nav className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-between">
                <div className="sm:max-w-[45%]">
                  {older ? (
                    <Link href={older.href} className="group block">
                      <span className="font-body text-xs uppercase tracking-wide text-text-secondary">
                        {t("prev")}
                      </span>
                      <span className="mt-1 block font-body text-sm font-medium text-text-primary group-hover:text-accent">
                        {older.title}
                      </span>
                    </Link>
                  ) : null}
                </div>
                <div className="sm:max-w-[45%] sm:text-right">
                  {newer ? (
                    <Link href={newer.href} className="group block">
                      <span className="font-body text-xs uppercase tracking-wide text-text-secondary">
                        {t("next")}
                      </span>
                      <span className="mt-1 block font-body text-sm font-medium text-text-primary group-hover:text-accent">
                        {newer.title}
                      </span>
                    </Link>
                  ) : null}
                </div>
              </nav>
            ) : null}

            <div className="mt-10">
              <Link
                href={`/${locale}/${HUB}`}
                className="font-body text-sm font-medium text-accent hover:underline"
              >
                ← {t("backToBlog")}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer localeAlternates={switcherAlternates} />
    </>
  );
}
