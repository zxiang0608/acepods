# Website Checklist Remediation Plan

> For agentic workers: Use `superpowers:executing-plans` and track the checkboxes below. The owner authorized independently possible implementation on 19 October 2026. Missing facts, new asset approvals, payments and deployment remain outside that authorization until resolved. Results are recorded in `docs/website-remediation-status-2026-10-19.md`.

**Goal:** Resolve the supplied website checklist without redesigning the homepage or publishing unsupported product information.

**Architecture:** Keep the shared React product-page template and existing article and portfolio routes. Fix canonical product records and role-specific media mappings before updating dependent pages, feeds and discovery files. Treat content additions, audio and payments as separate releases with their own acceptance checks.

**Tech stack:** Existing React, Vite, Tailwind, route manifest, prerendering and product/media/SEO validators. Payment infrastructure is an open design decision; the current quote journey hands enquiries to WhatsApp.

## Confirmed decisions from 19 October 2026

- The owner confirmed delivery at RM400, resolving the earlier RM350/RM400 conflict in favour of the document's RM400-per-trip requirement. Installation remains a separate charge. Outstation and restricted-access exceptions still require their existing scope treatment.
- The owner confirmed Ace Hub weight at 700 kg. Publish the confirmed weight without adding an unconfirmed net/packed qualifier.
- The owner subsequently requested “run whatever you can first,” authorizing the independently possible implementation tasks. Deployment was not performed.

## Global constraints

- Keep homepage section order, core copy logic, CTA hierarchy, product architecture and visible product-card pricing unchanged.
- Keep one font, the existing mobile hero order and full-width stacked buttons. No sticky CTA in v1.
- Use the shared product-page template. Do not add unrelated refactoring.
- Read `PRODUCT_PAGE_SOURCE_OF_TRUTH.md` and `IMAGE_ASSET_WORKFLOW.md` before product, logo or portfolio changes.
- Only publish assets approved for the specific media role and display order. Folder placement does not establish approval.
- Run `npm run product-images` for catalogue images and inspect shared visible height and baseline.
- Do not infer missing specifications, equipment, prices, certifications or customer outcomes.
- Preserve existing uncommitted work. Review changes relative to the implementation starting state before any release.
- Local implementation, passing checks and production verification are separate statuses.

## Recommended release order

1. Product accuracy and configuration behaviour.
2. Portfolio organisation and customer stories.
3. Audio comparison, after suitable recordings exist.
4. Payment journey, after the commercial process is decided.

SEO output checks accompany every release. Merchant Center and search-performance account checks can begin independently; do not wait for payments.

Recommendation: first add payment links to approved quotations, then assess whether a full cart adds value. A cart would also need to represent site-dependent delivery, installation and quote-only configurations correctly. Neither payment approach is selected by the user yet.

## 1. Establish the implementation baseline and resolve conflicting records

**Files:** `memory/website-project-checklist.md`, `memory/open-loops.md`, `memory/partner-update-log.md`, `PRODUCT_PAGE_SOURCE_OF_TRUTH.md`, `IMAGE_ASSET_WORKFLOW.md`.

- [x] Record each document request with separate implementation, verification and deployment statuses. Replace stale claims that Brenntag/Amorepacific galleries and the three-step quote enquiry are absent; those features exist locally.
- [x] Capture the current Git diff. Current production deployment identity remains unverified because browser inspection was unavailable; uncommitted changes are not proof of deployment state.
- [x] Resolve delivery pricing: the owner confirmed RM400 on 19 October 2026 against the document's per-trip requirement. During implementation, update affected totals and retain clearly stated outstation/restricted-access exceptions; do not silently change installation charges.
- [x] Confirm Ace Hub weight: the owner confirmed 700 kg on 19 October 2026. Use “700 kg” without an unconfirmed net/packed qualifier.
- [ ] Obtain the corrected floor/carpet specification. Change the requested socket count to one without inventing changes to USB/Type-C hardware.
- [ ] Resolve media-rule drift: current code includes a Shadow Grey front gallery image and mixed Ace Plus project photos, while parts of the written workflow still prohibit those arrangements. Record the controlling approval before changing either implementation or policy.
- [ ] Confirm whether the short “Acepods Facebook” note means a social link, feed, tracking or something else; do not choose on the user's behalf.

