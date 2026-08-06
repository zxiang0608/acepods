# Product Page Source of Truth

This is the main design and structure guideline for every current and future Ace Office Pods product page. It prevents one-off page layouts, inconsistent pod scale, unapproved photos, and changing logo sizes.

## 1. Non-negotiable rules

1. Every product uses the shared `src/pages/ProductPage.jsx` template. Do not create a separate product-page layout.
2. Product facts must come from one canonical product record. Page content, navigation, pricing, structured data, feeds, sitemap entries, LLM files, and reusable article inserts must consume that record instead of repeating facts manually.
3. Use only images already supplied in the designated format. Ask the user before publishing any additional image or image type.
4. Never distort a pod or alter its technical dimensions to make it look consistent. Normalise only the presentation canvas, visible height, and baseline.
5. Do not use supplier names, supplier product codes, supplier logos, watermarks, or factory filenames in customer-facing content.
6. Do not infer specifications, certifications, acoustic ratings, capacities, inclusions, weights, dimensions, prices, or add-ons. Unverified fields remain absent.
7. Every claim that affects buying decisions must have an evidence source, review date, and verification status. Product images and supplier marketing icons are not certification evidence.
8. Certifications and performance claims are product-specific and hidden by default. Never apply a shared certification strip to all products unless the supporting documents explicitly cover every listed model.

## 2. Locked product order

1. Ace Uno
2. Ace Plus
3. Ace Flex
4. Ace Flex Duo
5. Ace Meet
6. Ace Hub

This order applies to navigation, product strips, catalogue grids, pricing, comparisons, forms, feeds, and sitemaps.

## 3. Shared product-page structure

Keep this order for all six products:

1. Shared site header.
2. Breadcrumb, product name, short description, and starting price.
3. Primary product-view gallery with arrows and thumbnails.
4. Exterior and interior finish selectors.
5. Add-ons and configuration selector, with a separately labelled add-on preview area when approved previews exist.
6. Pricing overview: base unit, selected options, installation, delivery, subtotal, and total.
7. Contact action.
8. Key Features, only when verified feature content exists.
9. Product Details quick answers.
10. Technical Specifications.
11. Best for / verified use cases.
12. Product-specific FAQ summary, when available.
13. Dimensions drawing with correct proportions, dimension labels, and readable detail.
14. Past Projects, only when approved installation photos exist.
15. Quote form and WhatsApp action.
16. Shared footer.

Optional sections are hidden when verified content or approved images do not exist. Do not add placeholders or invent material just to make every page equally long.

## 4. Current product structure audit

| Product | Colour selector | Add-ons/configuration | Key Features | Dimensions | Past Projects |
| --- | --- | --- | --- | --- | --- |
| Ace Uno | 4 exterior, 1 interior | Previously approved Ace Solo stool options | Hidden until verified feature content exists | Present | Hidden until approved installation photos exist |
| Ace Plus | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |
| Ace Flex | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |
| Ace Flex Duo | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |
| Ace Meet | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |
| Ace Hub | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |

The structural order is identical because all products use the shared page. “Preserve current content” does not mean verified; it means do not expand or newly attribute those claims until the evidence audit is complete. The table is not permission to invent missing sections.

## 5. Product-image standard

### Catalogue master

- Canvas: 1600 × 1200 px.
- Background: transparent.
- Visible pod height: 1000 px.
- Shared bottom baseline: y=1100 px.
- Maximum visible width: 1400 px.
- Horizontal position: optical centre on the canvas.
- Aspect ratio: always preserved.
- Source view: the approved primary render only.
- Generation: `npm run product-images` using `scripts/normalize-product-images.mjs`.

This normalized catalogue master is reused on homepage cards, navigation menus, product strips, catalogue/pricing surfaces, and the initial product-page hero. Approved selector renders that replace the hero must use the same canvas, visible-height, baseline, width, centring, and transparency rules. Do not create separate zoom levels for each surface and do not add slug-specific scale or translate classes.

### Product-page media frames

- Mobile: 380 px high.
- Small tablet: 460 px high.
- Tablet: 620 px high.
- Desktop: 600 px high.
- Image fit: `object-contain`, centred; catalogue thumbnails use `object-bottom` so the shared baseline remains visible.
- Thumbnail buttons: 56 × 56 px with the same `object-contain` treatment.
- Technical drawings are exempt from visual-height normalization and must retain real dimensions and readable labels.
- Installation and portfolio photos use `object-cover` only inside their fixed photo crops; product renders never use `object-cover`.

### Ace Uno gallery

The customer-facing order is locked:

1. Warm Sand render.
2. Pine Green render.
3. Shadow Grey render.
4. Dusty Turquoise render.
5. Interior image.

The material/colour-code chart and front-view duplicates are not part of the published gallery. Ask before adding any future image.

### Media manifest

Each product and portfolio project must have one approved media manifest. Each entry records:

