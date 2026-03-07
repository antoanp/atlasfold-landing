import { headers } from "next/headers";

/**
 * Reads visitor city/country from platform-injected geo headers.
 * Supported: Vercel (x-vercel-ip-*), Cloudflare (cf-ipcity/cf-ipcountry).
 * Returns a locale-aware string like "Sofia, Bulgaria" or null when
 * headers are unavailable (local dev, unsupported host).
 */
export async function getVisitorLocation(
  locale: string,
): Promise<string | null> {
  const h = await headers();

  const rawCity = h.get("x-vercel-ip-city") ?? h.get("cf-ipcity");
  const countryCode = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry");

  if (!rawCity && !countryCode) return null;

  const city = rawCity ? decodeURIComponent(rawCity) : null;

  let country: string | undefined;
  if (countryCode) {
    try {
      country = new Intl.DisplayNames([locale], { type: "region" }).of(
        countryCode,
      );
    } catch {
      country = countryCode;
    }
  }

  if (city && country) return `${city}, ${country}`;
  if (city) return city;
  if (country) return country;
  return null;
}
