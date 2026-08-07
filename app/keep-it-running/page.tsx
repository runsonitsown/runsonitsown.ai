import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { IncomeDisclaimer } from "@/components/income-disclaimer";
import { BOOK_CALL_URL } from "@/config/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Keep it running",
  description:
    "A month-to-month partner for the bigger parts of your business that need to be designed and built.",
};

export default function KeepItRunningPage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>The simple leaks are one tool away. The bigger ones take more than a tool.</h1>
            <p className="lead">
              If you want the more complex parts of your business automated, this is
              the standing help that designs and builds them.
            </p>
            <Link className="button" href={BOOK_CALL_URL}>
              Book a call
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <div className="section-copy">
            <h2>What bigger looks like.</h2>
            <p className="lead">One tool does not fix these. They get designed and built.</p>
          </div>
          <div className="card-grid card-grid--two">
            <article className="card">
              <h3>A process only lives in your head.</h3>
              <p>The work stops or changes when you are not there to explain it.</p>
            </article>
            <article className="card">
              <h3>One job needs four tools and three people.</h3>
              <p>Each handoff adds time before the work is done.</p>
            </article>
            <article className="card">
              <h3>The training sits unwatched.</h3>
              <p>Your team interrupts you because asking is faster.</p>
            </article>
            <article className="card">
              <h3>A monthly job eats a full day.</h3>
              <p>The calendar keeps bringing it back.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>What the arrangement is.</h2>
          <div className="body-copy">
            <p>
              It is month to month. Each month starts with one question: What is
              worth automating next?
            </p>
            <p>
              The work has to make you money, save you time, or raise quality. If a
              shiny new tool does none of that, you never hear about it.
            </p>
            <p>
              Installation works the same way. You type your passwords. We tell you
              what to click. What is already running stays working and current.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>Who this is for.</h2>
          <div className="body-copy">
            <p>
              This is for owners past their first installs who keep finding bigger
              things to hand off.
            </p>
            <p>
              If we have not worked together yet, start with the{" "}
              <Link className="text-link" href="/find-your-leaks">
                free quiz.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>What happens on the call.</h2>
          <div className="body-copy">
            <p>
              We look at what you have running and what is worth building next. Then
              we check whether ongoing help would pay for itself at your numbers.
            </p>
            <p>If it would not, we will say so on the call.</p>
            <p>Month to month. Leave whenever you want.</p>
          </div>
        </div>
      </section>

      <FinalCta title="See what is worth building next.">
        <Link className="button" href={BOOK_CALL_URL}>
          Book a call
        </Link>
      </FinalCta>
      <IncomeDisclaimer />
    </>
  );
}
