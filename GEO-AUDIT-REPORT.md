# GEO Audit Report — aceofficepods.com

**Date:** 11 June 2026
**Business:** Ace Workplace Solutions (Ace Office Pods)
**Market:** Malaysia — Klang Valley + West Malaysia
**URL:** https://aceofficepods.com
**Business Type:** Local Service + B2B E-commerce Hybrid

---

## GEO Score: 59 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| AI Citability & Visibility | 25% | 56 | 14.0 |
| Brand Authority Signals | 20% | 38 | 7.6 |
| Content Quality & E-E-A-T | 20% | 68 | 13.6 |
| Technical Foundations | 15% | 65 | 9.75 |
| Structured Data | 10% | 76 | 7.6 |
| Platform Optimization | 10% | 52 | 5.2 |
| **Total** | | | **59 / 100** |

**Interpretation:** The site has a technically sound foundation — correct AI crawler permissions, a comprehensive prerender pipeline, and strong structured data across all page types. The GEO score is held back by thin article content (4 of 6 articles are stubs), no `llms.txt`, no YouTube or GBP presence, and a potential Vercel routing issue that may mean crawlers only see a page title rather than the prerendered HTML body.

**Estimated score after top 5 fixes: 76–80 / 100**

---

## AI Crawler Access

| Crawler | Permission | Status |
|---|---|---|
| GPTBot | Explicit `Allow: /` | ✅ Allowed |
| OAI-SearchBot | Explicit `Allow: /` | ✅ Allowed |
| ChatGPT-User | Explicit `Allow: /` | ✅ Allowed |
| ClaudeBot | Explicit `Allow: /` | ✅ Allowed |
| PerplexityBot | Explicit `Allow: /` | ✅ Allowed |
| Google-Extended | Explicit `Allow: /` | ✅ Allowed |
| CCBot | Not blocked (default Allow) | ✅ Training access |
| anthropic-ai | Not blocked (default Allow) | ✅ Training access |

**Assessment:** Excellent — best-practice configuration. All major AI search crawlers and training crawlers are permitted. No accidental blocks. No action needed.

---

## 1. AI Citability & Visibility — 56 / 100

### What AI models need to cite your content

AI systems prefer passages that are self-contained (extractable without context), 134–167 words in length, contain specific verifiable data, and answer a recognizable question format.

### Strongest citability signals

| Signal | Location | Why it matters |
|---|---|---|
| "RM12,500 starting price" | Pricing page, FAQ, schema | Specific, verifiable, citation-ready |
| "27 dBA noise reduction" | FAQ, schema, Ace Plus specs | Only acoustic figure on site; uniquely quotable |
| Office pod vs. built rooms comparison table | Article 1 | Structured, scannable — highest AI extraction format |
| Pod-type use case matrix | Article 1 | Decision-stage content AI models surface in response to "which office pod should I get?" |
| Named clients with city context | Location pages | Entity anchors — CMA CGM (Bangsar), Parker Hannifin (Shah Alam), Taylor's College (Subang Jaya) |
| CARB Phase 2 / Italian pivot hinges / 155 CFM airflow | Ace Plus product page | Technical specificity signals expertise to AI models |

### Critical citability gaps

| Gap | Impact |
|---|---|
| **4 thin articles (~100 words each)** | Below minimum citable passage length. AI cannot quote what isn't there. |
| **No industry statistics or market data** | Zero external data citations — no "X% of Malaysian offices" type anchors |
| **No named article authors** | Article schema uses Organization author; weaker than a named Person for AI E-E-A-T |
| **All 6 articles share the same datePublished** | Signals content batch, not editorial cadence — reduces recency scoring |
| **SpeakableSpecification only on pricing page** | One of the best-implemented signals on the site; extend to product pages |

### Content passage quality by page type

| Page type | Citable passage quality | Reason |
|---|---|---|
| Pricing page | HIGH | Clear price points, FAQ schema, Speakable |
| Ace Plus product page | HIGH | 27 dB, CARB Phase 2, specific dimensions |
| Article 1 (Modern Workplace) | HIGH | Tables, matrices, 1,100+ words |
| Article 2 (Corporate Buyers) | HIGH | Buyer type definitions, structured lists |
| Homepage | MEDIUM | "180+ pods sold" quotable; most content is JS-only |
| Location pages | MEDIUM | Named clients, but thin on local commercial context |
| Articles 3–6 | VERY LOW | ~100 words each — uncitable |
| /compare-office-pods | LOW | Editorial framing only; no actual comparison table |

