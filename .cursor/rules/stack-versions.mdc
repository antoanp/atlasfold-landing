---
description: Dependency versions, version-specific best practices, and performance/SEO rules
alwaysApply: true
---

# Stack & Versions

## Runtime
| Tool | Version |
|---|---|
| Node.js | 22.22.0 (LTS) |
| pnpm | 10.30.3 |

## Dependencies (resolved)
| Package | Version |
|---|---|
| next | 16.1.6 |
| react | 19.2.3 |
| react-dom | 19.2.3 |
| tailwindcss | 4.2.1 |
| @tailwindcss/postcss | 4.2.1 |
| typescript | 5.9.3 |
| eslint | 9.39.3 |
| eslint-config-next | 16.1.6 |

## Next.js 16 — Key Practices
- Use `proxy.ts` at the project root, NOT `middleware.ts` — export `proxy()` not `middleware()`
- `proxy.ts` runs on Node.js runtime by default (full Node API access)
- Use `"use cache"` directive for explicit caching at file, component, or function level (enable `cacheComponents: true` in `next.config.ts`)
- Turbopack is the default bundler — no `--turbo` flag needed
- React Compiler is stable — do NOT manually wrap in `useMemo`/`useCallback` unless profiling shows a need
- Server Components are the default; only add `"use client"` when hooks or browser APIs are required
- Config is TypeScript-native (`next.config.ts`)

## React 19 — Key Practices
- `forwardRef` is removed — pass `ref` as a regular prop: `function Input({ ref }) {}`
- Use the `use()` hook for reading promises and context
- Use `useActionState()` and `useOptimistic()` for form/mutation patterns
- Async functions in `useTransition` are supported (Actions)
- `<title>`, `<meta>`, `<link>` can be rendered directly in components for document metadata
- JSX transform is required — never import React for JSX

## Tailwind CSS 4 — Key Practices
- NO `tailwind.config.ts` — configure everything via CSS `@theme` directive in `globals.css`
- Use `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- Define design tokens as CSS custom properties inside `@theme {}` — they auto-map to utility classes
- PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`
- Automatic content detection — no `content` array needed
- Gradient utilities renamed: `bg-gradient-to-r` → `bg-linear-to-r`
- Use `@theme inline {}` for tokens that should not generate standalone utility classes

## TypeScript 5.9 — Key Practices
- `import defer` syntax available for deferred module evaluation
- `NoInfer<T>` utility type is stable — use it to prevent unwanted inference in generics
- `--strictInference` is enabled under `--strict` (already on in this project)
- `moduleResolution: "bundler"` is correct for Next.js

## ESLint 9 — Key Practices
- Flat config only — `eslint.config.mjs` (no `.eslintrc`)
- Use `defineConfig()` from `"eslint/config"` for type safety
- Use `globalIgnores()` to prevent accidental local-scope ignores
- `extends` key works inside flat config objects for plugin configs

## pnpm 10 — Key Practices
- Lifecycle scripts do NOT run automatically — explicitly allow via `allowBuilds` in `.npmrc` if needed
- Nothing is hoisted by default (`public-hoist-pattern` is empty)
- SHA256 hashing for all integrity checks
- Use `pnpm dlx` instead of `npx` for one-off package execution

## Performance & SEO
- Always use `<Image>` from `next/image` with explicit width, height, and alt text
- Use WebP format for all photos; lazy load all images below the fold
- Load fonts via `next/font/google` — never via CSS `@import`; specify subsets: `['latin', 'cyrillic']` for Bulgarian
- Use Next.js 16 Metadata API in `layout.tsx` with per-locale title, description, OpenGraph, and hreflang tags
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, FID < 100ms
- No layout shift from font loading — use `font-display: swap`
- Each section component is dynamically imported with `next/dynamic`; only Hero loads eagerly

## Cross-Rule Consistency
> All rules are aligned with the versions above. `core.mdc` and `directory-structure.mdc` reference `proxy.ts` (Next.js 16). `design.mdc` and `directory-structure.mdc` reference `@theme` in CSS (Tailwind v4). No `tailwind.config.ts` or `middleware.ts` in the project.
