import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { PostMeta } from "@/lib/blog";

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));
}

export function ArticleCard({ post }: { post: PostMeta }) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const displayDate = post.date;

  return (
    <Link
      href={post.href}
      className="flex h-full flex-col rounded-2xl border border-gray-100 bg-card p-6 shadow-sm transition-colors hover:border-gray-200"
    >
      {post.tags[0] ? (
        <span className="inline-flex w-fit items-center rounded-full border border-gray-200 px-3 py-1 font-body text-xs text-text-secondary">
          {post.tags[0]}
        </span>
      ) : null}

      <h2 className="mt-4 font-display text-lg font-bold text-text-primary">{post.title}</h2>

      <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-text-secondary">
        {post.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs text-text-secondary">
        <time dateTime={displayDate}>{formatDate(displayDate, locale)}</time>
        <span aria-hidden="true">·</span>
        <span>{t("readingTime", { minutes: post.readingMinutes })}</span>
      </div>
    </Link>
  );
}
