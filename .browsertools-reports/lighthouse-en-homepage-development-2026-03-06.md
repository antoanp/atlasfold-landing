# Lighthouse Audit Report

**URL**: [http://localhost:3000/](http://localhost:3000/)
**Locale**: en (served via default locale fallback)
**Date**: 2026-03-06
**Tool**: BrowserTools MCP (Google Lighthouse 11.7.1)
**Environment**: Development (Turbopack)

## Scores


| Category       | Score   | Rating  |
| -------------- | ------- | ------- |
| Accessibility  | 95/100  | Pass    |
| Performance    | 76/100  | Warning |
| SEO            | 100/100 | Pass    |
| Best Practices | 100/100 | Pass    |


## Core Web Vitals


| Metric | Value | Target  | Status          |
| ------ | ----- | ------- | --------------- |
| LCP    | 4.6s  | < 2.5s  | Fail            |
| CLS    | 0     | < 0.1   | Pass            |
| TBT    | 54ms  | < 200ms | Pass            |
| FCP    | 1.0s  | < 1.8s  | Pass            |
| TTI    | 8.0s  | < 3.8s  | Fail (dev mode) |
| SI     | 1.0s  | < 3.4s  | Pass            |


## Page Stats


| Stat                 | Value    |
| -------------------- | -------- |
| Total size           | 1,136 KB |
| Total requests       | 37       |
| JS files             | 24       |
| CSS files            | 1        |
| Images               | 3        |
| Fonts                | 7        |
| Main thread blocking | 599ms    |


## Accessibility Issues

### 1. Color Contrast — CTA Buttons (white on olive-green)

- **Impact**: high
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Elements**: Navbar "Call Us" button, Hero "Get a Free Analysis" CTA, all three Pricing "Get Started" CTAs
- **Issue**: White text (#FFFFFF) on olive-green (#7C9A2D) background has contrast ratio 3.22:1. WCAG AA requires 4.5:1 for normal text.
- **Fix**: Darken the CTA color to at least #5F7A1A or use a darker text color. Update `--color-cta` in `globals.css` `@theme` block.

### 2. Color Contrast — Secondary Text on Beige

- **Impact**: medium
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Elements**: Navbar links ("Before / After", "Pricing"), Hero subheadline ("If you're not there..."), Hero stat labels ("happy clients", "years of experience", "day guarantee"), Before/After inactive tab
- **Issue**: Gray text (#6B7280) on beige (#F5F0EB) background has contrast ratio 4.26:1. Needs 4.5:1 for text under 18px/14px bold.
- **Fix**: Darken `--color-text-secondary` to #5B6370 (or darker) in `globals.css` `@theme` block to reach 4.5:1.

### 3. Color Contrast — Success/Green Text on Beige

- **Impact**: high
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Element**: Hero location badge "● Sofia, Bulgaria" (`span.text-success`)
- **Issue**: Green (#16A34A) on beige (#F5F0EB) has contrast ratio 2.91:1. Significantly below 4.5:1 threshold.
- **Fix**: Darken to #15803D (green-700) or use a text-primary color with a green dot icon instead.

### 4. Color Contrast — Save Badge (white on green)

- **Impact**: medium
- **WCAG**: 1.4.3 Contrast (Minimum)
- **Element**: Pricing "Save €150" badge (`span.bg-success.text-white`)
- **Issue**: White on green (#16A34A) has contrast ratio 3.29:1. Needs 4.5:1.
- **Fix**: Darken badge background to #15803D (green-700) or switch to dark text on light green background.

### 5. Redundant Alt Text on Logo

- **Impact**: low
- **WCAG**: Best practice (a11y-names-labels)
- **Element**: `<img alt="AtlasFold">` inside `<a>` with adjacent `<span>AtlasFold</span>`
- **Issue**: The image alt text duplicates the visible text next to it, causing screen readers to announce "AtlasFold AtlasFold".
- **Fix**: Set image `alt=""` (decorative) since the adjacent text span already provides the accessible name, or remove the text span and keep only the alt.

## Performance Issues

### 1. LCP at 4.6s (Target: < 2.5s)

- **Impact**: high
- **Metric**: LCP
- **Issue**: Largest Contentful Paint is nearly double the target. Contributing factors include dev mode overhead (Turbopack HMR, 24 JS chunks, source maps), 7 font files loading, and 599ms main thread blocking time.
- **Next.js relevance**: In dev mode, Turbopack does not optimize bundles. A production build (`next build && next start`) will yield significantly better results. However, font count (7 files for 3 families) and JS bundle size should still be optimized.
- **Fix**:
  1. **Re-audit in production build** — LCP will likely improve dramatically.
  2. **Font optimization** — Consider adding `preload: true` for the primary display font (Syne). Ensure only needed weights are loaded.
  3. **Hero LCP element** — If the LCP element is text, ensure the display font loads quickly. If it's an image, add `priority` prop to the hero `<Image>` component.
  4. **Code splitting** — Already implemented correctly (Hero is eagerly loaded, other sections use `next/dynamic`).

### 2. TTI at 8.0s

- **Impact**: medium (dev mode inflated)
- **Metric**: TTI
- **Issue**: Time to Interactive is high at 8s. Almost entirely caused by development mode overhead (Turbopack HMR client, React DevTools, source map loading).
- **Fix**: Re-audit in production build. This metric is not actionable in dev mode.

## Best Practices Issues

### 1. Missing Source Maps for Large First-Party JavaScript

- **Impact**: low (dev-only)
- **Issue**: 17 JS files report missing or broken source maps. All are Turbopack development chunks (framer-motion, react-dom, next internals, HMR client).
- **Fix**: No action needed — this is a development mode artifact. Source maps are not served in production builds.

## SEO Issues (Local SEO Priority)

### 1. Missing Google Maps Embed

- **Impact**: high
- **Type**: structural
- **SEO rule**: seo-principles.mdc §1.3 — "Embed a Google Maps widget on the homepage alongside the NAP"
- **Issue**: The footer contains NAP as plain HTML (good), and the JSON-LD schema has a `hasMap` URL, but there is no visible embedded Google Maps `<iframe>` on the page.
- **Fix**: Add a Google Maps embed `<iframe>` in the footer section adjacent to the NAP block. Use `@next/third-parties/google` `GoogleMapsEmbed` or a standard `<iframe>` with the business location.

### 2. Pricing CTA Links Are Placeholder (`href="#"`)

- **Impact**: medium
- **Type**: structural
- **SEO rule**: Crawlable links must point to real destinations
- **Issue**: All three "Get Started" buttons in the Pricing section link to `href="#"`. These are dead links that provide no SEO value and could confuse crawlers.
- **Fix**: Link to a contact form, Calendly booking page, or a relevant conversion URL.

### 3. Empty `sameAs` Arrays in JSON-LD

- **Impact**: medium
- **Type**: structural
- **SEO rule**: LocalBusiness and Organization schemas should include social profiles
- **Issue**: Both `localBusinessSchema.sameAs` and `organizationSchema.sameAs` are empty arrays. Google uses `sameAs` to connect the business entity to social profiles and directories.
- **Fix**: Add the business's Google Business Profile URL, Facebook page, Instagram, LinkedIn, and any directory listings to the `sameAs` arrays in `json-ld.tsx`.

### 4. Title Tag Format

- **Impact**: medium
- **Type**: content
- **SEO rule**: seo-principles.mdc §1.1 — "Format: BEST + [Primary Category] + [City] + [Business Name] + [Primary Services] + near me"
- **Issue**: The title is pulled from `messages/*.json` via `t('metadata.title')`. Needs verification that it follows the required keyword-rich format and is NOT truncated to 60 characters.
- **Fix**: Verify the title in `messages/bg.json` and `messages/en.json` matches the format: e.g., "BEST Local SEO Services Sofia - AtlasFold - Google Maps Ranking, Local Business SEO near me".

### 5. Logo Uses og-image.png Instead of Proper Logo

- **Impact**: low
- **Type**: content
- **Issue**: The navbar logo `<Image>` component loads `/images/og-image.png` (1200x630 OG image) at 32x32 display size. This wastes bandwidth and the OG image is not designed to be a logo.
- **Fix**: Create a proper logo file (SVG or small WebP) at `/public/images/logo.svg` and update the `src` in `navbar.tsx`.

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
- All images have keyword-relevant alt text — logo alt is redundant, others need review

## Next.js & Project Checklist

- No raw next-intl translation keys in rendered output
- All images use `next/image` `<Image>` component (no `<img>` tags)
- Fonts loaded via `next/font/google` with `['latin', 'cyrillic']` subsets — Syne and DM Sans missing `cyrillic`
- Hero section loads eagerly; other sections use `next/dynamic`
- Framer Motion animations use `viewport: { once: true }` — needs verification per section
- No React hydration mismatches
- Document `lang` attribute matches current locale (bg/en)
- All assets served over HTTPS (localhost in dev)
- No console errors from Next.js or Framer Motion

## Font Subset Note


| Font             | Subsets Configured         | Has Cyrillic?               |
| ---------------- | -------------------------- | --------------------------- |
| Syne             | latin, latin-ext           | No (not available for Syne) |
| Playfair Display | latin, latin-ext, cyrillic | Yes                         |
| DM Sans          | latin, latin-ext           | Available but not included  |


DM Sans supports cyrillic but it's not in the subset config. Bulgarian body text will fall back to system font for cyrillic characters. Add `'cyrillic'` to the DM Sans subset array in `layout.tsx`.

## Recommendations

1. **[Critical] Fix CTA button contrast** — darken `--color-cta` from #7C9A2D to ~#5C7A1A or use dark text on olive background. This affects all conversion buttons.
2. **[Critical] Fix secondary text contrast** — darken `--color-text-secondary` from #6B7280 to ~#565E6C to meet WCAG 4.5:1 on the beige surface.
3. **[Critical] Fix green/success text contrast** — use #15803D (green-700) or darker for `--color-success` when used as text on beige.
4. **[High] Add Google Maps embed** — required by Local SEO principles for homepage. Place adjacent to NAP in footer.
5. **[High] Re-audit in production build** — LCP 4.6s is heavily inflated by dev mode. Run `pnpm build && pnpm start` and re-audit.
6. **[Medium] Add cyrillic subset to DM Sans** — Bulgarian body text needs cyrillic glyphs.
7. **[Medium] Replace placeholder CTA links** — pricing "Get Started" buttons should link to a real conversion page.
8. **[Medium] Populate sameAs in JSON-LD** — add social media and directory URLs to LocalBusiness and Organization schemas.
9. **[Low] Fix logo redundant alt text** — set logo `<Image>` alt to empty string since text span provides the name.
10. **[Low] Replace og-image.png as logo** — create a proper small logo asset.

