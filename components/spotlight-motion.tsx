"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const selector = [
  ".card",
  ".step",
  ".fact",
  ".quote-block",
  ".testimonial-block",
  ".contact-form",
  ".quiz-offer",
].join(",");

export function SpotlightMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reducedMotion.matches || !finePointer.matches) return;

    const surfaces = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const cleanups = surfaces.map((surface) => {
      surface.classList.add("spotlight-surface");

      const move = (event: PointerEvent) => {
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
        surface.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
        surface.style.setProperty("--spotlight-opacity", "1");
      };
      const leave = () => surface.style.setProperty("--spotlight-opacity", "0");

      surface.addEventListener("pointermove", move);
      surface.addEventListener("pointerleave", leave);
      return () => {
        surface.removeEventListener("pointermove", move);
        surface.removeEventListener("pointerleave", leave);
        surface.classList.remove("spotlight-surface");
        surface.style.removeProperty("--spotlight-x");
        surface.style.removeProperty("--spotlight-y");
        surface.style.removeProperty("--spotlight-opacity");
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
