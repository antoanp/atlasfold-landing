import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";

  return [
    {
      url: `${baseUrl}/bg`,
      lastModified: new Date(),
      alternates: {
        languages: { bg: `${baseUrl}/bg`, en: `${baseUrl}/en` },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      alternates: {
        languages: { bg: `${baseUrl}/bg`, en: `${baseUrl}/en` },
      },
    },
  ];
}
