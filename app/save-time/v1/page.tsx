import type { Metadata } from "next";
import { SaveTimeQuiz } from "@/components/save-time-quiz";

export const metadata: Metadata = {
  title: "Find the hours you can get back",
  description: "See where your business is losing time each week.",
};

export default function SaveTimeVersionOnePage() {
  return <SaveTimeQuiz variant="v1" />;
}
