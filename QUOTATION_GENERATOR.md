# Ace Quotation Generator

Open `quotation-generator.html` directly in a browser. The previous `invoice-generator.html` redirects to it. This is a standalone local utility; it is not added to the public website's routes or production build.

## Fill in a quotation

1. **Customer:** enter the company/customer name. Contact person and phone are optional; billing address and email sit under a collapsed section. The date and a local draft reference are generated automatically.
2. **Pods & extras:** choose Ace Uno, Plus, Flex, Flex Duo, Meet or Hub and enter the quantity. The model fills its starting price, dimensions and matching approved catalogue photo. Choose a setup and compatible extras from that model's options. Only one item editor stays expanded; Done collapses it to a summary. Add another item when needed.
3. **Delivery & review:** enter a delivery address or use the billing address. Apply the standard Klang Valley charges when appropriate, or enter the agreed charges. Confirm that you have reviewed delivery and installation, review the total, then download the quotation PDF.

Descriptions, unit price overrides, custom extras, FREE items, dimensions, photo uploads, image arrangement and row height remain available under each item's Advanced controls. Use `**bold text**` in descriptions. Reference/date, prepared-by, access, discount, tax, payment terms, commercial terms and company/bank settings are in the review step's collapsed sections. No tax status is inferred.

Setup prices apply per pod. Extra quantities are **total quantities for this quotation**: they initially follow the pod quantity, but an explicitly edited extra quantity stays fixed when the pod quantity changes. Setup packages that include sofas prevent charging the same sofa separately. Mutually exclusive seating choices follow the catalogue rules. A quote-required setup shows “To confirm” and blocks export until its agreed price is entered. Setups appear in the pod description (for example, “Ace Flex (Adjustable table variant)”) and their cost is included in the quoted pod unit price. Add-ons retain separate numbered, priced rows with their existing catalogue images. The Flex sofa image shows the sofa inside its pod and is labelled accordingly.

## Charges and prices

The six established models use a website snapshot checked on 19 October 2026: Uno RM9,150; Plus RM14,500; Flex RM19,900; Flex Duo RM23,900; Meet RM22,200; Hub RM27,800. These are starting unit prices; setups, extras and site charges are separate. The saved snapshot includes model-specific setup and extra prices observed in the live website configurator. The owner-confirmed RM400 delivery correction in PRODUCT_PAGE_SOURCE_OF_TRUTH.md and src/data/commercialTerms.js supersedes the earlier RM350 website observation; quotation-price-sources.json records this override separately.

The standard-rate button uses RM400 delivery for one trip, plus installation per pod: Uno RM350, Plus RM500, Flex/Flex Duo RM550, Meet RM750, Hub RM800. It is unavailable for staircase access or custom/legacy models. The operator must judge whether standard Klang Valley rates apply. Changing models, quantities, delivery details, access or charges clears the charge confirmation.

No current price is inferred for the original S Pod or TEAM Pod. Switching a current model to a legacy photo resets its model pricing/options for manual entry. Ace Pod One and Four remain excluded while canonical source data marks them as prelaunch.

## Drafts

The current draft is automatically saved in this browser's IndexedDB when available. The status line reports successful saving, recovery or a storage limitation. Browser local-file storage support varies, so use **Save draft** to keep a portable JSON copy. **More → Open saved draft** restores it; older v1 drafts remain supported without automatic repricing. **More → New quotation** starts a fresh customer/order while retaining company, bank and prepared-by settings.

Local draft references are not a centralized company numbering system. Edit the reference under “Reference, date & prepared by” if your company has an official sequence.

Hermes is not connected. No customer-message extraction or screenshot analysis is included in this build. The generator makes no network requests for catalogue data, customer data or prices.

## Layout and output

The document follows the supplied Ace Workplace Solutions quotation for Rapsodo dated 22 April 2026. The original logos, S Pod/TEAM Pod photos and Assistant regular/bold fonts are embedded. Company/customer blocks, eight table columns, charges, terms, bank and acceptance fields follow that template. Item count and content determine pagination. Preset model photos are the existing approved catalogue images, embedded unchanged.

PDF downloads contain the fixed A4 preview pages, rasterized at 288 dpi; PDF text is image based. Browser Print offers vector output: choose A4, 100% scale, no margins and no browser headers/footers. Review the commercial boilerplate and bank details before issuing a quotation.

## Source and maintenance

Editable generator source is in `tools/quotation-generator/`:

- `shell.html`, `styles.css`, `editor.js`: guided editor and draft storage.
- `core.js`: pricing, options, compatibility, validation and draft migration.
- `renderer.js`: local preview adapter; `src/lib/quotationDocument.js` supplies shared A4 SVG, pagination and PDF generation.
- `assets.json`: original embedded template assets.
- `catalogue.json`: generated model/option metadata.
- `addon-media.json`: existing canonical add-on images authorized for the local quotation.

Run `node scripts/build-quotation-generator.mjs` after source edits to rebuild the self-contained HTML. No runtime npm dependencies are required.

`quotation-price-sources.json` records website observations, URLs, review date and status. After checking the live website and updating this record, run `node scripts/update-quotation-price-presets.mjs`. It reads canonical product records, rejects observed-price mismatches, checks catalogue-image geometry and rebuilds the standalone file. It does not fetch live prices automatically.

## Checks

The previous `node scripts/check-quotation-model.mjs` run covered totals, setup/extra exclusions, extra quantity behavior, pending/manual prices, standard rates, tax/discount rounding, v1/v2 draft round-trips, model switching, FREE items and prelaunch exclusion.

The refined editor was also checked in an isolated JSDOM harness: navigation/errors, one expanded item, preset/photo selection, quantity changes, charge confirmation, JSON download, IndexedDB save/recovery and legacy drafts. Generated A4 SVG structure and sample output were inspected. Canvas font measurement and browser print were stubbed in this harness; these checks do not establish browser visual or PDF-export fidelity for the refined build. In-app browser automation refused local `file://` pages, so the updated interface still needs human visual review after reopening the HTML.

Earlier template checks used local headless Chrome before that restriction and covered PDF export, uploads, A4 bounds, pagination and the historical three-page RM89,725 fixture. Those checks describe the prior template, not a fresh browser check of this editor.

The subsequent add-on-image and combined setup-row revision was rebuilt and syntax checked; the earlier form-flow checks were not rerun for this revision.

## Customer website version

`/instant-quotation` is a separate customer page, linked from `/get-a-quote`; the homepage is unchanged. Customers choose canonical models, setups and per-pod add-ons, enter their details and location/access, and download a preliminary A4 PDF. Prices and installation come directly from the website catalogue. The shared renderer keeps the Ace document layout and add-on images; selected setups are combined into the pod title and unit price.

Standard estimates use one RM400 Klang Valley delivery trip and model-specific installation with ground-floor/suitable-lift access. Other locations/access and quote-required setups show pending amounts. The preliminary PDF has a distinct heading and confirmation terms; it does not include bank or order-acceptance fields. It is not a confirmed order or payment request.

Customer selections/contact details stay in page memory and are used to generate the PDF. Downloading does not submit a lead or email a quotation. After downloading, the customer can open a prepared WhatsApp message and attach the PDF themselves. There is no CRM, Hermes, server-side quotation log or official quotation numbering integration.

Implementation: `src/pages/InstantQuotationPage.jsx`, `src/lib/preliminaryQuotation.js`, and the shared document engine. The page is lazy loaded. The new route is explicitly noindex and included in the prerender manifest. A Vite production compilation succeeded with output in a temporary directory. No browser interaction, visual review or PDF download check was performed on this revision. Deployment remains separate.
