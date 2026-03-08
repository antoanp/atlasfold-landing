---
description: Local SEO principles — on-site optimization, citations, GBP, schema, interlinking, and weekly maintenance. Reference when building or auditing any page, metadata, schema, content structure, or link architecture.
alwaysApply: false
---

# Local SEO Principles

It covers the full 7-phase Local SEO delivery process.

---

## PHASE OVERVIEW

1. Website SEO — Basic
2. Website SEO — Advanced

---

## PHASE 1 — WEBSITE SEO: BASIC

### 1.1 Title Tag
- Inject with keywords — IGNORE the 60-character "rule"
- Format: `BEST + [Primary Category] + [City] + [Business Name] + [Primary Services] + near me`

**Example:**
```
BEST Physiotherapist Portsmouth - if you're looking for Physiotherapy Services
near me or Sports Injuries & Sports Massage near me - Hope Physiotherapy is the
place to be
```

### 1.2 H1 & H2 Tags
- H1 = Primary Category + City name (e.g., "Plumber Springfield")
  - Only ONE H1 per page — always on the homepage/main landing page
- H2 = Secondary categories + most important services (derived from GMB Everywhere data)
- These tell Google exactly what the page is about — never leave them generic

### 1.3 NAP in Footer (Name, Address, Phone)
- Add full business name, address, and phone number to the website footer
- Must match EXACTLY what is in the GBP — character-for-character
  - No variations: "St." vs "Street", "Ltd" vs "Limited" will dilute trust
- Embed a Google Maps widget on the homepage alongside the NAP

---

## PHASE 2 — WEBSITE SEO: ADVANCED

### 2.1 Schema Markup
- Use TechnicalSEO.com to generate `LocalBusiness` schema
- Add it to the source code of the homepage
- Use TechnicalSEO.com to generate `FAQ` schema using the exact FAQs
  already added to GBP
- Add it to the source code of the homepage

### 2.2 Page Architecture — Service Pages
The goal: one dedicated page per core service.
Google rewards demonstrated topical expertise. More targeted pages = more
topical authority = stronger map rankings.

#### Page Hierarchy
```
Rank 1: Homepage (main landing page)
Rank 2: Category pages (Core Service 1, Core Service 2, Core Service 3)
Rank 3: Individual service pages — linked from Rank 2, interlinked with each other
```

#### Content Guidelines per Page
- Length: 1,500–2,500 words
- Unique copy per page (generate with AI, then review and edit)
- Structure: intro → key concepts → local references → service details → FAQ → CTA

#### AI Prompt for Service Pages
```
You are an experienced local SEO copywriter specializing in [TYPE OF BUSINESS - ask the user] businesses.

Task: Create a high-value services page (1,800–2,500 words) to build topical
authority around: "[TOPIC — e.g., 'Services our skincare clinic in Sofia offers']"

Target audience: [DESCRIBE TARGET AUDIENCE - ask the user]
Primary keyword: "[PRIMARY KEYWORD - ask the user]"
Secondary keywords: [LIST SECONDARY KEYWORDS - ask the user]

Instructions:
1. Write a short search intent summary
2. Build a clear H1–H3 outline
3. Show expertise (E-E-A-T): practical insights, local references, unique tips
4. Structure: hook > main sections > FAQ (6–10 Qs) > CTA
5. Add: SEO title, meta description, H1 suggestion, 3–4 image alt texts, schema outline
```

### 2.3 Local Authority Pages (Area Pages)
The goal: prove the client serves specific geographic areas.
One page per service area (neighborhood).

#### Structure
- Create an "Areas We Serve" hub page linked from the main navigation
- Create one subpage per area at: `/areas/[area-name]`
- Target keyword per page: "[SERVICE NAME - ask the user] [NEIGHBORHOOD NAME - ask the user]" and "best [SERVICE NAME - ask the user] in [NEIGHBORHOOD NAME - ask the user]"
- Length: 1,200–2,200 words per area page

#### AI Prompt for Area Pages
```
You are a senior local SEO specialist.

Task: Write a hyperlocal landing page (1,200–2,200 words) for [BUSINESS NAME - ask the user]
in [LOCATION - ask the user] serving [AREA NAME - ask the user].

Page goal: Rank for "[SERVICE NAME - ask the user] [NEIGHBORHOOD NAME - ask the user]", "best [SERVICE NAME - ask the user] in [NEIGHBORHOOD NAME - ask the user]"
Primary keyword: "[PRIMARY KEYWORD - ask the user]"

Include:
- Full NAP
- Neighborhood-specific landmarks, streets, events
- Proximity proof
- Local customer references
- Directions from key local spots
- 8–10 local FAQs
- Strong CTA
```

### 2.4 Internal Linking
Connect all pages so Google can crawl and index the full site.

#### Rules
- On each SERVICE page: link to 1–3 relevant area pages + add a "We also serve" section
  listing all other areas at the bottom
- On each AREA page: link to 2–4 relevant service pages + add a "Services we offer here"
  section listing all other services at the bottom

#### Anchor Text Rules
- Use natural language (e.g., "our plumbing repair service")
- Vary phrasing — never repeat the exact same anchor text on every page
- Maximum 8–10 links per page
- Only add links that genuinely help the reader — no forced linking

---

## IMPLEMENTATION RULES FOR THE AGENT

When building or editing any page in this project, the agent must:

1. **Title tags** — always follow the `BEST + category + city + services + near me` format.
   Never truncate to 60 characters. Keyword density beats length limits here.

2. **H1** — exactly one per page. Format: `[Primary Category] [City]`. No exceptions.

3. **H2** — reflect secondary categories and key services derived from competitor research.

4. **Footer NAP** — must be rendered as plain HTML text (not an image), must be
   crawlable by Googlebot, and must match the GBP listing character-for-character.

5. **Google Maps embed** — always on the homepage, adjacent to the NAP block.

6. **Schema** — LocalBusiness and FAQ JSON-LD blocks go in the `<head>` of the homepage.
   Generate them from TechnicalSEO.com before adding. Never hand-write schema — use the generator.

7. **Service pages** — each is a standalone Next.js route under `/services/[slug]`.
   Minimum 1,500 words. Unique copy. Never duplicate content across service pages.

8. **Area pages** — each is a standalone route under `/areas/[slug]`.
   Minimum 1,200 words. Include local references (streets, landmarks, events) specific
   to that neighborhood.

9. **Internal links** — every service page links to area pages. Every area page links
   to service pages. The homepage links to all category pages. Anchor text must be natural
   language — never exact-match keyword stuffing.

10. **Images** — all images must have descriptive, keyword-relevant alt text.
    Use Next.js `<Image>` component. Never use `<img>` tags directly.

11. **NAP consistency** — before any citation, publication, or directory submission,
    verify the NAP string matches the GBP exactly (ask the user for the exact NAP). This applies to footer, schema,
    area pages, and all off-site mentions.