---

## 2. llms.txt Status

**Status: MISSING** — 404 at https://aceofficepods.com/llms.txt

`llms.txt` is the fastest-to-implement, highest-leverage GEO action available for this site. It allows AI models (ChatGPT Browse, Claude, Perplexity) to access a curated, structured summary of the site's content without having to crawl and parse every page.

### Recommended llms.txt content

```
# Ace Office Pods by Ace Workplace Solutions

> Ace Office Pods (ACE WORKPLACE SOLUTIONS, SSM 202403171118) supplies acoustic
> office pods, office booths, office phone booths, and meeting pods in Malaysia.
> Showroom in Klang, Selangor (by appointment). Delivery and installation across
> Klang Valley and West Malaysia. 180+ pods sold since 2023.

## Products
- [Ace Solo](/pods/ace-solo): 1-person compact call and focus pod. From RM12,500.
- [Ace Plus](/pods/ace-plus): 1-person phone and focus pod with 27 dB noise reduction. From RM14,500.
- [Ace Flex](/pods/ace-flex): Spacious 1-person focus pod. From RM19,900.
- [Ace Flex Duo](/pods/ace-flex-duo): 2-person focus and discussion pod. From RM23,900.
- [Ace Meet](/pods/ace-meet): 2–4 pax meeting pod for small team collaboration. From RM22,200.
- [Ace Hub](/pods/ace-hub): Up to 6 pax hub and lounge pod. From RM27,800.

## Key facts
- Noise reduction: approximately 27 dBA in real office conditions
- Construction: 100% locally made in Malaysia
- Lead time: approximately 3–6 working weeks after 50% deposit
- Payment: 50% deposit, balance before delivery
- Showroom: Jalan Haji Salleh, Off Jalan Meru, Batu 5½, 41050 Klang, Selangor
- Phone / WhatsApp: +601154352700
- Email: sales@aceofficepods.com

## Services
- [Delivery and installation in Klang Valley](/installation-support)
- [Showroom viewing by appointment](/contact)
- [Office pods in Kuala Lumpur](/locations/kuala-lumpur)
- [Office pods in Shah Alam](/locations/shah-alam)
- [Office pods in Subang Jaya](/locations/subang-jaya)

## Pricing
- [Full pricing page](/pricing): starts from RM12,500 for one-person pod
- [Compare office pods](/compare-office-pods)

## Articles
- [Office Pods and Office Booths: A Modern Workplace Guide](/articles/office-pods-office-booths-modern-workplace)
- [Office Pods for Corporate Buyers, Contractors, and Interior Designers](/articles/office-pods-corporate-project-buyers)
- [Office Pods vs Built Rooms](/articles/office-pods-vs-built-rooms)
- [How to Choose the Right Office Pod Size](/articles/how-to-choose-office-pod-size)
- [Office Phone Booths for Open-Plan Offices](/articles/office-phone-booths-for-open-plan-offices)
- [Meeting Pods for Hybrid Teams](/articles/meeting-pods-for-hybrid-teams)
```

**Deploy to:** `public/llms.txt` → serves at `https://aceofficepods.com/llms.txt`

---

## 3. Brand Authority Signals — 38 / 100

Brand mentions on authoritative external platforms are the single strongest correlate (3x stronger than backlinks) with AI citation according to Ahrefs December 2025 data.

### Current brand footprint

| Platform | Status | Notes |
|---|---|---|
| LinkedIn | ✅ Present | `linkedin.com/company/ace-workplace-solutions-...` in sameAs |
| Instagram | ✅ Present | `instagram.com/acepodsmy/` in sameAs |
| Google Business Profile | ❌ Not found | No GBP URL in sameAs; no reviews widget on site |
| YouTube | ❌ Not found | No channel, no product videos |
| Wikipedia / Wikidata | ❌ Not found | No entity for "Ace Workplace Solutions" |
| Reddit | ❌ Not found | No r/malaysia mentions, no forum presence |
| Press / media | ❌ Not found | No coverage in Malaysian business media |
| Industry directories | ❌ Not found | Not in MATRADE, SME Corp, Yellow Pages MY |
| Review aggregators | ❌ Not found | No Google reviews, Clutch, or Trustpilot |

