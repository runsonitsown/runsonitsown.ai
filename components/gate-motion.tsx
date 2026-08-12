"use client";

import { useEffect } from "react";

export function GateMotion() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".section, .final-cta, .income-disclaimer",
    );

    targets.forEach((target) => target.classList.add("gate-divider"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("gate-divider--live");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.1 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
