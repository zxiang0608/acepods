# Product Page Source of Truth

This is the main design and structure guideline for every current and future Ace Office Pods product page. It prevents one-off page layouts, inconsistent pod scale, unapproved photos, and changing logo sizes.

## Current owner corrections — 19 October 2026

These owner-confirmed values supersede delivery amounts and installed totals in the historical launch records below. Evidence: direct owner instructions in the website-checklist remediation chat on 19 October 2026; status: owner-confirmed commercial/product corrections, not independent laboratory verification.

- Standard Klang Valley delivery: **RM400 per trip**, shared across pod models. Installation remains separate and retains the existing model-specific rate. Outstation, restricted-access and non-standard project scopes retain their quotation treatment.
- Ace Uno: RM9,150 pod + RM400 delivery for one trip + RM350 installation = **RM9,900** for one standard installed pod, or **RM10,150** with the optional RM250 stool.
- Ace Pod One: RM14,650 pod + RM400 delivery for one trip + RM500 installation = **RM15,550** for one standard installed pod. Prelaunch status is unchanged.
- Ace Pod Four: RM30,400 pod + RM400 delivery for one trip + RM750 installation = **RM31,550** for one standard installed pod. Prelaunch status is unchanged.
- Ace Hub weight: **700 kg**. Do not attach a net/packed qualifier; the owner did not supply that distinction.
- Ace Plus socket count: **1 universal power socket**, replacing the two-socket wording flagged in the supplied website-change document. Do not infer different USB/Type-C hardware.

The canonical delivery rate and Hub weight are in `src/data/commercialTerms.js`; `src/data/podSeoCatalog.js` derives standard single-pod installed totals from that rate. Additional trips are charged per trip rather than per pod. The quote enquiry retains a pod subtotal and states that installation, options and non-standard scope are confirmed separately.

No new Hub configuration render, technical drawing, customer logo, hero photo or gallery-order approval was supplied in this correction. The current standalone L-shaped sofa preview is not approval for a sofa-inside-pod composite. (Superseded for the Hub on 8 November 2026: see "Ace Hub empty pod, L-shape sofa and entertainment previews".) Existing Shadow Grey front-gallery and mixed-project policy discrepancies are recorded for reconciliation; this pass does not change their gallery order.

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

Prelaunch additions are appended after the six media-ready models, in this order:

7. Ace Pod One
8. Ace Pod Four

This order applies to published navigation, product strips, catalogue grids, pricing, comparisons, forms, feeds, and sitemaps. Prelaunch products remain available on their direct product URLs but are excluded from the homepage, Smart Pods dropdowns, office-pod catalogue, pricing and quote selectors, comparison page, and footer until their release gates are resolved.

## 3. Shared product-page structure

Keep this order for all six media-ready products and any prelaunch product that has enough verified content to expose the shared template:

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

### Split interior material selector

Products that offer both Melamine-faced chipboard/MDF and PET fabric interior finishes present the two swatch groups as alternatives, with a dark, left-aligned **OR** separator using the same typography as the material headings. The separator is explanatory only; both groups keep the existing swatch selection and pricing behaviour. Products with a single interior-material group, including Ace Uno, do not show the separator.

## 4. Current product structure audit

| Product | Colour selector | Add-ons/configuration | Key Features | Dimensions | Past Projects |
| --- | --- | --- | --- | --- | --- |
| Ace Uno | 4 exterior, 1 interior | Previously approved Ace Solo stool options | Present — owner-directed nine-card feature set | Present | Hidden until approved installation photos exist |
| Ace Plus | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present |
| Ace Flex | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present — curated Parker Hannifin gallery |
| Ace Flex Duo | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Hidden until model-specific approved installation photos exist |
| Ace Meet | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present — curated Brenntag gallery |
| Ace Hub | Existing selector set | Existing approved options | Preserve current content pending evidence audit | Present | Present — curated Ace Hub installation gallery |

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

1. Warm Sand front render.
2. Dusty Turquoise front render.
3. Pine Green front render.
4. Warm Sand three-quarter render.
5. Pine Green three-quarter render.
6. Shadow Grey three-quarter render.
7. Dusty Turquoise three-quarter render.
8. Interior image.

The first three product-page images and the homepage image face front. Subsequent exterior images use the three-quarter side profile. The three front renders were explicitly approved for the first positions on 2026-09-04. All exterior views use approved normalized transparent catalogue assets; flattened white-background exports must not be used. The material/colour-code chart and any additional front renders beyond these three are not part of the published gallery. Ask before adding any future image.

