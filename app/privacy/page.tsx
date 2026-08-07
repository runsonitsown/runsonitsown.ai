import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for RunsOnItsOwn.ai.",
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <div className="shell legal-copy">
        <p className="template-marker">
          [TEMPLATE — NOT LEGAL ADVICE — TJ TO REVIEW OR REPLACE WITH
          COUNSEL-APPROVED TEXT]
        </p>

        <h1>Privacy policy</h1>
        <p>Effective date: [TJ TO SUPPLY]</p>

        <h2>Information you send us</h2>
        <p>
          If you use the contact form, we collect the name, email address, and
          message you enter. That information is sent to our customer
          relationship management system so we can read your message, reply,
          and keep a record of the conversation.
        </p>

        <h2>Analytics and advertising</h2>
        <p>
          This site uses Google Analytics 4 to understand how people use the
          site. It also uses the Meta pixel for advertising and retargeting.
          These services may receive information such as the pages you visit,
          actions you take, device and browser information, and an approximate
          location based on your internet address. Google and Meta handle that
          information under their own privacy policies.
        </p>
        <p>
          The site records page views, clicks on quiz links, and successful
          contact-form submissions. We use that information to understand
          whether the site works and to improve our advertising.
        </p>

        <h2>Spam protection</h2>
        <p>
          The contact form uses Cloudflare Turnstile to help block automated
          spam. Cloudflare may process technical information needed to perform
          that check under its own privacy policy.
        </p>

        <h2>How we use and share information</h2>
        <p>
          We use contact-form information to answer you and provide requested
          services. We share it with service providers only as needed to run
          the site, deliver messages to our customer relationship management
          system, measure site use, and run advertising. We do not describe any
          other use here because this template must match what the site
          actually does.
        </p>

        <h2>Your choices</h2>
        <p>
          Browser settings and privacy tools may let you limit cookies or
          similar tracking. Blocking them may affect how parts of the site
          work. You may also contact us to ask about information you submitted
          through the contact form.
        </p>

        <h2>Data retention and security</h2>
        <p>
          [TJ TO SUPPLY OR COUNSEL TO APPROVE THE RETENTION PERIOD.] We use
          reasonable measures intended to protect information, but no internet
          service can promise complete security.
        </p>

        <h2>Children</h2>
        <p>
          This business site is not directed to children. [COUNSEL TO SUPPLY OR
          APPROVE ANY REQUIRED AGE-SPECIFIC LANGUAGE.]
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy when the site or our practices change. The
          effective date above should be updated when a revised policy is
          posted.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy may be sent through the contact page.
          [TJ TO SUPPLY ANY ADDITIONAL CONTACT DETAILS REQUIRED BY COUNSEL.]
        </p>
      </div>
    </article>
  );
}
