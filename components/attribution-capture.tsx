"use client";

import { useEffect } from "react";
import { captureFirstTouchAttribution } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  return null;
}
