import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Atlas Fold",
  description:
    "Atlas Fold Cookie Policy — we use Vercel Analytics, which is cookieless. No tracking cookies are set on this website.",
  robots: { index: true, follow: true },
};

type Props = { params: Promise<{ locale: string }> };

export default async function CookiePage({ params }: Props) {
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
            Cookie Policy
          </h1>
          <p className="mt-4 font-body leading-relaxed text-text-secondary">
            This Cookie Policy explains how Atlas Fold uses — or more
            accurately, does <em>not</em> use — cookies on the{" "}
            <strong className="text-text-primary">atlasfold.com</strong>{" "}
            website.
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              1. What Are Cookies?
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Cookies are small text files placed on your device by a website to
              store information about your visit — typically used for analytics,
              advertising, and session management.
            </p>
          </section>

          {/* 2 — the main point */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              2. We Don&apos;t Use Tracking Cookies
            </h2>

            {/* Highlight callout */}
            <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-5">
              <p className="font-body font-semibold text-green-800">
                ✓ No tracking cookies are set on this website.
              </p>
              <p className="mt-1 font-body text-sm text-green-700">
                We do not use Google Analytics, Meta Pixel, or any other
                cookie-based tracking tools.
              </p>
            </div>

            <p className="mt-6 font-body leading-relaxed text-text-secondary">
              This website uses{" "}
              <strong className="text-text-primary">Vercel Analytics</strong>{" "}
              and{" "}
              <strong className="text-text-primary">
                Vercel Speed Insights
              </strong>{" "}
              to understand page performance and visitor trends. Both tools are{" "}
              <strong className="text-text-primary">
                cookieless by design
              </strong>{" "}
              — they use server-side edge data and aggregate metrics without
              setting any cookies or fingerprinting individual users.
            </p>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              Vercel Analytics does not:
            </p>
            <ul className="mt-3 space-y-1 font-body text-text-secondary">
              <li>• Set any first-party or third-party cookies</li>
              <li>• Collect personally identifiable information</li>
              <li>
                • Track users across different websites or sessions over time
              </li>
              <li>• Use IP addresses for individual identification</li>
            </ul>
            <p className="mt-4 font-body leading-relaxed text-text-secondary">
              You can read more about Vercel&apos;s privacy model at{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                vercel.com/docs/analytics/privacy-policy
              </a>
              .
            </p>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              3. Embedded Content
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Our website embeds a{" "}
              <strong className="text-text-primary">Google Maps iframe</strong>{" "}
              in the footer to show our location. When this iframe loads, Google
              may set its own cookies on your device in accordance with
              Google&apos;s privacy policy. This is the only third-party element
              present on the site that may involve cookies. You can review
              Google&apos;s cookie practices at{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                policies.google.com/technologies/cookies
              </a>
              .
            </p>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              4. Your Browser Controls
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              Even though we don&apos;t set tracking cookies, you always have
              full control via your browser settings. You can view, block, or
              delete any cookies stored by any website through your
              browser&apos;s privacy or security settings.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-bold text-text-primary">
              5. Contact
            </h2>
            <p className="font-body leading-relaxed text-text-secondary">
              If you have any questions about this Cookie Policy, please contact
              us at{" "}
              <a
                href="mailto:antoan@atlasfold.com"
                className="text-accent hover:underline"
              >
                antoan@atlasfold.com
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
