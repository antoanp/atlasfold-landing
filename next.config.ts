import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Old (pre-Latin-restructure) path → new path. Every entry gets a permanent 301
 * so indexed URLs, bookmarks, and external links consolidate onto the new
 * canonical paths. Keep this in sync with `src/lib/paths.ts`.
 */
const LEGACY_PATH_REDIRECTS: Record<string, string> = {
  "internet-marketing-service": "uslugi/internet-marketing-sofia",
  "marketing-agency": "uslugi/marketing-agenciya-sofia",
  "seo-optimization-sofia": "uslugi/seo-optimizaciya-sofia",
  "local-seo-sofia": "uslugi/lokalno-seo-sofia",
  "google-maps-ranking-sofia": "uslugi/google-maps-klasirane-sofia",
  "citation-building-sofia": "uslugi/izgrazhdane-citacii-sofia",
  "areas/lozenets": "rayoni/lozenets",
  "areas/mladost": "rayoni/mladost",
  "areas/lyulin": "rayoni/lyulin",
  "areas/iztok": "rayoni/iztok",
  faq: "chzvo",
  terms: "usloviya",
  privacy: "poveritelnost",
  cookie: "biskvitki",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(LEGACY_PATH_REDIRECTS).flatMap(
      ([oldPath, newPath]) => [
        // Locale-prefixed hits: /bg/local-seo-sofia -> /bg/uslugi/lokalno-seo-sofia
        {
          source: `/:locale(bg|en)/${oldPath}`,
          destination: `/:locale/${newPath}`,
          statusCode: 301,
        },
        // Locale-less hits: /local-seo-sofia -> /uslugi/lokalno-seo-sofia
        // (the proxy attaches the preferred locale on the follow-up request)
        {
          source: `/${oldPath}`,
          destination: `/${newPath}`,
          statusCode: 301,
        },
      ],
    );
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
