import { getTranslations } from "next-intl/server";

type FaqPageJsonLdProps = {
  locale: string;
};

const categoryKeys = ["basics", "service", "results", "pricing"] as const;
type CategoryKey = (typeof categoryKeys)[number];

const questionKeys: Record<CategoryKey, string[]> = {
  basics: ["q1", "q2", "q3"],
  service: ["q1", "q2", "q3", "q4"],
  results: ["q1", "q2", "q3", "q4"],
  pricing: ["q1", "q2", "q3", "q4"],
};

export async function FaqPageJsonLd({ locale }: FaqPageJsonLdProps) {
  const t = await getTranslations({ locale, namespace: "faqPage" });

  const mainEntity = categoryKeys.flatMap((category) =>
    questionKeys[category].map((qKey) => ({
      "@type": "Question",
      name: t(`categories.${category}.items.${qKey}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`categories.${category}.items.${qKey}.answer`),
      },
    })),
  );

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
    />
  );
}
