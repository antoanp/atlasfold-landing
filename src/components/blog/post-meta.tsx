import { useLocale, useTranslations } from "next-intl";

type Props = {
  date: string;
  updated?: string | null;
  author: string;
  readingMinutes: number;
};

function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(iso));
}

/** Byline · published/updated date · reading time. */
export function PostMeta({ date, updated, author, readingMinutes }: Props) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const shown = updated ?? date;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-text-secondary">
      <span>{t("byline", { author })}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={shown}>
        {updated
          ? t("updatedOn", { date: formatDate(updated, locale) })
          : t("publishedOn", { date: formatDate(date, locale) })}
      </time>
      <span aria-hidden="true">·</span>
      <span>{t("readingTime", { minutes: readingMinutes })}</span>
    </div>
  );
}
