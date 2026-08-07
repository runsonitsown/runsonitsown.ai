import type { ReactNode } from "react";

type FinalCtaProps = {
  title: string;
  text?: string;
  children: ReactNode;
};

export function FinalCta({ title, text, children }: FinalCtaProps) {
  return (
    <section className="final-cta">
      <div className="shell final-cta__inner">
        <div>
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
