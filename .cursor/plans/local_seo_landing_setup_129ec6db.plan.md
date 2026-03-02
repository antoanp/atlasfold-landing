---
name: Local SEO Landing Setup
overview: "Scaffold the full project infrastructure for a Next.js 16 + Tailwind v4 + next-intl landing page: dependencies, i18n routing, design tokens, component stubs, and locale-aware page composition."
todos:
  - id: deps
    content: Switch to pnpm, install next-intl + framer-motion + clsx + tailwind-merge
    status: pending
  - id: restructure
    content: Move app/ to src/app/[locale]/, update tsconfig paths, delete old files
    status: pending
  - id: tailwind-tokens
    content: Replace globals.css with @theme design tokens (colors, font vars)
    status: pending
  - id: i18n-config
    content: Create src/i18n/routing.ts, request.ts, navigation.ts
    status: pending
  - id: proxy
    content: Create proxy.ts with next-intl createMiddleware, update next.config.ts
    status: pending
  - id: messages
    content: Create messages/bg.json and messages/en.json with ALL section copy
    status: pending
  - id: layout
    content: Build src/app/[locale]/layout.tsx with fonts, NextIntlClientProvider, metadata
    status: pending
  - id: components
    content: Scaffold all section/layout/ui component stubs with TypeScript interfaces
    status: pending
  - id: cn-util
    content: Create src/lib/cn.ts (clsx + tailwind-merge)
    status: pending
  - id: main-page
    content: Build src/app/[locale]/page.tsx with dynamic imports and scroll anchors
    status: pending
  - id: cleanup
    content: Delete default SVGs and old app/ files
    status: pending
  - id: verify
    content: Run pnpm dev, confirm zero TS errors, test / and /en routes
    status: pending
isProject: false
---

# Local SEO Landing Page -- Project Setup

## 0. Dependencies and Package Manager

Switch from npm to pnpm and install all missing packages.

- Delete `package-lock.json`
- Run `pnpm install` to regenerate the lockfile
- Install runtime deps: `pnpm add next-intl framer-motion clsx tailwind-merge`
- Verify with `pnpm ls` that all versions resolve correctly

Final dependency additions to [package.json](package.json):

- `next-intl` (latest ~4.8.x)
- `framer-motion` (latest)
- `clsx` + `tailwind-merge` (for the `cn()` utility)

---

## 1. Tailwind v4 Design Tokens (no tailwind.config.ts)

Tailwind v4 configures everything via CSS `@theme` in [app/globals.css](app/globals.css). This file will be moved to `src/app/globals.css` during restructure.

Replace the current contents with:

```css
@import "tailwindcss";

@theme {
  --color-white: #FFFFFF;
  --color-black: #0A0A0A;
  --color-accent: #1A56DB;
  --color-gray-500: #6B7280;
  --color-success: #16A34A;

  --font-display: var(--font-syne);
  --font-body: var(--font-dm-sans);
}
```

Key points:

- Colors from [design.mdc](.cursor/rules/design.mdc): white (#FFFFFF), near-black (#0A0A0A), accent blue (#1A56DB), gray-500 (#6B7280), success green (#16A34A)
- Font CSS variables (`--font-syne`, `--font-dm-sans`) are set by `next/font/google` in the layout -- the `@theme` block references them
- Remove the dark mode media query and Geist font references
- No `tailwind.config.ts` file needed

---

## 2. Project Restructure

Move from flat `app/` to `src/app/[locale]/` structure.

### File moves:

- `app/globals.css` --> `src/app/globals.css`
- `app/layout.tsx` --> deleted (replaced by new locale layout)
- `app/page.tsx` --> deleted (replaced by new locale page)
- `app/favicon.ico` --> `src/app/favicon.ico`

### New directories to create:

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
    globals.css
    favicon.ico
  components/
    sections/    (hero, advantage, before-after, process, faq, pricing)
    layout/      (navbar, footer)
    ui/          (button, section-wrapper)
  i18n/
    routing.ts
    request.ts
    navigation.ts
  lib/
    cn.ts
messages/
  bg.json
  en.json
```

### tsconfig.json update:

Change the path alias from `"./*"` to `"./src/*"` so `@/` resolves to `src/`:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

---

## 3. next-intl i18n Setup

### 3a. `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'en'],
  defaultLocale: 'bg',
  localePrefix: 'as-needed'   // '/' serves bg without /bg prefix
});
```

`localePrefix: 'as-needed'` satisfies the middleware rule: root `/` serves Bulgarian content without changing the URL, while `/en/` is explicit.

### 3b. `src/i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

### 3c. `src/i18n/navigation.ts`

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, useRouter, usePathname } = createNavigation(routing);
```

### 3d. `proxy.ts` (project root -- Next.js 16 convention)

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

### 3e. `next.config.ts` update

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

---

## 4. Fonts (Syne + DM Sans)

In `src/app/[locale]/layout.tsx`, load both fonts via `next/font/google` with Cyrillic support:

```typescript
import { Syne } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

