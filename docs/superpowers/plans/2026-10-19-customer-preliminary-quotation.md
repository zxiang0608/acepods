# Customer preliminary quotation

User scope: finish add-on images and combined setup descriptions in the local tool; add a customer website version for an automatic first quotation.

Assumption stated while the optional format question remained unanswered: customers download an instant preliminary PDF, subject to Ace confirmation. This does not create an approved sales quotation or send a lead automatically.

- [x] Use existing canonical add-on images in editor and A4 rows. Label the existing Flex sofa-in-pod visual accurately.
- [x] Combine setups into the pod description and unit price; retain separate accessory rows.
- [x] Apply the owner-confirmed RM400 standard delivery correction without changing saved draft prices.
- [x] Share the A4 document engine between the local generator and website.
- [x] Build `/instant-quotation` with three customer steps, canonical prices, options, compatible extras and pending non-standard site charges.
- [x] Add a link from `/get-a-quote`, route registration and noindex prerender metadata.
- [x] Compile the Vite SPA into a temporary output directory. No tests were added or run for this revision.
- [x] Start a local preview at http://127.0.0.1:5177/instant-quotation for user review.

Browser interaction, visual review and real PDF-download verification remain outstanding. This implementation is not deployed. The preview has no Hermes, CRM, automatic email, quotation storage or official-numbering service. Customers can open a prepared WhatsApp message and attach their downloaded PDF themselves.
