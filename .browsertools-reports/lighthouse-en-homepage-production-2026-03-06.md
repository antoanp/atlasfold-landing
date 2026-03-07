# Lighthouse Audit Report — Production Build

**URL**: [http://localhost:3000/](http://localhost:3000/)
**Locale**: en (served via default locale fallback)
**Date**: 2026-03-06
**Tool**: BrowserTools MCP (Google Lighthouse 11.7.1)
**Environment**: Production (`pnpm build && pnpm start`)

## Scores


| Category       | Score   | Rating  |
| -------------- | ------- | ------- |
| Accessibility  | 94/100  | Pass    |
| Performance    | 77/100  | Warning |
| SEO            | 100/100 | Pass    |
| Best Practices | 100/100 | Pass    |


## Core Web Vitals


| Metric | Value | Target  | Status   |
| ------ | ----- | ------- | -------- |
| LCP    | 4.3s  | < 2.5s  | **Fail** |
| CLS    | 0     | < 0.1   | Pass     |
| TBT    | 0ms   | < 200ms | Pass     |
| FCP    | 915ms | < 1.8s  | Pass     |
| TTI    | 915ms | < 3.8s  | Pass     |
| SI     | 915ms | < 3.4s  | Pass     |


## Page Stats


| Stat                 | Value  | vs Dev Mode         |
| -------------------- | ------ | ------------------- |
| Total size           | 431 KB | -62% (was 1,136 KB) |
| Total requests       | 24     | -35% (was 37)       |
| JS files             | 11     | -54% (was 24)       |
| CSS files            | 1      | same                |
| Images               | 3      | same                |
| Fonts                | 7      | same                |
| Main thread blocking | 152ms  | -75% (was 599ms)    |
| Third-party size     | 0 KB   | same                |


## Dev vs Production Comparison


| Metric               | Dev (Turbopack) | Production | Change |
| -------------------- | --------------- | ---------- | ------ |
| Performance score    | 76              | 77         | +1     |
| Accessibility score  | 95              | 94         | -1     |
| SEO score            | 100             | 100        | same   |
| Best Practices score | 100             | 100        | same*  |
| LCP                  | 4.6s            | 4.3s       | -7%    |
| FCP                  | 1.0s            | 915ms      | -11%   |
| CLS                  | 0               | 0          | same   |
| TBT                  | 54ms            | 0ms        | -100%  |
| TTI                  | 8.0s            | 915ms      | -88%   |
| Bundle size          | 1,136 KB        | 431 KB     | -62%   |
| JS files             | 24              | 11         | -54%   |


*Dev mode had a source maps warning; production has zero best practices issues.

## Performance Issues

### 1. LCP at 4.3s (Target: < 2.5s) — PERSISTS IN PRODUCTION

- **Impact**: high
- **Metric**: LCP
- **Issue**: The LCP remains at 4.3s even after full production optimization. The 3.4s gap between FCP (915ms) and LCP (4.3s) strongly indicates font-swap delay. The LCP element is almost certainly the Hero H1 text — it uses the Syne display font (`font-display: swap`), which means the browser first paints with a system fallback font, then repaints when the custom font loads. Lighthouse records the LCP at the final repaint.
- **Contributing factors**:
  - **7 font files** for 3 font families (Syne, Playfair Display, DM Sans) — each family may load multiple weights
  - **Render-blocking CSS** — one CSS file (155ms potential savings) blocks initial render
  - **Client component hydration** — Hero is `'use client'` and depends on `useTranslations()` for its H1 content. Even though SSR renders the HTML, the LCP may be delayed until hydration completes.
  - **Localhost environment** — Lighthouse applies simulated throttling. On a real CDN (Vercel/Cloudflare), font delivery and TTFB would be faster.
- **Recommended fixes** (priority order):
  1. **Preload the primary display font** — Add `preload: true` to the Syne font config in `layout.tsx`, or manually add a `<link rel="preload">` for the Syne font file. This ensures the font loads before LCP is measured.
  2. **Reduce font file count** — Currently loading 7 font files. Consider: (a) limit Syne to a single weight (700/800), (b) limit DM Sans to regular + semibold only, (c) Playfair Display to italic only. Use `weight` parameter in `next/font/google`.
  3. **Convert Hero to server component** — The Hero currently uses `'use client'` only for `useTranslations()`. If moved to a server component using `getTranslations()` instead, the H1 text renders without waiting for JS hydration.
  4. **Inline critical CSS** — Next.js should handle this automatically in production, but verify the single CSS file isn't excessively large.
  5. **Re-audit on Vercel** — Localhost doesn't benefit from CDN edge caching or HTTP/2 push. Real-world LCP will likely be lower.

### 2. Render-Blocking CSS (minor)

- **Impact**: low
- **Metric**: FCP / LCP
- **Issue**: One CSS file (`0f9eaa1ff35e3ee2.css`) with 155ms potential savings flagged as render-blocking.
- **Fix**: This is standard Next.js CSS output. No immediate action needed — the 155ms savings is minor compared to the 4.3s LCP.

## Accessibility Issues

### 1. Color Contrast — CTA Buttons (white on olive-green)

- **Impact**: high
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Elements**: Navbar "Call Us" button, Hero "Get a Free Analysis" CTA, all three Pricing "Get Started" CTAs
- **Issue**: White text (#FFFFFF) on olive-green (#7C9A2D) background has contrast ratio 3.22:1. WCAG AA requires 4.5:1 for normal text.
- **Fix**: Darken the CTA color. Options:
  - Darken `--color-cta` to #5C7A1A (contrast ~4.8:1) — maintains olive tone
  - Or use dark text (#0A0A0A) on the olive button — contrast would be excellent but changes visual feel
  - Update in `globals.css` `@theme` block

### 2. Color Contrast — Secondary Text on Beige

- **Impact**: medium
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Elements**: Navbar links, Hero subheadline, Hero stat labels, Before/After inactive tab
- **Issue**: Gray text (#6B7280) on beige (#F5F0EB) at 4.26:1. Just 0.24 short of the 4.5:1 requirement.
- **Fix**: Darken `--color-text-secondary` to #565E6C (~~4.7:1) or #5B6370 (~~4.5:1). Update in `globals.css` `@theme` block.

### 3. Color Contrast — Success/Green Text on Beige

- **Impact**: high
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Element**: Hero location badge "● Sofia, Bulgaria"
- **Issue**: Green (#16A34A) on beige (#F5F0EB) at 2.91:1 — significantly below threshold.
- **Fix**: Use green-700 (#15803D, ~3.8:1) or green-800 (#166534, ~5.5:1). For the location badge specifically, consider using text-primary for the text and a green dot icon.

### 4. Color Contrast — Save Badge (white on green)

- **Impact**: medium
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Element**: Pricing "Save €150" badge
- **Issue**: White on green (#16A34A) at 3.29:1.
- **Fix**: Use green-700 (#15803D) for badge background, or switch to dark text on light green (bg-green-100 text-green-800).

### 5. Redundant Alt Text on Logo

- **Impact**: low
- **WCAG**: Best practice (a11y-names-labels)
- **Element**: Logo `<img alt="AtlasFold">` + adjacent `<span>AtlasFold</span>`
- **Issue**: Screen readers announce "AtlasFold AtlasFold".
- **Fix**: Set `alt=""` on the logo `<Image>` component since the span provides the text.

## Best Practices Issues

None. Perfect 100/100.

## SEO Issues (Local SEO Priority)

Lighthouse SEO: 100/100. All technical checks pass. The following issues are project-specific (from seo-principles.mdc):

### 1. Missing Google Maps Embed

- **Impact**: high
- **Type**: structural
- **SEO rule**: seo-principles.mdc §1.3
- **Issue**: No visible Google Maps `<iframe>` on the homepage. Schema has `hasMap` URL but no embedded widget.
- **Fix**: Add a Google Maps embed in the footer adjacent to the NAP block.

### 2. Placeholder CTA Links (`href="#"`)

- **Impact**: medium
- **Type**: structural
- **Issue**: All three Pricing "Get Started" buttons are dead links.
- **Fix**: Link to a contact form, booking page, or conversion URL.

### 3. Empty `sameAs` in JSON-LD

- **Impact**: medium
- **Type**: structural
- **Issue**: LocalBusiness and Organization schemas have empty `sameAs` arrays.
- **Fix**: Add GBP URL, social media profile URLs.

### 4. Title Tag Format Verification Needed

- **Impact**: medium
- **Type**: content
- **SEO rule**: seo-principles.mdc §1.1
- **Issue**: Title comes from translation files. Needs verification against `BEST + category + city + services + near me` format.

### 5. Logo Uses og-image.png

- **Impact**: low
- **Type**: content
- **Issue**: 1200x630 OG image served at 32x32 in the navbar. Wastes bandwidth, is not a real logo.
- **Fix**: Create a proper small logo asset.

## Console Errors

None detected.

## Network Errors

None detected.

## Local SEO Checklist

- Title tag follows `BEST + category + city + services + near me` format — needs content verification
- Exactly one H1 per page
- H2s present for each landing page section
- Meta description present and keyword-rich
- LocalBusiness JSON-LD schema in `<head>`
- FAQ JSON-LD schema in `<head>`
- NAP in footer as plain crawlable HTML (matches GBP exactly) — present, but GBP match unverifiable
- Google Maps embed present on homepage — **MISSING**
- hreflang tags for bg and en locales
- OpenGraph tags set per-locale
- Canonical URL present and correct
- All links are crawlable `<a href>` elements
- All images have keyword-relevant alt text — logo alt is redundant

## Next.js & Project Checklist

- No raw next-intl translation keys in rendered output
- All images use `next/image` `<Image>` component
- Fonts loaded via `next/font/google` with `['latin', 'cyrillic']` subsets — Syne and DM Sans missing `cyrillic`
- Hero section loads eagerly; other sections use `next/dynamic`
- Framer Motion animations use `viewport: { once: true }` — needs per-section verification
- No React hydration mismatches
- Document `lang` attribute matches current locale
- All assets served over HTTPS (localhost in dev)
- No console errors from Next.js or Framer Motion
- Zero TBT in production (0ms)
- Zero CLS (0)

## Font Configuration


| Font             | Subsets Configured         | Cyrillic Available?  | Weights Loaded          |
| ---------------- | -------------------------- | -------------------- | ----------------------- |
| Syne             | latin, latin-ext           | No (not available)   | All (unspecified = all) |
| Playfair Display | latin, latin-ext, cyrillic | Yes (configured)     | All (unspecified = all) |
| DM Sans          | latin, latin-ext           | Yes (not configured) | All (unspecified = all) |


Loading all weights for 3 families = 7 font files. This is the primary LCP bottleneck.

## Recommendations (Priority Order)

1. **[Critical] Fix CTA button contrast** — darken `--color-cta` from #7C9A2D to #5C7A1A. Every conversion button on the page fails WCAG AA.
2. **[Critical] Fix secondary text contrast** — darken `--color-text-secondary` from #6B7280 to #565E6C.
3. **[Critical] Fix green text contrast** — use #166534 (green-800) for text-on-beige and #15803D (green-700) for text-on-green-bg.
4. **[High] Reduce font weight count** — specify explicit `weight` arrays in `layout.tsx` for each font to reduce the 7 font files. E.g., Syne: `[700, 800]`, DM Sans: `[400, 500, 600]`, Playfair Display: `[400]` (italic only).
5. **[High] Convert Hero to server component** — replace `useTranslations()` with `getTranslations()` to eliminate hydration dependency from the LCP path.
6. **[High] Add Google Maps embed** — required by seo-principles.mdc for Local SEO.
7. **[Medium] Add cyrillic subset to DM Sans** — Bulgarian body text needs proper glyphs.
8. **[Medium] Replace placeholder CTA links** — pricing buttons need real destinations.
9. **[Medium] Populate sameAs in JSON-LD** — add social/directory URLs.
10. **[Low] Fix logo redundant alt text** — set alt="" on logo image.
11. **[Low] Replace og-image.png as logo** — create a proper small logo asset.