### Ace Uno approved feature visuals

Ace Uno now has nine owner-directed Key Features cards, in this order: Power & Lighting; Acoustic Excellence; Superb Ventilation System; PET for Enhanced Acoustics; Ventilation Outlet System; Mobile Pod Capabilities; Aluminium Pivot Door Frame; Solid Ergonomic Door Handle; and Soft Door Closure. The power-control visual is `assets/features/ace-uno/ace-uno-power-controls.png`; it is based on the supplied Ace Uno hardware reference and is used in the Features section only, not the product gallery or hero render. The remaining cards reuse the approved feature visuals from the other pod pages with Ace Uno-specific wording. The generic adjustable-knobs card is intentionally excluded from Ace Uno. The owner clarified on 2026-09-05 that the pivot-frame feature refers to the door hardware only, not the pod's structural frame.

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

### Ace Plus approved project gallery

The Ace Plus product page keeps two separate curated, owner-approved project records, but displays one five-photo gallery for a tighter page layout. The five-photo display order is deliberately mixed across the two projects while each image retains its project attribution in the gallery metadata and modal alt text.

The customer-facing five-photo order is:

1. Everllence — `everllence-ace-plus-office-wide-01.jpg` — lead workplace view.
2. Taylor's College — `20260209_143054.jpg` — front installed-pod view.
3. Everllence — `everllence-ace-plus-branded-front.jpg` — installed pod view.
4. Taylor's College — `20260224_102358.jpg` — configured view with high stool.
5. Everllence — `everllence-ace-plus-interior.jpg` — interior and worktop view.

The underlying project records keep each project's full approved image order for attribution and future display changes; the page currently uses the mixed five-photo selection above.

#### Everllence — Kuala Lumpur

The customer-facing order is:

1. `everllence-ace-plus-office-wide-01.jpg` — lead workplace view.
2. `everllence-ace-plus-in-use.jpg` — in-use view.
3. `everllence-ace-plus-branded-front.jpg` — installed pod view.
4. `everllence-ace-plus-open-door.jpg` — open-door view.
5. `everllence-ace-plus-interior.jpg` — interior and worktop view.

#### Taylor's College — Subang Jaya

The customer-facing order is:

1. `20260209_143054.jpg` — front installed-pod view.
2. `20260224_102358.jpg` — configured view with high stool.
3. `20260224_102416.jpg` — interior and worktop view.
4. `20260224_102417.jpg` — open-door interior view.

These images are project-gallery media, not product renders or add-on previews. CMA CGM remains recorded as a legacy Ace Solo installation, and Amorepacific has no model-specific Ace Plus approval in the current source records; neither is attributed to Ace Plus here. Ace Uno remains without a past-project gallery until an approved Uno installation photo is available.

### Ace Flex approved project gallery

The Ace Flex product page uses four curated, owner-approved installation photos from the Parker Hannifin project. The customer-facing order is:

1. `20250619_140819.jpg` — lead workplace view.
2. `ace-duo-2.jpg` — in-use view with an office chair.
3. `ace-duo-4.jpg` — installed pod view.
4. `wall-inside-2.jpg` — interior and worktop view.

The source folder is currently labelled `Alphabet Capital` in the Drive export, but the owner previously corrected this project attribution to Parker Hannifin and the product to Ace Flex. Close-up hardware photos, supplier-marked views, and bar-stool add-on renders are excluded from the customer-facing gallery.

### Ace Hub approved project gallery

The Ace Hub product page uses five curated, owner-approved photos from the designated Ace Hub installation folder. The customer-facing order is:

1. `YYC_advisor_4.webp` — lead workplace view.
2. `Untitled_design_15.webp` — open-door installed-pod view.
3. `20260313_145941.jpg` — interior meeting-space view.
4. `20260313_145945.jpg` — centre-table and interior view.
5. `20260313_145948.jpg` — interior detail view.

No customer name or location is asserted for this gallery because those details are not recorded in the approved media source. Ace Flex Duo remains without a past-project gallery until model-specific approved installation photos are available.

### Ace Meet approved project gallery

The Ace Meet product page uses the owner-approved Brenntag portfolio set. The customer-facing order is:

