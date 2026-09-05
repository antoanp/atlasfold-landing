import Link from "next/link";

/**
 * Static, locale-neutral 404 for unknown article slugs. Deliberately free of
 * `next-intl` request hooks and the shared Navbar/Footer — those read `headers()`
 * and would opt the whole `blog/[slug]` route out of static generation.
 */
export default function BlogArticleNotFound() {
  return (
    <main className="min-h-screen bg-page">
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-display text-6xl font-extrabold text-text-primary">404</p>
        <p className="mt-4 font-body text-base text-text-secondary">
          Тази статия не съществува. / This article doesn’t exist.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center rounded-full bg-cta px-6 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Към блога / Back to the blog
        </Link>
      </section>
    </main>
  );
}
