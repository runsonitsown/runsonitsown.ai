"use client";

import Script from "next/script";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { trackQuizComplete, trackQuizQuestionAnswered, trackQuizStart } from "@/components/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; appearance: "interaction-only"; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

type Answers = Record<string, string>;
type Question = { id: string; prompt: string; choices: string[] };

const showQ0 = process.env.NEXT_PUBLIC_SHOW_Q0 === "true";
const showPaywall = process.env.NEXT_PUBLIC_SHOW_PAYWALL === "true";
const orderFormUrl = process.env.NEXT_PUBLIC_ORDER_FORM_URL;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const questions: Question[] = [
  { id: "q0", prompt: "I want my time back so I can...", choices: ["grow the business instead of running it", "get my evenings back", "stop being the bottleneck", "finally take a real vacation"] },
  { id: "q1", prompt: "What kind of business do you run?", choices: ["Home services", "Professional services", "Retail or e-commerce", "Health & wellness", "Real estate", "Restaurant or hospitality", "Other"] },
  { id: "q2", prompt: "Including you, how many people work in your business?", choices: ["Just me", "2-5", "6-10", "11-20", "20+"] },
  { id: "q3", prompt: "Roughly what does an hour of your time cost the business?", choices: ["$50", "$100", "$150", "$250+"] },
  { id: "q4", prompt: "Your day starts with email and messages. How much of it do they eat?", choices: ["Under 30 min — you keep it tight", "30-60 min — it's a chunk of the morning", "1-2 hours — you're in there more than you'd like", "More than 2 hours — email basically runs your morning"] },
  { id: "q5", prompt: "Between meetings, calls, prep and follow-up, how much of your week goes to talking about the work instead of doing it?", choices: ["Under 2 hours", "2-5 hours", "5-10 hours — it's most of a workday", "10+ hours — my calendar owns me"] },
  { id: "q6", prompt: "Scheduling, invoicing, data entry, copying info between systems. How many hours a week disappear into that?", choices: ["Under 2 hours", "2-5 hours", "5-10 hours — I'm doing admin instead of running the business", "10+ hours — it never ends"] },
  { id: "q7", prompt: "Quotes, proposals, posts, review replies, job ads. How much time do you lose to writing?", choices: ["Almost none", "1-3 hrs/wk", "3-6 hrs/wk — I put it off constantly", "6+ hrs/wk — writing is a second job I never signed up for"] },
  { id: "q8", prompt: "How often do you or your team answer the same customer questions over and over?", choices: ["Rarely", "A few times a week", "Daily — I've explained this a thousand times", "It's most of what we do"] },
  { id: "q9", prompt: "How much of the business only exists in your head — things nobody else can do because it's never been written down?", choices: ["Almost nothing — it's documented", "Some of it", "A lot of it — my team waits on me", "The business IS my head. If I vanished for two weeks, things would break."] },
  { id: "q10", prompt: "Be honest — which one do you dread?", choices: ["Email and follow-up", "Paperwork and admin", "Writing anything", "Chasing unpaid invoices and scheduling", "Answering the same questions again"] },
  { id: "q11", prompt: "Magic wand. If you could delete one process from your business forever, which one goes?", choices: ["Email and follow-up", "Paperwork and admin", "Writing anything", "Chasing unpaid invoices and scheduling", "Answering the same questions again", "something else"] },
  { id: "q12", prompt: "Where are you with AI today?", choices: ["Not at all", "I've tried ChatGPT a few times", "I use ChatGPT regularly", "We use several tools"] },
];

const leakMath = {
  q4: { hours: [2.5, 5.5, 9, 13], recovery: 0.5 }, q5: { hours: [1, 3.5, 7.5, 12], recovery: 0.4 },
  q6: { hours: [1, 3.5, 7.5, 12], recovery: 0.7 }, q7: { hours: [0.5, 2, 4.5, 7], recovery: 0.6 },
  q8: { hours: [0.5, 2, 4, 8], recovery: 0.8 },
} as const;

function calculateResults(answers: Answers) {
  let hours = 0;
  for (const [id, values] of Object.entries(leakMath)) {
    const index = questions.find((question) => question.id === id)?.choices.indexOf(answers[id]) ?? -1;
    if (index >= 0) hours += values.hours[index] * values.recovery;
  }
  const q9Answer = answers.q9 ?? "";
  const knowledgeFlag = q9Answer.startsWith("A lot of it") || q9Answer.startsWith("The business IS my head");
  if (knowledgeFlag) hours += 1;
  const capped = Math.max(3, Math.min(15, hours));
  const rounded = Math.round(capped);
  const hourlyValue = [50, 100, 150, 250][questions.find((question) => question.id === "q3")?.choices.indexOf(answers.q3) ?? 0] ?? 50;
  return { hoursLow: rounded - 1, hoursHigh: rounded + 1, dollarsMonthly: Math.round((capped * hourlyValue * 4.33) / 100) * 100, knowledgeFlag, floorHit: hours < 3 };
}

