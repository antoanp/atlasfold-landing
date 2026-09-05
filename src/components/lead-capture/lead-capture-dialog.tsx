"use client";

import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { paths, localePath } from "@/lib/paths";
import { submitLead, type LeadFormState } from "@/components/lead-capture/submit-lead";

export type LeadTier = "minimum" | "standard" | "quarterly";

const BUDGET_OPTIONS = ["low", "mid", "high"] as const;
const TIMELINE_OPTIONS = ["now", "soon", "later"] as const;

const inputClass =
  "rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent";

interface LeadCaptureDialogProps {
  tier: LeadTier;
  showTierSummary?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadCaptureDialog({
  tier,
  showTierSummary = true,
  open,
  onOpenChange,
}: LeadCaptureDialogProps) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [state, action, isPending] = useActionState<LeadFormState, FormData>(
    submitLead,
    null,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <div className={showTierSummary ? "grid gap-0 sm:grid-cols-5" : ""}>
          {/* ---- Left: Form (3 cols) ---- */}
          <div
            className={
              showTierSummary ? "p-6 sm:col-span-3 sm:p-8" : "p-6 sm:p-8"
            }
          >
            <DialogHeader>
              <DialogTitle>{t("dialog.title")}</DialogTitle>
              <DialogDescription>{t("dialog.subtitle")}</DialogDescription>
            </DialogHeader>

            {state?.success ? (
              <div className="mt-6 rounded-lg bg-green-50 px-4 py-3 font-body text-sm text-green-700">
                {t("dialog.success")}
              </div>
            ) : (
              <form action={action} className="mt-6 flex flex-col gap-4">
                <input type="hidden" name="tier" value={tier} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="fullName">
                      {t("dialog.fields.fullName")}
                    </Label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone">{t("dialog.fields.phone")}</Label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="company">
                      {t("dialog.fields.company")}
                    </Label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">{t("dialog.fields.email")}</Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="city">{t("dialog.fields.city")}</Label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      autoComplete="address-level2"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="industry">
                      {t("dialog.fields.industry")}
                    </Label>
                    <input
                      id="industry"
                      name="industry"
                      type="text"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <fieldset className="flex flex-col gap-1.5">
                  <legend className="mb-1.5 font-body text-sm font-medium text-text-primary">
                    {t("dialog.fields.budget")}
                  </legend>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                    {BUDGET_OPTIONS.map((key) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 font-body text-sm text-text-primary"
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={key}
                          required
                          className="accent-accent"
                        />
                        {t(`dialog.budgetOptions.${key}`)}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-1.5">
                  <legend className="mb-1.5 font-body text-sm font-medium text-text-primary">
                    {t("dialog.fields.timeline")}
                  </legend>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                    {TIMELINE_OPTIONS.map((key) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 font-body text-sm text-text-primary"
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={key}
                          required
                          className="accent-accent"
                        />
                        {t(`dialog.timelineOptions.${key}`)}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="flex items-start gap-2 font-body text-xs text-text-secondary">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 accent-accent"
                  />
                  <span>
                    {t.rich("dialog.fields.consent", {
                      link: (chunks) => (
                        <Link
                          href={localePath(locale, paths.legal.privacy)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-text-primary"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </span>
                </label>

                {state?.error && (
                  <p className="font-body text-sm text-red-600">
                    {t("dialog.error")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-cta px-6 py-3 font-body font-medium text-white transition-colors hover:bg-cta/90 disabled:opacity-60"
                >
                  {isPending ? t("dialog.submitting") : t("dialog.submit")}
                </button>
              </form>
            )}
          </div>

          {showTierSummary && (
            <div className="flex flex-col justify-center border-t border-gray-100 bg-page p-6 sm:col-span-2 sm:rounded-r-2xl sm:border-l sm:border-t-0 sm:p-8">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
                {t("dialog.tierLabel")}
              </p>

              <h3 className="font-display text-lg font-bold">
                {t(`tiers.${tier}.name`)}
              </h3>

              <div className="mt-2">
                <span className="font-display text-2xl font-extrabold">
                  {t(`tiers.${tier}.price`)}
                </span>
                <span className="font-body text-sm text-text-secondary">
                  {" "}
                  {t(`tiers.${tier}.period`)}
                </span>
              </div>

              <p className="mt-2 font-body text-sm text-text-secondary">
                {t(`tiers.${tier}.description`)}
              </p>

              <ul className="mt-4 flex flex-col gap-1.5">
                {(t.raw(`tiers.${tier}.features`) as string[]).map(
                  (feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-body text-xs text-text-secondary"
                    >
                      <span className="mt-0.5 text-success">✓</span>
                      {feature}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
