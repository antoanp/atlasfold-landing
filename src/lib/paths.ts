/**
 * Central registry of every localized route path — the single source of truth.
 *
 * Values are locale-less path strings with no leading slash. Build an internal
 * link with `localePath(locale, paths.services.localSeo)` and an absolute
 * canonical/OpenGraph URL with `` `${baseUrl}/${locale}/${paths.services.localSeo}` ``.
 *
 * When a path changes here, also add the old → new pair to the `redirects()`
 * map in `next.config.ts` so indexed URLs and bookmarks keep resolving.
 */
export const paths = {
  services: {
    internetMarketing: "uslugi/internet-marketing-sofia",
    marketingAgency: "uslugi/marketing-agenciya-sofia",
    seoOptimization: "uslugi/seo-optimizaciya-sofia",
    localSeo: "uslugi/lokalno-seo-sofia",
    googleMapsRanking: "uslugi/google-maps-klasirane-sofia",
    citationBuilding: "uslugi/izgrazhdane-citacii-sofia",
  },
  areas: {
    hub: "rayoni",
    lozenets: "rayoni/lozenets",
    mladost: "rayoni/mladost",
    lyulin: "rayoni/lyulin",
    iztok: "rayoni/iztok",
  },
  legal: {
    faq: "chzvo",
    terms: "usloviya",
    privacy: "poveritelnost",
    cookie: "biskvitki",
  },
  blog: {
    hub: "blog",
  },
} as const;

/** Prefix a registry path with a locale segment: `("bg", "chzvo") -> "/bg/chzvo"`. */
export function localePath(locale: string, path: string) {
  return `/${locale}/${path}`;
}
