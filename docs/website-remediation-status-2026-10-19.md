# Website remediation status

19 October 2026. Implemented locally on the existing `codex/ace-uno-catalogue` branch. No commit, push or deployment was performed. Existing uncommitted work was preserved; a starting text snapshot and Git diff were captured in `/private/tmp/ace-remediation-baseline-20261019` for this pass.

## Implemented

| Change | Result |
| --- | --- |
| Delivery | RM400 per standard Klang Valley trip across product data, pricing/FAQ/article/location copy, quote enquiry note and generated discovery content. Installation retains its model-specific rate. |
| Uno installed total | RM9,900 for one standard installed pod; RM10,150 with the optional RM250 stool. Pod-only price remains RM9,150. |
| Prelaunch installed totals | Ace Pod One RM15,550 and Ace Pod Four RM31,550 for a single standard installed pod. Their prelaunch visibility gates are unchanged. |
| Hub weight | Product specification and crawlable SEO record use 700 kg without an unsupported net/packed qualifier. |
| Plus socket count | Technical row and power summary state one universal power socket. |
| Meet homepage card | Uses the existing approved sofa/table catalogue thumbnail. Primary product gallery and homepage section order are unchanged. |
| Portfolio filters | Existing client/project selector, case-insensitive client-name search, result counts, clear filters and no-results state. Source-folder corrections and gallery order retained; no industry category inferred. |
| Quote route | `/get-a-quote` is included in prerendered build output with `noindex, follow`, and excluded from the sitemap. Existing WhatsApp review/send handoff retained. |
| Price accuracy | Corrected the under-RM10,000 article: the stool-inclusive total is above that threshold. |
| Story preparation | Internal installation-profile drafts and media evidence inventory in `docs/customer-story-drafts.md`. Nothing published as a customer testimonial or outcome story. |
| Tracking records | Latest owner decisions recorded in `PRODUCT_PAGE_SOURCE_OF_TRUTH.md`; stale tracker claims about missing Brenntag/Amorepacific galleries and quote enquiry corrected. |

Delivery remains separate from the quote page's indicative pod subtotal. It is stated as per trip, not multiplied by selected pod quantity. Additional trips, outstation delivery, restricted access, installation and options are confirmed in the quotation. The shared price helper separately scales units and trips; quantity/trip regressions are covered.

## Verification completed

- Initial claims and media checks passed before implementation.
- `node --test tests/*.test.mjs`: 8 tests passed, covering Uno/prelaunch totals, unit-versus-trip pricing, portfolio selection/search/order/source-name correction and the direct-load quote route's indexability.
- `npm run product-images`: 16 catalogue variants generated at 1000 px visible height and y=1100 baseline. The six-model comparison strip was visually inspected; the new Meet card asset aligns with its neighbours.
- `npm run build`: passed, including gallery processing, media and claims validation, asset preparation, discovery/feed/sitemap generation, Vite production compilation, prerendering and SEO validation for 62 routes.
- After the final article correction, discovery output, the production SPA bundle, prerendering, 62-route SEO validation, claims checks and the regression tests were rerun successfully.
- Direct generated-file checks confirmed Hub's 700 kg, quote canonical/noindex and sitemap exclusion, updated prelaunch totals/noindex and Uno discovery delivery/totals.
- Independent code review reported no material findings in this pass's changes.
- `git diff --check`: passed.

The build reports an existing outdated Browserslist dataset. No dependency upgrade was introduced in this pass.

## Verification limits

Automatic browser approval review could not complete because its selected model was at capacity. Both production and local-preview visual inspection were unavailable through browser automation. This is a review infrastructure failure, not a determination that the site is unsafe. No alternate browser control was used to bypass that rejection.

Mobile/desktop page layout and interactive browser behaviour therefore remain unverified. Static build checks, generated-page checks, pure behaviour regressions and catalogue-image inspection do not replace that browser review.

Local preview while the preview server is running: `http://127.0.0.1:4173/`. Useful paths: `/`, `/pricing`, `/pods/ace-plus`, `/pods/ace-hub`, `/portfolio`, `/get-a-quote`.

## Remaining dependencies

| Work | Required input or evidence |
| --- | --- |
| Correct carpet specification | Correct material/finish wording. Current record retained instead of guessing. |
| Hub empty, L-shaped sofa inside pod, three-seater, corrected panels | Role-specific approved renders; three-seater compatibility/price and entertainment equipment/commercial details. No approved empty Hub render was located. |
| Configuration-specific dimensions | Approved arrangement drawings for Flex Duo, Meet and Hub. |
| New logos | Supplied approved SF Express, IH Design, ClickAsia and BJAK logo assets. None found locally. |
| Recent portfolio hero and homepage project carousel | Exact approved hero asset/crop and an approved treatment inside the protected homepage structure. |
| Customer outcome stories | Confirmed client brief, buying rationale, feedback and outcomes. Current drafts cover recorded installation facts only. |
| Industry filters | Evidence-supported project classification. Client filtering is available now. |
| Audio comparison | Paired recordings and model/recording evidence. |
| Payments | Deposit/balance process, provider eligibility/account access and commercial terms. |
| Performance and Merchant status | Authenticated Search Console, Analytics and Merchant Center access. Generated technical files do not prove ranking or account approval. |
| Facebook note | Clarification of the intended social/tracking feature. |

Two existing policy discrepancies remain explicit: the current Shadow Grey front-gallery image and mixed Ace Plus project display differ from portions of older media documentation. Their gallery ordering was preserved in this pass rather than treating unclear historical approval as permission for further changes.

The separate internal quotation editor has its own `quotation-price-sources.json` snapshot that still states RM350 delivery. That tool and its test/build files are being worked on separately and were not modified here. Its snapshot must be reconciled before quoting the new rate; do not assume updating website data has refreshed that editor or its live-site source.
