import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type LeadRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
};

type TurnstileResponse = {
  success: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "The message is too long." }, { status: 413 });
  }

  let body: LeadRequest;
  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 254).toLowerCase();
  const message = cleanText(body.message, 5000);
  const turnstileToken = cleanText(body.turnstileToken, 4096);

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }
  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Please finish the spam check and try again." },
      { status: 400 },
    );
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!turnstileSecret || !webhookUrl) {
    return NextResponse.json(
      { error: "The form is not ready yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const verificationBody = new URLSearchParams({
      secret: turnstileSecret,
      response: turnstileToken,
    });
    const remoteIp = request.headers.get("CF-Connecting-IP");
    if (remoteIp) {
      verificationBody.set("remoteip", remoteIp);
    }

    const turnstileResult = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verificationBody,
        signal: AbortSignal.timeout(10_000),
      },
    );
    const verification = (await turnstileResult.json()) as TurnstileResponse;

    if (!turnstileResult.ok || !verification.success) {
      return NextResponse.json(
        { error: "The spam check did not pass. Please try again." },
        { status: 400 },
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: "runsonitsown.ai contact form",
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { error: "Your message could not be sent. Please try again." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
