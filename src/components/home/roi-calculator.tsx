"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { LeadCtaSection } from "@/components/lead-capture/lead-cta-section";
import { cn } from "@/lib/cn";
import {
  SECTORS,
  CITY_SIZES,
  CONVERSION_OPTIONS,
  DEFAULT_INPUT,
  calcRoi,
  formatCount,
  formatEur,
  type RoiInput,
  type Sector,
  type CitySize,
  type ConversionRate,
} from "@/lib/roi-calculator";

const fieldClass =
  "rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent";

export function RoiCalculator() {
  const t = useTranslations("roiCalculator");
  const locale = useLocale();
  const [input, setInput] = useState<RoiInput>(DEFAULT_INPUT);

  const result = calcRoi(input);

  const metrics: {
    key: string;
    value: string;
    tone?: "success" | "danger";
    wide?: boolean;
  }[] = [
    { key: "searches", value: formatCount(result.searches) },
    { key: "clicks", value: formatCount(result.clicks) },
    { key: "calls", value: formatCount(result.calls) },
    { key: "jobs", value: formatCount(result.jobs), tone: "success", wide: true },
    {
      key: "monthlyRevenue",
      value: formatEur(result.monthlyRevenue, locale),
      tone: "success",
      wide: true,
    },
    {
      key: "yearlyRevenue",
      value: formatEur(result.yearlyRevenue, locale),
      tone: "danger",
      wide: true,
    },
  ];

  return (
    <SectionWrapper id="roi-calculator">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")} <span className="font-accent italic">{t("titleAccent")}</span>
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base text-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-100 bg-card p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="roi-sector"
              className="font-body text-sm font-medium text-text-primary"
            >
              {t("inputs.sector")}
            </label>
            <select
              id="roi-sector"
              value={input.sector}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, sector: e.target.value as Sector }))
              }
              className={cn(fieldClass, "cursor-pointer")}
            >
              {SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {t(`sectors.${sector}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label
              htmlFor="roi-city-size"
              className="font-body text-sm font-medium text-text-primary"
            >
              {t("inputs.citySize")}
            </label>
            <select
              id="roi-city-size"
              value={input.citySize}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  citySize: e.target.value as CitySize,
                }))
              }
              className={cn(fieldClass, "cursor-pointer")}
            >
              {CITY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {t(`citySizes.${size}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="roi-conversion"
              className="font-body text-sm font-medium text-text-primary"
            >
              {t("inputs.conversion")}
            </label>
            <select
              id="roi-conversion"
              value={input.conversionRate}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  conversionRate: Number(e.target.value) as ConversionRate,
                }))
              }
              className={cn(fieldClass, "cursor-pointer")}
            >
              {CONVERSION_OPTIONS.map((option) => (
                <option key={option.labelKey} value={option.value}>
                  {t(`conversions.${option.labelKey}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="roi-value"
              className="font-body text-sm font-medium text-text-primary"
            >
              {t("inputs.value")}
            </label>
            <input
              id="roi-value"
              type="number"
              min={50}
              max={50000}
              step={50}
              value={input.avgClientValue}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  avgClientValue: Number(e.target.value) || 0,
                }))
              }
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className={cn(
                "rounded-xl bg-gray-50 p-4 text-center",
                metric.wide && "col-span-3 sm:col-span-1",
              )}
            >
              <p className="font-body text-xs font-medium uppercase tracking-wide text-text-secondary">
                {t(`outputs.${metric.key}`)}
              </p>
              <p
                className={cn(
                  "mt-1 font-display text-lg font-bold break-words sm:text-xl",
                  metric.tone === "success" && "text-success",
                  metric.tone === "danger" && "text-red-600",
                )}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-6 text-center">
          <p className="font-display text-4xl font-extrabold text-cta lg:text-5xl">
            {formatEur(result.monthlyRevenue, locale)}
          </p>
          <p className="mt-1 font-body text-sm font-medium text-text-secondary">
            {t("heroLabel")}
          </p>
        </div>

        <p className="mt-6 font-body text-xs leading-relaxed text-text-secondary">
          {t("disclaimer")}
        </p>
      </div>

      <LeadCtaSection
        namespace="roiCalculator"
        className="mx-auto mt-8 max-w-2xl"
      />
    </SectionWrapper>
  );
}
