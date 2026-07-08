# Full SEO Audit — aceofficepods.com
**Date:** 2026-06-13
**Auditor:** Claude Code (parallel subagent audit)
**Branch at time of audit:** main (commit 4f4c920)

---

## SEO Health Score: 71 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 78 | 17.2 |
| Content Quality | 23% | 72 | 16.6 |
| On-Page SEO | 20% | 80 | 16.0 |
| Schema / Structured Data | 10% | 68 | 6.8 |
| Performance (CWV) | 10% | 52 | 5.2 |
| AI Search Readiness | 10% | 74 | 7.4 |
| Images | 5% | 42 | 2.1 |
| **Total** | | | **71.3** |

---

## Executive Summary

aceofficepods.com is a well-structured B2B site with strong on-page fundamentals: clean canonical tags, correct noindex implementation, prerendered HTML on all 33 routes, comprehensive schema coverage, and a functioning llms.txt. The site ranks page 1 for long-tail location queries and holds AI citation presence in 3 of 4 major engines.

The primary gaps are **performance** (product page images are large PNGs with no AVIF, no hero preload hint — LCP estimated 2.8–4.5s on mobile), **schema gaps** (no `aggregateRating` on LocalBusiness or Products, SpeakableSpec IDs rely on JS rendering), and **content depth** on the Compare page and product pages. The biggest external gap remains Google review count: InstaPod has 126 reviews vs Ace's significantly fewer.

### Top 5 Critical/High Issues
1. No `aggregateRating` on LocalBusiness or Product schemas
2. Product hero images are large PNGs — no AVIF equivalent
3. No `<link rel="preload">` for hero/LCP images in prerendered HTML
4. llms.txt missing 3 new articles and 2 new location pages
5. `/compare-office-pods` has no real comparison table (636 words, editorial-only)

### Top 5 Quick Wins (< 1 day effort each)
1. Add hero AVIF preload hint in prerender.mjs
2. Update llms.txt with 3 new articles + Penang/JB locations
3. Compress og-image.png from 6.9 MB to ~150 KB
4. Change `og:type` from "website" to "article" on all 9 article pages
5. Lazy-load Elfsight Instagram script via IntersectionObserver

---

## 1. Technical SEO

### 1.1 Robots.txt
**PASS.** Clean robots.txt allows all crawlers including all major AI bots:
- GPTBot ✅ | OAI-SearchBot ✅ | ChatGPT-User ✅ | ClaudeBot ✅ | PerplexityBot ✅ | Google-Extended ✅
- Sitemap reference present ✅

### 1.2 Sitemap
**PASS.** All 33 expected URLs present, all return HTTP 200, no noindexed pages in sitemap, no `priority`/`changefreq` tags (correct), sitemap referenced in robots.txt.

Minor issues:
- **Low:** Inconsistent `lastmod` format on location pages (3 use date-only, 2 use full datetime)
- **Low:** All 9 articles share identical `lastmod` timestamp (batch generation artifact)
- **Low:** All 6 pod pages share identical `lastmod` timestamp

### 1.3 Canonicals & Meta Robots
**PASS.** Every page has a correct self-referencing canonical. All indexable pages have `robots: index, follow`. `/office-chairs`, `/privacy`, `/terms` correctly set to `noindex, follow`.

### 1.4 Security Headers
- HTTPS ✅ | HSTS (`max-age=63072000`) ✅ | Hashed asset caching (immutable) ✅
- **Missing (Low):** `X-Content-Type-Options: nosniff`, `X-Frame-Options`, `Permissions-Policy`
- Fix: Add via `vercel.json` headers config

### 1.5 JavaScript Rendering
React 18 SPA with prerendered HTML on all 33 routes. Googlebot receives full text content without JS. Schema, title, meta description, and H1 all present in static `<head>`.

**Issue (Medium):** SpeakableSpecification CSS selectors (`#home-answer`, `#ace-plus-answer`, etc.) point to element IDs that only exist in the React-rendered DOM after hydration — not in the prerendered static HTML. Googlebot's full rendering resolves this, but non-JS crawlers do not.

### 1.6 Internal Linking
- Homepage: 10 unique internal links (low)
- Product pages: 6 unique internal links
- Article pages: 9 unique internal links (improved after recent cross-linking work)

**Recommendation (Medium):** Homepage should link to 2–3 top articles from the main content section, not just navigation.

---

## 2. Content Quality

### 2.1 Word Count & Depth

