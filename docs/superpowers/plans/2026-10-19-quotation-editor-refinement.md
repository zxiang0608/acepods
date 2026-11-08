# Ace quotation editor refinement

Approved scope: three guided steps (Customer, Pods & add-ons, Delivery & review), one expanded item at a time, less-used controls under Advanced, existing A4 output preserved. The user selected simpler editor and add-ons first; Hermes remains a feasibility finding only and is not connected in this build.

- [x] Add catalogue-backed configuration and add-on records, compatibility rules, transparent charge lines, and manual-price handling for quote-required configurations.
- [x] Replace the long form with guided steps, compact item summaries and field-specific errors. Prefill dates and draft references; keep commercial/site decisions explicit.
- [x] Preserve drafts, custom/legacy items, image uploads, print/PDF output and override prices.
- [x] Check arithmetic, quantities, configuration exclusions, model switching, saved-draft compatibility and form navigation. Report any visual verification limitation accurately.

Checks: persistent model checks and isolated JSDOM form/storage checks pass. Live configurator setup/extra/site-charge values matched the canonical snapshot. Existing PDF renderer is retained; rich-text runs now share SVG text elements and table headings have explicit line breaks. No fresh browser UI/print/PDF check was possible: in-app browser automation refused local file pages. Human visual review remains necessary; this is documented in QUOTATION_GENERATOR.md.
