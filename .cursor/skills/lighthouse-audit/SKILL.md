---
name: lighthouse-audit
description: Run Lighthouse-powered audits (accessibility, performance, SEO, best practices) on the current browser page using BrowserTools MCP. Collects console and network errors as supplementary diagnostics. Interprets results through WFF widget-specific rules (host page isolation, embedded widget performance, translation key leaks). Use when the user asks to audit a page, run Lighthouse, check performance, run SEO audit, or perform a quality gate check on a widget.
---

# Lighthouse Audit with BrowserTools MCP

Runs Google Lighthouse audits against the developer's real Chrome browser via BrowserTools MCP. Covers four categories: accessibility, performance, SEO, and best practices. Collects console/network errors as supplementary diagnostics.

**Complements the [web-accessibility-testing](../web-accessibility-testing/SKILL.md) skill:**
- **This skill** -- automated Lighthouse scoring, performance/SEO/best-practices checks, console/network errors. Use for quick quality gates.
- **web-accessibility-testing** -- deep manual WCAG 2.2 AA analysis with keyboard navigation, accessibility tree inspection, and WFF-specific semantic HTML rules. Use for thorough accessibility reviews.

## Prerequisites

- The user's Chrome browser must have the **BrowserTools extension** active and connected.
- The page to audit must be **open in the active Chrome tab**.
- No URL parameter is needed -- BrowserTools operates on whatever page is currently open.
- Verify connectivity by calling `getConsoleLogs`. If it fails, BrowserTools is not connected -- ask the user to check the extension.

## Workflow

Create your own TODO list for the audit progress:

```
Lighthouse Audit Progress:
- [ ] Step 1: Prepare (wipe stale logs)
- [ ] Step 2: Run audit(s)
- [ ] Step 3: Collect console and network errors
- [ ] Step 4: Analyze with WFF-specific rules
- [ ] Step 5: Generate report
```

### Step 1: Prepare

Clear stale browser logs so that collected errors are scoped to this audit session.

```
CallMcpTool → server: "user-browsertools", toolName: "wipeLogs"
```

### Step 2: Run Audit(s)

Determine scope based on the user's request:

| User says | Tool to call |
|---|---|
| "audit", "lighthouse", "full audit", "quality gate" | `runAuditMode` (all four categories) |
| "accessibility audit" | `runAccessibilityAudit` |
| "performance audit" | `runPerformanceAudit` |
| "SEO audit" | `runSEOAudit` |
| "best practices audit" | `runBestPracticesAudit` |

Default to **full audit** (`runAuditMode`) when the request is ambiguous.

```
CallMcpTool → server: "user-browsertools", toolName: "runAuditMode"
```

Save the audit output for analysis in Step 4.

### Step 3: Collect Console and Network Errors

After the audit completes, collect runtime diagnostics. These surface issues Lighthouse cannot detect (failed API calls, JS exceptions from widget code).

```
CallMcpTool → server: "user-browsertools", toolName: "getConsoleErrors"
CallMcpTool → server: "user-browsertools", toolName: "getNetworkErrors"
```

Optionally, if deeper investigation is needed:

```
CallMcpTool → server: "user-browsertools", toolName: "getConsoleLogs"
CallMcpTool → server: "user-browsertools", toolName: "getNetworkLogs"
```

### Step 4: Analyze with WFF-Specific Rules

Interpret the Lighthouse results and console/network errors through the lens of WFF embedded widget constraints. Apply the rules below per category.

#### Performance

WFF widgets are script-injected into client host pages. Performance issues in the widget degrade the host page.

Flag these patterns:
- **Cumulative Layout Shift (CLS)** -- widgets must not cause layout shifts on the host page
- **Large JavaScript bundles** -- widget JS should be code-split via `defineAsyncComponent`
- **Render-blocking resources** -- widget assets must not block host page rendering
- **Slow Time to Interactive** -- widget initialization should not delay host page interactivity
- **Failed/slow API calls** -- cross-reference with network errors for widget endpoints (paths containing `/api/`, `/widget_data/`, or Spocosy endpoints)

#### Accessibility

Map Lighthouse accessibility violations to the project's WCAG rules:
- **Missing alt text** -- images need `alt` or `aria-hidden="true"` for decorative images
- **Missing form labels** -- inputs need `<label>` or `aria-label`
- **Low contrast** -- check against WCAG 1.4.3 thresholds (4.5:1 normal text, 3:1 large text)
- **Missing document language** -- relevant to the host page, not the widget
- **Empty buttons/links** -- icon-only elements need `aria-label`

Check console output for `WFF_LABEL_` strings. Any occurrence means a translation key leaked into the rendered output -- this is a **critical** accessibility issue (screen readers announce the raw key).

