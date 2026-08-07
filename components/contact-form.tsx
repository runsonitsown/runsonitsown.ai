"use client";

import Script from "next/script";
import { FormEvent, useCallback, useRef, useState } from "react";
import { trackContactSubmission } from "@/components/analytics";

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

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileSlot = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!siteKey || !turnstileSlot.current || !window.turnstile || widgetId.current) {
      return;
    }

    widgetId.current = window.turnstile.render(turnstileSlot.current, {
      sitekey: siteKey,
      appearance: "interaction-only",
      callback: (token) => {
        setTurnstileToken(token);
        setTurnstileError(false);
      },
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => {
        setTurnstileToken("");
        setTurnstileError(true);
      },
    });
  }, [siteKey]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement | null;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement | null;

    if (!nameInput?.value.trim()) {
      setFormState("error");
      setMessage("Please enter your name.");
      nameInput?.focus();
      return;
    }

    if (!emailInput?.value.trim()) {
      setFormState("error");
      setMessage("Please enter your email.");
      emailInput?.focus();
      return;
    }

    if (!emailInput.validity.valid) {
      setFormState("error");
      setMessage("Please enter a valid email.");
      emailInput.focus();
      return;
    }

    if (!messageInput?.value.trim()) {
      setFormState("error");
      setMessage("Please enter a message.");
      messageInput?.focus();
      return;
    }

    if (!turnstileToken) {
      setFormState("error");
      setMessage(
        turnstileError
          ? "The spam check did not finish. Please try again."
          : "Please wait for the spam check, then try again.",
      );
      return;
    }

    setFormState("submitting");
    setMessage("");

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      turnstileToken,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent.");
      }

      trackContactSubmission();
      setFormState("success");
      setMessage("Thanks. Your message is in. TJ will reply within one business day.");
      form.reset();
    } catch (error) {
      setFormState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
      setTurnstileToken("");
      setTurnstileError(false);
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
      }
    }
  }

  if (formState === "success") {
    return (
      <div className="form-success" role="status">
        <h2>Message received.</h2>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <>
      <Script
        onLoad={renderTurnstile}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input autoComplete="name" id="name" maxLength={100} name="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            autoComplete="email"
            id="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" maxLength={5000} name="message" required />
        </div>
        <div className="turnstile-slot" ref={turnstileSlot} />
        <p className="form-note">
          Protected from spam. A quick check only appears if needed.
        </p>
        {!siteKey ? (
          <p className="form-status" role="status">
            Spam protection is not configured yet.
          </p>
        ) : null}
        {formState === "error" && message ? (
          <p className="form-status" role="alert">
            {message}
          </p>
        ) : null}
        <button
          className="button"
          disabled={formState === "submitting" || !siteKey}
          type="submit"
        >
          {formState === "submitting" ? "Sending..." : "Send message"}
        </button>
      </form>
    </>
  );
}
