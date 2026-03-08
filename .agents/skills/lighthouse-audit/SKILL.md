---
name: lighthouse-audit
description: Run Lighthouse-powered audits (accessibility, performance, SEO, best practices) on the current browser page using BrowserTools MCP. Collects console and network errors as supplementary diagnostics. Interprets results through Local SEO landing page rules — Next.js 16, Tailwind v4, next-intl i18n, Framer Motion, and on-page SEO for Google Maps ranking. Use when the user asks to audit a page, run Lighthouse, check performance, run SEO audit, or perform a quality gate check.
triggers:
  - title tag
  - schema markup
  - GBP optimization
  - citation
  - on-site SEO
  - service page
  - area page
---

# Lighthouse Audit with BrowserTools MCP

Runs Google Lighthouse audits against the developer's real Chrome browser via BrowserTools MCP. Covers four categories: accessibility, performance, SEO, and best practices. Collects console/network errors as supplementary diagnostics.

Results are interpreted through the lens of this project: a **Local SEO landing page** targeting Top 3 Google Maps rankings for businesses in Sofia, Bulgaria. Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, and next-intl (bg/en).

## Prerequisites

BrowserTools MCP requires **three components** running simultaneously. If any is missing, the audit will fail.

### Component 1: Chrome Extension

The BrowserTools Chrome extension must be installed and active.