1. `brenntag-office-wide.jpg` — lead workplace view.
2. `brenntag-pods-wide.jpg` — office-context view.
3. `brenntag-pod-pair.jpg` — installed-pod view.
4. `brenntag-pod-in-use.jpg` — in-use view.
5. `brenntag-pod-detail.jpg` — interior and finish detail.
6. `brenntag-pod-front.jpg` — front installed-pod view.

The owner confirmed that the Brenntag project is the Ace Meet gallery. Its recorded portfolio location is Shah Alam, Selangor.

### Ace Meet sofa thumbnail for menus, homepage, and office-pod catalogue

The Ace Meet item in the desktop and mobile Smart Pods navigation menus, the homepage product strip and product card, and the Ace Meet office-pod catalogue card use the owner-approved front-facing sofa-in-pod render `assets/ace-meet-front-transparent.png` as their source. The published derivative is `assets/products/catalog/ace-meet-menu-sofa.png`, normalized to the shared 1600 × 1200 transparent presentation canvas, 1000 px visible height, and y=1100 baseline on 5 September 2026. This asset is used for those catalogue surfaces only: the Ace Meet primary product image, product gallery, portfolio gallery, and configurator preview order remain unchanged.

### Ace Hub L-shaped sofa add-on preview

The Ace Hub configurator includes the owner-approved `assets/L-shape-sofa.png` as the **L-shape sofa (Ace Hub only)** add-on. Its published preview derivative is `assets/hub-l-shape-sofa-normalized.png`, normalized to the shared 1200 × 1200 transparent add-on canvas with preserved aspect ratio and an 80% maximum visible footprint, matching the other configurator add-on previews. A faint detached edge artifact in the source alpha was removed during normalization, and the main preview uses the full shared add-on frame so its visual weight is comparable to the existing one-set sofa preview without stretching the sofa. It is used only in the Ace Hub add-on selector and preview; it is not a product-gallery image or a claim about the pod's physical dimensions. Approved on 5 September 2026.

### Ace Hub empty pod, L-shape sofa and entertainment previews

On 8 November 2026 the owner approved 13 renders from the shared Drive folder `Images files > Versalink pods > Ace HUB` to fix the Ace Hub picture bugs in the website-change document. Sources are kept in `assets/products/ace-hub/source/`; published derivatives are in `assets/products/ace-hub/preview/` (`*-normalized.png`), produced by `scripts/normalize-ace-hub-config-previews.mjs` on the same 1200 × 1200 transparent configuration-preview canvas (80% footprint, edge-only background removal) as the existing Hub configuration previews.

| Drive source | Project source | Role | Use |
| --- | --- | --- | --- |
| `All colours/Empty Pod/47e0bad5-….png` | `ace-hub-grey-ash-empty.png` | finish-selector | Grey Ash exterior image and the default main image when no option is selected. Grey Ash only: the owner chose to keep the furnished renders for the other five finishes because no other empty render exists. |
| `L-Shape Sofa - NO TV/` (6 files) | `ace-hub-l-shape-sofa-<finish>.png` | add-on-preview | Main preview for **L-shape sofa (Ace Hub only)** in the selected exterior. The standalone sofa image remains the add-on thumbnail. |
| `Wtih L-shape sofa + tv/` (6 files) | `ace-hub-entertainment-<finish>.png` | add-on-preview | Main preview for **Entertainment setup** in the selected exterior. Replaces the earlier whiteboard-and-sofa stand-in, which showed no TV. |

Finish mapping for the six-colour sets: Grey Ash, Mustard Yellow, Ocean Blue, Charcoal Grey, Green Moss, Orange Squash. These renders are appearance evidence only; they do not establish TV size, sofa dimensions, or any change to price or included equipment. The **Centre table** and **Whiteboard panel + centre table** previews still use the Drive's smooth-panel renders (`ace hub with table only.png`, `ace hub with table and whiteboard panel only.png`); no slatted-panel version of those configurations has been supplied.

### Approved high bar stool add-on previews

