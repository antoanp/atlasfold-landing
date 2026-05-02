"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLeadCapture } from "@/hooks/use-lead-capture";
import {
  DEFAULT_LEAD_TIER,
  type LeadTier,
} from "@/components/lead-capture/lead-capture-context";

type LeadCaptureCtaButtonProps = {
  children: ReactNode;
  className?: string;
  tier?: LeadTier;
};

export function LeadCaptureCtaButton({
  children,
  className,
  tier = DEFAULT_LEAD_TIER,
}: LeadCaptureCtaButtonProps) {
  const { openLeadCapture } = useLeadCapture();

  return (
    <button
      type="button"
      onClick={() => openLeadCapture(tier)}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
