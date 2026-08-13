"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushDataLayer(event: string, details: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...details });
}

export function trackQuizClick(label: string) {
  pushDataLayer("quiz_cta_click", {
    link_text: label,
    page_path: window.location.pathname,
  });
}

export function trackContactSubmission() {
  pushDataLayer("generate_lead", {
    form_name: "contact",
  });
}

export function trackQuizStart(variant: string) {
  pushDataLayer("quiz_start", { quiz_variant: variant });
}

export function trackQuizQuestionAnswered(question: number, variant: string) {
  pushDataLayer("quiz_question_answered", {
    question_number: question,
    quiz_variant: variant,
  });
}

export function trackQuizComplete(variant: string) {
  pushDataLayer("quiz_complete", { quiz_variant: variant });
}

function NavigationPageviews() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    pushDataLayer("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}

export function Analytics() {
  return <NavigationPageviews />;
}
