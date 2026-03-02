'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { cn } from '@/lib/cn';

export function Pricing() {
  const t = useTranslations('pricing');

  const tiers = ['minimum', 'standard', 'quarterly'] as const;

  return (
    <SectionWrapper id="pricing">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t('badge')}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t('title')}{' '}
          <span className="font-accent italic">{t('titleAccent')}</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier}
            className={cn(
              'flex flex-col rounded-2xl border bg-card p-8 shadow-sm',
              tier === 'standard'
                ? 'border-accent ring-1 ring-accent'
                : 'border-gray-100'
            )}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-1 font-body text-sm font-medium">
                {t(`tiers.${tier}.name`)}
              </span>
              {tier === 'quarterly' && (
                <span className="rounded-lg bg-success px-3 py-1 font-body text-sm font-medium text-white">
                  {t(`tiers.${tier}.saveBadge`)}
                </span>
              )}
            </div>
            <div className="mb-2">
              <span className="font-display text-3xl font-extrabold">
                {t(`tiers.${tier}.price`)}
              </span>
              <span className="font-body text-sm text-text-secondary">
                {' '}{t(`tiers.${tier}.period`)}
              </span>
            </div>
            <p className="font-body text-xs text-text-secondary">
              {t(`tiers.${tier}.commitment`)}
            </p>
            <p className="mt-4 font-body text-sm">
              {t(`tiers.${tier}.description`)}
            </p>
            {tier === 'minimum' && (
              <p className="font-body text-sm font-bold text-red-600">
                {t(`tiers.${tier}.noGuarantee`)}
              </p>
            )}
            <div className="my-4 rounded-lg bg-green-50 px-3 py-1.5 text-center">
              <span className="font-body text-xs text-green-700">
                {t(`tiers.${tier}.visibility`)}
              </span>
            </div>
            <ul className="mb-8 flex flex-col gap-2">
              {(t.raw(`tiers.${tier}.features`) as string[]).map(
                (feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm">
                    <span className="mt-0.5 text-text-secondary">•</span>
                    {feature}
                  </li>
                )
              )}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 font-body font-medium text-white transition-colors hover:bg-cta/90"
              >
                {t(`tiers.${tier}.cta`)}
              </a>
              <a
                href="tel:+359881234567"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-body font-medium text-text-primary transition-colors hover:bg-gray-50"
              >
                {t(`tiers.${tier}.ctaCall`)}
              </a>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
