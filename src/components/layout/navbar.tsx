'use client';

import { useTranslations } from 'next-intl';

export function Navbar() {
  const t = useTranslations('nav');

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <span className="font-display text-xl font-bold">{t('logo')}</span>
        <div className="hidden items-center gap-8 font-body text-sm md:flex">
          <a href="#advantage" className="text-text-secondary hover:text-text-primary">
            {t('links.advantage')}
          </a>
          <a href="#before-after" className="text-text-secondary hover:text-text-primary">
            {t('links.beforeAfter')}
          </a>
          <a href="#process" className="text-text-secondary hover:text-text-primary">
            {t('links.process')}
          </a>
          <a href="#faq" className="text-text-secondary hover:text-text-primary">
            {t('links.faq')}
          </a>
          <a href="#pricing" className="text-text-secondary hover:text-text-primary">
            {t('links.pricing')}
          </a>
        </div>
        <a
          href={`tel:${t('phone')}`}
          className="hidden items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-medium text-white sm:inline-flex"
        >
          {t('phoneCta')}
        </a>
      </div>
    </nav>
  );
}
