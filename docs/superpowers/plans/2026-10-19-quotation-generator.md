# Ace Quotation Generator Implementation Plan

**Goal:** Replace the local invoice utility with a quotation generator matching the owner-approved Rapsodo quotation's visual template.

**Approved scope:** User selected the Ace quotation layout and requested a quotation generator. Keep the website untouched. Company details, logos, font assets and boilerplate originate from the supplied finalized quotation, dated 22 April 2026; product claims and current pricing remain manually entered. Source PDF remains unchanged.

**Architecture:** Standalone HTML with embedded original fonts/logos. A shared page layout produces fixed A4 SVG pages for preview/printing. Direct PDF export rasterizes the same pages at 288 dpi into an A4 PDF, preserving appearance offline. The PDF is image based; browser print preserves vector output. Editable data is exported/imported as JSON drafts.

- [x] Implement quote/customer/delivery fields, line items with ordered image uploads, dimensions, quantities, FREE pricing and section separators.
- [x] Implement source-matched company header, eight-column table, totals, terms, bank and acceptance fields with pagination.
- [x] Implement print, PDF download, draft save/load, reset and input validation. Keep the old file URL working.
- [x] Verify calculations, FREE items, page overflow, draft round-trip, uploads, PDF export and desktop/mobile controls. Inspect rendered A4 output visually against the supplied template.
