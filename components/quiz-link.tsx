"use client";

import type { ReactNode } from "react";
import { QUIZ_URL } from "@/config/site";
import { trackQuizClick } from "@/components/analytics";

type QuizLinkProps = {
  children: ReactNode;
  className?: string;
};

export function QuizLink({ children, className = "button" }: QuizLinkProps) {
  const label = typeof children === "string" ? children : "Take the quiz";

  return (
    <a className={className} href={QUIZ_URL} onClick={() => trackQuizClick(label)}>
      {children}
    </a>
  );
}