export function SaveTimeQuiz() {
  const activeQuestions = showQ0 ? questions : questions.filter((question) => question.id !== "q0");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState("");
  const [otherProcess, setOtherProcess] = useState("");
  const [token, setToken] = useState("");
  const [gateError, setGateError] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const turnstileSlot = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => { trackQuizStart(); }, []);
  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileSlot.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(turnstileSlot.current, { sitekey: turnstileSiteKey, appearance: "interaction-only", callback: setToken, "expired-callback": () => setToken(""), "error-callback": () => setToken("") });
  }, []);

  function choose(answer: string) {
    const question = activeQuestions[step];
    setAnswers((current) => ({ ...current, [question.id]: answer }));
    trackQuizQuestionAnswered(question.id === "q0" ? 0 : Number(question.id.slice(1)));
    if (question.id === "q11" && answer === "something else") return;
    setStep((current) => current + 1);
  }

  function submitOther() {
    if (!otherProcess.trim()) return;
    setAnswers((current) => ({ ...current, q11: otherProcess.trim() }));
    trackQuizQuestionAnswered(11);
    setStep((current) => current + 1);
  }

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !event.currentTarget.checkValidity()) { setGateError("Please enter a valid email."); return; }
    if (!token) { setGateError("Please wait for the spam check, then try again."); return; }
    const results = calculateResults(answers);
    setResultsVisible(true);
    setGateError("");
    try {
      const response = await fetch("/api/quiz", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "runsonitsown.ai quiz", ...results, businessType: answers.q1, headcount: answers.q2, hourlyValue: answers.q3, dreaded: answers.q10, magicWand: answers.q11, aiReadiness: answers.q12, motivation: answers.q0 ?? "", turnstileToken: token }) });
      if (response.ok) trackQuizComplete();
      else console.error("Quiz lead submission failed.");
    } catch { console.error("Quiz lead submission failed."); }
  }

  const results = calculateResults(answers);
  if (resultsVisible) return <Results results={results} />;
  if (step >= activeQuestions.length) return <>
    <Script onLoad={renderTurnstile} src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
    <main className="quiz-screen"><section className="quiz-shell"><p className="quiz-kicker">One last step</p><h1>Where should we send your results?</h1><form className="quiz-gate" noValidate onSubmit={submitEmail}><label htmlFor="quiz-email">Email</label><input autoComplete="email" id="quiz-email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /><div className="turnstile-slot" ref={turnstileSlot} />{gateError ? <p className="form-status" role="alert">{gateError}</p> : null}<button className="button" type="submit">Show me my number</button></form></section></main>
  </>;
  const question = activeQuestions[step];
  const isOther = question.id === "q11" && answers.q11 === "something else";
  return <main className="quiz-screen"><section className="quiz-shell"><div className="quiz-progress" aria-label={`Question ${step + 1} of ${activeQuestions.length}`}><span style={{ width: `${((step + 1) / activeQuestions.length) * 100}%` }} /></div><p className="quiz-count">Question {step + 1} of {activeQuestions.length}</p><h1>{question.prompt}</h1>{isOther ? <div className="quiz-other"><label htmlFor="other-process">something else</label><input autoFocus id="other-process" onChange={(event) => setOtherProcess(event.target.value)} value={otherProcess} /><button className="button" onClick={submitOther} type="button">Continue</button></div> : <div className="quiz-answers">{question.choices.map((choice) => <button className="quiz-answer" key={choice} onClick={() => choose(choice)} type="button">{choice}</button>)}</div>}</section></main>;
}

function Results({ results }: { results: ReturnType<typeof calculateResults> }) {
  return <main className="quiz-results"><section className="quiz-shell"><p className="quiz-kicker">Your result</p><h1>Your business is leaking approximately <span className="live-reading">{results.hoursLow} to {results.hoursHigh} hours a week</span>. That&apos;s about <span className="live-reading">${results.dollarsMonthly.toLocaleString()} a month</span> at your own numbers.</h1><div className="quiz-results-copy"><p>You&apos;re not alone. Most owners tested are leaking 8+ hours and have no idea.</p><p>{results.floorHit ? "You&apos;re tighter than most. Here are the two or three leaks you still have." : "Those hours are gone this week, and next week too."}</p><p>This is not a discipline problem. The tools that fix these exact leaks have existed for two years. You&apos;re too deep in the weeds to find the tools that would get you out of the weeds. That&apos;s the trap.</p><p>Business owners who put the right tools in place typically get back about 7 hours a week.</p>{showPaywall ? <div className="quiz-offer"><p>Get the $27 report: what&apos;s leaking, where to start, and what to fix first. If the report doesn&apos;t find at least 5 reclaimable hours a week, full refund.</p>{orderFormUrl ? <a className="button" href={orderFormUrl}>Get the report</a> : null}</div> : <p>Your full breakdown is being built and you&apos;ll get it by email.</p>}</div></section></main>;
}
