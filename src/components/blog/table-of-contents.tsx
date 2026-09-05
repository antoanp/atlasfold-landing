import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/blog";

/**
 * Static table of contents. Rendered only when a post has at least 3 `##`
 * headings (the caller enforces the threshold). No client JS — plain anchors to
 * `rehype-slug` ids; `scroll-mt-24` on the headings offsets the sticky navbar.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const t = useTranslations("blog");
  if (items.length < 3) return null;

  return (
    <nav
      aria-label={t("tocTitle")}
      className="mt-10 rounded-2xl border border-gray-100 bg-card p-6 shadow-sm"
    >
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-text-secondary">
        {t("tocTitle")}
      </p>
      <ol className="mt-4 space-y-2 font-body text-sm">
        {items.map((item, i) => (
          <li key={`${item.id}-${i}`} className={cn(item.depth === 3 && "pl-4")}>
            <a
              href={`#${item.id}`}
              className="text-text-secondary transition-colors hover:text-accent"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
