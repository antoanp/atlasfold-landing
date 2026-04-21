import type { MetadataRoute } from "next";

type LocalePath = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "yearly";
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const now = new Date();

  const paths: LocalePath[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    {
      path: "/seo-optimization-sofia",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    {
      path: "/internet-marketing-service",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/marketing-agency", priority: 0.8, changeFrequency: "monthly" },
    { path: "/areas/lozenets", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookie", priority: 0.3, changeFrequency: "yearly" },
  ];

  const locales = ["bg", "en"] as const;

  return paths.flatMap(({ path, priority, changeFrequency }) =>
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
}