**Acceptance:** each conflicting fact has an explicit decision or remains unchanged and marked unresolved. Independently implementable tasks continue while evidence is gathered.

## 2. Correct product facts and their dependent outputs

**Files:** `src/data/products.js`, `src/data/podSeoCatalog.js`, `src/seo/constants.js`, `src/pages/ProductPage.jsx`, `src/data/articles.js`, `scripts/generate-geo-discovery.mjs`, `scripts/prerender.mjs`, `scripts/generate-merchant-feed.mjs`, `scripts/validate-product-claims.mjs`.

- [x] Change Ace Plus's socket quantity to one using the confirmed wording; check all five requested models for contradictory summaries and specification rows.
- [x] Apply Ace Hub's confirmed 700 kg weight to the product and SEO record without an unsupported net/packed qualifier.
- [ ] Apply corrected carpet specification once supplied.
- [x] Apply the delivery decision across website calculations, FAQs, articles, quote notes and generated AI files; recalculate installed totals without changing pod-only feed prices. Merchant account shipping settings remain unverified.
- [x] Verify separate quantity/trip handling in the shared helper. The existing enquiry retains a pod subtotal and a per-trip delivery note; non-standard trip counts remain subject to quotation.
- [x] Add targeted price-calculation regression checks using the built-in Node test runner.

**Acceptance:** visible product data and generated outputs agree; a list of old and new commercial totals is reviewable before release. Any unavailable specification remains unpublished rather than invented.

## 3. Fix catalogue images and configuration previews

**Files:** `src/data/products.js`, `src/components/smartPodsMenuData.js`, `src/components/PodStrip.jsx`, `src/App.jsx`, `src/pages/OfficePodsPage.jsx`, `src/pages/ProductPage.jsx`, `scripts/normalize-product-images.mjs`, `scripts/validate-product-media.mjs`, approved assets and media manifests.

- [x] Use the existing approved Ace Meet sofa/table thumbnail on the main homepage product card. Keep the navigation, product strip and catalogue consistent. Do not silently replace its product-gallery primary image.
- [ ] Obtain approved Ace Hub empty, L-shaped-sofa-inside-pod, three-seater and corrected panel renders for their intended configuration-preview roles. Obtain three-seater compatibility and pricing separately from its appearance.
- [ ] Add an explicit empty configuration. Selecting it clears incompatible furniture choices and displays the actual empty pod. Verify the behaviour of deselection and colour changes.
- [ ] Map the L-shaped option to the approved full pod configuration, not the standalone sofa cutout. Keep standalone add-on images in the labelled add-on area.
- [ ] Add the three-seater option with confirmed pricing or explicit quote-only treatment. Prevent incompatible seating combinations.
- [ ] Correct table/whiteboard panel previews using approved replacements. Retain the selected configuration when switching colours only where approved matching media exists; otherwise identify the preview's actual finish clearly.
- [ ] Confirm the entertainment equipment and inclusions. Use an approved entertainment render and retain quote-only pricing unless a selling price is approved.
- [x] Preserve the existing Ace Uno Shadow Grey selector and gallery order through these changes; historical media-policy discrepancy remains recorded for reconciliation.

**Acceptance:** each choice displays the configuration actually selected, prices/quote status match it, and deselecting returns to the appropriate base view. Verify all six models at mobile and desktop sizes, including keyboard controls and gallery order.

## 4. Add dimensions for each arrangement

**Files:** `src/data/products.js`, `src/pages/ProductPage.jsx`, approved technical-drawing assets, `PRODUCT_PAGE_SOURCE_OF_TRUTH.md`.

