"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";

const allLinks = [
  { href: "#advantage", key: "links.advantage" },
  { href: "#before-after", key: "links.beforeAfter" },
  { href: "#process", key: "links.process" },
  { href: "#faq", key: "links.faq" },
  { href: "#pricing", key: "links.pricing" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();

  const [open, setOpen] = useState<boolean>(false);

  /**
   * If the locale is the default locale, the home href is the root "/".
   * If the locale is not the default locale, the home href is the root "/<locale>".
   */
  const homeHref = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return (
    <nav className="sticky top-0 z-50 bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-2.5">
          <Image
            src="/images/atlasfold-logo.png"
            alt={t("logo")}
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="font-display text-lg font-bold tracking-tight text-text-primary">
            {t("logo")}
          </span>
        </Link>

        <div className="hidden items-center gap-7 font-body text-sm md:flex">
          {/* Same-page anchor scrolls — not routes. The <Link> is designed for route navigation since it prefetches the target page's JS bundle.*/}
          {allLinks.map(({ href, key }) => (
            <a
              key={href}
              href={href}
              className="text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              {t(key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* tel: protocol — not a route. The <Link> is designed for route navigation since it prefetches the target page's JS bundle. */}
          <a
            href={`tel:${t("phone")}`}
            className="hidden items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-cta/90 md:inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                clipRule="evenodd"
              />
            </svg>
            {t("phoneCta")}
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex md:hidden size-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-card"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4">
              {/* Same-page anchor scrolls — not routes. The <Link> is designed for route navigation since it prefetches the target page's JS bundle. */}
              {allLinks.map(({ href, key }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-body text-sm text-text-secondary transition-colors hover:bg-card hover:text-text-primary"
                >
                  {t(key)}
                </a>
              ))}
              {/* tel: protocol - not a route. The <Link> is designed for route navigation since it prefetches the target page's JS bundle. */}
              <a
                href={`tel:${t("phone")}`}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("phoneCta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
