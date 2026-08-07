import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { QuizLink } from "@/components/quiz-link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact TJ",
  description: "Contact TJ with a question or message.",
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="shell contact-layout">
        <div className="section-copy">
          <h1>Contact TJ.</h1>
          <p className="lead">
            Questions the site did not answer, existing clients, or anything else.
            Send a note.
          </p>
          <p>TJ replies within one business day.</p>
          <p>
            If you want your leak number, that is{" "}
            <QuizLink className="text-link">the quiz</QuizLink>. This form is for
            everything else.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
