---
description: Project directory structure, key files, and folder purposes
alwaysApply: true
---

# Directory Structure

## Current State (as of 2026-02-26)

The project is a freshly scaffolded Next.js 16 app (`create-next-app`) with Tailwind CSS v4. No i18n, sections, or custom components have been built yet. The planned architecture (see Target Structure below) must still be implemented.

## Actual Current Structure

```
atlasfold-landing/
├── .cursor/
│   └── rules/                        # AI rules and project specs (8 files)
├── app/
│   ├── favicon.ico                   # Default Next.js favicon
│   ├── globals.css                   # Tailwind v4 @import + CSS variables
│   ├── layout.tsx                    # Root layout (Geist fonts, metadata)
│   └── page.tsx                      # Default starter page (to be replaced)
├── public/
│   ├── file.svg                      # Default Next.js assets (to be removed)
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── reference/                    # Design reference screenshots
│       ├── 01-hero.png
│       ├── 02-advantage.png
│       ├── 03-before-after-after.png
│       ├── 03-before-after-before.png
│       ├── 04-process.png
│       ├── 05-faq.png
│       ├── 06-pricing.png
│       └── profresults-full.png
├── eslint.config.mjs                 # ESLint 9 flat config (core-web-vitals + TS)
├── next.config.ts                    # Next.js config (empty — needs next-intl plugin)
├── next-env.d.ts                     # Next.js TypeScript declarations (auto-generated)
├── package.json                      # Next.js 16.1.6, React 19.2.3, Tailwind v4
├── package-lock.json                 # npm lockfile (project should switch to pnpm)
├── postcss.config.mjs                # PostCSS with @tailwindcss/postcss
├── README.md
└── tsconfig.json                     # TypeScript strict mode, bundler resolution, @/* paths
```

## Cursor Rules (`.cursor/rules/`)

| File                      | Purpose                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `core.mdc`                | Tech stack, architecture, App Router, i18n routing, proxy    |
| `design.mdc`              | Color palette, typography, spacing, Framer Motion animations |
| `copywriting.mdc`         | Tone of voice, translation key conventions, language rules   |
| `sections.mdc`            | Detailed spec for each landing page section                  |
| `performance.mdc`         | Images, fonts, metadata, Core Web Vitals, code splitting     |
| `self-improvement.mdc`    | When and how to update rules                                 |
| `cursor-rules.mdc`        | How to create new `.mdc` rule files                          |
| `directory-structure.mdc` | This file — project map                                      |

## Key Config Files

| File                 | Stack                               | Notes                                                   |
| -------------------- | ----------------------------------- | ------------------------------------------------------- |
| `package.json`       | Next.js 16.1.6, React 19.2.3        | Missing: next-intl, framer-motion, clsx, tailwind-merge |
| `tsconfig.json`      | TypeScript strict, `@/*` path alias | Path alias points to root (not `src/`)                  |
| `next.config.ts`     | Empty config                        | Needs next-intl `createNextIntlPlugin`                  |
| `eslint.config.mjs`  | ESLint 9 flat config                | core-web-vitals + TypeScript rules                      |
| `postcss.config.mjs` | `@tailwindcss/postcss`              | Tailwind v4 PostCSS integration                         |
| `globals.css`        | Tailwind v4 `@import "tailwindcss"` | Needs custom theme tokens from design.mdc               |

## Reference Images (`public/reference/`)

Design screenshots from profresults.com used as visual targets for each section:

- `01-hero.png` — Hero section layout
- `02-advantage.png` — Advantage/pillar cards
- `03-before-after-before.png` / `03-before-after-after.png` — Before/After comparison
- `04-process.png` — 4-step process flow
- `05-faq.png` — FAQ accordion
- `06-pricing.png` — Pricing tiers
- `profresults-full.png` — Full-page reference

## Target Structure (Next.js 16 + App Router + next-intl)

This is what the project should look like once fully built:

```
atlasfold-landing/
├── .cursor/
│   └── rules/                        # AI rules and project specs
├── public/
│   ├── images/                       # Static assets (WebP preferred)
│   └── reference/                    # Design reference screenshots
├── messages/
│   ├── bg.json                       # Bulgarian translations (primary)
│   └── en.json                       # English translations (secondary)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # Root layout with fonts, metadata, next-intl provider
│   │   │   └── page.tsx              # Landing page — composes all section components
│   │   └── globals.css               # Tailwind directives only
│   ├── components/
│   │   ├── sections/
│   │   │   ├── navbar.tsx            # Sticky nav, phone CTA, hamburger menu
│   │   │   ├── hero.tsx              # Full-viewport hero with CTAs and social proof
│   │   │   ├── advantage.tsx         # 3-pillar cards (dark section)
│   │   │   ├── before-after.tsx      # Two-panel comparison with animated counters
│   │   │   ├── process.tsx           # 4-step numbered flow
│   │   │   ├── faq.tsx               # Accordion with Framer Motion
│   │   │   ├── pricing.tsx           # 3-tier pricing cards
│   │   │   └── footer.tsx            # Logo, links, copyright
│   │   └── ui/                       # Shared UI primitives (buttons, badges, etc.)
│   ├── i18n/
│   │   ├── request.ts                # next-intl getRequestConfig
│   │   └── routing.ts                # Locale routing config (bg default, en secondary)
│   └── lib/
│       └── utils.ts                  # cn() helper (clsx + tailwind-merge)
├── proxy.ts                           # Locale detection and redirect logic (Next.js 16 convention)
├── next.config.ts                    # Next.js + next-intl plugin config
├── tsconfig.json                     # TypeScript strict mode (no tailwind.config.ts — Tailwind v4 uses @theme in globals.css)
├── package.json                      # Dependencies (pnpm)
└── pnpm-lock.yaml
```

## What Needs to Change (Current → Target)

1. **Move `app/` into `src/app/`** and add `[locale]/` dynamic segment
2. **Install missing deps**: next-intl, framer-motion, clsx, tailwind-merge
3. **Switch from npm to pnpm** (delete `package-lock.json`, generate `pnpm-lock.yaml`)
4. **Create `messages/`** directory with `bg.json` and `en.json`
5. **Create `src/i18n/`** with `request.ts` and `routing.ts`
6. **Create `src/components/sections/`** with all 8 section components
7. **Create `src/components/ui/`** for shared primitives
8. **Create `src/lib/utils.ts`** with `cn()` helper
9. **Create `proxy.ts`** for locale detection (Next.js 16 uses proxy.ts, not middleware.ts)
10. **Update `next.config.ts`** with next-intl plugin
11. **Update `tsconfig.json`** path alias to point to `src/`
12. **Remove default Next.js SVGs** from `public/` (keep `reference/`)

## Key Conventions

- **Components**: lowercase filenames (`hero.tsx`, not `Hero.tsx`)
- **Utilities**: camelCase filenames (`formatPrice.ts`)
- **Sections**: one component per file in `src/components/sections/`
- **No hardcoded strings**: all user-facing text comes from `messages/*.json` via `useTranslations()`
- **Images**: always in `public/images/`, always use `<Image>` from `next/image`
