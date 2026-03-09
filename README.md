# Local SEO Landing Page - Atlas Fold

High-conversion landing page for a Local SEO service targeting local businesses in Sofia. The goal is to rank client businesses in the Top 3 on Google Maps within 90 days.

## Tech Stack

| Layer           | Technology                                             |
| --------------- | ------------------------------------------------------ |
| Framework       | Next.js 16 (App Router)                                |
| Language        | TypeScript (strict)                                    |
| Styling         | Tailwind CSS v4 (`@theme` in CSS)                      |
| Animations      | Framer Motion                                          |
| i18n            | next-intl (Bulgarian default, English secondary)       |
| Fonts           | Syne, Playfair Display, DM Sans via `next/font/google` |
| Package manager | pnpm                                                   |

## Project Structure

```
├── messages/
│   ├── bg.json                        # Bulgarian translations
│   └── en.json                        # English translations
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx             # Root layout (fonts, metadata, i18n provider)
│   │   │   └── page.tsx               # Landing page (all sections composed)
│   │   └── globals.css                # Tailwind v4 @theme design tokens
│   ├── components/
│   │   ├── sections/                  # Hero, Advantage, BeforeAfter, Process, FAQ, Pricing
│   │   ├── layout/                    # Navbar, Footer
│   │   └── ui/                        # Button, SectionWrapper
│   ├── i18n/
│   │   ├── routing.ts                 # Locale config (bg default, en secondary)
│   │   ├── request.ts                 # next-intl getRequestConfig
│   │   └── navigation.ts             # Locale-aware Link, redirect, useRouter
│   ├── lib/
│   │   └── cn.ts                      # clsx + tailwind-merge utility
│   └── proxy.ts                       # Locale detection (Next.js 16 convention)
├── public/
│   └── reference/                     # Design reference screenshots
├── next.config.ts                     # next-intl plugin
└── tsconfig.json                      # Path alias @/ → src/
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/bg](http://localhost:3000) to view the Bulgarian version. Visit [http://localhost:3000/en](http://localhost:3000/en) for English.

## Routing

- `/bg` serves Bulgarian content
- `/en` serves English content
- The proxy (`src/proxy.ts`) handles locale negotiation and redirects

## Design System

- **Background**: warm beige `#F5F0EB` page surface with white `#FFFFFF` content cards
- **CTA**: olive-green `#7C9A2D` for conversion buttons
- **Icons**: accent blue `#1A56DB`
- **Typography**: Syne (display) + Playfair Display (italic serif accents) + DM Sans (body)
- **Layout**: no dark sections — beige surface with white cards throughout

See `.cursor/rules/design.mdc` for the full design specification.

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Production build         |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |
