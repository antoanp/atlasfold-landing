"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useLeadCapture } from "@/hooks/use-lead-capture";

type LeadCaptureCtaButtonProps = {
  children: ReactNode;
  className?: string;
};

export function LeadCaptureCtaButton({
  children,
  className,
}: LeadCaptureCtaButtonProps) {
  const { openLeadCapture } = useLeadCapture();

  return (
    <button
      type="button"
      onClick={openLeadCapture}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
