import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { routing } from "@/i18n/routing";
import { paths } from "@/lib/paths";

/**
 * Filesystem-backed blog data layer — the single source of truth for posts.
 *
 * Content lives in `content/blog/<post-key>/{bg,en}.mdx`. The `<post-key>` is a
 * stable internal directory name and never appears in a URL; the URL slug comes
 * from each locale file's front-matter (`slug`), so the Bulgarian and English
 * versions of a post can have different keyword slugs.
 *
 * Everything here runs at build time (SSG). No caching library — the module
 * memoises its single filesystem read.
 */

export type Locale = (typeof routing.locales)[number];

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const IS_PROD = process.env.NODE_ENV === "production";
const WORDS_PER_MINUTE = 200;
const LOCALES = routing.locales as readonly Locale[];

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type PostMeta = {
  /** Stable directory key, shared across locales. Not shown in URLs. */
  key: string;
  locale: Locale;
  /** Per-locale, URL-visible slug (Latin-transliterated keyword phrase). */
  slug: string;
  title: string;
  description: string;
  /** ISO date string. */
  date: string;
  /** ISO date string or null. */
  updated: string | null;
  tags: string[];
  /** Absolute-from-root image path (e.g. `/images/blog/foo/hero.webp`) or null. */
  ogImage: string | null;
  author: string;
  draft: boolean;
  readingMinutes: number;
  /** `/{locale}/blog/{slug}` */
  href: string;
};

export type LoadedPost = {
  meta: PostMeta;
  /** MDX body with front-matter stripped. */
  body: string;
};

type RawFrontmatter = Record<string, unknown>;

function req(fm: RawFrontmatter, field: string, file: string): string {
  const value = fm[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[blog] "${file}" is missing required front-matter "${field}"`);
  }
  return value.trim();
}

function optDate(fm: RawFrontmatter, field: string, file: string): string | null {
  const value = fm[field];
  if (value == null || value === "") return null;
  const iso = value instanceof Date ? value.toISOString() : String(value);
  if (Number.isNaN(Date.parse(iso))) {
    throw new Error(`[blog] "${file}" has an invalid date in "${field}": ${String(value)}`);
  }
  return iso;
}

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // drop fenced code
    .replace(/<[^>]+>/g, " ") // drop JSX/HTML tags
    .replace(/[#>*_~`|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

let cache: Map<string, Partial<Record<Locale, LoadedPost>>> | null = null;

function loadAll(): Map<string, Partial<Record<Locale, LoadedPost>>> {
  if (cache && IS_PROD) return cache;

  const result = new Map<string, Partial<Record<Locale, LoadedPost>>>();
  const seenSlugs: Record<Locale, Map<string, string>> = Object.fromEntries(
    LOCALES.map((l) => [l, new Map<string, string>()]),
  ) as Record<Locale, Map<string, string>>;

  if (!fs.existsSync(CONTENT_DIR)) {
    cache = result;
    return result;
  }

  const keys = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const key of keys) {
    const perLocale: Partial<Record<Locale, LoadedPost>> = {};

    for (const locale of LOCALES) {
      const file = path.join(CONTENT_DIR, key, `${locale}.mdx`);
      if (!fs.existsSync(file)) continue;

      const rel = `content/blog/${key}/${locale}.mdx`;
      const parsed = matter(fs.readFileSync(file, "utf8"));
      const fm = parsed.data as RawFrontmatter;

      const slug = req(fm, "slug", rel);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`[blog] "${rel}" slug must be kebab-case ASCII: got "${slug}"`);
      }
      const slugOwner = seenSlugs[locale].get(slug);
      if (slugOwner && slugOwner !== key) {
        throw new Error(
          `[blog] duplicate ${locale} slug "${slug}" in "${key}" and "${slugOwner}"`,
        );
      }
      seenSlugs[locale].set(slug, key);

      const date = optDate(fm, "date", rel);
      if (!date) throw new Error(`[blog] "${rel}" is missing required front-matter "date"`);

      const tags = Array.isArray(fm.tags)
        ? fm.tags.map((t) => String(t).trim()).filter(Boolean)
        : [];
      const ogImage =
        typeof fm.ogImage === "string" && fm.ogImage.trim() !== ""
          ? fm.ogImage.trim()
          : null;

      const meta: PostMeta = {
        key,
        locale,
        slug,
        title: req(fm, "title", rel),
        description: req(fm, "description", rel),
        date,
        updated: optDate(fm, "updated", rel),
        tags,
        ogImage,
        author: typeof fm.author === "string" && fm.author.trim() ? fm.author.trim() : "Atlas Fold",
        draft: fm.draft === true,
        readingMinutes: Math.max(1, Math.round(countWords(parsed.content) / WORDS_PER_MINUTE)),
        href: `/${locale}/${paths.blog.hub}/${slug}`,
      };

      perLocale[locale] = { meta, body: parsed.content };
    }

    if (Object.keys(perLocale).length > 0) result.set(key, perLocale);
  }

  cache = result;
  return result;
}

