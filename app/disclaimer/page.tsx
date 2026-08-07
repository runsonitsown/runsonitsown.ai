import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Results and estimate disclaimer for RunsOnItsOwn.ai.",
};

export default function DisclaimerPage() {
  return (
    <article className="legal-page">
      <div className="shell legal-copy">
        <p className="template-marker">
          [TEMPLATE — NOT LEGAL ADVICE — TJ TO REVIEW OR REPLACE WITH
          COUNSEL-APPROVED TEXT]
        </p>

        <h1>Results disclaimer</h1>
        <p>Effective date: [TJ TO SUPPLY]</p>

        <h2>Estimates, not promises</h2>
        <p>
          Any hour, cost, savings, return-on-investment, or other result shown
          on this site, in the quiz, or in a report is an estimate. It is not a
          promise or guarantee of what you will achieve.
        </p>

        <h2>How quiz and report figures are calculated</h2>
        <p>
          Figures are computed from the answers and numbers the visitor
          provides, together with the assumptions explained in the result or
          report. If the answers, numbers, or assumptions change, the estimate
          may change. An estimate may identify time that could be reclaimed. It
          does not mean every hour can or will be recovered in practice.
        </p>

        <h2>Individual results vary</h2>
        <p>
          Results are not typical or guaranteed. They vary by business,
          industry, team, current process, chosen tools, implementation,
          continued use, and other circumstances. A result described by another
          person would not establish what you will achieve.
        </p>

        <h2>No income guarantee</h2>
        <p>
          RunsOnItsOwn.ai does not guarantee that you will earn income, increase
          revenue, reduce costs, or make a profit. Saving time does not by
          itself create income. Business decisions and financial outcomes
          remain your responsibility.
        </p>

        <h2>No financial advice</h2>
        <p>
          Nothing on this site, in the quiz, or in a report is financial,
          accounting, tax, legal, or investment advice. Consider advice from a
          qualified professional when your decision calls for it.
        </p>

        <h2>Third-party tools</h2>
        <p>
          Tools discussed or recommended are made and controlled by other
          companies. RunsOnItsOwn.ai does not control their prices, features,
          availability, policies, or future changes. The client chooses and
          owns any subscription purchased from those companies at their normal
          public prices.
        </p>

        <h2>Your responsibility</h2>
        <p>
          You are responsible for reviewing recommendations and deciding what
          is appropriate for your business. You are also responsible for how
          you configure and use third-party tools after they are installed.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer may be sent through the contact page.
          [TJ TO SUPPLY ANY ADDITIONAL CONTACT DETAILS REQUIRED BY COUNSEL.]
        </p>
      </div>
    </article>
  );
}
