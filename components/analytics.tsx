"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

const gaId = process.env.NEXT_PUBLIC_GA4_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function trackQuizClick(label: string) {
  window.gtag?.("event", "quiz_cta_click", {
    link_text: label,
    page_path: window.location.pathname,
  });
  window.fbq?.("trackCustom", "QuizCTAClick", {
    link_text: label,
  });
}

export function trackContactSubmission() {
  window.gtag?.("event", "generate_lead", {
    form_name: "contact",
  });
  window.fbq?.("track", "Lead", {
    content_name: "contact_form",
  });
}

export function trackQuizStart(variant: string) {
  window.gtag?.("event", "quiz_start", { quiz_variant: variant });
  window.fbq?.("trackCustom", "QuizStart", { quiz_variant: variant });
}

export function trackQuizQuestionAnswered(question: number, variant: string) {
  window.gtag?.("event", "quiz_question_answered", {
    question_number: question,
    quiz_variant: variant,
  });
  window.fbq?.("trackCustom", "QuizQuestionAnswered", {
    question_number: question,
    quiz_variant: variant,
  });
}

export function trackQuizComplete(variant: string) {
  window.gtag?.("event", "quiz_complete", { quiz_variant: variant });
  window.fbq?.("trackCustom", "QuizComplete", { quiz_variant: variant });
}

function NavigationPageviews() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (gaId) {
      window.gtag?.("config", gaId, { page_path: pathname });
    }
    if (metaPixelId) {
      window.fbq?.("track", "PageView");
    }
  }, [pathname]);

  return null;
}

export function Analytics() {
  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              height="1"
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              style={{ display: "none" }}
              width="1"
            />
          </noscript>
        </>
      ) : null}
      <NavigationPageviews />
    </>
  );
}
