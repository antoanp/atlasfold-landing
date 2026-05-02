import { Syne, Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LeadCaptureProvider } from "@/components/lead-capture/lead-capture-context";
import type { Metadata, Viewport } from "next";
import "../globals.css";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/next";
// Vercel Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/next";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-playfair-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/*
 * Pre-build one static HTML path per locale for [locale].
 * Pairs with setRequestLocale for correct copy at build time.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F0EB",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Atlas Fold", url: baseUrl }],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        bg: `${baseUrl}/bg`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/bg`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale}`,
      siteName: "Atlas Fold",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/images/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  /**
   * If the locale is not supported, return a 404 error.
   */
  if (!routing.locales.includes(locale as "bg" | "en")) {
    notFound();
  }

  /*
   * Custom `src/proxy.ts` instead of next-intl middleware.
   * Server componentsdo not get `x-next-intl-locale`, so they would fall back to defaultLocale (bg) unless we set the request locale from params.
   */
  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body
        className={`${syne.variable} ${playfair.variable} ${dmSans.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LeadCaptureProvider>{children}</LeadCaptureProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