function visible(post: LoadedPost): boolean {
  return !IS_PROD || !post.meta.draft;
}

function byDateDesc(a: PostMeta, b: PostMeta): number {
  return Date.parse(b.date) - Date.parse(a.date);
}

/** All publishable posts for a locale, newest first. */
export function getAllPosts(locale: Locale): PostMeta[] {
  const out: PostMeta[] = [];
  for (const perLocale of loadAll().values()) {
    const post = perLocale[locale];
    if (post && visible(post)) out.push(post.meta);
  }
  return out.sort(byDateDesc);
}

/** Resolve a locale + URL slug to a loaded post, or null. */
export function getPost(locale: Locale, slug: string): LoadedPost | null {
  for (const perLocale of loadAll().values()) {
    const post = perLocale[locale];
    if (post && post.meta.slug === slug && visible(post)) return post;
  }
  return null;
}

/** Which locales a post (by key) is published in. */
export function getPostLocales(key: string): Locale[] {
  const perLocale = loadAll().get(key);
  if (!perLocale) return [];
  return LOCALES.filter((l) => {
    const p = perLocale[l];
    return p != null && visible(p);
  });
}

/** Locale-prefixed hrefs for every locale a post exists in. Drives hreflang + the switcher. */
export function getAlternates(key: string): Partial<Record<Locale, string>> {
  const perLocale = loadAll().get(key);
  const out: Partial<Record<Locale, string>> = {};
  if (!perLocale) return out;
  for (const locale of LOCALES) {
    const p = perLocale[locale];
    if (p && visible(p)) out[locale] = p.meta.href;
  }
  return out;
}

/** `{ locale, slug }` params for `generateStaticParams` — only valid combinations. */
export function getStaticParams(): { locale: Locale; slug: string }[] {
  const out: { locale: Locale; slug: string }[] = [];
  for (const perLocale of loadAll().values()) {
    for (const locale of LOCALES) {
      const p = perLocale[locale];
      if (p && visible(p)) out.push({ locale, slug: p.meta.slug });
    }
  }
  return out;
}

const BG_TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s",
  т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht",
  ъ: "a", ь: "y", ю: "yu", я: "ya",
};

/**
 * ASCII, kebab-case URL segment for a tag. Cyrillic is transliterated (matching
 * the site's Latin-slug convention); non-ASCII dynamic params do not resolve
 * reliably under `dynamicParams = false`.
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .split("")
    .map((ch) => BG_TRANSLIT[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type TagSummary = { slug: string; label: string; count: number };

/** Tags in a locale with their URL slug and post count. */
export function getTagSummaries(locale: Locale): TagSummary[] {
  const counts = new Map<string, number>();
  for (const meta of getAllPosts(locale)) {
    for (const tag of meta.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ slug: tagToSlug(label), label, count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/** Resolve a tag URL slug back to its display label for a locale. */
export function getTagBySlug(locale: Locale, slug: string): string | null {
  return getTagSummaries(locale).find((t) => t.slug === slug)?.label ?? null;
}

/** Older / newer neighbours of a post within the same locale (by date). */
export function getAdjacentPosts(
  locale: Locale,
  slug: string,
): { older: PostMeta | null; newer: PostMeta | null } {
  const posts = getAllPosts(locale); // newest first
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { older: null, newer: null };
  return {
    newer: i > 0 ? posts[i - 1] : null,
    older: i < posts.length - 1 ? posts[i + 1] : null,
  };
}

/** Posts sharing the most tags with the given post, newest first. */
export function getRelatedPosts(locale: Locale, key: string, limit = 3): PostMeta[] {
  const self = loadAll().get(key)?.[locale]?.meta;
  if (!self) return [];
  const selfTags = new Set(self.tags);
  return getAllPosts(locale)
    .filter((p) => p.key !== key)
    .map((p) => ({ p, overlap: p.tags.filter((t) => selfTags.has(t)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

export type TocItem = { depth: 2 | 3; text: string; id: string };

/**
 * Table-of-contents entries from an MDX body's `##` / `###` headings. Ids match
 * what `rehype-slug` (github-slugger) produces at render time.
 */
export function getToc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").trim();
    items.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return items;
}

export { isLocale };
