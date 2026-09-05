"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { LeadCaptureCtaButton } from "@/components/lead-capture/lead-capture-cta-button";

type LeadCtaSectionProps = {
  /** Message namespace that holds a `cta.{title,titleAccent,body,button}` block. */
  namespace: string;
  /** Extra classes for the outer <section> (typically the top margin). */
  className?: string;
};

/**
 * Shared bottom-of-page CTA block. Renders the headline + body from the given
 * namespace, the lead-capture button, and the shared "no sales call" reassurance
 * line from the `leadCta` namespace.
 */
export function LeadCtaSection({ namespace, className }: LeadCtaSectionProps) {
  const t = useTranslations(namespace);
  const shared = useTranslations("leadCta");

  return (
    <section
      className={cn(
        "rounded-2xl border border-gray-100 bg-card px-6 py-12 text-center shadow-sm lg:px-12",
        className,
      )}
    >
      <h2 className="font-display text-3xl font-extrabold lg:text-4xl">
        {t("cta.title")}{" "}
        <span className="font-accent italic">{t("cta.titleAccent")}</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-text-secondary">
        {t("cta.body")}
      </p>
      <LeadCaptureCtaButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-8 py-3 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90">
        {t("cta.button")}
      </LeadCaptureCtaButton>
      <p className="mx-auto mt-3 max-w-md font-body text-xs text-text-secondary">
        {shared("note")}
      </p>
    </section>
  );
}
