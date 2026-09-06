"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/cn";

const HEATMAP_IMAGES = {
  before: "/images/case-studies/grooming-ozone-before.jpg",
  after: "/images/case-studies/grooming-ozone-after.jpg",
} as const;

export function BeforeAfter() {
  const t = useTranslations("beforeAfter");
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  const metrics = [
    "ranking",
    "marketShare",
    "top3Coverage",
    "top3Points",
  ] as const;

  return (
    <SectionWrapper id="before-after">
      <div className="flex flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 font-body text-sm">
          {t("badge")}
        </span>
        <h2 className="font-display text-3xl font-extrabold lg:text-5xl">
          {t("title")}{" "}
          <span className="font-accent italic">{t("titleAccent")}</span>
        </h2>
        <p className="mt-3 font-body text-sm text-text-secondary">
          {t("caption")}
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-gray-100 bg-card p-6 shadow-sm lg:p-8">
        <div className="mb-6 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("before")}
            className={cn(
              "rounded-full px-5 py-2 font-body text-sm font-medium transition-colors",
              activeTab === "before"
                ? "bg-text-primary text-white"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200",
            )}
          >
            {t("tabs.before")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("after")}
            className={cn(
              "rounded-full px-5 py-2 font-body text-sm font-medium transition-colors",
              activeTab === "after"
                ? "bg-text-primary text-white"
                : "bg-gray-100 text-text-secondary hover:bg-gray-200",
            )}
          >
            {t("tabs.after")}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-6 rounded-xl bg-gray-50 p-4">
              <p className="font-display text-base font-bold">
                {t("business.name")}
              </p>
              <p className="mt-1 font-body text-sm text-text-secondary">
                {t("business.location")} · {t("business.meta")}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {metrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <span className="font-body text-sm font-medium">
                    {t(`metrics.${metric}`)}
                  </span>
                  <span
                    className={cn(
                      "rounded-lg px-3 py-1 font-body text-sm font-bold tabular-nums",
                      activeTab === "before"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700",
                    )}
                  >
                    {t(`${activeTab}.${metric}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-200">
            {(["before", "after"] as const).map((tab) => (
              <Image
                key={tab}
                src={HEATMAP_IMAGES[tab]}
                alt={t(`imageAlt.${tab}`)}
                width={1140}
                height={835}
                sizes="(min-width: 1024px) 40vw, 90vw"
                className={cn("h-auto w-full", activeTab === tab ? "" : "hidden")}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 font-body text-xs text-text-secondary">
          {t("disclaimer")}
        </p>
      </div>
    </SectionWrapper>
  );
}
