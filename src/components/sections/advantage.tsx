"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Advantage() {
  const t = useTranslations("advantage");

  const cards = ["visibility", "free", "longTerm"] as const;

  return (
    <SectionWrapper id="advantage">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")}{" "}
          <span className="font-accent italic">{t("titleAccent")}</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map((key) => (
          <div
            key={key}
            className="rounded-2xl border border-gray-100 bg-card p-8 shadow-sm"
          >
            <h3 className="mt-4 font-display text-lg font-bold">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
              {t(`cards.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
