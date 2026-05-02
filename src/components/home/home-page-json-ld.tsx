import { getTranslations } from "next-intl/server";

type HomePageJsonLdProps = {
  locale: string;
};

export async function HomePageJsonLd({ locale }: HomePageJsonLdProps) {
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
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "bg" ? "София" : "Sofia",
      postalCode: "1000",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.663928011509284,
      longitude: 23.383548712427974,
    },
    hasMap: "https://maps.app.goo.gl/ynCKiC9FJ1ockwUs8",
    areaServed: [
      { "@type": "City", name: locale === "bg" ? "София" : "Sofia" },
      ...(locale === "bg"
        ? [
            "Искър",
            "Изток",
            "Линден",
            "Средец",
            "Изгрев",
            "Люлин",
            "Младост",
            "Витоша",
            "Панчарево",
            "Подуяне",
            "Лозенец",
            "Студентски град",
            "Орландовци-Сердика",
            "Иван Вазов-Триадица",
            "Докторска градина-Оборище",
            "Гео Милев",
            "Смърдана-Красна поляна",
            "Красно село",
            "Овча купел",
          ]
        : [
            "Iskar",
            "Iztok",
            "Linden",
            "Sredets",
            "Izgrev",
            "Lyulin",
            "Mladost",
            "Vitosha",
            "Pancharevo",
            "Poduyane",
            "Lozenets",
            "Studentski grad",
            "Orlandovtsi-Serdika",
            "Ivan Vazov-Triaditsa",
            "Doctor's Garden-Oborishte",
            "Geo Milev",
            "Smardana-Krasna polyana",
            "Krasno selo",
            "Ovcha kupel",
          ]
      ).map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/atlas.fold/"],
    knowsAbout: [
      "Local SEO",
      "Google Maps ranking",
      "Google Business Profile optimisation",
      "Internet marketing service",
      "Marketing agency",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Internet Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Maps Ranking",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Business Profile Optimisation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "On-Page SEO",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local Citations Building",
          },
        },
      ],
    },
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
    name: "Atlas Fold",
    inLanguage: ["bg", "en"],
    publisher: { "@id": `${baseUrl}/#organization` },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Atlas Fold",
    url: baseUrl,
    logo: `${baseUrl}/images/icon-512.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "BG",
      availableLanguage: ["Bulgarian", "English"],
    },
    sameAs: ["https://www.instagram.com/atlas.fold/"],
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
