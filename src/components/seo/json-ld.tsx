import { getTranslations } from "next-intl/server";

type JsonLdProps = {
  locale: string;
};

export async function JsonLd({ locale }: JsonLdProps) {
  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const baseUrl = process.env.BASE_URL ?? "https://atlasfold.com";
  const phone = tFooter("nap.phone").replace(/\s/g, "");

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    name: tFooter("nap.name"),
    description: tMeta("description"),
    url: `${baseUrl}/${locale}`,
    telephone: phone,
    email: tFooter("nap.email"),
    image: `${baseUrl}/images/og-image.png`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: tFooter("nap.street"),
      addressLocality: locale === "bg" ? "София" : "Sofia",
      postalCode: "1000",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.6977,
      longitude: 23.3219,
    },
    hasMap: "https://www.google.com/maps?q=AtlasFold,+Vitosha+Blvd+100,+Sofia",
    areaServed: {
      "@type": "City",
      name: locale === "bg" ? "София" : "Sofia",
    },
    priceRange: "$$",
    sameAs: [], // TODO: Add social media links - add the actual links from the GBP
  };

  const faqKeys = ["q1", "q2", "q3", "q4", "q5"] as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: tFaq(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`items.${key}.answer`),
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "AtlasFold",
    inLanguage: ["bg", "en"],
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "AtlasFold",
    url: baseUrl,
    logo: `${baseUrl}/images/icon-512.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "BG",
      availableLanguage: ["Bulgarian", "English"],
    },
    sameAs: [], // TODO: Add social media links - add the actual links from the GBP
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
