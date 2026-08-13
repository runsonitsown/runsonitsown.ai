import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  chooseQuizVariant,
  getQuizVariantCookieName,
  isActiveQuizVariant,
  quizExperiment,
} from "@/config/quiz-experiment";

export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const cookieName = getQuizVariantCookieName();
  const savedVariant = request.cookies.get(cookieName)?.value;
  const variant = isActiveQuizVariant(savedVariant) ? savedVariant : chooseQuizVariant();
  const destination = request.nextUrl.clone();
  destination.pathname = `/save-time/${variant}`;

  const response = NextResponse.rewrite(destination);
  response.cookies.set({
    name: cookieName,
    value: variant,
    httpOnly: true,
    maxAge: quizExperiment.cookieMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  response.headers.set("x-quiz-variant", variant);
  return response;
}

export const config = {
  matcher: "/save-time",
};
