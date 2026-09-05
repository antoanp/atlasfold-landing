import type { MetadataRoute } from "next";
import { paths } from "@/lib/paths";
import { getAllPosts, getAlternates } from "@/lib/blog";
import { routing } from "@/i18n/routing";

type LocalePath = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const now = new Date();

  const localePaths: LocalePath[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    {
      path: `/${paths.services.seoOptimization}`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.services.localSeo}`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.services.googleMapsRanking}`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.services.citationBuilding}`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.services.internetMarketing}`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.services.marketingAgency}`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.areas.lozenets}`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      path: `/${paths.areas.mladost}`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    { path: `/${paths.areas.lyulin}`, priority: 0.7, changeFrequency: "monthly" },
    { path: `/${paths.areas.iztok}`, priority: 0.7, changeFrequency: "monthly" },
    { path: `/${paths.blog.hub}`, priority: 0.7, changeFrequency: "monthly" },
    { path: `/${paths.legal.faq}`, priority: 0.6, changeFrequency: "yearly" },
    { path: `/${paths.legal.terms}`, priority: 0.3, changeFrequency: "yearly" },
    {
      path: `/${paths.legal.privacy}`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
    { path: `/${paths.legal.cookie}`, priority: 0.3, changeFrequency: "yearly" },
  ];

  const locales = routing.locales;

  const staticEntries: MetadataRoute.Sitemap = localePaths.flatMap(
    ({ path, priority, changeFrequency }) =>
      locales.map((locale, localeIndex) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        // Slight priority penalty for non-default locale (en)
        priority: localeIndex === 0 ? priority : Math.max(0.1, priority - 0.1),
        alternates: {
          languages: {
            bg: `${baseUrl}/bg${path}`,
            en: `${baseUrl}/en${path}`,
          },
        },
      })),
  );

  // Blog posts — per-locale slugs, only the locales each post is published in.
  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => {
      const alt = getAlternates(post.key);
      const languages: Record<string, string> = {};
      for (const [loc, href] of Object.entries(alt)) {
        if (href) languages[loc] = `${baseUrl}${href}`;
      }
      return {
        url: `${baseUrl}${post.href}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly" as const,
        priority: locale === routing.defaultLocale ? 0.6 : 0.5,
        alternates: { languages },
      };
    }),
  );

  return [...staticEntries, ...blogEntries];
}
