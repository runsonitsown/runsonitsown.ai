import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/final-cta";
import { QuizLink } from "@/components/quiz-link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About TJ",
  description:
    "Meet TJ Beatty, the software engineer and direct response marketer behind RunsOnItsOwn.ai.",
};

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>Before you trust a quiz with your week, it&apos;s fair to ask who built it.</h1>
            <p className="lead">Here&apos;s the short version.</p>
          </div>
          <div className="photo-frame photo-frame--portrait">
            <Image
              alt="Portrait of TJ Beatty"
              fill
              priority
              sizes="(min-width: 760px) 420px, 90vw"
              src="/images/tj-portrait.webp"
            />
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell section-copy">
          <h2>The facts.</h2>
          <div className="body-copy">
            <p>TJ worked as a computer programmer for 15 years.</p>
            <p>Direct response marketing came next. He has spent 8 years there.</p>
            <p>
              The longer thread runs 25 years: building software and automation that
              does real work. AI is the newest part of that work.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-copy">
          <h2>Running today.</h2>
          <div className="body-copy">
            <p>
              TJ Beatty spent 15 years as a software engineer. He has built systems that follow
              up with new leads, answer common questions, track ad spend back to sales, keep
              expense records current, and handle routine production work. That work has included
              graphic design, video editing, copy, and server upkeep. The experience behind this
              quiz comes from systems used inside real companies.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="shell split">
          <div className="section-copy">
            <h2>Why small business owners.</h2>
            <div className="body-copy">
              <p>
                The AI industry talks to itself in jargon while owners answer the
                same customer email for the tenth time.
              </p>
              <p>
                TJ&apos;s job is translation. He starts by measuring the week. Then he
                prescribes a small set of tools in plain language.
              </p>
              <p>You do not get homework. The tools stay in your accounts.</p>
            </div>
          </div>
          <div className="photo-frame photo-frame--waterfall">
            <Image
              alt="TJ Beatty outdoors by a waterfall"
              fill
              sizes="(min-width: 760px) 480px, 90vw"
              src="/images/tj-waterfall.webp"
            />
          </div>
        </div>
      </section>

      <section className="section section--inversion">
        <div className="shell split">
          <div className="photo-frame">
            <Image
              alt="TJ Beatty smiling outdoors"
              fill
              sizes="(min-width: 760px) 480px, 90vw"
              src="/images/tj-candid.webp"
            />
          </div>
          <div className="section-copy">
            <h2>The person.</h2>
            <div className="body-copy">
              <p>New Jersey is home. His family lives close by.</p>
              <p>
                His first car was a 1968 Dodge Charger. He brought it back from
                beat-up to head-turner. Porsche red, with a black leather top.
              </p>
              <p>
                Outside work, he hikes and spends as much time outdoors as he can.
                Staying fit matters too.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCta title="See what your week looks like at your numbers.">
        <QuizLink>See my week at my numbers</QuizLink>
      </FinalCta>
    </>
  );
}