const syne = Syne({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
  display: 'swap',
});
```

Note: Syne on Google Fonts supports Latin/Latin-ext but does not have a dedicated Cyrillic subset. DM Sans also lacks native Cyrillic. We will request `latin` and `latin-ext` subsets. If Bulgarian Cyrillic glyphs are needed, a system fallback (e.g., `sans-serif`) will render them. This is a known limitation worth flagging at build time.

---

## 5. Root Layout (`src/app/[locale]/layout.tsx`)

Key responsibilities:

- Apply font CSS variables to `<body>`
- Set `<html lang={locale}>` dynamically from the `[locale]` param
- Wrap children with `NextIntlClientProvider` and pass `messages`
- Export `generateMetadata()` for per-locale SEO metadata with hreflang alternates
- Import `globals.css`

Metadata will include:

- Title: locale-specific (e.g., "Локално SEO за бизнеси в София | Топ 3 в Google")
- Description: locale-specific
- OpenGraph: title, description, locale, url
- Alternates: `hreflang` links for bg and en
- Viewport, robots, etc.

---

## 6. Translation Files

### `messages/bg.json`

Complete Bulgarian copy for all sections based on [copywriting.mdc](.cursor/rules/copywriting.mdc) and [sections.mdc](.cursor/rules/sections.mdc):

- `nav.*` -- links, phone CTA
- `hero.*` -- headline, subheadline, CTAs, stats
- `advantage.*` -- title, 3 card titles + descriptions
- `beforeAfter.*` -- title, tabs, metrics, business example
- `process.*` -- title, 4 steps with titles + descriptions
- `faq.*` -- title, 5-6 questions with answers
- `pricing.*` -- title, 3 tiers with all details, features, CTAs
- `footer.*` -- tagline, links, copyright
- `metadata.*` -- page title, description for SEO

### `messages/en.json`

Culturally adapted English version (not literal translation) with the same key structure.

---

## 7. Component Scaffolding

Each file exports a named component with proper TypeScript interface. Components are stubs (placeholder content with correct structure) to be filled in later.


| File                                       | Type                               | Key props                             |
| ------------------------------------------ | ---------------------------------- | ------------------------------------- |
| `src/components/sections/hero.tsx`         | `"use client"` (animations)        | none                                  |
| `src/components/sections/advantage.tsx`    | `"use client"` (animations)        | none                                  |
| `src/components/sections/before-after.tsx` | `"use client"` (tabs, counters)    | none                                  |
| `src/components/sections/process.tsx`      | `"use client"` (animations)        | none                                  |
| `src/components/sections/faq.tsx`          | `"use client"` (accordion state)   | none                                  |
| `src/components/sections/pricing.tsx`      | `"use client"` (animations)        | none                                  |
| `src/components/layout/navbar.tsx`         | `"use client"` (scroll, hamburger) | none                                  |
| `src/components/layout/footer.tsx`         | server component                   | none                                  |
| `src/components/ui/button.tsx`             | server component                   | `variant`, `size`, `href`, `children` |
| `src/components/ui/section-wrapper.tsx`    | server component                   | `id`, `className`, `children`         |
| `src/lib/cn.ts`                            | utility                            | `cn(...inputs)` via clsx + twMerge    |


Each section stub will:

- Import and use `useTranslations()` from `next-intl`
- Have the correct `id` attribute for scroll anchoring
- Use `SectionWrapper` for consistent padding/max-width
- Render a placeholder `<div>` with the section name

---

## 8. Main Page (`src/app/[locale]/page.tsx`)

```typescript
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/hero';

const Advantage = dynamic(() => import('@/components/sections/advantage').then(m => m.Advantage));
const BeforeAfter = dynamic(() => import('@/components/sections/before-after').then(m => m.BeforeAfter));
const Process = dynamic(() => import('@/components/sections/process').then(m => m.Process));
const Faq = dynamic(() => import('@/components/sections/faq').then(m => m.Faq));
const Pricing = dynamic(() => import('@/components/sections/pricing').then(m => m.Pricing));
```

Section order: Navbar --> Hero --> Advantage --> BeforeAfter --> Process --> FAQ --> Pricing --> Footer.

Navbar and Footer are rendered in layout.tsx (persistent across pages), not in page.tsx.

---

## 9. Cleanup

- Delete default SVGs from `public/`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- Delete old `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Keep `public/reference/` intact

---

## 10. Verification

- Run `pnpm dev` and confirm:
  - No TypeScript errors
  - `/` renders the page in Bulgarian (no `/bg` in URL)
  - `/en` renders the page in English
  - All section stubs are visible on the page
  - Fonts load without layout shift

