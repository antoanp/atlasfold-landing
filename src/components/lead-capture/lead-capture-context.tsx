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
} from "@/components/lead-capture/lead-capture-dialog";

export type LeadCaptureContextValue = {
  openLeadCapture: () => void;
};

export const LeadCaptureContext =
  createContext<LeadCaptureContextValue | null>(null);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openLeadCapture = useCallback(() => {
    setDialogOpen(true);
  }, []);

  return (
    <LeadCaptureContext.Provider value={{ openLeadCapture }}>
      {children}
      <LeadCaptureDialog
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
    }
  }, [searchParams, onOpenDialog]);

  return null;
}
