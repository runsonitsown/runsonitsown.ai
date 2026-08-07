import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { IncomeDisclaimer } from "@/components/income-disclaimer";
import { QuizLink } from "@/components/quiz-link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Find your time leaks",
  description:
    "Measure the hours your business could reclaim, then see which fixes belong at the top of the list.",
};

const reportDetails = [
  "Your number, with the math shown.",
  "Every leak ranked, with the part you dread most placed first.",
  "One or two vetted tools per category, matched to your business size.",
  "A four-day quick-start plan that takes ten minutes a day or less.",
  "An ROI table built from your numbers.",
] as const;

export default function FindYourLeaksPage() {
  return (
    <>
      <section className="hero" id="quiz-placeholder">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>You can&apos;t fix a leak you haven&apos;t measured.</h1>
            <p className="lead">The free quiz finds where your hours are actually going.</p>
            <QuizLink>Take the free quiz</QuizLink>
            <p className="microcopy">
              12 questions. About 3 minutes. Your number shows on screen.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>The gap inside a chat box.</h2>
          <div className="body-copy">
            <p>
              You opened ChatGPT and asked a question. The answer was decent. Then
              you looked at your business and thought, &quot;Okay. How does this help
              me?&quot;
            </p>
            <p>
              That reaction made sense. A box that answers questions does not look
              like something that can chase invoices or answer customers at 9 at
              night.
            </p>
            <p>
              The gap between asking questions and getting work done is huge. A chat
              window does not show which part of your week is ready.
            </p>
            <p>
              The same problem shows up with a tool you heard about on a podcast. You
              use it twice. Then it sits there because the tool came before the
              measurement.
            </p>
            <p>Competitors who measured first are pulling ahead.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>What the free measurement shows.</h2>
          <div className="body-copy">
            <p>
              The quiz asks 12 questions about how your week actually goes. Your
              result appears on screen with the hours you could reclaim and what
              those hours cost at your numbers.
            </p>
            <p>It is free. No card. Nothing to install. You do not need to know anything about AI.</p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <div className="section-copy">
          <h2>What the optional report adds.</h2>
            <p className="lead">
              The free quiz tells you how much. The optional report shows where the
              time goes and which fixes come first.
            </p>
          </div>
          <div className="card-grid card-grid--two">
            {reportDetails.map((detail) => (
              <div className="card" key={detail}>
                <p>{detail}</p>
              </div>
            ))}
          </div>
          <div className="body-copy" style={{ marginTop: "2rem" }}>
            <p>
              The tools are made by other companies. We prescribe them. We do not
              sell software. Any subscription stays in your name at the tool&apos;s
              normal public price.
            </p>
            <p>
              You get plain language and a short list. Installation help exists if
              you want it.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>A simple guarantee.</h2>
          <div className="body-copy">
            <p className="lead">
              If the report does not identify at least 5 hours a week you can
              reclaim, you get a full refund.
            </p>
            <p>The quiz and your number stay free either way. The report is optional.</p>
            <p>
              Want the fixes installed too?{" "}
              <Link className="text-link" href="/we-fix-it-for-you">
                See how installation works.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        text="Free. About 3 minutes. Your number shows on screen when you finish."
        title="Start with your number."
      >
        <QuizLink>Take the free quiz</QuizLink>
      </FinalCta>
      <IncomeDisclaimer />
    </>
  );
}
