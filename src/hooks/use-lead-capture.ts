"use client";

import { useContext } from "react";
import {
  LeadCaptureContext,
  type LeadCaptureContextValue,
} from "@/components/lead-capture/lead-capture-context";

export function useLeadCapture(): LeadCaptureContextValue {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  }
  return ctx;
}
