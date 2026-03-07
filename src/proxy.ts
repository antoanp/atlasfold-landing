import { type NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["bg", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];
const FALLBACK_LOCALE: Locale = "en";

function isSupportedLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return FALLBACK_LOCALE;

  const entries = header.split(",").map((part) => {
    const [code, q] = part.trim().split(";q=");
    return { code: code.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
  });
  entries.sort((a, b) => b.q - a.q);

  for (const { code } of entries) {
    if (isSupportedLocale(code)) return code;
    const prefix = code.split("-")[0];
    if (isSupportedLocale(prefix)) return prefix;
  }

  return FALLBACK_LOCALE;
}

/**
 * Scenarios:
 * URL Visited: / -> Rewrite internally to the browser preferred locale, but without a URL prefix.
 * URL Visited: /en -> Pass through to the English version.
 * URL Visited: /bg -> Pass through to the Bulgarian version.
 * URL Visited: /fr -> Redirect to the fallback locale (en) since we don't support French.
 * URL Visited: /BG -> Redirect to the bg version.
 * If the browser's preferred locale is not supported, redirect to the fallback locale (en).
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);

  const first = segments[0];
  const firstLower = first?.toLowerCase();

  if (firstLower && isSupportedLocale(firstLower)) {
    if (first !== firstLower) {
      const url = request.nextUrl.clone();
      url.pathname = `/${firstLower}${segments.length > 1 ? "/" + segments.slice(1).join("/") : ""}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const preferred = getPreferredLocale(request);

  if (firstLower && /^[a-z]{2}$/.test(firstLower)) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${rest ? `/${rest}` : ""}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
