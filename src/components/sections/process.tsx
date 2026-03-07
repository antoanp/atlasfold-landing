"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Process() {
  const t = useTranslations("process");

  const steps = ["step1", "step2", "step3", "step4"] as const;

  return (
    <SectionWrapper id="process">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")}{" "}
          <span className="font-accent italic">{t("titleAccent")}</span>
        </h2>
      </div>
      <div className="mt-12 flex flex-col gap-4">
        {steps.map((step) => (
          <div
            key={step}
            className="rounded-2xl border border-gray-100 bg-card px-6 py-5 shadow-sm"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-display text-sm font-bold text-text-secondary">
                {t(`steps.${step}.number`)}
              </span>
              <span className="font-display text-base font-bold">
                {t(`steps.${step}.title`)}
              </span>
              <span className="hidden font-body text-sm text-text-secondary sm:inline">
                {t(`steps.${step}.description`)}
              </span>
            </div>
            <p className="mt-2 font-body text-sm text-text-secondary sm:hidden">
              {t(`steps.${step}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
