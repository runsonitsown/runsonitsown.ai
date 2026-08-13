import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/final-cta";
import { IncomeDisclaimer } from "@/components/income-disclaimer";
import { QuizLink } from "@/components/quiz-link";
import { QuoteBlock } from "@/components/quote-block";
import { SystemCore } from "@/components/system-core";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Find your AI time leaks",
  description:
    "A free 12-question quiz shows how many hours your business is losing to work AI tools could already handle.",
};

const quizSteps = [
  {
    title: "Tell us how your week goes.",
    text: "The questions are about your work, not about AI.",
  },
  {
    title: "Get your number.",
    text: "See the hours and what those hours cost at your numbers.",
  },
  {
    title: "Find the worst leak.",
    text: "Your result shows which part of the week is costing you most.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero hero--system">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>Your business is leaking hours every week to work AI could already be doing.</h1>
            <p className="lead">The free quiz tells you how many in about 3 minutes.</p>
            <QuizLink>Find my time leaks</QuizLink>
            <p className="microcopy">12 questions. About 3 minutes. Free. No jargon.</p>
          </div>
          <SystemCore />
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>The leak hides in work you already do.</h2>
          <div className="body-copy">
            <p>
              Your inbox eats the first part of the morning. By lunch, you have
              answered the same customer question again. Follow-up only moves when
              you find a spare minute. Meanwhile, the writing sits until tomorrow.
            </p>
            <p>
              AI tools made by other companies can handle parts of this work. The
              quiz shows where to start.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <QuoteBlock
            attribution="Sundar Pichai, CEO of Google."
            quote={`"I think about them as intelligent systems that show reasoning, planning, and memory. They are able to 'think' multiple steps ahead, and work across software and systems, all to get something done on your behalf, and most importantly, under your supervision."`}
          />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-copy">
            <h2>How the quiz works.</h2>
            <p className="lead">Nothing to install. Nothing to learn first.</p>
          </div>
          <div className="step-grid">
            {quizSteps.map((step, index) => (
              <article className="step" key={step.title}>
                <span className="step__number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--inversion">
        <div className="shell split">
          <div className="section-copy">
            <h2>Built by someone who runs this every day.</h2>
            <div className="body-copy">
              <p>
                TJ worked as a computer programmer for 15 years. He has spent 8
                years in direct response marketing.
              </p>
              <p>The same kind of AI systems run daily in his own business.</p>
            </div>
          </div>
          <div className="photo-frame photo-frame--portrait">
            <Image
              alt="TJ Beatty standing near the water"
              fill
              sizes="(min-width: 760px) 420px, 90vw"
              src="/images/tj-portrait.webp"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>The straight answer.</h2>
          <p className="lead">
            The quiz and your result are free. No card. Paid help is there if you
            want the leaks fixed.
          </p>
        </div>
      </section>

      <FinalCta title="Every week without a number is a week competitors who measured theirs are pulling ahead.">
        <QuizLink>Find my time leaks</QuizLink>
      </FinalCta>
      <IncomeDisclaimer />
    </>
  );
}
