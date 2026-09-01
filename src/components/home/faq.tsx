"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { paths, localePath } from "@/lib/paths";

export function Faq() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = ["q1", "q2", "q3", "q4", "q5"] as const;

  return (
    <SectionWrapper id="faq">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")}{" "}
          <span className="font-accent italic">{t("titleAccent")}</span>
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
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
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

      <div className="mt-10 flex justify-center">
        <Link
          href={localePath(locale, paths.legal.faq)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 font-body text-sm font-medium text-text-secondary transition-colors hover:border-gray-300 hover:text-text-primary"
        >
          {t("seeAllFaq")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}
