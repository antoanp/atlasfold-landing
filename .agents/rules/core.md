---
description: Core project identity, stack, and architecture rules
alwaysApply: true
---

# Project: Local SEO Landing Page — Sofia, Bulgaria

## Identity
This is a high-conversion landing page for a Local SEO service targeting local businesses in Sofia, Bulgaria. The goal is to rank client businesses in the Top 3 on Google Maps.

## Tech Stack
- Framework: Next.js 16 (or the latest version up to date) with App Router
- Styling: Tailwind CSS v4 — utility classes only, no custom CSS files unless unavoidable
- Animations: Framer Motion for scroll-triggered and entrance animations
- i18n: next-intl with /messages/bg.json (primary) and /messages/en.json (secondary)
- Language: TypeScript strict mode throughout
- Package manager: pnpm

## Architecture Rules
- Use server components by default. Only add "use client" when interactivity is required
- Every section of the landing page is its own component in /components/sections/
- No hardcoded user-facing strings in components — all copy lives in /messages/*.json
- Use the useTranslations() hook from next-intl for all text
- Images go in /public/images/ and use Next.js <Image> component always

## File Naming
- Components: lowercase (hero.tsx, pricing.tsx)
- Utilities: camelCase (formatPrice.ts)
- Translation keys: dot-notation in JSON (hero.headline, pricing.standard.title)

## Routing
- Default locale: bg (Bulgarian)
- Secondary locale: en (English)
- URL structure: /bg/* and /en/*

# Proxy (proxy.ts)
- Next.js 16 uses `proxy.ts` at the project root (not `middleware.ts`). Export the default function — do NOT export a named `middleware()`.
- Proxy must check if the pathname contains a supported locale (either 'bg' or 'en').
- If the pathname does not start with an existing locale segment, serve the landing page in the default locale ('bg') WITHOUT appending the locale to the URL.
- If the pathname contains an unsupported or missing locale segment, redirect the user to the equivalent path with the default locale ('bg').
- Never expose or append 'bg' to the root URL for the default landing page; i.e., '/' serves as '/bg' without changing the URL. For all other routes, ensure the locale segment is present and valid.
- This locale check and fallback must apply for all routes except those explicitly excluded (e.g., static/next assets or API routes as needed).