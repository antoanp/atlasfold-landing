import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";

  return [
    {
      url: `${baseUrl}/bg`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { bg: `${baseUrl}/bg`, en: `${baseUrl}/en` },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { bg: `${baseUrl}/bg`, en: `${baseUrl}/en` },
      },
    },
    {
      url: `${baseUrl}/bg/faq`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: {
        languages: { bg: `${baseUrl}/bg/faq`, en: `${baseUrl}/en/faq` },
      },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: {
        languages: { bg: `${baseUrl}/bg/faq`, en: `${baseUrl}/en/faq` },
      },
    },
    {
      url: `${baseUrl}/bg/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/terms`, en: `${baseUrl}/en/terms` },
      },
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/terms`, en: `${baseUrl}/en/terms` },
      },
    },
    {
      url: `${baseUrl}/bg/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/privacy`, en: `${baseUrl}/en/privacy` },
      },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/privacy`, en: `${baseUrl}/en/privacy` },
      },
    },
    {
      url: `${baseUrl}/bg/cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/cookie`, en: `${baseUrl}/en/cookie` },
      },
    },
    {
      url: `${baseUrl}/en/cookie`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: { bg: `${baseUrl}/bg/cookie`, en: `${baseUrl}/en/cookie` },
      },
    },
  ];
}
