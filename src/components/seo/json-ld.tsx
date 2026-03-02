import { getTranslations } from 'next-intl/server';

type JsonLdProps = {
  locale: string;
};

export async function JsonLd({ locale }: JsonLdProps) {
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });

  const baseUrl = process.env.BASE_URL ?? 'https://localseo.bg';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: tFooter('nap.name'),
    description: tMeta('description'),
    url: `${baseUrl}/${locale}`,
    telephone: tFooter('nap.phone').replace(/\s/g, ''),
    email: tFooter('nap.email'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: tFooter('nap.street'),
      addressLocality: locale === 'bg' ? 'София' : 'Sofia',
      postalCode: '1000',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6977,
      longitude: 23.3219,
    },
    areaServed: {
      '@type': 'City',
      name: locale === 'bg' ? 'София' : 'Sofia',
    },
    priceRange: '$$',
  };

  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map((key) => ({
      '@type': 'Question',
      name: tFaq(`items.${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tFaq(`items.${key}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
