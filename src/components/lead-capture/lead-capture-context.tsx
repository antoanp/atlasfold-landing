"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  Suspense,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  LeadCaptureDialog,
  type LeadTier,
} from "@/components/lead-capture/lead-capture-dialog";

export type { LeadTier } from "@/components/lead-capture/lead-capture-dialog";

export const DEFAULT_LEAD_TIER: LeadTier = "standard";

export type LeadCaptureContextValue = {
  openLeadCapture: (tier: LeadTier) => void;
};

export const LeadCaptureContext =
  createContext<LeadCaptureContextValue | null>(null);

const isPricingVisible = process.env.NEXT_PUBLIC_SHOW_PRICING !== "false";

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [selectedTier, setSelectedTier] = useState<LeadTier>(
    DEFAULT_LEAD_TIER,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const openLeadCapture = useCallback((tier: LeadTier) => {
    setSelectedTier(tier);
    setDialogOpen(true);
  }, []);

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture }}>
      {children}
      <LeadCaptureDialog
        tier={selectedTier}
        showTierSummary={isPricingVisible}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <Suspense fallback={null}>
        <BookingParamHandler onOpenDialog={() => setDialogOpen(true)} />
      </Suspense>
    </LeadCaptureContext.Provider>
  );
}

function BookingParamHandler({ onOpenDialog }: { onOpenDialog: () => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("booking") === "true") {
      onOpenDialog();
      const element = document.getElementById("pricing");
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [searchParams, onOpenDialog]);

  return null;
}