- customer-facing product or project;
- source file and published file;
- role: product gallery, finish selector, add-on preview, technical drawing, project gallery, or internal reference;
- approval status and approval date;
- display order where applicable;
- customer-facing alt text;
- whether supplier branding or codes require removal;
- normalized-image validation status.

Only `approved` entries may be imported by customer-facing components. New files remain `pending` until the user approves both their role and order.

## 6. Logo standard

### Ace Pods brand logo

- Use the single approved file at `Logos/ace pods logo.png`.
- Navigation/mobile-menu height: 32 px on mobile.
- Navigation height: 56 px on desktop.
- Footer follows the same 32 px mobile / 56 px desktop rule.
- Width is always automatic; never stretch or crop the logo.
- Do not introduce a different logo asset, lockup, or one-off scale on an individual page.
- Render the logo through one shared brand-logo component so the breakpoint sizes cannot drift between headers, menus, and footers.

The mobile and desktop sizes differ intentionally for responsive fit. At the same breakpoint, the logo must have the same apparent size on every page.

### Customer logos

- Place each logo inside a fixed shared stage, then use `object-contain`.
- Compare optical size, not source-file pixel dimensions; transparent whitespace must not make one logo appear tiny.
- A small per-logo optical correction is allowed only inside the fixed stage. Do not change the surrounding stage or row height for one brand.
- Portfolio company logos use a 112 × 36 px stage.
- Never replace, redraw, recolour, or publish a customer logo without approval.
- Render customer logos through a shared customer-logo-stage component. Existing homepage logo dimensions are not proof of compliance and must be audited before this rule is marked complete.

## 7. Product data checklist

Before adding a product, verify and record:

- customer-facing name and slug;
- one-person or meeting capacity;
- external dimensions and any verified internal dimensions;
- base price and exactly what it includes;
- delivery and installation rules;
- verified add-ons and configuration prices;
- exterior and interior finishes using customer-facing names;
- lighting, ventilation, power, and connectivity;
- acoustic or certification claims only with identifiable evidence;
- technical drawing;
- approved gallery and approved installation photos;
- SEO description, structured data, feeds, sitemap, redirects, and legacy naming where relevant.

For every fact, record one of these statuses: `verified`, `legacy-unverified`, `pending`, or `not applicable`. Only `verified` facts may be newly published or expanded. Existing `legacy-unverified` content may remain temporarily but must not be copied to another model.

### Evidence rules

- Record the source document, relevant page or section, models covered, and review date.
- A generic material icon strip does not verify a certification.
- An acoustic claim requires an identifiable test report and the exact model/configuration covered.
- A capacity claim requires an approved product specification, not an inference from furniture shown in a render.
- If two customer-facing outputs disagree, the canonical product record and its evidence decide the correction; do not choose whichever value appears more often.

## 8. Release gate

Before publishing a new product or image update:

1. Run `npm run product-images`.
2. Run `npm run product-media:validate`. It must automatically discover every approved catalogue and finish-selector render from the media manifest and check canvas, visible height, baseline, maximum width, horizontal centring, aspect-ratio preservation, and transparency. Until the script enforces all of these checks, record the remaining items as manual checks rather than claiming full validation.
3. Compare every product together on homepage cards, desktop menu, mobile menu, product strip, catalogue page, pricing surface, and product-page hero.
4. Check mobile and desktop gallery order, arrows, thumbnail overflow, selector state, and keyboard navigation. Confirm that product views and add-on previews are visibly separate.
5. Confirm the Ace logo follows the shared breakpoint sizes and customer logos use fixed stages.
6. Search output for supplier names/codes, unapproved claims, outdated models, and unapproved image imports.
7. Run a cross-output product-data audit for names, order, capacity, dimensions, prices, included features, and redirects. Any disagreement blocks release until corrected from the canonical record.
8. Run the production build and SEO validation.
9. Ask the user for approval before adding an image that was not part of the designated set.

## 9. Ace Uno verified launch record

The following Ace Uno values are approved for publication unless superseded by a newer approved source:

- Name: Ace Uno.
- Capacity: one person.
- External dimensions: 1418 W × 1018 D × 2185 H mm.
- Pod-only price: RM8,850.
- Klang Valley installation: RM350.
- Klang Valley delivery: RM350.
- Approved high bar stool add-on: RM250.
- Default Klang Valley total without stool: RM9,550.
- Klang Valley total with stool: RM9,800.
- Exterior finishes: Warm Sand, Pine Green, Shadow Grey, and Dusty Turquoise.
- Interior: Linen Sand.
- Worktop: Natural Oak.
- Included equipment: LED lighting, dual fans, power, USB-A, and USB-C.
- Approved add-ons: the previously approved Ace Solo stool options; do not infer further compatibility or pricing.

Do not publish Ace Uno as 2350 mm high, suitable for two people, 27 dBA, guaranteed soundproof, fire-certified, or with unverified weight/internal dimensions. Do not expose NuPod or Versalink branding. RM8,850 is not an installed total.
