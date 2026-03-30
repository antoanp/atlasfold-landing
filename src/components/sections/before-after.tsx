"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/cn";

export function BeforeAfter() {
  const t = useTranslations("beforeAfter");
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  const metrics = ["ranking", "marketShare", "clicks", "customers"] as const;

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
      </div>
      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-100 bg-card p-8 shadow-sm">
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
        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <p className="font-display text-base font-bold">
            {t("business.name")}
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
                  "rounded-lg px-3 py-1 font-body text-sm font-bold",
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
    </SectionWrapper>
  );
}
