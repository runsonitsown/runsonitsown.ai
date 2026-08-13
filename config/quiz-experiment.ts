export type QuizVariant = "v1" | "v2";

export const quizExperiment = {
  // Change the id when a new test begins so returning visitors receive a fresh assignment.
  id: "control-only",
  // Keep at 0 until Version 2 has been reviewed. Use 50 for an even A/B allocation.
  v2TrafficPercent: 0,
  cookieMaxAgeSeconds: 60 * 60 * 24 * 90,
} as const;

export function getQuizVariantCookieName() {
  return `rio_quiz_${quizExperiment.id}`;
}

export function chooseQuizVariant(
  randomValue = Math.random(),
  v2TrafficPercent = quizExperiment.v2TrafficPercent,
): QuizVariant {
  return randomValue * 100 < v2TrafficPercent ? "v2" : "v1";
}

export function isActiveQuizVariant(value: string | undefined): value is QuizVariant {
  if (value === "v1") return true;
  return value === "v2" && quizExperiment.v2TrafficPercent > 0;
}
