# Product and Portfolio Image Workflow

Use this checklist whenever a new product, colour variant, or portfolio project is added. The objective is a consistent catalogue without repeated images, exposed supplier information, distorted products, or confusing gallery order.

## 1. Audit before publishing

- Inventory every supplied file and classify it as: primary product view, alternate angle, interior/detail, technical drawing, material chart, installed-project photo, add-on, duplicate, or internal reference.
- Compare visually similar files. A cleaner or higher-resolution version replaces the older file; it is not added as another gallery item.
- Keep source PDFs, supplier catalogues, colour codes, factory branding, watermarks, and filenames with supplier identifiers internal.
- Confirm product names, colour names, capacity, dimensions, pricing, and included features against approved specifications. Do not infer missing claims.
- Record the evidence source and review date for each factual claim. A supplied image is evidence of appearance only; it is not evidence of acoustic performance, certification, capacity, dimensions, fire rating, or included equipment.

## 2. Approval gate

- Use the files already supplied in the designated product or portfolio format.
- “Designated format” means an image listed as `approved` in that product or project’s media manifest, with an assigned role and display order. A folder location or matching dimensions alone does not constitute approval.
- Do not add any other image type without asking the user first. This includes alternate angles, front-view duplicates, detail crops, material charts, colour-code charts, lifestyle images, installation photos, diagrams, and add-on renders.
- An unapproved image may remain an internal source file, but it must not be imported into customer-facing code or included in a published gallery.
- The manifest must distinguish `product-gallery`, `finish-selector`, `add-on-preview`, `technical-drawing`, `project-gallery`, and `internal-reference`. One asset may not silently move between roles.

## 3. Product gallery order

For a product with approved colour renders, use this order:

1. Every approved exterior colour render, in the user-approved colour order.
2. The approved pod interior image.
3. Nothing else unless the user explicitly approves it.

For Ace Uno the locked order is:

1. Warm Sand three-quarter render.
2. Pine Green three-quarter render.
3. Shadow Grey three-quarter render.
4. Dusty Turquoise three-quarter render.
5. Interior worktop, power, and lighting image.

Do not publish the Ace Uno colour/material-code chart or the duplicate front renders. Technical drawings stay in the Dimensions section. Add-on previews stay with the configurator and do not become product-gallery images.

Product views and add-on previews must be separate labelled groups. Selecting an add-on may preview that add-on, but it must not insert the image into the product-gallery sequence.

## 4. Image preparation

- Use descriptive filenames: `product-colour-view.webp` or `project-location-purpose.webp`.
- Remove supplier branding only where authorised, while preserving product geometry, colour, material, lighting, and framing.
- Preserve aspect ratio. Never stretch an image to make products look physically identical.
- Normalise every catalogue image to a 1600 × 1200 transparent canvas, 1000 px visible product height, and a shared baseline at y=1100. Centre the visible product horizontally and keep it within 1400 px width.
- Use `npm run product-images`; do not manually add a per-product scale or position correction in page components. Finish-selector renders that can replace the hero image must meet the same normalisation rules as the catalogue master.
- Export web-ready WebP or AVIF assets at an appropriate resolution; retain a high-quality source outside the published bundle.
- Provide specific alt text for the product, selected finish, view, or project context.

## 5. Portfolio galleries

- Use only the approved project folder and designated portfolio-image format.
- Lead with one strong wide project image, followed by approved contextual office views, installed pod views, interior/use photos, and useful details.
- Ask before adding any image outside the approved set or changing the gallery order.
- Remove near-duplicates, blurred shots, accidental personal information, temporary site clutter, and supplier branding that is not part of the completed installation.
- Preserve historically accurate product names for completed installations, including legacy models.
- Do not mix product renders into a completed-installation gallery unless clearly labelled.

## 6. Release checks

- Check desktop and mobile gallery order, thumbnail overflow, selected states, arrows, and keyboard navigation.
- Confirm product tops and baselines align across cards without changing technical dimensions.
- Check product views and add-on previews as separate groups; add-ons must not appear as extra product colours or gallery views.
- Search customer-facing output for supplier names, codes, watermarks, outdated product names, and unsupported claims.
- Run the automated media validator, production build, and SEO validation, then review the final page at mobile and desktop widths.
- Do not treat a passing automated validator as visual approval. The current validator must cover every approved catalogue and finish-selector render and check canvas, visible height, baseline, maximum width, horizontal centring, aspect-ratio preservation, and transparency before this gate can be considered fully automated.
