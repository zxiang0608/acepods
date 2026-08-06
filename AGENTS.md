# Ace Workplace Solutions — Codex Guardrails

## This is a refinement task
Do not redesign the homepage.
Keep the homepage structure and messaging architecture unchanged.

## Protected items
- section order
- core copy logic
- CTA hierarchy
- product architecture
- pricing visibility in product cards

## Allowed changes
- spacing
- alignment
- image placement
- image scale / crop
- component styling
- section contrast
- mobile behavior
- typography refinement
- section rhythm

## Design priority
The homepage should feel:
- premium but practical
- image-led but not vague
- calm but commercially clear
- architectural, restrained, and intentional

## Must not happen
- repeated identical section layouts
- same card style in every section
- SaaS-like UI treatment
- glossy startup effects
- over-rounded generic UI
- too many soft panels
- desktop-first stacking on mobile
- softened CTA path

## Component hierarchy
1. Product cards = strongest
2. CTA blocks = high emphasis
3. Reassurance rows = quiet
4. Text-led sections = editorial

## Mobile
- hero order must remain:
  1. headline
  2. subheadline
  3. primary CTA
  4. secondary CTA
  5. image
  6. proof bullets
- full-width stacked buttons
- For offices stays primary over designers
- Why Choose Ace becomes reassurance rows
- no sticky CTA in v1

## Typography
- one font only
- no display font
- no ultra-light type
- no over-wide editorial text blocks

## Final quality test
The page should not feel like:
- a furniture catalog
- a SaaS landing page
- a template made from repeated soft cards

It should feel like:
- a serious, premium B2B product site with strong visual discipline

## Product and portfolio additions
- Before adding or changing a product, product image, logo, or portfolio gallery, read `PRODUCT_PAGE_SOURCE_OF_TRUTH.md` and `IMAGE_ASSET_WORKFLOW.md`.
- Use only images supplied in the designated format and approved gallery order.
- “Designated format” means listed as approved in the relevant media manifest; folder placement alone is insufficient.
- Do not publish an additional angle, detail, chart, render, logo treatment, or portfolio photo without explicit user approval.
- Run `npm run product-images` for catalogue images and verify the shared visible height and baseline before publishing.
- Do not call a claim, feature set, certification, or media rule “verified” unless its evidence/status is recorded in the source-of-truth data.