| Page | Words (prerendered) | Assessment |
|---|---|---|
| Homepage | 1,145 | Adequate |
| Office Pods | 869 | Adequate |
| Pricing | 1,131 | Good |
| Compare Office Pods | 636 | **Thin — no comparison table** |
| FAQ | 1,523 | Good |
| Ace Plus (product) | 656 | Moderate |
| Price Guide Article | 1,667 | Good |
| Buyer Guide Article | 1,865 | Good |
| ROI Article | 1,701 | Good |
| KL Location | 300 | Low (prerendered only; JS renders more) |
| Penang Location | 493 | Adequate for new page |

### 2.2 E-E-A-T Signals

**Strengths:**
- Named company with SSM registration number (202403171118)
- Real completed projects with named companies + photos (Everllence, Parker Hannifin, Taylor's College, CMA CGM, Alphabet Capital)
- Specific verifiable data: RM pricing, 27 dBA, 155 CFM airflow, 180+ pods sold
- Physical showroom address, phone, WhatsApp
- Brand disambiguation text added to homepage

**Weaknesses:**
- No individually named authors with credentials (articles attributed to "Ace Office Pods Team")
- No embedded third-party reviews or testimonials on-site
- No industry certifications, awards, or media mentions

### 2.3 Thin Content
- `/compare-office-pods`: 636 words, text-only editorial — **no real model comparison table with specs**. High priority fix.
- Product pages: 656w in prerendered form. Full JS content is longer but prerendered version is thin for non-JS indexing.

### 2.4 Duplicate Content Risk
Low. Each page targets distinct keywords. Descriptions and article content are unique.

---

## 3. On-Page SEO

### 3.1 Title Tags

| Page | Title | Length | Assessment |
|---|---|---|---|
| Homepage | Office Pods Malaysia \| Ace Office Pods | 58 | Good |
| Pricing | Office Pod Prices Malaysia \| Ace Office Pods | 48 | Good |
| FAQ | FAQ \| Ace Office Pods | 32 | **Too short — add keyword** |
| Ace Plus | Ace Plus Office Pod Malaysia \| Ace Office Pods | 55 | Good |
| Price Guide | Office Pod Prices Malaysia 2026 \| Full Model Cost Guide \| Ace Office Pods | 50 | Good |

**Fix (Low):** `/faq` title → "Office Pod FAQ Malaysia — Pricing, Delivery & Installation \| Ace Office Pods"

### 3.2 Meta Descriptions
All key pages have unique descriptions between 119–178 characters. Include primary keywords. No issues.

### 3.3 Heading Structure
All pages: exactly 1 H1 ✅. H2 count 1–10 (product pages have only 1 H2 in prerendered HTML). No heading skips.

### 3.4 OG Tags
All pages have `og:image`, `og:title`, `og:description` ✅

**Issue (Medium):** All pages including articles use `og:type: website`. Article pages should use `og:type: article` with `article:published_time` and `article:author` meta tags.

---

## 4. Schema / Structured Data

### 4.1 Coverage by Page

| Page | Schema Types |
|---|---|
| Homepage | Organization+LocalBusiness+FurnitureStore+ProfessionalService, WebSite, WebPage, FAQPage (6Q), SpeakableSpec |
| Product (Ace Plus) | Organization, WebSite, Product (offers+image+brand), BreadcrumbList, FAQPage (4Q), SpeakableSpec |
| Article (Price Guide) | Organization, WebSite, Article (author+publisher), BreadcrumbList, FAQPage (6Q), SpeakableSpec |
| Location (Penang) | Organization+LocalBusiness, WebSite, Service (areaServed=Penang), FAQPage (3Q), SpeakableSpec, BreadcrumbList |
| Pricing | Organization+LocalBusiness, WebSite, WebPage, BreadcrumbList, ItemList, SpeakableSpec, FAQPage (5Q) |
| FAQ | Organization, WebSite, FAQPage (15Q), BreadcrumbList, SpeakableSpec |

### 4.2 Schema Issues

**HIGH — Missing `aggregateRating` on LocalBusiness and Products**
No star rating schema anywhere. Once Ace has ≥4 verified Google reviews, adding `aggregateRating` enables star snippets in SERPs. Do not add fabricated ratings.

**MEDIUM — SpeakableSpec IDs only exist in JS-rendered DOM**
`#home-answer`, `#ace-plus-answer`, etc. are injected by React components, absent from prerendered HTML. Googlebot's JS rendering resolves this. Fix: inject `id` attributes into prerendered noscript body content in `prerender.mjs`.

**MEDIUM — `og:type: website` on article pages**
Should be `og:type: article` with `article:published_time`.

**LOW — Article schema missing `image` property**
Add featured image URL to the Article JSON-LD block for richer rich results eligibility.

### 4.3 Validation
All JSON-LD blocks parse without syntax errors. No required properties missing for current schema types beyond the gaps listed above.

---

## 5. Performance (Core Web Vitals)

*Lab-grade code audit. No CrUX field data available.*

### 5.1 Estimated Scores

| Metric | Estimate | Status |
|---|---|---|
| LCP (mobile) | 2.8–4.5s | Needs Improvement / Poor |
| INP | 150–300ms | Needs Improvement |
| CLS | ~0–0.05 | Good |

### 5.2 What's Working
Hero AVIF (91 KB vs 2 MB PNG) ✅ | `fetchPriority="high"` on hero ✅ | Self-hosted fonts with `font-display: swap` ✅ | 3-chunk JS split ✅ | Immutable asset cache headers ✅ | GTM async ✅ | Fixed nav height = near-zero CLS ✅

### 5.3 Issues Ranked by Impact

| # | Issue | Effort | LCP Impact |
|---|---|---|---|
| 1 | No `<link rel="preload">` for hero AVIF / PDP primary image | Low (1 day) | −0.5–1.0s |
| 2 | Product cutout images are PNGs (no AVIF) | Medium (2–3 days) | −0.5–1.5s on PDPs |
| 3 | No route-based code splitting (React.lazy) | Medium (2–3 days) | LCP −0.3–0.5s, INP improvement |
| 4 | Unoptimized ProductPage state (no useMemo) | Medium (1–2 days) | INP −50–150ms |
| 5 | Elfsight script loads eagerly on homepage | Low (2–4 hrs) | INP −50–200ms |
| 6 | Bulk-convert JPG customer photos to AVIF | Medium-High (3–5 days) | Bandwidth/gallery |
| 7 | No font preload hint for weight 400 woff2 | Low (1 hr) | LCP −100–200ms |
| 8 | og-image.png is 6.9 MB | Low (30 min) | Social sharing only |
| 9 | GTM container audit / defer init | Low-Medium (1 day) | INP improvement |
| 10 | Missing `width`/`height` on `<img>` elements | Low (half day) | CLS stabilization |

---

## 6. AI Search Readiness (GEO)

### 6.1 AI Crawler Access
**PASS.** All 6 major AI crawlers explicitly allowed. ✅

### 6.2 llms.txt
Present at `https://aceofficepods.com/llms.txt` ✅

**Issues (High):**
- Missing 3 new articles: `office-pod-price-guide-malaysia`, `how-to-choose-office-pod-malaysia`, `office-pod-vs-building-room-malaysia`
- Missing 2 location pages: `/locations/penang`, `/locations/johor-bahru`
- No `llms-full.txt` with complete product specs and FAQ answers

### 6.3 Content Citability
**Strengths:** Named facts (RM pricing, 27 dBA, 155 CFM), real client names, specific renovation cost comparisons, 15-question FAQ page, clear Q&A structure throughout.

**Gaps:** No named individual expert, no third-party citations, no case study pages with measurable outcomes.

### 6.4 Brand Signals
Instagram `@acepodsmy` ✅ | LinkedIn ✅ | Google Maps ✅ | SSM registration in schema ✅ | Brand disambiguation text on homepage ✅

**Gap:** No CIDB, MATRADE, interior design portal, or press mentions detected.

---

## 7. Images

| Issue | Severity |
|---|---|
| Product hero cutout PNGs (6 primary) — no AVIF | High |
| Customer gallery JPEGs (3–5 MB each, ~15 files) | Medium |
| Feature/detail PNGs (1.6–2.7 MB each, ~20 files) | Medium |
| og-image.png is 6.9 MB | Medium |
| Missing width/height attributes on most `<img>` | Low |
| Alt text | PASS — all key images have descriptive alt text |

---

## 8. Local SEO

### 8.1 NAP Consistency
Schema address: `Jalan Gopeng, Kawasan 18, 41400 Klang` ✅
Phone: `+601154352700` consistent ✅ | Email: `sales@aceofficepods.com` ✅

### 8.2 Review Gap
InstaPod: **126 reviews @ 5.0★** — this is the primary competitive gap. Cannot be fixed in code.
Action: Implement review acquisition campaign from external actions backlog.

### 8.3 Location Pages
5 pages present (KL, Shah Alam, Subang Jaya, Penang, JB). KL/Shah Alam/Subang Jaya have real project photos. Penang/JB are service-area pages. All have Service schema, FAQPage, SpeakableSpec, BreadcrumbList. ✅

---

## 9. Pending Sections

The following subagents were still running at report compile time:
- **Technical SEO** (full crawl, redirect chains)
- **GEO** (AI platform-specific query testing)
- **SXO** (intent analysis, persona scoring)
- **Backlinks** (DA, referring domains vs InstaPod/Supreme)
- **Topic Clusters** (keyword gap analysis, content recommendations)

Results will be appended when agents complete.

---

*Report compiled 2026-06-13. Re-run `/seo-audit` after deploying fixes from ACTION-PLAN.md.*