For deeper accessibility analysis, recommend the [web-accessibility-testing](../web-accessibility-testing/SKILL.md) skill.

#### SEO

Most SEO issues are host page concerns, not widget concerns. Flag only:
- **Missing meta description / title** -- if the widget is the primary page content
- **Non-crawlable links** -- widget links using JavaScript navigation instead of `<a href>`
- **Images without alt text** -- same as accessibility

Note in the report which SEO findings are host page issues vs. widget issues.

#### Best Practices

Cross-reference Lighthouse best practices violations with the host page isolation rules from `vue3-host-page-isolation.mdc`:

| Lighthouse finding | WFF isolation rule |
|---|---|
| Uses `document.write()` | No global DOM manipulation |
| Requests geolocation/notification permissions | No browser API abuse |
| Uses deprecated APIs | Keep widget code modern |
| Includes insecure requests (mixed content) | Widget must not cause mixed content |
| Missing HTTPS | Widget assets must be served over HTTPS |
| Browser errors in console | Cross-reference with `getConsoleErrors` output |

Also flag from console/network errors:
- `window.*` property assignments (global scope pollution)
- `document.body` / `document.head` access
- `document.querySelector` / `document.getElementById` usage outside widget scope
- Uncleaned `setInterval` / `setTimeout` (if errors suggest leaked timers)

### Step 5: Generate Report

Provide **two outputs**:

1. **Chat summary** -- concise overview with scores and top issues
2. **Detailed report file** -- saved to `.browsertools-reports/` in the project root

#### Chat Summary Format

```
Lighthouse Audit Summary
========================
Page: [URL from audit output]

  Accessibility:   [score]/100
  Performance:     [score]/100
  SEO:             [score]/100
  Best Practices:  [score]/100

Console Errors: [count]
Network Errors: [count]

Top Issues:
- [Critical] [issue description]
- [Critical] [issue description]
- [Warning]  [issue description]

Full report: .browsertools-reports/[filename]
```

#### Report File Template

Save as `.browsertools-reports/lighthouse-[page-name]-[YYYY-MM-DD].md`:

```markdown
# Lighthouse Audit Report

**URL**: [page URL]
**Date**: [audit date]
**Tool**: BrowserTools MCP (Google Lighthouse)

## Scores

| Category | Score | Rating |
|----------|-------|--------|
| Accessibility | X/100 | [Critical/Warning/Pass] |
| Performance | X/100 | [Critical/Warning/Pass] |
| SEO | X/100 | [Critical/Warning/Pass] |
| Best Practices | X/100 | [Critical/Warning/Pass] |

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
- **WFF relevance**: [how this affects the embedded widget or host page]
- **Fix**: [recommended fix]

## SEO Issues

### [Issue Title]
- **Impact**: [high/medium/low]
- **Scope**: [widget / host page]
- **Issue**: [description]
- **Fix**: [recommended fix]

## Best Practices Issues

### [Issue Title]
- **Impact**: [high/medium/low]
- **Issue**: [description]
- **Isolation rule**: [which host page isolation rule is violated, if any]
- **Fix**: [recommended fix]

## Console Errors

| # | Error | Source |
|---|-------|--------|
| 1 | [error message] | [source file:line] |

## Network Errors

| # | URL | Status | Type |
|---|-----|--------|------|
| 1 | [request URL] | [status code] | [request type] |

## WFF-Specific Findings

- [ ] No `WFF_LABEL_` translation key leaks in rendered output
- [ ] No `window.*` property assignments (global scope pollution)
- [ ] No `document.body` / `document.head` manipulation
- [ ] No unscoped DOM queries (`document.querySelector`)
- [ ] Widget JS is code-split (no monolithic bundle)
- [ ] No layout shifts caused by widget injection
- [ ] All widget assets served over HTTPS
- [ ] No leaked timers (`setInterval` / `setTimeout` without cleanup)

## Recommendations

1. [Priority recommendation]
2. [Next recommendation]
```

## Severity Classification

| Rating | Score range | Criteria |
|--------|------------|----------|
| **Critical** | 0-49 | Lighthouse score below 50, blocking accessibility violations, console errors from widget code, failed network requests to widget APIs, `WFF_LABEL_` leaks |
| **Warning** | 50-89 | Lighthouse score 50-89, medium-impact issues, non-critical console warnings, host page isolation concerns |
| **Pass** | 90-100 | Lighthouse score 90+, low-impact suggestions, best practice recommendations |

For individual issues reported by Lighthouse, use the impact level provided by Lighthouse (high/medium/low) rather than the score-based rating.
