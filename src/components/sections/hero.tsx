'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/section-wrapper';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <SectionWrapper className="min-h-screen flex items-center py-0 lg:py-0">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block font-body text-sm text-success">
            ● {t('location')}
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight lg:text-7xl">
            {t('headline')}{' '}
            <span className="font-accent italic">{t('headlineAccent')}</span>
          </h1>
          <p className="mt-6 font-body text-lg font-semibold text-text-primary">
            {t('subheadline')}
          </p>
          <p className="mt-2 font-body text-base text-text-secondary">
            {t('subheadlineExtra')}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full bg-cta px-8 py-4 font-body font-medium text-white transition-colors hover:bg-cta/90"
            >
              {t('ctaPrimary')}
            </a>
            <a
              href="tel:+359881234567"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-4 font-body font-medium text-text-primary transition-colors hover:bg-gray-50"
            >
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-gray-200 pt-8 lg:justify-start">
        <div className="text-center">
          <span className="font-display text-3xl font-bold">{t('stats.clients')}</span>
          <p className="font-body text-sm text-text-secondary">{t('stats.clientsLabel')}</p>
        </div>
        <div className="text-center">
          <span className="font-display text-3xl font-bold">{t('stats.years')}</span>
          <p className="font-body text-sm text-text-secondary">{t('stats.yearsLabel')}</p>
        </div>
        <div className="text-center">
          <span className="font-display text-3xl font-bold">{t('stats.guarantee')}</span>
          <p className="font-body text-sm text-text-secondary">{t('stats.guaranteeLabel')}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
