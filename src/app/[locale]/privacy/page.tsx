import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas Fold",
  description:
    "Atlas Fold Privacy Policy — what personal data we collect, how it is stored in Notion, your rights under GDPR, and how to request deletion.",
  robots: { index: true, follow: true },
};

type Props = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-page">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href={`/${locale}`}
            className="mb-10 inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Back to home
          </Link>

          <p className="mb-2 font-body text-sm text-text-secondary">
            Last updated: March 2026
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body leading-relaxed text-text-secondary">
            Atlas Fold ("we", "us", "our") is committed to protecting your
            personal data. This Privacy Policy explains what information we
            collect, how we use it, where it is stored, and what rights you have
            under the General Data Protection Regulation (GDPR) and applicable
            Bulgarian law.
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              1. Data Controller
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              The data controller is:
            </p>
            <address className="mt-3 space-y-1 font-body not-italic leading-relaxed text-text-secondary">
              <p className="font-bold text-text-primary">Atlas Fold</p>
              <p>Sofia, Bulgaria</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:antoan@atlasfold.com"
                  className="text-accent hover:underline"
                >
                  antoan@atlasfold.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+359877268727"
                  className="text-accent hover:underline"
                >
                  +359 877 268 727
                </a>
              </p>
            </address>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              2. What Data We Collect
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              We collect personal data that you voluntarily provide when you
              fill out the lead capture form on our website. Specifically, we
              collect:
            </p>
            <ul className="mt-4 space-y-2 font-body leading-relaxed text-text-secondary">
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-accent">▸</span>
                <span>
                  <strong className="text-text-primary">Full name</strong> — so
                  we know who we are contacting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-accent">▸</span>
                <span>
                  <strong className="text-text-primary">Phone number</strong> —
                  to call you within 24 hours as stated on the form.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-accent">▸</span>
                <span>
                  <strong className="text-text-primary">City</strong> — to
                  understand your service area and tailor our analysis.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-accent">▸</span>
                <span>
                  <strong className="text-text-primary">Industry</strong> — to
                  assess your niche competition before we call.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-accent">▸</span>
                <span>
                  <strong className="text-text-primary">
                    Selected package
                  </strong>{" "}
                  — the pricing tier you indicated interest in.
                </span>
              </li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              We do not collect sensitive personal data (e.g., health, financial
              account details, national ID numbers).
            </p>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              3. How We Use Your Data
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Your data is used solely for the purpose of:
            </p>
            <ul className="mt-3 space-y-1 font-body leading-relaxed text-text-secondary">
              <li>
                • Contacting you to discuss your free Google Maps analysis
              </li>
              <li>
                • Qualifying you as a potential client and preparing a tailored
                proposal
              </li>
              <li>
                • Maintaining a record of our communication for follow-up
                purposes
              </li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              We do not use your data for automated decision-making or
              profiling.
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              4. Legal Basis for Processing
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              We process your data on the basis of{" "}
              <strong className="text-text-primary">legitimate interest</strong>{" "}
              (Art. 6(1)(f) GDPR) — specifically, our legitimate interest in
              following up on your explicit request for a free analysis. By
              submitting the form, you are initiating contact with us and
              expecting a response.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              5. Where Your Data Is Stored
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Submitted form data is stored in a private{" "}
              <strong className="text-text-primary">Notion</strong> workspace
              accessible only to Atlas Fold. Notion is a cloud-based tool
              operated by Notion Labs, Inc. (USA), which provides adequate data
              protection through its GDPR compliance measures. No other third
              parties have access to your data.
            </p>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              A notification email is also sent to an internal Atlas Fold email
              address via <strong className="text-text-primary">Resend</strong>{" "}
              (a transactional email service) at the moment of form submission.
              Resend does not store the content of the email beyond transient
              delivery logging.
            </p>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              6. Data Sharing &amp; Third Parties
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              We do not sell, rent, or share your personal data with any third
              parties for marketing or commercial purposes. Your data is never
              used for advertising targeting or sold to data brokers.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              7. Data Retention
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              We keep your data for as long as there is an active business
              relationship or a reasonable follow-up period (typically up to 12
              months after your last contact with us). If you become a client,
              we retain relevant records for the duration of our engagement and
              up to 5 years thereafter, as required by Bulgarian accounting and
              commercial law.
            </p>
          </section>

          {/* 8 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              8. Your Rights
            </h2>
            <p className="mb-3 font-body leading-relaxed text-text-secondary">
              Under the GDPR, you have the following rights:
            </p>
            <ul className="space-y-2 font-body leading-relaxed text-text-secondary">
              <li>
                <strong className="text-text-primary">Right of access</strong> —
                you can request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-text-primary">
                  Right to rectification
                </strong>{" "}
                — you can ask us to correct inaccurate data.
              </li>
              <li>
                <strong className="text-text-primary">
                  Right to erasure ("right to be forgotten")
                </strong>{" "}
                — you can request deletion of your personal data. We will action
                this within 30 days.
              </li>
              <li>
                <strong className="text-text-primary">
                  Right to restriction
                </strong>{" "}
                — you can ask us to stop processing your data in certain
                circumstances.
              </li>
              <li>
                <strong className="text-text-primary">Right to object</strong> —
                you can object to processing based on legitimate interest.
              </li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              To exercise any of these rights, please email us at{" "}
              <a
                href="mailto:antoan@atlasfold.com"
                className="text-accent hover:underline"
              >
                antoan@atlasfold.com
              </a>{" "}
              with the subject line <em>"Data Request — [your name]"</em>. We
              will respond within 30 days.
            </p>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              You also have the right to lodge a complaint with the{" "}
              <strong className="text-text-primary">
                Commission for Personal Data Protection
              </strong>{" "}
              (CPDP) of Bulgaria at{" "}
              <a
                href="https://www.cpdp.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                www.cpdp.bg
              </a>
              .
            </p>
          </section>

          {/* 9 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              9. Policy Updates
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              We may update this Privacy Policy from time to time. The "Last
              updated" date at the top of this page reflects the most recent
              revision. We encourage you to review this page periodically.
            </p>
          </section>

          <hr className="my-10 border-gray-200" />

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 font-body text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
