---
name: Lighthouse Audit Skill
overview: Create a project-level Cursor Skill at `.cursor/skills/lighthouse-audit/` that orchestrates BrowserTools MCP Lighthouse audits (accessibility, performance, SEO, best practices) with console/network error collection, WFF-specific interpretation rules, and a structured report output.
todos:
  - id: create-dir
    content: Create `.cursor/skills/lighthouse-audit/` directory
    status: completed
  - id: write-skill
    content: Write `SKILL.md` with frontmatter, prerequisites, 5-step workflow, report template, severity classification, and relationship to existing skills (under 500 lines)
    status: completed
isProject: false
---

# Lighthouse Audit Skill

## Context

BrowserTools MCP provides Lighthouse-powered audit tools that run against the developer's real Chrome browser. This skill will wrap those tools into a structured workflow with WFF-specific interpretation, producing actionable reports. It complements the existing Playwright-based [web-accessibility-testing](js/widget_vue3/../../.cursor/skills/web-accessibility-testing/SKILL.md) skill -- that skill does deep manual WCAG analysis via the accessibility tree; this one provides automated Lighthouse scoring across all four categories.

## Skill Location and Files

```
.cursor/skills/lighthouse-audit/
  SKILL.md        -- Main skill file (under 500 lines)
```

No supporting scripts needed -- all tools are parameterless MCP calls.

## SKILL.md Structure

### Frontmatter

- **name**: `lighthouse-audit`
- **description**: "Run Lighthouse-powered audits (accessibility, performance, SEO, best practices) on the current browser page using BrowserTools MCP. Collects console and network errors as supplementary diagnostics. Interprets results through WFF widget-specific rules (host page isolation, embedded widget performance, translation key leaks). Use when the user asks to audit a page, run Lighthouse, check performance, run SEO audit, or perform a quality gate check on a widget."

### Prerequisites Section

- BrowserTools MCP must be connected (the user's Chrome must have the BrowserTools extension active and the page open)
- Verify by calling `getConsoleLogs` -- if it fails, BrowserTools is not connected
- No URL parameter needed -- BrowserTools operates on whatever page is currently open in the user's Chrome

### Workflow (5 steps)

**Step 1: Prepare** -- Call `wipeLogs` to clear stale console/network data, ensuring collected errors are scoped to the current audit session.

**Step 2: Determine scope** -- The user may request:

- A **full audit** (all four categories) -- use `runAuditMode`
- A **single category** -- use the specific tool:
  - `runAccessibilityAudit`
  - `runPerformanceAudit`
  - `runSEOAudit`
  - `runBestPracticesAudit`
- Default to full audit if the user just says "audit" or "lighthouse"

**Step 3: Collect supplementary diagnostics** -- After the audit completes, call `getConsoleErrors` and `getNetworkErrors` to capture any runtime issues. These provide context that Lighthouse alone cannot surface (e.g., failed API calls, JS exceptions from widget code).

**Step 4: Analyze results with WFF-specific rules** -- The skill will include interpretation guidance specific to embedded WFF widgets:

- **Performance** -- Flag layout shift issues (widgets must not cause CLS on host page), large JS bundle warnings, render-blocking resources, slow Time to Interactive. Cross-reference with network errors for failed/slow widget API calls.
- **Accessibility** -- Map Lighthouse accessibility violations to the project's WCAG rules from `vue-accessibility-wcag.mdc`. Flag if console logs contain `WFF_LABEL_` strings (unresolved translation keys). Note that this is a quick automated check -- recommend the [web-accessibility-testing](../../.cursor/skills/web-accessibility-testing/SKILL.md) Playwright skill for deep manual WCAG analysis.
- **SEO** -- Flag missing meta tags, non-crawlable content. Note which issues are relevant to the widget vs. the host page (widgets typically should not affect SEO).
- **Best Practices** -- Flag issues that violate host page isolation rules from `vue3-host-page-isolation.mdc`: `document.write()`, geolocation/notification API usage, insecure requests, deprecated APIs. Cross-reference with console errors.

**Step 5: Generate report** -- Two outputs:

1. A concise chat summary with scores per category and top issues
2. A detailed markdown report file saved to `.browsertools-reports/` in the project root

### Report Template

The report template will include:

- URL and date
- Lighthouse scores per category (0-100)
- Per-category breakdown of issues (grouped by impact: high/medium/low)
- Console errors section
- Network errors section
- WFF-specific findings section (host page isolation violations, translation key leaks, widget performance concerns)
- Recommendations prioritized by severity

### Severity Classification

Aligned with the existing accessibility skill's severity levels for consistency:

- **Critical**: Lighthouse score below 50 in any category, blocking accessibility violations, console errors from widget code, failed network requests to widget APIs
- **Warning**: Lighthouse score 50-89, medium-impact Lighthouse issues, non-critical console warnings
- **Info**: Lighthouse score 90+, low-impact suggestions, best practice recommendations

### Relationship to Existing Skills

The skill will include a note explaining when to use each:

- **lighthouse-audit** (this skill): Quick automated scoring, performance/SEO/best-practices checks, console/network error collection. Use for pre-merge quality gates and broad health checks.
- **web-accessibility-testing** (existing): Deep manual WCAG 2.2 AA analysis with keyboard navigation testing, accessibility tree inspection, and WFF-specific semantic HTML rules. Use for thorough accessibility reviews.

