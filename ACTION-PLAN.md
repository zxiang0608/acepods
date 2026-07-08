# Action Plan — aceofficepods.com
**Date:** 2026-06-13 | **SEO Score:** 71/100

---

## CRITICAL (Fix this week)

### C1 — Update llms.txt with 3 new articles + 2 new location pages
**File:** `public/llms.txt`
**Why:** AI engines read llms.txt to discover content. 3 new articles and Penang/JB pages are invisible to AI crawlers until listed.
**Fix:** Add to Articles section — the 3 new article slugs. Add to Services section — `/locations/penang` and `/locations/johor-bahru`.
**Effort:** 15 minutes

---

## HIGH (Fix within 1 week)

### H1 — Add hero image preload hint in prerender.mjs
**File:** `scripts/prerender.mjs`
**Why:** Browser can't discover LCP image until 100 KB JS bundle parses. Preload hint allows parallel download. Estimated LCP improvement: −0.5–1.0s homepage.
**Fix:** Inject `<link rel="preload" as="image" type="image/avif" href="/assets/hero-pods-[hash].avif" fetchpriority="high">` into `<head>` of homepage prerendered output. Read hash from Vite manifest.
**Effort:** 2–4 hours

### H2 — Convert product hero PNGs to AVIF
**Files:** `src/data/products.js` image imports, product image source files
**Why:** `ace-plus-front-transparent.png` = 673 KB. AVIF equivalent ~30–60 KB. Product page LCP estimated 3–5s on mobile.
**Fix:** Batch-convert all 6 product front-transparent PNGs to AVIF using `sharp`. Update `products.js` to `<picture>` with AVIF source.
**Effort:** 2–3 days

### H3 — Add real comparison table to `/compare-office-pods`
**File:** `src/pages/CompareOfficePodsPage.jsx`
**Why:** Page is 636 words, text-only. SERP intent is transactional — users expect a spec table. Data exists in `podSeoCatalog.js`.
**Fix:** Add responsive table: model, capacity, dimensions, noise reduction, starting price, best use case. Keep existing editorial copy below.
**Effort:** Half day

### H4 — Fix `og:type` on article pages
**File:** `src/pages/ArticleDetailPage.jsx`
**Why:** All 9 articles declare `og:type: website`. Should be `article` with `article:published_time`.
**Fix:** Pass `ogType="article"` and `ogPublishedTime={article.date}` to `SeoMeta` on article pages.
**Effort:** 1–2 hours

### H5 — Add `aggregateRating` to schema (once reviews exist)
**Files:** `src/seo/schema.js`, `scripts/prerender.mjs`
**Why:** Missing `aggregateRating` = no star snippets in SERPs. Actionable once Ace has ≥4 verified Google reviews.
**Effort:** 1 hour (after reviews)

---

## MEDIUM (Fix within 1 month)

### M1 — Add `image` property to Article schema
**File:** `scripts/prerender.mjs` `buildArticlePrerenderMeta()`
**Why:** Google Article rich results require `image`. Currently missing from all 9 article schemas.
**Fix:** Add `image: \`${SEO_BASE_URL}/og-image.png\`` to Article schema object (or article-specific image).
**Effort:** 30 minutes

### M2 — Lazy-load Elfsight Instagram embed
**File:** `src/components/InstagramFeed.jsx`
**Why:** External script loads on every homepage visit. Causes 200–400ms main-thread tasks affecting INP.
**Fix:** Use `IntersectionObserver` — inject script only when section enters viewport.
**Effort:** 2–4 hours

### M3 — Route-based code splitting (React.lazy)
**File:** `src/App.jsx`
**Why:** All pages in one 386 KB bundle. Homepage loads ProductPage, ArticleDetailPage, etc. unnecessarily.
**Fix:** `React.lazy()` for heavy pages. Wrap routes in `<Suspense>`.
**Effort:** 2–3 days

### M4 — Memoize derived values in ProductPage.jsx
**File:** `src/pages/ProductPage.jsx`
**Why:** `productDisplayItems`, `customerGalleryItems`, `pricingRows` recalculate on every state change. Pushes INP to 200ms+ on low-end Malaysian mobile.
**Fix:** Wrap with `useMemo(() => ..., [deps])`.
**Effort:** 1–2 days

### M5 — Fix SpeakableSpec IDs in prerendered HTML
**File:** `scripts/prerender.mjs`
**Why:** `#home-answer`, `#ace-plus-answer` etc. only exist in React-rendered DOM, not static HTML. Google's JS render resolves this but it's fragile.
**Fix:** Inject `id` attributes on target paragraphs in each page's prerendered body content.
**Effort:** 1–2 hours

### M6 — Fix FAQ page title tag
**File:** `src/pages/FaqPage.jsx`
**Why:** "FAQ | Ace Office Pods" = 32 chars, no keyword.
**Fix:** "Office Pod FAQ Malaysia — Pricing, Delivery & Installation | Ace Office Pods"
**Effort:** 5 minutes

### M7 — Add security headers to vercel.json
**Why:** Missing `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`.
**Fix:** Add headers block in `vercel.json` for all routes.
**Effort:** 30 minutes

### M8 — Standardise sitemap lastmod formats
**File:** `scripts/generate-sitemap.mjs`
**Why:** 3 location pages use date-only, 2 use full datetime. Minor inconsistency.
**Fix:** Standardise all to full ISO 8601 datetime.
**Effort:** 30 minutes

### M9 — Bulk convert customer gallery JPEGs to AVIF
**Why:** ~15 customer gallery JPEGs at 3–5 MB each. AVIF reduces to ~150–300 KB each.
**Fix:** Node script using `sharp` to batch-process all JPEGs.
**Effort:** 3–5 days

---

## LOW (Backlog)

| # | Fix | File | Effort |
|---|---|---|---|
| L1 | Compress og-image.png (6.9 MB → <150 KB) | `public/og-image.png` | 30 min |
| L2 | Font preload for weight 400 woff2 | `scripts/prerender.mjs` | 1 hour |
| L3 | Add `width`/`height` to above-fold `<img>` elements | Various | Half day |
| L4 | Per-article/pod lastmod tracking | `scripts/generate-sitemap.mjs` | 2 hours |
| L5 | Homepage → top article internal links in body | `scripts/prerender.mjs` | 1 hour |

---

## External Actions (User-only)

| Action | Priority |
|---|---|
| Get Google reviews — target 20+ (ask Everllence, Parker Hannifin, Taylor's College, CMA CGM, Alphabet Capital) | **Critical** |
| Register on MATRADE, CIDB directories | High |
| Submit to MIID and interior design portals | High |
| Add to Bing Places for Business | Medium |
| Add to Apple Business Connect | Medium |
| YouTube: product walkthrough video | Medium |

---

## Execution Order

| Sprint | Items | When |
|---|---|---|
| Sprint 1 | C1, H4, M6, M7, L1 | This week |
| Sprint 2 | H1, H3, M1, M2, M5 | Next week |
| Sprint 3 | H2, M3, M4 | 2–3 weeks |
| Sprint 4 | M8, M9, L2–L5 | Ongoing |
| External | Review acquisition, directories | Ongoing |

---

*Generated 2026-06-13. Update after each sprint.*
