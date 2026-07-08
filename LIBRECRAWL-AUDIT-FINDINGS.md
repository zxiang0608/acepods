# LibreCrawl Audit Findings

**Site:** https://aceofficepods.com  
**Audit date:** 2026-06-15  
**Pages crawled:** 37  
**Crawl result:** All crawled pages returned HTTP 200. No broken pages, redirect loops, 4xx responses, or 5xx responses were found.

## Executive Assessment

Current technical SEO foundation: **7.5/10**.

The site has a strong baseline: crawlable routes, substantial product and article content, working canonicals, and no broken internal pages. The main confirmed issue is that `/office-chairs` is intentionally marked `noindex` even though it appears in primary site navigation. Metadata length issues and two genuinely thin commercial pages are secondary priorities.

LibreCrawl reported 37 slow pages, but this crawl used JavaScript rendering with a configured three-second wait. The minimum reported response time was approximately 3.09 seconds, proving that the wait was included in the measurement. These results must not be treated as valid server response times or Core Web Vitals.

## Priority 1: Indexability

### Office chairs page is blocked from search

- URL: `/office-chairs`
- Finding: `noindex, follow`
- Concern: The page appears in site navigation but cannot be indexed.
- Recommendation: Remove `noindex` if office chairs are an active product category that should receive organic traffic. Keep it only if the page is deliberately temporary or outside the site's search strategy.
- Verification: Inspect the rendered robots meta tag, recrawl the page, and check URL Inspection in Google Search Console.

### Intentional noindex pages

- `/privacy`
- `/terms`

These legal pages can remain `noindex, follow`. No corrective action is required.

## Priority 2: Performance Verification

LibreCrawl marked all 37 pages as slow, with an average of 5.23 seconds. This is not a reliable performance result because the crawler added a three-second JavaScript rendering wait to every page.

Run Lighthouse or PageSpeed Insights on mobile and desktop before making performance changes. Test:

1. Homepage
2. `/pods/ace-meet`
3. `/pods/ace-flex-duo`
4. `/pods/ace-plus`
5. `/portfolio`
6. `/articles`

Measure LCP, CLS, INP diagnostics, TTFB, image payloads, JavaScript execution, and render-blocking resources. Prioritize fixes only after this independent verification.

## Priority 3: Titles

Titles reported above the crawler's recommended 60-character threshold:

| URL | Length |
|---|---:|
| `/faq` | 76 |
| `/office-phone-booth-malaysia` | 65 |
| `/locations/shah-alam` | 65 |
| `/installation-support` | 63 |
| `/articles/office-pods-office-booths-modern-workplace` | 63 |
| `/articles/office-pods-vs-built-rooms` | 62 |
| `/articles/meeting-pods-for-hybrid-teams` | 61 |

Recommendation: Rewrite toward approximately 50-60 characters while preserving the primary query and commercial meaning. Character count is a guideline, not a hard ranking rule; avoid removing useful specificity solely to satisfy the tool.

## Priority 4: Meta Descriptions

### Too long

| URL | Length |
|---|---:|
| `/locations/penang` | 178 |
| `/articles/office-pods-office-booths-modern-workplace` | 172 |
| `/privacy` | 171 |
| `/locations` | 169 |
| `/articles/how-to-choose-office-pod-malaysia` | 167 |
| `/locations/kuala-lumpur` | 167 |
| `/articles/office-pods-corporate-project-buyers` | 166 |

### Too short

| URL | Length |
|---|---:|
| `/contact` | 111 |
| `/office-chairs` | 116 |
| `/faq` | 119 |

Recommendation: Aim for clear, page-specific descriptions around 140-160 characters. Prioritize indexable commercial and local pages. The privacy-page description is low priority because the page is noindexed.

## Priority 5: Thin Commercial Content

| URL | Words | Recommendation |
|---|---:|---|
| `/portfolio` | 134 | Add project summaries, installed models, locations, client requirements, constraints, and outcomes. |
| `/office-chairs` | 145 | Add range details, use cases, specifications, selection guidance, delivery information, and FAQs. |
| `/contact` | 217 | Low priority. Utility pages can be concise; add useful sales-routing or showroom details only if they help users. |
| `/locations` | 272 | Low priority. Improve naturally with service coverage and installation context rather than writing to an arbitrary word count. |

## Canonical Finding

`https://aceofficepods.com` canonicalizes to `https://aceofficepods.com/`.

This is normal trailing-slash normalization and does not require a change. Ensure internal links and sitemap URLs consistently use the canonical version.

## Recommended Fix Sequence

1. Decide whether `/office-chairs` should rank; remove `noindex` if yes.
2. Run Lighthouse/PageSpeed verification before accepting any performance diagnosis.
3. Improve `/office-chairs` and `/portfolio` content.
4. Shorten the seven oversized titles.
5. Refine indexable-page meta descriptions.
6. Recrawl and compare results.

