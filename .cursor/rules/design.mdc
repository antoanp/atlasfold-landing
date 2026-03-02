---
description: Visual design system, typography, and Tailwind conventions
alwaysApply: true
---

# Design System

## Aesthetic Direction
Refined minimalism. Bold, direct, trustworthy. Inspired by profresults.com.
Warm beige surface, white content cards, strong typography hierarchy with serif italic accents.
NOT generic SaaS purple gradients. NOT rounded blob shapes. NOT stock photo heavy.

## Color Palette (define via @theme in globals.css — Tailwind v4)
- Background page: #F5F0EB (warm beige/cream — the dominant surface for all sections)
- Background card: #FFFFFF (white — for content cards sitting on the beige surface)
- Accent icons: #1A56DB (strong blue — used for section icons, not CTAs)
- CTA primary: #7C9A2D (muted olive-green — "Get Started" buttons, conversion actions)
- Text primary: #0A0A0A (near-black)
- Text secondary: #6B7280 (gray-500)
- Success/Guarantee: #16A34A (green-600 — badges like "Save" and guarantee marks)

## Typography
- Display font: 'Syne' (Google Fonts) — bold, geometric sans-serif for main headline text
- Accent font: 'Playfair Display' (Google Fonts) — italic serif for emphasis words in headlines (e.g., "Guaranteed", "Difference", "easy", "Questions", "more Clients")
- Body font: 'DM Sans' (Google Fonts) — clean, readable for paragraphs and UI text
- Headline pattern: sans-serif text + italic serif for the key emotional word in each heading
- Headline sizes: text-5xl to text-7xl on desktop, text-3xl to text-4xl on mobile
- Always use font-bold or font-extrabold for sans-serif headlines; use italic for the Playfair accent words

## Section Pill Badges
- Every section opens with a small pill badge centered above the headline
- Style: rounded-full, thin light border, small icon on the left, text on the right
- Background: white or transparent with border-gray-200
- Examples: "The Advantage", "Before / After", "How Does It Work?", "FAQs", "Packages"

## Spacing
- Section padding: py-24 on desktop, py-16 on mobile
- Container max-width: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
- Component gaps: gap-8 to gap-16

## Tailwind Rules
- Mobile-first always (base = mobile, sm/md/lg = larger screens)
- Use cn() utility (clsx + tailwind-merge) for conditional classes
- Never use arbitrary values like w-[347px] — use scale values
- Page background uses the warm beige (#F5F0EB) for all sections — no dark alternating sections
- Content cards and accordion items use bg-white on the beige surface
- Text on beige: text-neutral-900; text on white cards: text-neutral-900

## Animations (Framer Motion)
- Entrance: fade up (y: 20 → 0, opacity: 0 → 1, duration: 0.5)
- Stagger children with 0.1s delay between each
- Trigger on scroll using whileInView with viewport: { once: true }
- Never animate things that don't need it — performance > decoration

## Do NOT
- Use purple, violet, or gradient mesh backgrounds
- Use rounded-full on rectangular content cards (rounded-full is fine for pills, badges, and buttons)
- Use border-radius > rounded-2xl on cards
- Use more than 3 font families (Syne + Playfair Display + DM Sans is the limit)
- Use dark/near-black (#0A0A0A) as a section background — the design is beige + white only