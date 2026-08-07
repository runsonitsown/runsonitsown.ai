import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the RunsOnItsOwn.ai website.",
};

export default function TermsPage() {
  return (
    <article className="legal-page">
      <div className="shell legal-copy">
        <p className="template-marker">
          [TEMPLATE — NOT LEGAL ADVICE — TJ TO REVIEW OR REPLACE WITH
          COUNSEL-APPROVED TEXT]
        </p>

        <h1>Terms of use</h1>
        <p>Effective date: [TJ TO SUPPLY]</p>

        <h2>Agreement to these terms</h2>
        <p>
          These terms apply when you use this website. If you do not agree with
          them, do not use the site.
        </p>

        <h2>Information on this site</h2>
        <p>
          The site provides general information about RunsOnItsOwn.ai and its
          services. Site content is not legal, financial, tax, or other
          professional advice. The information may be changed or removed at any
          time.
        </p>

        <h2>No promise of results</h2>
        <p>
          Examples, estimates, and descriptions of possible results are not
          guarantees. Your results depend on your business, the information you
          provide, the tools you choose, and other factors outside our control.
          See the disclaimer page for more information.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site, try to interfere with its operation, attempt
          to gain access to systems or information you are not authorized to
          access, submit unlawful material, or use the contact form to send
          spam.
        </p>

        <h2>Ownership</h2>
        <p>
          Unless stated otherwise, the site design, text, graphics, and other
          original site content belong to [LEGAL OWNER NAME: TJ TO SUPPLY] or
          are used with permission. You may view the site for your own lawful
          use. These terms do not transfer ownership of site content to you.
        </p>

        <h2>Third-party services and links</h2>
        <p>
          The site may refer or link to products and services provided by other
          companies. Those companies control their own products, prices,
          subscriptions, policies, and availability. We are not responsible for
          a third party's website or service.
        </p>

        <h2>Availability</h2>
        <p>
          We may change, suspend, or stop any part of the site. We do not
          promise that the site will always be available or free from errors.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          [COUNSEL TO SUPPLY OR APPROVE THE LIMITATION OF LIABILITY LANGUAGE
          THAT APPLIES TO THE LEGAL OWNER AND ITS LOCATION.]
        </p>

        <h2>Governing law and disputes</h2>
        <p>
          [COUNSEL TO SUPPLY THE GOVERNING LAW, VENUE, AND DISPUTE TERMS. NO
          JURISDICTION HAS BEEN ASSUMED IN THIS TEMPLATE.]
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may revise these terms. The effective date above should be updated
          when revised terms are posted. Continued use of the site after a
          change means the revised terms apply to that later use.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms may be sent through the contact page.
          [TJ TO SUPPLY ANY ADDITIONAL CONTACT DETAILS REQUIRED BY COUNSEL.]
        </p>
      </div>
    </article>
  );
}