- [ ] Inventory every selectable arrangement for Flex Duo, Meet and Hub; distinguish furniture arrangements from minor accessory choices.
- [ ] Collect and approve the drawing for each arrangement, with readable outer dimensions, internal clearances and furniture positions. Do not generate measurements from a render.
- [ ] Map drawings to configuration IDs, retaining the verified base pod drawing as the fallback.
- [ ] Update the Dimensions section when the arrangement changes. If several arrangements have identical outer dimensions, still show their correct internal arrangement where supplied.

**Acceptance:** every requested arrangement has the corresponding approved drawing. A fallback is explicitly labelled as base pod dimensions and is not counted as completing a missing arrangement drawing.

## 5. Complete portfolio and customer-story content

**Files:** `src/data/portfolioMedia.js`, `src/pages/PortfolioPage.jsx`, `src/data/articles.js`, `src/pages/ArticleDetailPage.jsx`, `src/lib/articleImages.js`, `src/App.jsx`, `src/components/CustomerLogoStage.jsx`, `scripts/route-manifest.mjs`.

- [ ] Record approved SF Express, IH Design, ClickAsia and BJAK logos and permission to use them; add them with the shared logo component and consistent optical sizing.
- [ ] Create an approved project record for each client: company name, industry category, model, location, photos and story link. Preserve the intentional Parker Hannifin/Alphabet source-folder correction.
- [x] Add accessible client/project filtering, search, counts, reset and empty state without inferring industry classifications or changing galleries.
- [ ] Add evidence-supported industry filters and the approved project-card/story presentation. Only link a story once its page exists.
- [ ] Confirm the scope of “one picture from each project”: a project-overview thumbnail or the complete product-page mosaic. Apply the selected rule without mixing unidentified photos between projects.
- [x] Prepare internal installation-profile drafts from recorded facts for Everllence, Taylor's College, Parker Hannifin and Brenntag, plus an Amorepacific factual stub and missing-evidence register.
- [ ] Complete public customer stories once client briefs, feedback and outcome evidence are available; do not fabricate results or quotations.
- [ ] Reuse `/articles/:slug` for stories unless an approved design requires a separate route. Project-to-story links open a new tab as requested in the document.
- [ ] Propose enriching the existing homepage trust area with compact project evidence and story links. A new section or changing section order requires a separate homepage decision.
- [ ] Identify the exact recent portfolio hero photo and approve its hero use and crop. Keep headline, CTAs and mobile order; replace only the image and necessary image treatment.
- [ ] Resolve the Facebook note from phase 1 and implement only the selected behaviour.

**Acceptance:** filters return the right clients; every public story link resolves; each logo/photo has recorded approval; the homepage keeps its protected structure. Clients lacking evidence remain an explicit content backlog.

## 6. Add the sound comparison as a separate feature

**Files:** proposed `src/components/SoundComparison.jsx`, `src/App.jsx`, `src/components/SubpageHeader.jsx`, `src/lib/tracking.js`, approved audio assets and their evidence record.

- [ ] Confirm the model and configuration demonstrated and obtain approved paired recordings of the same source inside/outside the actual pod. Record capture conditions and permitted use.
- [ ] Propose a menu entry opening a focused comparison panel, without changing the homepage section sequence or CTA hierarchy.
- [ ] Provide explicit play/pause and inside/outside controls, descriptive labels and a transcript. No autoplay; pause playback when the panel closes.
- [ ] Label the audio as an illustration affected by recording/playback conditions. Do not invent a dB reading or treat recordings as certification evidence.

**Acceptance:** keyboard and mobile playback work, only one recording plays at a time, closing stops playback, and the published model/equipment match the recording evidence. No public feature until suitable recordings and the interaction are approved.

## 7. Design and implement the chosen payment journey

**Existing touchpoints:** `src/pages/QuotePage.jsx`, `src/pages/ProductPage.jsx`, `src/lib/tracking.js`. Backend, provider SDK and webhook file paths depend on the approved payment design and hosting capability.

