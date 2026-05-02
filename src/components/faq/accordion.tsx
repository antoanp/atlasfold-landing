"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const categoryKeys = ["basics", "service", "results", "pricing"] as const;
type CategoryKey = (typeof categoryKeys)[number];

const questionKeys: Record<CategoryKey, string[]> = {
  basics: ["q1", "q2", "q3"],
  service: ["q1", "q2", "q3", "q4"],
  results: ["q1", "q2", "q3", "q4"],
  pricing: ["q1", "q2", "q3", "q4"],
};

type OpenKey = `${CategoryKey}-${string}` | null;

export function FaqPageAccordion() {
  const t = useTranslations("faqPage");
  const [openKey, setOpenKey] = useState<OpenKey>(null);

  const toggle = (key: OpenKey) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      {categoryKeys.map((category, catIndex) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: catIndex * 0.1 }}
        >
          <h2 className="mb-5 font-display text-xl font-bold text-text-primary">
            {t(`categories.${category}.title`)}
          </h2>
          <div className="flex flex-col gap-3">
            {questionKeys[category].map((qKey) => {
              const itemKey: OpenKey = `${category}-${qKey}`;
              const isOpen = openKey === itemKey;

              return (
                <div
                  key={qKey}
                  className="rounded-2xl border border-gray-100 bg-card shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggle(itemKey)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-body text-base font-medium text-text-primary">
                      {t(`categories.${category}.items.${qKey}.question`)}
                    </span>
                    <span className="ml-4 shrink-0 text-xl text-text-secondary">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 font-body text-sm leading-relaxed text-text-secondary">
                          {t(
                            `categories.${category}.items.${qKey}.answer`,
                          )}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
