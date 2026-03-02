'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/section-wrapper';

export function Faq() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  return (
    <SectionWrapper id="faq">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t('badge')}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t('title')}{' '}
          <span className="font-accent italic">{t('titleAccent')}</span>
        </h2>
      </div>
      <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
        {questions.map((key, index) => (
          <div
            key={key}
            className="rounded-2xl border border-gray-100 bg-card shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-body text-base font-medium">
                {t(`items.${key}.question`)}
              </span>
              <span className="ml-4 shrink-0 text-xl text-text-secondary">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 font-body text-sm leading-relaxed text-text-secondary">
                    {t(`items.${key}.answer`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