1. Download the extension from the [v1.2.0 release](https://github.com/AgentDeskAI/browser-tools-mcp/releases/download/v1.2.0/BrowserTools-1.2.0-extension.zip) or clone the [GitHub repo](https://github.com/AgentDeskAI/browser-tools-mcp)
2. In Chrome, go to `chrome://extensions/`
3. Enable **Developer Mode** (top-right toggle)
4. Click **Load unpacked** and select the unzipped `chrome-extension` folder
5. Confirm "BrowserToolsMCP" appears in the extensions list

### Component 2: Browser Tools Server

A middleware server must be running in a **dedicated terminal** — it bridges the Chrome extension and the MCP server via WebSocket on port 3025.

```bash
npx @agentdeskai/browser-tools-server@1.2.0
```

Leave this terminal running for the entire audit session. If port 3025 is already in use, kill the existing process first.

### Component 3: MCP Server (Cursor config)

The MCP server must be registered in Cursor's settings. This is already configured in `~/.cursor/mcp.json`:

```json
{
  "browsertools": {
    "command": "npx",
    "args": ["-y", "@agentdeskai/browser-tools-mcp@latest"]
  }
}
```

Cursor starts this automatically. Verify the green circle next to the server name in Cursor Settings > Features > MCP Servers.

### Connectivity Check

- The page to audit must be **open in the active Chrome tab**.
- No URL parameter is needed — BrowserTools operates on whatever page is currently open.
- Verify connectivity by calling `getConsoleLogs`. If it fails, one of the three components above is not running — ask the user to check.

## Workflow

Create your own TODO list for the audit progress:

```
Lighthouse Audit Progress:
- [ ] Step 1: Prepare (wipe stale logs)
- [ ] Step 2: Run audit(s)
- [ ] Step 3: Collect console and network errors
- [ ] Step 4: Analyze with project-specific rules
- [ ] Step 5: Generate report
```

### Step 1: Prepare

Clear stale browser logs so that collected errors are scoped to this audit session.

```
CallMcpTool → server: "user-browsertools", toolName: "wipeLogs"
```

### Step 2: Run Audit(s)

Determine scope based on the user's request:

| User says                                           | Tool to call                         |
| --------------------------------------------------- | ------------------------------------ |
| "audit", "lighthouse", "full audit", "quality gate" | `runAuditMode` (all four categories) |
| "accessibility audit"                               | `runAccessibilityAudit`              |
| "performance audit"                                 | `runPerformanceAudit`                |
| "SEO audit"                                         | `runSEOAudit`                        |
| "best practices audit"                              | `runBestPracticesAudit`              |
| "Next.js audit"                                     | `runNextJSAudit`                     |

Default to **full audit** (`runAuditMode`) when the request is ambiguous. For Next.js-specific checks (hydration, image optimization, font loading), also run `runNextJSAudit` alongside the main audit.

```
CallMcpTool → server: "user-browsertools", toolName: "runAuditMode"
CallMcpTool → server: "user-browsertools", toolName: "runNextJSAudit"
```

Save the audit output for analysis in Step 4.

### Step 3: Collect Console and Network Errors

After the audit completes, collect runtime diagnostics. These surface issues Lighthouse cannot detect (failed API calls, JS exceptions, i18n loading failures).

```
CallMcpTool → server: "user-browsertools", toolName: "getConsoleErrors"
CallMcpTool → server: "user-browsertools", toolName: "getNetworkErrors"
```

Optionally, if deeper investigation is needed:

```
CallMcpTool → server: "user-browsertools", toolName: "getConsoleLogs"
CallMcpTool → server: "user-browsertools", toolName: "getNetworkLogs"
```

### Step 4: Analyze with Project-Specific Rules

Interpret the Lighthouse results and console/network errors through the lens of this project's architecture and Local SEO requirements. Apply the rules below per category.

#### Performance

This is a Next.js 16 landing page with Framer Motion animations. Core Web Vitals directly affect Google Maps ranking.

**Target thresholds** (from `stack-versions.mdc`):

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

Flag these patterns:

- **Cumulative Layout Shift (CLS)** — font loading must use `font-display: swap` via `next/font/google`; images must have explicit `width` and `height` via the `<Image>` component
- **Largest Contentful Paint (LCP)** — the Hero section loads eagerly; all other sections must be dynamically imported via `next/dynamic`
- **Large JavaScript bundles** — each section component should be code-split; Framer Motion should not be in the critical path for below-the-fold sections
- **Render-blocking resources** — fonts must load via `next/font/google` (not CSS `@import`); Tailwind CSS should be inlined
- **Image optimization** — all images must use `next/image` with WebP format; images below the fold must be lazy-loaded
- **Framer Motion overhead** — `whileInView` animations should use `viewport: { once: true }` to avoid re-triggering; animation durations should be ≤ 0.5s
- **Failed/slow network requests** — cross-reference with network errors for translation file loading (`/messages/bg.json`, `/messages/en.json`) and any API routes

#### Accessibility

Map Lighthouse accessibility violations to the project's design system and i18n setup:

- **Missing alt text** — all images must have descriptive, keyword-relevant alt text (Local SEO requirement from `seo-principles.mdc`)
- **Missing form labels** — CTA buttons ("Вземи безплатен анализ", "Обади се", "Започни сега") and any inputs need proper labeling
- **Low contrast** — check against WCAG thresholds, paying special attention to:
  - Text on beige surface (#F5F0EB): primary text (#0A0A0A) and secondary text (#6B7280) must meet 4.5:1 for normal text
  - Text on white cards: same contrast requirements
  - CTA button text on olive-green (#7C9A2D): must meet 4.5:1
  - Accent text on blue (#1A56DB): must meet contrast requirements in context
- **Document language** — must be set to `bg` for Bulgarian locale, `en` for English locale (set via next-intl in the `[locale]/layout.tsx`)
- **Heading hierarchy** — exactly one H1 per page (Local SEO requirement); H2s for each section; no skipped heading levels
- **Empty buttons/links** — phone CTA in navbar, icon-only mobile hamburger menu need `aria-label`

Check console output for raw translation keys. Any occurrence of dot-notation strings matching next-intl key patterns (e.g., `hero.headline`, `pricing.standard.title`, `nav.links.`) in the rendered output means a translation key leaked — this is a **critical** accessibility issue (screen readers announce the raw key instead of translated text).

#### SEO

SEO is the primary concern for this project. The page must rank businesses in the Top 3 on Google Maps. Apply all rules from `seo-principles.mdc`:

**On-page SEO checks:**

- **Title tag** — must follow the format: `BEST + [Primary Category] + [City] + [Business Name] + [Primary Services] + near me`. Do NOT truncate to 60 characters.
- **H1 tag** — exactly one per page, format: `[Primary Category] [City]` (e.g., "Топ 3 в Google за 90 дни — гарантирано" for the landing page hero)
- **H2 tags** — each major section should have an H2 reflecting its purpose (Защо Google Maps?, Преди / След, Как работи?, Въпроси, Пакети)
- **Meta description** — must be present, per-locale, and include primary keywords
- **hreflang tags** — must be present for both `bg` and `en` locales with correct `x-default`
- **OpenGraph tags** — title, description, image, locale must be set per-locale

**Schema markup:**

- **LocalBusiness JSON-LD** — must be present in the `<head>` of the homepage
- **FAQ JSON-LD** — must be present, using the exact questions from the FAQ section

**NAP (Name, Address, Phone):**

- Footer must contain the business NAP as **plain crawlable HTML text** (not an image, not inside an iframe)
- NAP must match the Google Business Profile character-for-character

**Other SEO checks:**

- **Google Maps embed** — must be present on the homepage, adjacent to the NAP block
- **Crawlable links** — all navigation links must be `<a href>` elements, not JavaScript-only navigation
- **Images without alt text** — every image must have descriptive, keyword-relevant alt text
- **Canonical URL** — must be present and correct for the current locale
- **Robots/indexability** — page must not have `noindex` or `nofollow` unless intentional

Note in the report which SEO findings are structural (missing schema, broken hreflang) vs. content (missing keywords in title) — structural issues are higher priority.

#### Best Practices

Cross-reference Lighthouse best practices violations with Next.js 16 and project conventions:

| Lighthouse finding                            | Project rule                                     |
| --------------------------------------------- | ------------------------------------------------ |
| Uses `document.write()`                       | No direct DOM manipulation in server components  |
| Requests geolocation/notification permissions | Not expected on a landing page — flag if present |
| Uses deprecated APIs                          | Keep code modern (React 19, Next.js 16)          |
| Includes insecure requests (mixed content)    | All assets must be served over HTTPS             |
| Missing HTTPS                                 | Landing page must be fully HTTPS                 |
| Browser errors in console                     | Cross-reference with `getConsoleErrors` output   |

Also flag from console/network errors:

- React hydration mismatches (common with next-intl locale switching)
- Next.js runtime warnings (missing `key` props, invalid HTML nesting)
- Failed loads for translation files (`/messages/*.json`)
- Framer Motion warnings (deprecated props, performance warnings)
- `<img>` tags used instead of `next/image` `<Image>` component
- Fonts loaded via CSS `@import` instead of `next/font/google`

### Step 5: Generate Report

Provide **two outputs**:

1. **Chat summary** — concise overview with scores and top issues
2. **Detailed report file** — saved to `.browsertools-reports/` in the project root

#### Chat Summary Format

```
Lighthouse Audit Summary
========================
Page: [URL from audit output]
Locale: [bg / en]

  Accessibility:   [score]/100
  Performance:     [score]/100
  SEO:             [score]/100
  Best Practices:  [score]/100

Core Web Vitals:
  LCP: [value] ([pass/fail] — target < 2.5s)
  CLS: [value] ([pass/fail] — target < 0.1)
  FID: [value] ([pass/fail] — target < 100ms)

Console Errors: [count]
Network Errors: [count]

Top Issues:
- [Critical] [issue description]
- [Critical] [issue description]
- [Warning]  [issue description]

Full report: .browsertools-reports/[filename]
```

#### Report File Template

Save as `.browsertools-reports/lighthouse-[locale]-[page-name]-[YYYY-MM-DD].md`:

```markdown
# Lighthouse Audit Report

**URL**: [page URL]
**Locale**: [bg / en]
**Date**: [audit date]
**Tool**: BrowserTools MCP (Google Lighthouse)

## Scores

| Category       | Score | Rating                  |
| -------------- | ----- | ----------------------- |
| Accessibility  | X/100 | [Critical/Warning/Pass] |
| Performance    | X/100 | [Critical/Warning/Pass] |
| SEO            | X/100 | [Critical/Warning/Pass] |
| Best Practices | X/100 | [Critical/Warning/Pass] |

## Core Web Vitals

| Metric | Value | Target  | Status      |
| ------ | ----- | ------- | ----------- |
| LCP    | Xs    | < 2.5s  | [Pass/Fail] |
| CLS    | X     | < 0.1   | [Pass/Fail] |
| FID    | Xms   | < 100ms | [Pass/Fail] |

## SEO Issues (Local SEO Priority)

### [Issue Title]

- **Impact**: [high/medium/low]
- **Type**: [structural / content]
- **SEO rule**: [which rule from seo-principles.mdc is violated]
- **Issue**: [description]
- **Fix**: [recommended fix]

## Accessibility Issues

### [Issue Title]

- **Impact**: [high/medium/low]
- **WCAG**: [criterion if applicable]
- **Element**: `[selector or description]`
- **Issue**: [description]
- **Fix**: [recommended fix]

## Performance Issues

### [Issue Title]

- **Impact**: [high/medium/low]
- **Metric**: [CLS/LCP/TBT/FCP if applicable]
- **Issue**: [description]
- **Next.js relevance**: [image optimization, font loading, code splitting, etc.]
- **Fix**: [recommended fix]

## Best Practices Issues

### [Issue Title]

- **Impact**: [high/medium/low]
- **Issue**: [description]
- **Fix**: [recommended fix]

## Console Errors

| #   | Error           | Source             |
| --- | --------------- | ------------------ |
| 1   | [error message] | [source file:line] |

## Network Errors

| #   | URL           | Status        | Type           |
| --- | ------------- | ------------- | -------------- |
| 1   | [request URL] | [status code] | [request type] |

## Local SEO Checklist

- [ ] Title tag follows `BEST + category + city + services + near me` format
- [ ] Exactly one H1 per page
- [ ] H2s present for each landing page section
- [ ] Meta description present and keyword-rich
- [ ] LocalBusiness JSON-LD schema in `<head>`
- [ ] FAQ JSON-LD schema in `<head>`
- [ ] NAP in footer as plain crawlable HTML (matches GBP exactly)
- [ ] Google Maps embed present on homepage
- [ ] hreflang tags for bg and en locales
- [ ] OpenGraph tags set per-locale
- [ ] Canonical URL present and correct
- [ ] All links are crawlable `<a href>` elements
- [ ] All images have keyword-relevant alt text

## Next.js & Project Checklist

- [ ] No raw next-intl translation keys in rendered output
- [ ] All images use `next/image` `<Image>` component (no `<img>` tags)
- [ ] Fonts loaded via `next/font/google` with `['latin', 'cyrillic']` subsets
- [ ] Hero section loads eagerly; other sections use `next/dynamic`
- [ ] Framer Motion animations use `viewport: { once: true }`
- [ ] No React hydration mismatches
- [ ] Document `lang` attribute matches current locale (bg/en)
- [ ] All assets served over HTTPS
- [ ] No console errors from Next.js or Framer Motion

## Recommendations

1. [Priority recommendation]
2. [Next recommendation]
```

## Severity Classification

| Rating       | Score range | Criteria                                                                                                                                                                                        |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | 0-49        | Lighthouse score below 50, missing LocalBusiness/FAQ schema, missing H1 or duplicate H1s, no NAP in footer, translation key leaks in rendered output, Core Web Vitals failures, broken hreflang |
| **Warning**  | 50-89       | Lighthouse score 50-89, medium-impact issues, suboptimal title tag format, missing OpenGraph tags, non-critical console warnings, images without keyword-rich alt text                          |
| **Pass**     | 90-100      | Lighthouse score 90+, all Local SEO structural requirements met, Core Web Vitals within targets, low-impact suggestions                                                                         |

For individual issues reported by Lighthouse, use the impact level provided by Lighthouse (high/medium/low) rather than the score-based rating.
