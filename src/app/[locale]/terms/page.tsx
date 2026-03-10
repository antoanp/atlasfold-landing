import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Atlas Fold",
  description:
    "Read the Terms of Service for Atlas Fold local SEO services — service scope, payment terms, guarantee conditions, and cancellation policy.",
  robots: { index: true, follow: true },
};

type Props = { params: Promise<{ locale: string }> };

export default async function TermsPage({ params }: Props) {
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
            Terms of Service
          </h1>
          <p className="mt-4 font-body text-text-secondary">
            These Terms of Service ("Terms") govern the relationship between
            Atlas Fold ("we", "us", "our") and the client ("you", "your") who
            purchases local SEO services from us. By signing up or making a
            payment, you agree to be bound by these Terms.
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              1. Service Description
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Atlas Fold provides Google Business Profile (Google Maps)
              optimisation services with the goal of improving your local search
              ranking in Sofia, Bulgaria. The specific deliverables depend on
              the package you purchase:
            </p>
            <ul className="mt-4 space-y-2 font-body text-text-secondary">
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  ▸
                </span>
                <span>
                  <strong className="text-text-primary">
                    Full competitor analysis
                  </strong>{" "}
                  — a review of the top-ranking competitors in your niche and
                  locality.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  ▸
                </span>
                <span>
                  <strong className="text-text-primary">
                    Google Business Profile optimisation
                  </strong>{" "}
                  — categories, attributes, photos, business description,
                  Q&amp;A, and citation building.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  ▸
                </span>
                <span>
                  <strong className="text-text-primary">
                    Bi-weekly updates
                  </strong>{" "}
                  — ongoing optimisation activities carried out every two weeks
                  throughout the engagement.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  ▸
                </span>
                <span>
                  <strong className="text-text-primary">
                    Website optimisation
                  </strong>{" "}
                  — included in the Standard and Quarterly packages; limited in
                  the Minimum package.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 shrink-0 text-accent">
                  ▸
                </span>
                <span>
                  <strong className="text-text-primary">
                    Authority signal building
                  </strong>{" "}
                  — high-quality local citations and backlinks relevant to your
                  business category.
                </span>
              </li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              We do not manage Google Ads, Meta Ads, or any paid advertising
              channels. Our services are exclusively organic local SEO.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              2. Pricing &amp; Payment Terms
            </h2>
            <p className="mb-4 font-body leading-relaxed text-text-secondary">
              The following packages are available:
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-200 font-body text-sm">
              <table className="w-full">
                <thead className="bg-card">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Package
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Commitment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-text-secondary">
                  <tr>
                    <td className="px-4 py-3">Minimum</td>
                    <td className="px-4 py-3">345 € / month</td>
                    <td className="px-4 py-3">3 months, then monthly</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Standard</td>
                    <td className="px-4 py-3">445 € / month</td>
                    <td className="px-4 py-3">3 months, then monthly</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Quarterly</td>
                    <td className="px-4 py-3">1 185 € / quarter</td>
                    <td className="px-4 py-3">Renews every 3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="mt-4 space-y-2 font-body leading-relaxed text-text-secondary">
              <li>
                • Invoices are issued at the start of each billing period and
                are payable within 5 business days.
              </li>
              <li>
                • All prices are in euros (EUR) and exclude any applicable VAT.
              </li>
              <li>
                • Failure to pay within the agreed period may result in
                suspension of services.
              </li>
              <li>
                • Prices may be revised with 30 days' written notice for ongoing
                clients.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              3. The 90-Day Top 3 Guarantee
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              The <strong className="text-text-primary">Standard</strong> and{" "}
              <strong className="text-text-primary">Quarterly</strong> packages
              include a guarantee: if your business does not reach the Top 3 on
              Google Maps for the agreed primary search term within 90 days of
              service commencement, you will not be charged for the work
              performed in that period (i.e., a full refund of amounts already
              paid is issued, or the outstanding balance is waived).
            </p>
            <p className="mt-4 font-body font-bold text-text-primary">
              Guarantee conditions — the guarantee applies only when:
            </p>
            <ul className="mt-2 space-y-2 font-body leading-relaxed text-text-secondary">
              <li>
                • You have granted us the necessary access to your Google
                Business Profile and website within 5 business days of
                onboarding.
              </li>
              <li>
                • You have not made material changes to your Google Business
                Profile, website, or business name without our knowledge during
                the 90-day period.
              </li>
              <li>
                • Your Google Business Profile was not suspended during the
                engagement for any reason attributable to you.
              </li>
              <li>• Payment has been made on time for all billing periods.</li>
              <li>
                • The agreed primary search term was not changed after the start
                of the engagement.
              </li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              The <strong className="text-text-primary">Minimum</strong> package
              does not include a money-back guarantee. It targets first-page
              visibility, not a guaranteed Top 3 placement.
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              4. Cancellation &amp; Contract Term
            </h2>
            <ul className="space-y-2 font-body leading-relaxed text-text-secondary">
              <li>
                •{" "}
                <strong className="text-text-primary">
                  Minimum &amp; Standard packages
                </strong>
                : require a minimum 3-month commitment. After this initial
                period, you may cancel at any time by providing written notice
                (email) at least 14 days before the next billing date.
              </li>
              <li>
                •{" "}
                <strong className="text-text-primary">Quarterly package</strong>
                : renews automatically every 3 months. You may cancel by
                providing written notice at least 14 days before the renewal
                date.
              </li>
              <li>
                • Cancellation during the minimum commitment period does not
                entitle you to a refund of amounts already paid.
              </li>
              <li>
                • Upon termination, we will remove our access credentials from
                your Google Business Profile and website within 5 business days.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              5. Client Obligations
            </h2>
            <ul className="space-y-2 font-body leading-relaxed text-text-secondary">
              <li>
                • You agree to provide timely access and accurate information
                required for onboarding.
              </li>
              <li>
                • You confirm that you are the legitimate owner or authorised
                manager of the Google Business Profile in question.
              </li>
              <li>
                • You agree not to take actions that may interfere with our
                optimisation work (e.g., removing edits, adding conflicting
                categories, spamming reviews).
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              6. Limitation of Liability
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Local search rankings are determined by Google's algorithms, which
              are outside our control. While we apply industry best practices,
              we cannot guarantee specific ranking positions beyond the Top 3
              guarantee outlined in Section 3. In no event shall Atlas Fold be
              liable for any indirect, incidental, or consequential damages
              arising from the use of our services, including but not limited to
              loss of revenue or business opportunities. Our total liability is
              limited to the amounts paid by you in the most recent billing
              period.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              7. Governing Law
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              These Terms are governed by the laws of the Republic of Bulgaria.
              Any disputes shall be subject to the exclusive jurisdiction of the
              courts of Sofia.
            </p>
          </section>

          {/* 8 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              8. Contact
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              For any questions regarding these Terms, please contact us at{" "}
              <a
                href="mailto:antoan@atlasfold.com"
                className="text-accent hover:underline"
              >
                antoan@atlasfold.com
              </a>{" "}
              or by phone at{" "}
              <a
                href="tel:+359877268727"
                className="text-accent hover:underline"
              >
                +359 877 268 727
              </a>
              .
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
