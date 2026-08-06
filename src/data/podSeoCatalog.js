export const ACE_UNO_PRICING = Object.freeze({
  podOnly: 8850,
  standardKlangValleyDelivery: 350,
  standardKlangValleyInstallation: 350,
  standardInstalledTotal: 9550,
  optionalHighBarStool: 250,
  standardInstalledTotalWithStool: 9800
});

export const ACE_PLUS_ACOUSTIC_CLAIM = Object.freeze({
  approximateDbA: 27,
  verified: false,
  qualifiedDisplay: 'Approximately 27 dB(A), based on Ace\u2019s public Plus claim; no verified test document provided',
  evidenceStatus: 'First-party public claim only; no verified test document provided'
});

export const POD_SEO_BY_SLUG = {
  'ace-uno': {
    name: 'Ace Uno',
    shortDesc: 'Enclosed one-person acoustic pod for calls and focus',
    geoDefinition: 'Ace Uno is a freestanding, enclosed one-person acoustic call and focus pod for phone calls, video meetings, and focused work, with an integrated worktop, ventilation, lighting, power, and USB charging.',
    startingPrice: ACE_UNO_PRICING.podOnly,
    priceBasis: 'pod only',
    factsReviewedOn: '2026-08-06',
    acousticPerformance: {
      publishedDbRating: null,
      statement: 'Ace Uno has no published dB rating.',
      limitations: [
        'Do not describe Ace Uno as soundproof.',
        'Do not promise speech confidentiality or apply the Ace Plus acoustic claim to Ace Uno.'
      ]
    },
    legacyRoute: {
      legacyModel: 'Ace Solo',
      legacyPath: '/pods/ace-solo',
      canonicalPath: '/pods/ace-uno'
    },
    schemaProperties: [
      { name: 'Capacity', value: '1 person' },
      { name: 'Category', value: 'Single-person acoustic call and focus pod' },
      { name: 'External dimensions', value: '1418W × 1018D × 2185H mm' },
      { name: 'Exterior and interior finish', value: '9 mm polyester fibre acoustic panels' },
      { name: 'Door', value: '10 mm clear tempered glass' },
      { name: 'Rear panel', value: 'Laminated safety glass' },
      { name: 'Ventilation', value: 'Dual quiet airflow fans, 108 CFM per fan' },
      { name: 'Power', value: 'Universal socket with USB Type-A and USB Type-C' }
    ],
    useCases: [
      'Ace Uno is a freestanding one-person acoustic pod designed for phone calls, video meetings, and focused work in open-plan workplaces.',
      'Its 1418 mm by 1018 mm footprint provides an integrated Natural Oak work surface without requiring permanent renovation or built-in construction.',
      'The standard configuration includes a clear tempered-glass door, laminated safety-glass rear panel, neutral-white LED lighting, dual quiet ventilation fans, universal power, and USB charging.',
      'Ace Uno costs RM8,850 for the pod only. Standard Klang Valley delivery is RM350 and installation is RM350, for a standard installed total of RM9,550 before the optional stool. Adding the optional RM250 high bar stool makes the total RM9,800.'
    ],
    faqItems: [
      { question: 'What is the Ace Uno office pod used for?', answer: 'Ace Uno is a freestanding single-person acoustic pod for calls, video meetings, and focused work in open-plan workplaces.' },
      { question: 'How much does Ace Uno cost in Malaysia?', answer: 'Ace Uno starts from RM8,850 for the pod only. Standard Klang Valley installation is RM350 and delivery is RM350, making RM9,550 before the optional stool or RM9,800 with the optional RM250 high bar stool. Outstation and restricted-access projects are quoted separately.' },
      { question: 'What are the external dimensions of Ace Uno?', answer: 'Ace Uno measures 1418 mm wide, 1018 mm deep, and 2185 mm high.' },
      { question: 'What is included with Ace Uno?', answer: 'The standard pod includes an integrated Natural Oak worktop, LED ceiling light, dual quiet airflow fans, a universal socket, USB Type-A and USB Type-C charging, a tempered-glass door, and a laminated safety-glass rear panel.' }
    ]
  },
  'ace-plus': {
    name: 'Ace Plus',
    shortDesc: 'Built for privacy, focus, and sound control',
    startingPrice: 14500,
    schemaProperties: [
      { name: 'Capacity', value: '1 pax' },
      { name: 'Category', value: '1-pax phone / focus pod' },
      { name: 'Published acoustic claim', value: ACE_PLUS_ACOUSTIC_CLAIM.qualifiedDisplay },
      { name: 'External dimensions', value: '1000W × 1000D × 2350H mm' },
      { name: 'Internal dimensions', value: '853W × 918D × 2070H mm' },
      { name: 'Internal height', value: '2070mm (81.50")' },
      { name: 'External height', value: '2350mm (92.52")' },
      { name: 'Room height requirement', value: '2500mm (98.43")' }
    ],
    useCases: [
      `The Ace Plus is a one-person office phone booth designed for extended daily use in open-plan offices. Ace publishes an approximately ${ACE_PLUS_ACOUSTIC_CLAIM.approximateDbA} dB(A) claim for Plus; no verified supporting test document has been provided.`,
      'It is suited for employees who need to take frequent calls throughout the day or work on tasks requiring sustained concentration.',
      'The Ace Plus includes Italian pivot hinges, CARB Phase 2 compliant panels, and 155 CFM airflow for comfortable extended use in Malaysia office environments.',
      'Typical users include customer service teams, sales managers, HR professionals, and executives who need an enclosed work setting without leaving the office floor.',
      'The Ace Plus starts from RM14,500. Delivery and installation are available across Klang Valley and West Malaysia.'
    ],
    faqItems: [
      { question: 'What acoustic claim is published for Ace Plus?', answer: `Ace publishes an approximately ${ACE_PLUS_ACOUSTIC_CLAIM.approximateDbA} dB(A) claim for Ace Plus. It is an unverified first-party claim because no verified supporting test document or measurement conditions have been provided.` },
      { question: 'What is the difference between Ace Uno and Ace Plus?', answer: 'Ace Uno is the wider, lower-priced one-person pod with an integrated worktop, dual 108 CFM fans, and USB Type-A and Type-C charging. Ace Plus has a smaller 1000 by 1000 mm footprint and an unverified first-party approximately 27 dB(A) claim.' },
      { question: 'How much does the Ace Plus cost?', answer: 'The Ace Plus starts from RM14,500 in Malaysia. Final pricing depends on delivery location, installation requirements, and any customisation. Contact the team for a full quotation.' },
      { question: 'Is the Ace Plus suitable for all-day use?', answer: 'Yes. The Ace Plus is designed for extended daily use with steady 155 CFM airflow, which maintains air quality and comfort during longer sessions. It is well suited for Malaysia office conditions.' }
    ]
  },
  'ace-flex': {
    name: 'Ace Flex',
    shortDesc: 'Spacious pod for comfort and focus',
    startingPrice: 19900,
    schemaProperties: [
      { name: 'Capacity', value: '1 pax' },
      { name: 'Category', value: '1-pax larger focus / work pod' },
      { name: 'External dimensions', value: '1600W × 1200D × 2350H mm' },
      { name: 'Internal dimensions', value: '1452W × 1100D × 2070H mm' },
      { name: 'Internal height', value: '2070mm (81.50")' },
      { name: 'External height', value: '2350mm (92.52")' },
      { name: 'Room height requirement', value: '2500mm (98.43")' }
    ],
    useCases: [
      'The Ace Flex is the largest one-person pod in the Ace range. It is designed for users who need more space to spread out documents, use multiple screens, or work for extended periods without feeling confined.',
      'It is suited for executives, senior professionals, and team leads who need a private workspace for deep work, client calls, or document-intensive tasks.',
      'The larger internal footprint (1452mm × 1100mm) provides noticeably more elbow room than compact phone booth pods, making it comfortable for sessions of an hour or more.',
      'The Ace Flex starts from RM19,900 and includes built-in lighting, ventilation, and power access.',
      'Delivery and installation are available across Klang Valley and West Malaysia with approximately 3 to 6 weeks lead time.'
    ],
    faqItems: [
      { question: 'What is the Ace Flex office pod used for?', answer: 'The Ace Flex is a spacious one-person pod suited for extended solo work sessions, document-intensive tasks, executive calls, and situations where a smaller phone booth feels too confined. It offers more internal working space than Ace Uno or Ace Plus.' },
      { question: 'How does the Ace Flex differ from Ace Plus?', answer: 'The Ace Flex is physically larger, providing more internal workspace (1452mm × 1100mm vs 853mm × 918mm). It is the right choice when the user needs room to work across documents, multiple devices, or longer sessions. The Ace Plus is more compact and has a separate published acoustic claim.' },
      { question: 'How much does the Ace Flex cost?', answer: 'The Ace Flex starts from RM19,900 in Malaysia. Contact the team for delivery and installation quotation based on your office location.' },
      { question: 'Can the Ace Flex fit in a standard open-plan office?', answer: 'Yes. The Ace Flex external footprint is 1600mm × 1200mm, which fits comfortably in most open-plan office layouts. Allow at least 800mm clearance on all sides for comfortable entry and exit.' }
    ]
  },
  'ace-flex-duo': {
    name: 'Ace Flex Duo',
    shortDesc: 'Two-person pod for focused work',
    startingPrice: 23900,
    schemaProperties: [
      { name: 'Capacity', value: '2 pax' },
      { name: 'Category', value: '2-person collaboration / focus pod' },
      { name: 'External dimensions', value: '1600W × 1200D × 2350H mm' },
      { name: 'Internal dimensions', value: '1452W × 1100D × 2070H mm' },
      { name: 'Internal height', value: '2070mm (81.50")' },
      { name: 'External height', value: '2350mm (92.52")' },
      { name: 'Room height requirement', value: '2500mm (98.43")' }
    ],
    useCases: [
      'The Ace Flex Duo is a two-person office pod designed for one-to-one meetings, HR interviews, coaching sessions, and collaborative calls where two people need to be in the same enclosed space.',
      'It reduces pressure on larger meeting rooms by handling short, recurring two-person interactions without requiring a full boardroom booking.',
      'Common uses include manager check-ins, performance reviews, paired client calls, and shared focused tasks where two team members work side by side.',
      'The Ace Flex Duo includes built-in lighting, ventilation, and power access for two users. It starts from RM23,900.',
      'Delivery and installation are available across Klang Valley and West Malaysia with approximately 3 to 6 weeks lead time.'
    ],
    faqItems: [
      { question: 'What is the Ace Flex Duo used for?', answer: 'The Ace Flex Duo is used for two-person meetings, HR interviews, coaching sessions, one-to-one manager discussions, and collaborative calls where two team members need to be in the same enclosed, private space.' },
      { question: 'How many people can use the Ace Flex Duo at once?', answer: 'The Ace Flex Duo is rated for 2 people. It provides seating and working space for two users in an enclosed pod.' },
      { question: 'How much does the Ace Flex Duo cost?', answer: 'The Ace Flex Duo starts from RM23,900 in Malaysia. Final pricing depends on delivery location, installation scope, and any customisation options.' },
      { question: 'When should I choose Ace Flex Duo over a meeting pod?', answer: 'Choose the Ace Flex Duo when the typical group size is consistently two people. For groups of three or more, the Ace Meet is more appropriate. The Flex Duo is compact and efficient for one-to-one interactions without occupying the footprint of a larger meeting pod.' }
    ]
  },
  'ace-meet': {
    name: 'Ace Meet',
    shortDesc: 'Meeting pod for small teams',
    startingPrice: 22200,
    schemaProperties: [
      { name: 'Capacity', value: '2–4 pax' },
      { name: 'Category', value: '2–4 pax meeting pod' },
      { name: 'External dimensions', value: '2200W × 1200D × 2350H mm' },
      { name: 'Internal dimensions', value: '2030W × 1140D × 2070H mm' },
      { name: 'Internal height', value: '2070mm (81.50")' },
      { name: 'External height', value: '2350mm (92.52")' },
      { name: 'Room height requirement', value: '2500mm (98.43")' }
    ],
    useCases: [
      'The Ace Meet is a small team meeting pod designed for groups of two to four people. It is well suited for hybrid calls, project standups, client briefings, and small team collaboration sessions.',
      'It provides an enclosed meeting setting away from the main open-floor activity.',
      'The Ace Meet replaces the need to book a full boardroom for small recurring meetings, making it a practical addition to offices with limited dedicated meeting room capacity.',
      'Common users include project teams, hybrid work teams, department leads, and client-facing teams who hold frequent short meetings with three to four attendees on site.',
      'The Ace Meet starts from RM22,200. Delivery and installation are available across Klang Valley and West Malaysia.'
    ],
    faqItems: [
      { question: 'How many people can use the Ace Meet?', answer: 'The Ace Meet accommodates 2 to 4 people comfortably. It is designed for small team meetings, hybrid calls with remote participants, and client briefings where 2 to 4 people are on site.' },
      { question: 'What is the Ace Meet used for?', answer: 'The Ace Meet is used for small team meetings, project reviews, hybrid video calls, client discussions, and department standups where a group of 2 to 4 people needs an enclosed, private space without booking a full boardroom.' },
      { question: 'How much does the Ace Meet cost?', answer: 'The Ace Meet starts from RM22,200 in Malaysia. Final pricing depends on delivery location, installation requirements, and any customisation options. Contact the team for a full project quotation.' },
      { question: 'How is the Ace Meet different from the Ace Hub?', answer: 'The Ace Meet is designed for 2 to 4 people and has a more compact footprint (2200mm × 1200mm). The Ace Hub accommodates up to 6 people and has a larger footprint (2200mm × 1500mm). Choose the Ace Meet for smaller recurring team meetings, and the Ace Hub for larger group sessions or lounge-style collaboration.' }
    ]
  },
  'ace-hub': {
    name: 'Ace Hub',
    shortDesc: 'Meeting pod for larger teams',
    startingPrice: 27800,
    schemaProperties: [
      { name: 'Capacity', value: 'Up to 6 pax' },
      { name: 'Category', value: 'Up-to-6-pax hub / lounge pod' },
      { name: 'External dimensions', value: '2200W × 1500D × 2350H mm' },
      { name: 'Internal dimensions', value: '2030W × 1440D × 2070H mm' },
      { name: 'Internal height', value: '2070mm (81.50")' },
      { name: 'External height', value: '2350mm (92.52")' },
      { name: 'Room height requirement', value: '2500mm (98.43")' }
    ],
    useCases: [
      'The Ace Hub is the largest pod in the Ace range, designed for groups of up to six people. It functions as a collaboration hub or lounge pod for larger team sessions, workshops, and group hybrid calls.',
      'It is suited for offices that need a self-contained enclosed space for department meetings, cross-team discussions, or client presentations where five to six people are present on site.',
      'The larger internal footprint (2030mm × 1440mm) provides lounge-style working space, making it comfortable for longer sessions and group interaction beyond standard meeting pod formats.',
      'The Ace Hub is used by corporate teams, project groups, and client-facing departments that regularly bring larger groups together without access to a dedicated boardroom.',
      'It starts from RM27,800. Delivery and installation are available across Klang Valley and West Malaysia with approximately 3 to 6 weeks lead time.'
    ],
    faqItems: [
      { question: 'How many people can use the Ace Hub?', answer: 'The Ace Hub accommodates up to 6 people. It is the largest pod in the Ace range and is designed for group collaboration, department meetings, and larger hybrid call sessions.' },
      { question: 'What is the Ace Hub used for?', answer: 'The Ace Hub is used for larger team meetings, group workshops, hybrid calls with 4 to 6 on-site participants, and lounge-style collaboration sessions where a standard meeting pod is too small.' },
      { question: 'How much does the Ace Hub cost?', answer: 'The Ace Hub starts from RM27,800 in Malaysia. Final pricing depends on delivery location, installation scope, and customisation options. Contact the team for a full quotation.' },
      { question: 'When should I choose the Ace Hub over the Ace Meet?', answer: 'Choose the Ace Hub when on-site groups consistently exceed 4 people, or when the team needs lounge-style seating and more internal working space. The Ace Meet is better suited for 2 to 4 person groups with a smaller footprint requirement.' }
    ]
  }
};
