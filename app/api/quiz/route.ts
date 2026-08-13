import { NextResponse } from "next/server";
import { isQualifiedRevenue, revenueChoices } from "@/lib/quiz";

export const dynamic = "force-dynamic";

type QuizRequest = {
  email?: unknown;
  source?: unknown;
  hoursLow?: unknown;
  hoursHigh?: unknown;
  dollarsMonthly?: unknown;
  businessType?: unknown;
  headcount?: unknown;
  annualRevenue?: unknown;
  hourlyValue?: unknown;
  magicWand?: unknown;
  aiReadiness?: unknown;
  knowledgeFlag?: unknown;
  biggestMeasuredLeak?: unknown;
  motivation?: unknown;
  turnstileToken?: unknown;
};

type TurnstileResponse = { success: boolean };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanInteger(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? "0") > 20_000) {
    return NextResponse.json({ error: "The form is too long." }, { status: 413 });
  }

  let body: QuizRequest;
  try {
    body = (await request.json()) as QuizRequest;
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const email = cleanText(body.email, 254).toLowerCase();
  const turnstileToken = cleanText(body.turnstileToken, 4096);
  const hoursLow = cleanInteger(body.hoursLow);
  const hoursHigh = cleanInteger(body.hoursHigh);
  const dollarsMonthly = cleanInteger(body.dollarsMonthly);
  const annualRevenue = cleanText(body.annualRevenue, 50);
  if (
    !emailPattern.test(email) ||
    !turnstileToken ||
    hoursLow === null ||
    hoursHigh === null ||
    dollarsMonthly === null ||
    !revenueChoices.includes(annualRevenue as (typeof revenueChoices)[number])
  ) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const webhookUrl = process.env.GHL_QUIZ_WEBHOOK_URL;
  if (!turnstileSecret || !webhookUrl) {
    return NextResponse.json({ error: "The quiz form is not ready yet." }, { status: 503 });
  }

  try {
    const verificationBody = new URLSearchParams({ secret: turnstileSecret, response: turnstileToken });
    const remoteIp = request.headers.get("CF-Connecting-IP");
    if (remoteIp) verificationBody.set("remoteip", remoteIp);
    const turnstileResult = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationBody,
      signal: AbortSignal.timeout(10_000),
    });
    const verification = (await turnstileResult.json()) as TurnstileResponse;
    if (!turnstileResult.ok || !verification.success) {
      return NextResponse.json({ error: "The spam check did not pass. Please try again." }, { status: 400 });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "runsonitsown.ai quiz",
        hoursLow,
        hoursHigh,
        dollarsMonthly,
        businessType: cleanText(body.businessType, 100),
        headcount: cleanText(body.headcount, 50),
        annualRevenue,
        qualifiedRevenue: isQualifiedRevenue(annualRevenue),
        hourlyValue: cleanText(body.hourlyValue, 50),
        magicWand: cleanText(body.magicWand, 500),
        aiReadiness: cleanText(body.aiReadiness, 100),
        knowledgeFlag: body.knowledgeFlag === true,
        biggestMeasuredLeak: cleanText(body.biggestMeasuredLeak, 100),
        motivation: cleanText(body.motivation, 100),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!webhookResponse.ok) {
      return NextResponse.json({ error: "Your results could not be sent." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Your results could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
