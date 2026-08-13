"use client";

import Script from "next/script";
import { FormEvent, useCallback, useRef, useState } from "react";
import {
  trackQuizComplete,
  trackQuizQuestionAnswered,
  trackQuizStart,
} from "@/components/analytics";
import { IncomeDisclaimer } from "@/components/income-disclaimer";
import { Answers, calculateResults, questions } from "@/lib/quiz";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          appearance: "interaction-only";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const showQ0 = process.env.NEXT_PUBLIC_SHOW_Q0 === "true";
const showPaywall = process.env.NEXT_PUBLIC_SHOW_PAYWALL === "true";
const orderFormUrl = process.env.NEXT_PUBLIC_ORDER_FORM_URL;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function SaveTimeQuiz() {
  const activeQuestions = showQ0
    ? questions
    : questions.filter((question) => question.id !== "q0");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [otherProcess, setOtherProcess] = useState("");
  const [token, setToken] = useState("");
  const [gateError, setGateError] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const turnstileSlot = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileSlot.current || !window.turnstile || widgetId.current) {
      return;
    }
    widgetId.current = window.turnstile.render(turnstileSlot.current, {
      sitekey: turnstileSiteKey,
      appearance: "interaction-only",
      callback: setToken,
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
  }, []);

  function startQuiz() {
    trackQuizStart();
    setStarted(true);
  }

  function choose(answer: string) {
    const question = activeQuestions[step];
    setAnswers((current) => ({ ...current, [question.id]: answer }));
    trackQuizQuestionAnswered(step + 1);
    if (question.id === "q11" && answer === "something else") return;
    setStep((current) => current + 1);
  }

  function submitOther() {
    if (!otherProcess.trim()) return;
    setAnswers((current) => ({ ...current, q11: otherProcess.trim() }));
    trackQuizQuestionAnswered(step + 1);
    setStep((current) => current + 1);
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !event.currentTarget.checkValidity()) {
      setGateError("Please enter a valid email.");
      return;
    }
    if (!token) {
      setGateError("Please wait for the spam check, then try again.");
      return;
    }

    const results = calculateResults(answers);
    setResultsVisible(true);
    setGateError("");

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "runsonitsown.ai quiz",
          ...results,
          businessType: answers.q1,
          headcount: answers.q2,
          annualRevenue: answers.annualRevenue,
          hourlyValue: answers.q3,
          magicWand: answers.q11,
          aiReadiness: answers.q12,
          motivation: answers.q0 ?? "",
          turnstileToken: token,
        }),
      });
      if (response.ok) trackQuizComplete();
      else console.error("Quiz lead submission failed.");
    } catch {
      console.error("Quiz lead submission failed.");
    }
  }

  if (!started) {
    return (
      <main className="quiz-screen quiz-start-screen">
        <section className="quiz-shell quiz-start">
          <p className="quiz-kicker">FREE AI TIME LEAK QUIZ</p>
          <h1 className="quiz-start__heading">
            Find how many hours your business loses each week to work AI could already handle.
          </h1>
          <p className="quiz-start__body">
            Answer 12 short questions. You will see the time you could get back and what those
            hours are worth.
          </p>
          <div className="quiz-start__action">
            <button className="button" onClick={startQuiz} type="button">
              Find my time leaks
            </button>
            <p className="quiz-start__microcopy">
              Free and about 2 minutes. Your result shows on screen.
            </p>
          </div>
          <p className="quiz-start__credibility">
            Built by TJ Beatty, a 15-year software engineer who has installed AI systems inside
            real businesses.
          </p>
        </section>
      </main>
    );
  }

  const results = calculateResults(answers);
  if (resultsVisible) return <Results results={results} />;

  if (step >= activeQuestions.length) {
    return (
      <>
        <Script
          onLoad={renderTurnstile}
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
        />
        <main className="quiz-screen">
          <section className="quiz-shell quiz-gate-screen">
            <p className="quiz-kicker">YOUR RESULT IS READY</p>
            <h1 className="quiz-terminal-heading">Enter your email to reveal your number.</h1>
            <p>Your result appears on the next screen.</p>
            <form className="quiz-gate" noValidate onSubmit={submitEmail}>
              <label htmlFor="quiz-email">Email</label>
              <input
                autoComplete="email"
                id="quiz-email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
              <div className="turnstile-slot" ref={turnstileSlot} />
              {gateError ? (
                <p className="form-status" role="alert">
                  {gateError}
                </p>
              ) : null}
              <button className="button" type="submit">
                Reveal my time leak
              </button>
            </form>
          </section>
        </main>
      </>
    );
  }

  const question = activeQuestions[step];
  const isOther = question.id === "q11" && answers.q11 === "something else";

  return (
    <main className="quiz-screen">
      <section className="quiz-shell">
        <div
          aria-label={`Question ${step + 1} of ${activeQuestions.length}`}
          className="quiz-progress"
        >
          <span style={{ width: `${((step + 1) / activeQuestions.length) * 100}%` }} />
        </div>
        <p className="quiz-count">
          Question {step + 1} of {activeQuestions.length}
        </p>
        <h1 className="quiz-question">{question.prompt}</h1>
        {isOther ? (
          <div className="quiz-other">
            <label htmlFor="other-process">something else</label>
            <input
              autoFocus
              id="other-process"
              onChange={(event) => setOtherProcess(event.target.value)}
              value={otherProcess}
            />
            <button className="button" onClick={submitOther} type="button">
              Continue
            </button>
          </div>
        ) : (
          <div className="quiz-answers">
            {question.choices.map((choice) => (
              <button
                className="quiz-answer"
                key={choice}
                onClick={() => choose(choice)}
                type="button"
              >
                {choice}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Results({ results }: { results: ReturnType<typeof calculateResults> }) {
  const showReportBridge = showPaywall && Boolean(orderFormUrl);

  return (
    <>
      <main className="quiz-results">
        <section className="quiz-shell quiz-results__shell">
          <p className="quiz-kicker">YOUR RESULT</p>
          <div className="quiz-result-summary">
            <p className="quiz-result-intro">Your business could reclaim about</p>
            <h1 className="quiz-primary-result live-reading">
              {results.hoursLow} TO {results.hoursHigh} HOURS A WEEK
            </h1>
            <p className="quiz-dollar-result">
              Using a conservative value from the range you chose, that time is worth about{" "}
              <span className="live-reading">
                ${results.dollarsMonthly.toLocaleString()} A MONTH
              </span>
              .
            </p>
          </div>

          <div className="quiz-result-leak">
            <p className="quiz-result-label">YOUR BIGGEST MEASURED LEAK</p>
            <h2>{results.biggestMeasuredLeak}</h2>
            <p>
              Your answers point here first. This is where the largest block of reclaimable time
              sits.
            </p>
            <p className="quiz-result-math">
              We applied a conservative recovery rate to the hours you reported. The estimate is
              capped at 15 hours a week.
            </p>
          </div>

          {showReportBridge ? (
            <div className="quiz-offer">
              <h2>See the full fix list.</h2>
              <p>
                Your free result measures the size of the leak. The full AI Time Leak Report maps
                each category, puts your first fix at the top, matches tools to your team, and
                shows the dollar math.
              </p>
              <a className="button" href={orderFormUrl}>
                Get my full report for $27
              </a>
              <p className="quiz-offer__guarantee">
                One-time payment. If your report does not identify at least 5 reclaimable hours per
                week, you get a full refund.
              </p>
            </div>
          ) : null}
        </section>
      </main>
      <IncomeDisclaimer />
    </>
  );
}
