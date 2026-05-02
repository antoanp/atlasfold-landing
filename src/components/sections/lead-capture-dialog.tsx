"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";

export type LeadTier = "minimum" | "standard" | "quarterly";

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
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
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
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
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
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
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
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 font-body text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

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