On 5 September 2026 the owner approved the exact front-facing black and white stool pair as the replacement for the existing high-bar-stool previews. The source files are [black `stool for ace-01.png`](https://drive.google.com/file/d/1Sw95T6IS4twy7U-dTzkPhyymzbYOYI9a/view?usp=drive_link) and [white `stool for ace-02.png`](https://drive.google.com/file/d/1o7IPRf459deZUQJd7u3PWXQT2UZays4n/view?usp=drive_link). The published derivatives are `assets/bar-stool-black-normalized.png` and `assets/bar-stool-white-normalized.png`, both on the shared 1200 × 1200 transparent add-on canvas with preserved aspect ratio. The single high-bar-stool option is available on all six product pages; Ace Flex Duo additionally offers the approved two-high-bar-stools quantity option. These previews are used only by the configurator and are not product-gallery images.

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

#### Approved homepage client logos added 8 November 2026

The owner approved publishing these four client logos on 8 November 2026 ("logos, put them live"), for the homepage trusted-client logo strip only. They have no approved project photos, so they are not portfolio-page projects.

| Client | Drive source (Images files > Portfolio pictures) | Published asset | Treatment |
| --- | --- | --- | --- |
| SF Express | `sf express.png` | `assets/customer-logos/sf-express-logo.webp` | White margin trimmed; white background blended into the card |
| IH Design | `ihdesign.png` | `assets/customer-logos/ihdesign-logo.webp` | Transparent original, unchanged |
| ClickAsia | `CA_LOGO_WITH_TRADEMARK_2.webp` | `assets/customer-logos/clickasia-logo.webp` | White margin trimmed; white background blended into the card |
| BJAK | `bjak.jpg` | `assets/customer-logos/bjak-logo.webp` | Square cropped to the blue band around the wordmark so it reads at strip size; colours unchanged |

Originals are kept in `assets/customer-logos/source/` and are not imported by the site.

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
- Pod-only price: RM9,150.
- Klang Valley installation: RM350.
- Klang Valley delivery: RM350.
- Approved high bar stool add-on: RM250.
- Default Klang Valley total without stool: RM9,850.
- Klang Valley total with stool: RM10,100.
- Exterior finishes: Warm Sand, Pine Green, Shadow Grey, and Dusty Turquoise.
- Interior: Linen Sand.
- Worktop: Natural Oak.
- Included equipment: LED lighting, dual fans, power, USB-A, and USB-C.
- Approved add-ons: the previously approved Ace Solo stool options; do not infer further compatibility or pricing.

Do not publish Ace Uno as 2350 mm high, suitable for two people, guaranteed soundproof, fire-certified, or with unverified weight/internal dimensions. Do not expose NuPod or Versalink branding. RM9,150 is not an installed total.

### 7 September 2026 — owner-directed Ace Uno pricing update

- Pod-only price: RM9,150.
- Standard Klang Valley delivery: RM350.
- Standard Klang Valley installation: RM350.
- Standard installed total before the optional RM250 high bar stool: RM9,850.
- Standard installed total with the unchanged optional high bar stool: RM10,100.

### 4 September 2026 - Owner-directed acoustic display update

- Customer-approved display: Ace Uno shows **Approximately 25 dB(A)** in its published acoustic-claim row. Ace Plus, Ace Flex, Ace Flex Duo, Ace Meet, and Ace Hub show **Verified — 27 dB(A), TÜV SÜD** in the same row.
- Evidence recorded: `soundproof rating_7191320248-MEC23-EMK.pdf`, TÜV SÜD PSB Pte. Ltd., report `7191320248-MEC23-EMK`, [Drive source](https://drive.google.com/file/d/1_8SGyNjSsWxvJejSN58T5ydEehBwy8vs/view?usp=drivesdk), reviewed 4 September 2026.
- Scope note: the report identifies the tested sample as Versalink / CUE-A-PB-100B. The owner has explicitly accepted responsibility for applying the approved display wording to the Ace product records.

## 10. 7 September 2026 — provisional Ace Pod One and Ace Pod Four research update

The customer-facing names remain **Ace Pod One** and **Ace Pod Four**. Their details are now mapped to the owner-provided official MONO and TETRA sources. The models remain prelaunch products: they are shown on the approved `/demo4` route, but remain excluded from the normal homepage range, pricing and quote selectors, comparison page, footer, merchant feed, and sitemap until the remaining release-gate items are resolved. The research records are stored in `src/data/provisionalProductResearch.js`.

### Ace Pod One

- Source: [MONO Office Phone Booth](https://winpodacoustics.com/mono/), with the owner-provided [XBace Mono/Tetra brochure](https://winpodacoustics.com/wp-content/uploads/2026/07/XBace-Brochure_Mono-Tetra.pdf), reviewed 7 September 2026.
- Verified source facts: one-person capacity; external dimensions 1000 W × 1000 D × 2170 H mm; internal dimensions 800 W × 910 D × 2000 H mm; built-in table 744 W × 300 D × 25 H mm; 1.2 mm electro-galvanised steel; epoxy powder coating; polyester-fibre acoustic board; black polyester-fibre carpet; tempered-glass door and rear panel; two 12VDC dual-speed ventilation fans; 1 × 11W 4000K LED; 110V–250V universal socket with fan/light controls; 12VDC motion sensor; 40W maximum power draw; 320 kg net / 400 kg packed weight; standard white exterior; and one-year warranty.
- Owner-confirmed commercial treatment on 6 September 2026: RM14,650 pod + RM350 delivery + RM500 installation = RM15,500 final standard Klang Valley total. Outstation, restricted-access, and non-standard project scopes may vary.
- Approved technical drawing: `assets/products/ace-pod-one/technical-drawing/ace-pod-one-dimensions.png`, cropped from page 5 of the owner-provided brochure specifically for the Dimensions section. The existing approved gallery remains unchanged; no supplier product-gallery image was added.
- Pending: complete finish schedule, model-specific acoustic test evidence, and remaining lead-time/project-term wording.

### Ace Pod Four

- Source: [TETRA Meeting Pod](https://winpodacoustics.com/tetra/), with the owner-provided [XBace Mono/Tetra brochure](https://winpodacoustics.com/wp-content/uploads/2026/07/XBace-Brochure_Mono-Tetra.pdf), reviewed 7 September 2026.
- Verified source facts: four-person capacity; external dimensions 2200 W × 1200 D × 2170 H mm; internal dimensions 2000 W × 1120 D × 2000 H mm; built-in table 700 W × 550 D × 25 H mm; 1.2 mm electro-galvanised steel; epoxy powder coating; polyester-fibre acoustic board; black polyester-fibre carpet; tempered-glass door and rear panel; four 12VDC dual-speed ventilation fans; 2 × 11W 4000K LED; 110V–250V universal socket with fan/light controls; 12VDC motion sensor; 62W maximum power draw; 650 kg net / 800 kg packed weight; standard white exterior; and one-year warranty.
- Owner-confirmed commercial treatment on 6 September 2026: RM30,400 pod + RM350 delivery + RM750 installation = RM31,500 final standard Klang Valley total. Outstation, restricted-access, and non-standard project scopes may vary.
- Approved technical drawing: `assets/products/ace-pod-four/technical-drawing/ace-pod-four-dimensions.png`, cropped from page 5 of the owner-provided brochure specifically for the Dimensions section. The existing approved gallery remains unchanged; no supplier product-gallery image was added.
- Pending: complete finish schedule, model-specific acoustic test evidence, and remaining lead-time/project-term wording.

The brochure states “DSA - ISO 23351-1 Standard 23.5dB” on the Mono/Tetra spread, but no model-specific test report and configuration record were supplied. That figure remains recorded as pending evidence and is not published as an Ace acoustic claim. Do not reuse an existing Ace or legacy supplier image as a substitute for an approved image of either model.

## 28 October 2026 — Pod One and Pod Four publication hold

Owner instruction: keep Ace Pod One and Ace Pod Four unlinked for now, while preserving their direct product pages and approved content. The pages remain `noindex` and are excluded from public product navigation, the demo range, generated navigation and discovery lists. Direct URLs remain accessible to anyone who knows them.

When the owner says “publish the Pod One and Pod Four”, treat that as authorization to restore their public links and publish them. Before release, check current product facts, approved media and release gates in this document; do not invent or upgrade verification status. Restore publication consistently across product status records, demo presentation, generated navigation/discovery, sitemap and other applicable public surfaces; build, validate and deploy. Preserve existing content and media approvals.

## 29 October 2026 — temporary public hide

Owner instructed that Ace Pod One and Ace Pod Four be removed from public customer-facing content until requested for publication. Their product data, product-page template and approved media remain preserved. Their direct product URLs temporarily redirect to `/office-pods` (HTTP 307); prelaunch routes are excluded from prerendering, and public FAQ, quote options, articles, location content and discovery output must not mention either model. The earlier instruction that direct URLs remain accessible is superseded.

When asked to publish both products, remove the temporary redirects and restore their product routes, public product listings, quote options and suitable references as appropriate; review product evidence and approved media, run the build and validate the live deployment. Do not assume unverified claims are verified.