- [ ] Decide whether customers pay a deposit or full balance; whether a quotation requires site review; quotation expiry; tax treatment; and cancellation/refund terms.
- [ ] Verify current Razorpay merchant eligibility, supported currency, payment-link/checkout capabilities and account setup against official provider documentation. Check Atome independently; do not assume availability or integration compatibility.
- [ ] Recommended first release: an approved quotation produces a payment link for the agreed amount and currency. Associate it with a stable quotation reference and expiry. Keep site-dependent orders subject to quotation approval.
- [ ] If a full cart is selected instead, design persistence, compatible configurations, quantities, quote-only items, delivery-trip calculation and quotation approval before checkout. Present that design before implementation.
- [ ] For an integrated provider flow, create amounts on the server, protect secrets, verify signed payment callbacks and reconcile duplicate events idempotently. Treat a browser return URL as navigation, not proof of payment.
- [ ] Verify success, cancellation, failure, expired quotations, duplicate callbacks and amount mismatch in provider test mode. Use the provider's supported equivalent checks for hosted payment links.

**Acceptance:** payment is tied to an approved quotation and exact amount; failed or cancelled payments never mark an order paid; sales can reconcile the provider reference. Atome stays a separate optional addition until its availability and commercial value are confirmed.

## 8. Validate each release and complete the account checks

**Files:** relevant validators, `scripts/route-manifest.mjs`, `scripts/prerender.mjs`, `scripts/generate-sitemap.mjs`, generated discovery files and project trackers.

- [x] Run `npm run product-images` and inspect the six-model strip's shared height/baseline.
- [x] Run `npm run build` and review generated output. Full build, media/claims checks and 62-route SEO validation passed; final article correction was rebuilt and revalidated.
- [ ] Inspect the changed pages at 390 px and 1440 px, plus any affected intermediate breakpoint. Check homepage structure, visible prices, hero order, full-width mobile buttons, image accuracy, dimensions, filters and quote handoff. Do not send a real sales enquiry during testing.
- [ ] Review the release diff against the starting state, including approved pre-existing work. Prepare a preview and request release approval only when it is concrete and reviewable.
- [ ] After authorized deployment, verify the production pages and generated outputs directly. Record the deployed version and evidence; until then use “implemented locally” or “verified in preview.”
- [ ] With Search Console and Analytics access, establish a dated baseline of queries/pages, indexing, impressions, clicks, CTR and quote conversions. Prioritise the second SEO/GEO/AEO round from actual gaps; distinguish crawler-file presence from demonstrated visibility.
- [ ] With Merchant Center access, inspect the active feed, fetch status, product approvals/disapprovals, price/image/availability mismatches and applicable delivery settings. A generated feed alone does not establish account approval.
- [ ] Update the checklist and partner log with completed work, remaining evidence dependencies and production verification.

**Acceptance:** each release has passing relevant checks, visual review, an explicit deployment state and a concise record of unresolved items. Missing account access does not block independent product fixes.

## Inputs needed before dependent changes

| Decision or material | Dependent work |
| --- | --- |
| Delivery RM400 per trip — confirmed | Ready for pricing/totals implementation; retain existing site-scope exceptions |
| Hub weight 700 kg — confirmed | Ready for product accuracy correction; do not invent a net/packed qualifier |
| Correct carpet specification and any additional socket hardware changes | Remaining product facts requiring evidence |
| Hub configuration renders and three-seater/TV commercial details | Empty, L-shaped, three-seater and entertainment previews |
| Configuration-specific drawings | Complete arrangement dimensions |
| Hero photo, logos, project facts and media approvals | Portfolio, client stories and hero replacement |
| Intended homepage trust treatment and gallery grouping | Portfolio presentation within homepage guardrails |
| Paired recordings and demonstration evidence | Sound comparison |
| Payment process and eligible merchant account | Payment implementation |
| Search Console, Analytics and Merchant Center access | Account-level performance and approval checks |

No duration or completion percentage is assigned: asset delivery, factual decisions and account access are not established.
