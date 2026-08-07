import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { IncomeDisclaimer } from "@/components/income-disclaimer";
import { QuizLink } from "@/components/quiz-link";
import { QuoteBlock } from "@/components/quote-block";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "We fix it for you",
  description:
    "Get the fixes from your report running live while you watch, with your accounts and passwords under your control.",
};

export default function WeFixItForYouPage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>Your first fix can be working in about 20 minutes.</h1>
            <p className="lead">
              Your report shows where the leak is. We get the first fix running live
              while you watch.
            </p>
            <QuizLink>Start with the free quiz</QuizLink>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>How it works.</h2>
          <div className="body-copy">
            <p>
              The session happens on your screen, with your hands on the keyboard.
              You type your passwords. We tell you what to click.
            </p>
            <p>
              The first session gets your number one fix live. A full install covers
              every tool in your report. Then you and your team get a walkthrough so
              the new setup gets used.
            </p>
            <p>
              You see a small flat price before you buy. There is no proposal. The
              report takes the place of a discovery call. A retainer is never
              required.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>You stay in control.</h2>
          <div className="body-copy">
            <p>
              You never share a password. We never see one, hold one, or log into
              anything as you.
            </p>
            <p>
              Every tool lands in your own account. You can see it, change it, or
              shut it off any day. Nothing gets installed while you are not watching.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell">
          <QuoteBlock
            attribution="Yann LeCun, who ran AI at the company behind Facebook and Instagram for 12 years."
            frame="You are the manager. AI is the staff. Our job is getting that staff set up for the work you choose."
            quote={`"Everybody will become a CEO of some kind, or at least a manager."`}
          />
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>Why the quiz comes first.</h2>
          <p className="lead">
            We only install what your report prescribes. If the report does not call
            for a tool, we will not sell it to you.
          </p>
          <p>That keeps the install tied to your numbers.</p>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>What stays yours.</h2>
          <div className="body-copy">
            <p>
              The tools are made by other companies. We do not sell software. They
              live in your accounts, and each subscription belongs to you at the
              tool&apos;s normal public price.
            </p>
            <p>
              No lock-in. A retainer is never required. When the install is done, you
              owe us nothing more.
            </p>
            <p>
              Want someone watching month to month?{" "}
              <Link className="text-link" href="/keep-it-running">
                See Keep It Running.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FinalCta title="The report comes before the install.">
        <QuizLink>Start with the free quiz</QuizLink>
      </FinalCta>
      <IncomeDisclaimer />
    </>
  );
}