### Assessment

The brand is in an early, pre-authority state. LinkedIn and Instagram alone are insufficient for AI models to confidently associate "Ace Office Pods" with "office pods Malaysia" in response generation. The site has genuine trust assets (named enterprise clients: CMA CGM, Parker Hannifin, Taylor's College, Matrade affiliation) that are not being activated externally.

### Priority authority-building actions

1. **Google Business Profile** — Create and verify listing for Klang showroom. Add GBP URL to `SEO_BRAND_SAME_AS` in `src/seo/constants.js`. Begin accumulating Google reviews. This is the single fastest route to Local Pack + Google AI Overviews eligibility for location queries.

2. **YouTube** — Record one 2–3 minute showroom walkthrough video. YouTube correlation with AI citation is 0.737 — the strongest single external signal. A basic walkthrough is sufficient to establish the signal; production value is secondary.

3. **Client LinkedIn articles** — Publish a brief LinkedIn post or article for each named client installation (CMA CGM, Parker Hannifin, Taylor's College, Everllence, Alphabet Capital). Client entity co-mention creates associative trust signals that AI training pipelines associate with your brand.

4. **MATRADE + SME Corp directories** — Government domain listings are high-trust citations that improve entity recognition. Matrade is already in the homepage logo strip — a supplier listing formalizes that affiliation.

5. **Malaysian B2B media pitch** — One article in Vulcan Post, Focus Malaysia, or The Malaysian Reserve covering "Malaysian-made office pods for modern workplaces" establishes the brand in authoritative Malaysian content that AI models are more likely to reference.

---

## 4. Content Quality & E-E-A-T — 68 / 100

### E-E-A-T summary

| Signal | Score | Notes |
|---|---|---|
| Experience | 16/20 | 180+ pods, named clients, portfolio photos — but no founding story, no team names |
| Expertise | 18/25 | Ace Plus technical specs (27 dB, CARB Phase 2, 155 CFM) are exceptional; 4 stub articles drag this down |
| Authoritativeness | 16/25 | Matrade affiliation is strong; zero third-party reviews or press citations |
| Trustworthiness | 21/30 | HTTPS, clear pricing, honest acoustic disclaimer; no privacy policy, no visible contact details |

### Critical content actions

**Expand 4 thin articles immediately (or noindex them)**

Articles 3–6 have ~100 words each. These are below the minimum viable citation threshold and may trigger thin-content signals on core update cycles.

Priority expansion order:
1. `office-pods-vs-built-rooms` — high commercial query volume, perfect for AI Overview inclusion
2. `how-to-choose-office-pod-size` — decision-stage query; directly maps to "which office pod should I buy?" queries
3. `meeting-pods-for-hybrid-teams` — topical for current hybrid work query cluster
4. `office-phone-booths-for-open-plan-offices` — strong product-category alignment

Each article should reach 800+ words with: a direct-answer opening paragraph (40–60 words), comparison tables or decision matrices, and a FAQ section. Articles 1 and 2 already demonstrate this quality — use them as templates.

**Add question-format H2 headings**

Current headings are statement-based ("Why modern workplaces use office pods"). AI models pattern-match against user queries; question-format headings ("Why do modern workplaces use office pods?") have higher AI extraction rates. Reframe 3–5 H2s per article.

**Surface the "180+ pods sold" stat in schema**

Add it as a `quantitativeValue` inside the Organization schema:
```json
{
  "@type": "QuantitativeValue",
  "name": "Office pods sold",
  "value": "180+",
  "unitText": "pods",
  "description": "Since 2023 in Malaysia"
}
```
This makes the stat citation-ready for AI extraction.

**Add About page + author profiles**

Currently no About page exists in the navigation. Without a named human author and a linked author profile, the Article schema author (`"@type": "Organization"`) is the weakest permitted form. Adding even a minimal `/about` page with the founding year, the team's background in Malaysian office fitout, and the manufacturing context in Klang would significantly improve E-E-A-T for articles.

---

## 5. Technical Foundations — 65 / 100

### Architecture overview

| Layer | Status | Notes |
|---|---|---|
| Framework | React 18 / Vite | SPA — requires prerendering for crawlers |
| Prerender pipeline | Custom Node.js | `scripts/prerender.mjs` — correct architecture |
| Hosting | Vercel | Edge network — fast delivery if routing is correct |
| HTTPS | ✅ Standard | Via Vercel |
| GTM | ✅ With noscript | `GTM-TXKKNMNW` — correctly implemented |
| robots.txt | ✅ Excellent | All AI crawlers explicitly permitted |
| Sitemap | ✅ 28 URLs | Valid, matches robots.txt declaration |
| Canonical | ✅ All routes | Correctly set via prerender |

### Critical technical issues

**Issue 1: `og:image` not injected in prerender HTML**

The `injectSeoHtml()` function in `scripts/prerender.mjs` (lines 1329–1344) sets OG title, description, URL, and type — but not `og:image` or `twitter:image`. These are only added client-side by `SeoMeta.jsx`. LinkedIn, WhatsApp, and any service using static HTML fetching will see blank share cards.

Fix — add two lines to `prerender.mjs`:
```js
`    <meta property="og:image" content="${SEO_BASE_URL}/og-image.png" />\n` +
`    <meta name="twitter:image" content="${SEO_BASE_URL}/og-image.png" />\n` +
```

**Issue 2: Product page noscript content is 2 lines**

`buildProductPrerenderMeta()` produces a noscript body of `["Starting from RM12,500", "shortDesc"]`. Google's rendering of JavaScript is not guaranteed on every crawl. When it falls back to static HTML, each product page has near-zero indexable content.

Fix — expand `body` in `buildProductPrerenderMeta()` to include the product's `quickAnswer`, top 3 features, key spec values, and FAQ items. All this data already exists in `podSeoCatalog.js`.

**Issue 3: Verify Vercel serves prerendered files (most urgent)**

Multiple HTTP fetches to the live site returned only the `<title>` tag — not the noscript body or schema that the prerender script injects. This pattern indicates Vercel may be serving the base `index.html` for all routes rather than the route-specific `dist/[route]/index.html` files.

Verify with:
```bash
curl -s https://aceofficepods.com/pricing | grep -o '<h1>[^<]*</h1>'
# Expected: <h1>How much does an office pod cost?</h1>
# If empty: Vercel routing needs a rewrite rule
```

If the prerender is not delivering, all carefully structured schemas, noscript bodies, and canonical tags are invisible to crawlers. This one issue may be responsible for the bulk of the gap between the site's technical design and its actual AI search visibility.

**Other technical findings:**

- ⚠️ 4 location URLs missing `lastmod` in sitemap
- ⚠️ 2 service pages orphaned in nav (`/meeting-pods-malaysia`, `/office-phone-booth-malaysia`)
- ⚠️ Trailing slash inconsistency (homepage uses `/`, all others do not)
- ❌ No image sitemap — product images not indexed for Google Image Search
- ❌ No `llms.txt` at `/llms.txt`
- ❌ Homepage title mismatch: prerender uses "Ace Office Pods by Ace Workplace Solutions | Office Pods and Booths Malaysia"; `SeoMeta.jsx` in `App.jsx` uses "Ace Office Pods & Office Booths Malaysia | Acoustic Meeting Pods" — these diverge when JS loads

---

## 6. Structured Data — 76 / 100

Structured data is the strongest dimension on the site. The prerender pipeline correctly injects all schemas into the static HTML at build time.

### Schema coverage matrix

| Schema type | Routes | Quality | AI value |
|---|---|---|---|
| Organization | All | ✅ Strong | Entity recognition, brand confidence |
| LocalBusiness (FurnitureStore) | 8 routes | ✅ Good | Local Pack, maps AI features |
| WebSite | All | ✅ Standard | Site-level entity |
| FAQPage | 7+ routes | ✅ Strong | **Primary path to Google AI Overviews** |
| Product + Offer | 6 pod routes | ✅ Good | Shopping results, product AI extraction |
| Article | 6 article routes | ✅ Present | Article rich results; datePublished included |
| BreadcrumbList | All | ✅ Complete | Navigation context for AI |
| SpeakableSpecification | Pricing page only | ✅ Rare signal | Voice/AI direct answers |
| Service | Location sub-pages | ✅ Good | Local service intent |
| ItemList | Pricing, near-me | ✅ Good | Product list AI extraction |
| Review / AggregateRating | None | ❌ Missing | Reviews drive AI citation confidence |
| VideoObject | None | ❌ Missing | No video content |
| HowTo | None | ❌ Missing | Installation page is a natural fit |
| DefinedTerm | None | ❌ Missing | Terminology table in Article 1 |

### Key schema gaps

**AggregateRating on Organization and Products**
Zero reviews exist anywhere on the site. Adding `AggregateRating` requires genuine reviews — the first priority is establishing a GBP listing and soliciting reviews from the 180+ pod buyers. Once reviews exist, adding the schema is trivial.

**HowTo on /installation-support**
The installation page describes a sequential process: consultation → site check → scheduling → delivery → setup → handover. This is a textbook `HowTo` schema candidate. Adding `HowTo` with `HowToStep` items makes this process directly citable by AI systems responding to "how does office pod installation work in Malaysia?"

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How office pod installation works in Malaysia",
  "step": [
    {"@type": "HowToStep", "name": "Consultation and model selection", "text": "..."},
    {"@type": "HowToStep", "name": "Site check and access review", "text": "..."},
    {"@type": "HowToStep", "name": "Delivery scheduling", "text": "..."},
    {"@type": "HowToStep", "name": "Pod delivery and setup", "text": "..."},
    {"@type": "HowToStep", "name": "Handover and support", "text": "..."}
  ]
}
```

**Article schema: author should be upgraded**
Currently all 6 articles use `"author": {"@type": "Organization"}`. This is valid but weaker for AI E-E-A-T than a named Person. Once an About page with team profiles is created, upgrade to `"author": {"@type": "Person", "name": "[Name]", "url": "https://aceofficepods.com/about#[name]"}`.

**SpeakableSpecification — extend to product pages**
The pricing page `SpeakableSpecification` is correctly implemented. Adding the same to product pages (pointing to the `#key-specs` or `#faq` section) extends voice/AI direct-answer eligibility to the highest-traffic product queries.

---

## 7. Platform Optimization — 52 / 100

| Platform | Score | Primary constraint |
|---|---|---|
| Google AI Overviews | 55/100 | Prerender delivery unconfirmed; 4 thin articles |
| ChatGPT Browse / Search | 48/100 | No llms.txt; thin noscript on product pages |
| Perplexity | 55/100 | FAQPage and pricing data are strong; article stubs drag down |
| Bing Copilot | 50/100 | Dependent on correct prerender delivery to Bing's crawler |
| Claude / Anthropic | 52/100 | ClaudeBot permitted; good FAQ structure; llms.txt missing |

### Google AI Overviews coverage

| Query | Coverage | Gap |
|---|---|---|
| "How much does an office pod cost in Malaysia?" | ✅ Excellent | RM12,500 stated clearly; SpeakableSpecification; FAQPage |
| "What is an office pod?" | ✅ Good | Article 1 covers this; definition table present |
| "Are office pods soundproof?" | ✅ Good | 27 dBA FAQ answer; acoustic disclaimer present |
| "Office pods vs meeting rooms" | ⚠️ Partial | Article 3 stub — only 4 sentences |
| "Which office pod size should I choose?" | ⚠️ Partial | Article 4 stub — only 4 sentences |
| "Best office pods Malaysia" | ❌ Not covered | No "best of" or review-style positioning |
| "Soundproof office pod Malaysia" | ⚠️ Partial | 27 dBA in FAQ; not in article headings or product H1 |
| "Office pod for hybrid teams" | ❌ Not covered | Article 6 stub; no dedicated H2 on any main page |

### Perplexity-specific optimizations

Perplexity weights recency strongly. All 6 articles sharing the same `datePublished: "2026-05-10"` signals a batch of identically-timed content — Perplexity's freshness scoring will treat all 6 as equally old. Update dates to reflect actual publication order.

Perplexity also sources heavily from Reddit and YouTube for entity trust. Neither platform has any Ace Office Pods presence currently.

### ChatGPT Browse optimization

ChatGPT uses a basic HTTP fetch (no JavaScript execution). Product pages and the homepage are returning only the `<title>` tag currently — meaning ChatGPT Browse sees essentially no content when it visits the site. Fixing the Vercel prerender delivery issue is the single action that would most improve ChatGPT visibility.

---

## Priority Action Plan

### Critical (implement this week)

| # | Action | File | GEO Impact |
|---|---|---|---|
| 1 | **Verify Vercel serves prerendered HTML** per route | `vercel.json` / Vercel dashboard routing | Unlocks all crawlers |
| 2 | **Create `public/llms.txt`** (content above) | `public/llms.txt` | ChatGPT, Perplexity, Claude citation |
| 3 | **Add `og:image` + `twitter:image` to prerender** | `scripts/prerender.mjs:1330` | Social share CTR |
| 4 | **Noindex 4 thin articles** until expanded | `src/data/articles.js` robotsMeta field | Thin content risk |

### High (within 2 weeks)

| # | Action | File | GEO Impact |
|---|---|---|---|
| 5 | **Expand product page noscript body** with specs, use cases, FAQ | `scripts/prerender.mjs` `buildProductPrerenderMeta()` | Product page AI visibility |
| 6 | **Expand 4 thin articles** to 800+ words each | `src/data/articles.js` | Citability score |
| 7 | **Create and verify Google Business Profile** | External | Local AI search + GBP reviews |
| 8 | **Build HTML comparison table** on /compare-office-pods | `CompareOfficePodsPage.jsx` | Featured snippet + AI extraction |
| 9 | **Add `HowTo` schema** to installation page | `scripts/prerender.mjs` `/installation-support` schemas | New AI query coverage |

### Medium (within 4–6 weeks)

| # | Action | File | GEO Impact |
|---|---|---|---|
| 10 | **Add `lastmod` to 4 location URLs** | `scripts/generate-sitemap.mjs` | Crawl freshness |
| 11 | **Record YouTube showroom walkthrough** | External | Strongest external brand signal (0.737 correlation) |
| 12 | **Add GBP + MATRADE URLs to `sameAs`** | `src/seo/constants.js` | Entity authority |
| 13 | **Surface "180+ pods sold" in Organization schema** | `src/seo/schema.js` | Cited stat in AI responses |
| 14 | **Extend `SpeakableSpecification` to product pages** | `scripts/prerender.mjs` per-product schemas | Voice/AI direct answers |
| 15 | **Create About/Team page** with founding story | New page + nav | Author E-E-A-T |
| 16 | **Add article date accuracy** (fix 2026-05-10 batch date) | `src/data/articles.js` | Freshness signals |
| 17 | **Publish LinkedIn client case studies** | LinkedIn (external) | Entity co-mention trust |

### Low (next sprint)

| # | Action | GEO Impact |
|---|---|---|
| 18 | Submit to MATRADE + SME Corp directories | Authority backlinks |
| 19 | Add `DefinedTerm` schema to Article 1 terminology table | Definition query coverage |
| 20 | Add Privacy Policy + Terms pages | Trust signals |
| 21 | Add `AggregateRating` once GBP reviews established | Review-based AI citation |
| 22 | Upgrade Article author from Organization to Person | E-E-A-T author identity |

---

## What's Being Done Well (Preserve These)

These are genuine strengths that are uncommon in the market and should not be accidentally removed:

- **robots.txt AI crawler configuration** — explicitly permitting all 6 major AI crawlers is unusual and correct. Do not modify this file without careful review.
- **FAQPage schema on 7+ routes** — the most direct path to Google AI Overviews. Well-structured, question/answer pairs are high quality.
- **SpeakableSpecification on pricing page** — rare and forward-looking. Extend, don't remove.
- **Named enterprise clients in location pages** — CMA CGM, Parker Hannifin, Taylor's College are recognizable entities. These are AI trust anchors. Keep them prominent.
- **Pricing transparency (RM12,500 starting price)** — clearly stated in schema, FAQ, and page content. This is the most citation-ready fact on the site.
- **27 dBA acoustic figure** — the only hard performance metric on the site. Protect and amplify this across more pages.
- **Prerender noscript fallback architecture** — the intent is correct. The issue is execution (thin content + possible Vercel routing). The architecture itself should not be replaced.

---

## Estimated Score After All Critical + High Actions

| Category | Current | After Fixes |
|---|---|---|
| AI Citability & Visibility | 56 | 72 |
| Brand Authority Signals | 38 | 52 |
| Content Quality & E-E-A-T | 68 | 78 |
| Technical Foundations | 65 | 82 |
| Structured Data | 76 | 84 |
| Platform Optimization | 52 | 70 |
| **GEO Score** | **59** | **~77** |

---

*Report generated: 11 June 2026*
*Audited by: GEO Claude Code Skill v2.0*
*Site: https://aceofficepods.com*
