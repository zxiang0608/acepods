import path from 'node:path';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import {
  FAQ_PAGE_ITEMS,
  HOME_FAQ_ITEMS,
  OFFICE_PODS_FAQ_ITEMS,
  PRICING_FAQ_ITEMS,
  SEO_BASE_URL,
  SEO_BRAND_ALTERNATE_NAMES,
  SEO_BRAND_AREA_SERVED,
  SEO_BRAND_COUNTRY,
  SEO_BRAND_EMAIL,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_LOGO,
  SEO_BRAND_PHONE,
  SEO_BRAND_POSTAL_CODE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SAME_AS,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION,
  SEO_BRAND_STREET_ADDRESS,
  SEO_FACTS_REVIEWED_ON,
  SEO_KEYWORDS_COMMON
} from '../src/seo/constants.js';
import { ARTICLES } from '../src/data/articles.js';
import { getRelatedArticles } from '../src/lib/articleRelations.js';
import { POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';
import { HOME_META, getProductMeta, getProductPublicImage } from '../src/seo/pageMeta.js';

// Populated at runtime in run() by scanning dist/assets — changes on every Vite build
let PRELOAD_FONT_400 = '';
let PRELOAD_HERO_AVIF = '';

const POD_ROUTE_ORDER = ['ace-uno', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];
const PRICING_LIST_ITEMS = POD_ROUTE_ORDER.map((slug) => ({
  slug,
  name: POD_SEO_BY_SLUG[slug].name,
  price: POD_SEO_BY_SLUG[slug].startingPrice,
  path: `/pods/${slug}`
}));

const PRERENDER_NAV_LINKS = [
  ['Office pods', '/office-pods'],
  ['Ace Uno', '/pods/ace-uno'],
  ['Ace Plus', '/pods/ace-plus'],
  ['Ace Flex', '/pods/ace-flex'],
  ['Ace Flex Duo', '/pods/ace-flex-duo'],
  ['Ace Meet', '/pods/ace-meet'],
  ['Ace Hub', '/pods/ace-hub'],
  ['Pricing', '/pricing'],
  ['Compare models', '/compare-office-pods'],
  ['Meeting pods', '/meeting-pods-malaysia'],
  ['Office phone booths', '/office-phone-booth-malaysia'],
  ['Office pods near me', '/office-pods-near-me'],
  ['Locations', '/locations'],
  ['Portfolio', '/portfolio'],
  ['Installation and support', '/installation-support'],
  ['Pod relocation', '/pod-relocation'],
  ['Articles', '/articles'],
  ['About', '/about'],
  ['Editorial policy', '/editorial-policy'],
  ['FAQ', '/faq'],
  ['Contact', '/contact']
];

const INSTALLATION_FAQ_ITEMS = [
  {
    question: 'How does office pod installation work?',
    answer: 'Office pod installation follows a five-stage process: consultation and site assessment, quotation and order confirmation, production and scheduling, delivery and on-site assembly, and handover with usage walkthrough. Each stage is confirmed before moving to the next to avoid surprises on installation day.'
  },
  {
    question: 'What happens during the site visit?',
    answer: 'During the site visit, the team verifies access routes into the building, lift and doorway clearance for the largest pod dimension, the intended placement location on the office floor, and any constraints that may affect installation timing or method. This step prevents delivery-day complications and confirms the project can proceed as planned.'
  },
  {
    question: 'How long does delivery take after deposit?',
    answer: 'Delivery timing depends on the model, quantity, current schedule, site access, and agreed installation scope. The applicable commercial terms and confirmed delivery window are stated in the quotation.'
  },
  {
    question: 'Will installation disrupt office operations?',
    answer: 'Installation timing and sequencing depend on the model, quantity, access route, building rules, and approved scope. The expected duration and any operational restrictions are confirmed before delivery.'
  },
  {
    question: 'What support is available after handover?',
    answer: 'The quotation and handover documents should state the applicable warranty, usage guidance, post-installation support scope, and contact path. Confirm these terms in writing before ordering.'
  }
];

const RELOCATION_FAQ_ITEMS = [
  {
    question: 'Can an office pod be relocated after installation?',
    answer: 'Yes. Ace Office Pods are modular and can be dismantled, transported, and reinstalled at a new location by our installation team. Relocation cost depends on distance and access conditions at both the pickup and destination sites.'
  },
  {
    question: 'Does moving my pod affect the warranty?',
    answer: 'Relocation should be carried out by an experienced team, and any warranty implications are confirmed in writing as part of the relocation quote before work begins. Contact us before moving a pod yourself to avoid affecting coverage.'
  },
  {
    question: 'How much does office pod relocation cost?',
    answer: 'Relocation is quoted per project rather than a fixed price, since cost depends on distance between sites, access conditions, pod model and size, and whether the job is a full relocation or dismantle-only. Contact the team for a written quote after a two-site review.'
  },
  {
    question: 'How long does a pod relocation take?',
    answer: 'Timing depends on distance, access, and pod size. Most single-pod relocations are completed within one to a few working days once the move date is confirmed, similar in scope to a new installation.'
  },
  {
    question: 'What is checked after a pod is moved?',
    answer: 'After reinstallation, the team inspects panel fit and fasteners, glass and door alignment, acoustic seals, ventilation, lighting, socket and power operation, and stability before handover.'
  },
  {
    question: 'Can I move a pod myself?',
    answer: 'Some models, such as the Ace Flex Duo, include hidden heavy-duty wheels for convenient short-distance moves within the same floor. For a move between offices or floors, dismantling and reinstallation by the Ace team is recommended to avoid affecting panel fit, seals, or warranty coverage.'
  }
];

const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.jpg`;
const NOSCRIPT_BRAND_OWNERSHIP_TEXT =
  'Ace Office Pods is owned by Ace Workplace Solutions and supplies office pods, office booths, office phone booths, and meeting pods in Malaysia.';
const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO_BASE_URL}/#organization`,
  name: SEO_BRAND_PRIMARY,
  legalName: SEO_BRAND_LEGAL,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  identifier: SEO_BRAND_IDENTIFIER,
  url: SEO_BASE_URL,
  logo: SEO_BRAND_LOGO,
  email: SEO_BRAND_EMAIL,
  telephone: SEO_BRAND_PHONE,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: SEO_BRAND_AREA_SERVED
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SEO_BRAND_PHONE,
    email: SEO_BRAND_EMAIL,
    contactType: 'sales',
    areaServed: 'MY',
    availableLanguage: ['en', 'ms']
  },
  sameAs: SEO_BRAND_SAME_AS,
  description: `Ace Office Pods (${SEO_BRAND_LEGAL}) supplies office pods and office booths for calls, focus, and meetings in ${SEO_BRAND_AREA_SERVED}.`
});

const buildServiceOrganizationSchema = () => ({
  ...buildOrganizationSchema(),
  '@type': ['Organization', 'ProfessionalService'],
  description: `Ace Office Pods (${SEO_BRAND_LEGAL}) supplies office pods and office booths for calls, focus, and meetings in ${SEO_BRAND_AREA_SERVED}.`
});

const buildLocalBusinessSchema = () => ({
  ...buildOrganizationSchema(),
  '@type': ['Organization', 'LocalBusiness', 'FurnitureStore', 'ProfessionalService'],
  '@id': `${SEO_BASE_URL}/#organization`,
  priceRange: 'RM8,850+',
  image: [SEO_BRAND_LOGO, `${SEO_BASE_URL}/og-image.jpg`],
  address: {
    '@type': 'PostalAddress',
    streetAddress: SEO_BRAND_STREET_ADDRESS,
    addressLocality: SEO_BRAND_SHOWROOM_LOCALITY,
    addressRegion: SEO_BRAND_SHOWROOM_REGION,
    postalCode: SEO_BRAND_POSTAL_CODE,
    addressCountry: SEO_BRAND_COUNTRY
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 3.07523,
    longitude: 101.44187
  },
  hasMap: 'https://maps.app.goo.gl/nJHHvTLD5YEov9e4A',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Klang Valley' },
    { '@type': 'AdministrativeArea', name: SEO_BRAND_AREA_SERVED },
    { '@type': 'Country', name: 'Malaysia' }
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office pod showroom viewing by appointment' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Office pod delivery and installation in Klang Valley' } }
  ]
});

const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_BASE_URL}/#website`,
  name: SEO_BRAND_PRIMARY,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  url: SEO_BASE_URL,
  publisher: {
    '@id': `${SEO_BASE_URL}/#organization`
  }
});

const buildHomepageWebPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ace Office Pods by Ace Workplace Solutions',
  url: SEO_BASE_URL,
  description: 'Ace Office Pods (Ace Workplace Solutions), supplying office pods and office booths for calls, focus, and meetings in Malaysia.',
  dateModified: SEO_FACTS_REVIEWED_ON,
  isPartOf: {
    '@id': `${SEO_BASE_URL}/#website`
  },
  about: [
    { '@type': 'Thing', name: 'Ace Office Pods' },
    { '@type': 'Thing', name: 'Ace Workplace Solutions' },
    { '@type': 'Thing', name: 'office pods' },
    { '@type': 'Thing', name: 'office booths' }
  ],
  mentions: [
    { '@type': 'Thing', name: 'acoustic office pods' },
    { '@type': 'Place', name: 'Malaysia' },
    { '@type': 'Place', name: SEO_BRAND_AREA_SERVED }
  ]
});

const LOCATION_PRERENDER_DATA = [
  {
    slug: 'kuala-lumpur',
    city: 'Kuala Lumpur',
    shortName: 'Kuala Lumpur (KL)',
    geo: { latitude: 3.1390, longitude: 101.6869 },
    title: 'Office Pods Kuala Lumpur | Delivery & Installation',
    description:
      'Office pods in Kuala Lumpur with completed installations for Everllence, Parker Hannifin, and CMA CGM in Bangsar. Compare models, pricing, delivery, and installation.',
    intro:
      'Ace Office Pods supplies and installs office phone booths, focus pods, and meeting pods for Kuala Lumpur workplaces.',
    projects: [
      'Everllence — Ace Plus installation in Kuala Lumpur',
      'Parker Hannifin — Ace Flex installation in Kuala Lumpur',
      'CMA CGM — Legacy Ace Solo installation in Bangsar, Kuala Lumpur'
    ]
  },
  {
    slug: 'shah-alam',
    city: 'Shah Alam',
    shortName: 'Shah Alam',
    geo: { latitude: 3.0733, longitude: 101.5185 },
    title: 'Office Pods Shah Alam | Delivery & Installation | Ace Office Pods',
    description:
      'Office pods in Shah Alam with a completed Alphabet Capital installation. Compare phone booths, acoustic pods, pricing, delivery, and installation support.',
    intro: 'Ace Office Pods supplies and installs office phone booths and acoustic work pods for Shah Alam offices.',
    projects: ['Alphabet Capital — Legacy Ace Solo installation in Shah Alam']
  },
  {
    slug: 'subang-jaya',
    city: 'Subang Jaya',
    shortName: 'Subang Jaya',
    geo: { latitude: 3.0565, longitude: 101.5819 },
    title: 'Office Pods Subang Jaya | Delivery & Installation',
    description:
      "Office pods in Subang Jaya with a completed Taylor's College installation. Compare acoustic phone booths, pod pricing, delivery, and installation support.",
    intro: 'Ace Office Pods supplies and installs office phone booths and acoustic pods for Subang Jaya workplaces and education environments.',
    projects: ["Taylor's College — Ace Plus installation in Subang Jaya"]
  }
];

const buildLocationPrerenderEntries = () =>
  Object.fromEntries(
    LOCATION_PRERENDER_DATA.map((location) => {
      const route = `/locations/${location.slug}`;
      return [
        route,
        {
          title: location.title,
          description: location.description,
          keywords: `${SEO_KEYWORDS_COMMON}, office pods ${location.city}, office phone booth ${location.city}, acoustic office pod ${location.city}`,
          h1: `Office pods in ${location.shortName}`,
          body: [
            location.intro,
            `## Completed office pod projects in ${location.city}`,
            ...location.projects.map((project) => `- ${project}`),
            '## Delivery and installation planning',
            `Projects in ${location.city} are planned around building access, loading arrangements, lift or staircase clearance, floor protection, delivery timing, and final pod placement.`,
            '## Showroom viewing',
            'The physical Ace Office Pods showroom is in Klang, Selangor. Viewing is available by appointment before selecting a model.',
            '## Related planning links',
            '[View office pod pricing](/pricing)',
            '[Compare office pod models](/office-pods)',
            '[View installation portfolio](/portfolio)',
            '[Contact our team](/contact)'
          ],
          schemas: (canonical) => [
            buildLocalBusinessSchema(),
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `Office pod delivery and installation in ${location.city}`,
              url: canonical,
              description: location.description,
              provider: {
                '@id': `${SEO_BASE_URL}/#organization`
              },
              areaServed: {
                '@type': 'City',
                name: location.city,
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: location.geo.latitude,
                  longitude: location.geo.longitude
                }
              },
              serviceType: ['Office pod supply', 'Office pod delivery', 'Office pod installation']
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${SEO_BASE_URL}/`
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Locations',
                  item: `${SEO_BASE_URL}/locations`
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: location.city,
                  item: canonical
                }
              ]
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': `${canonical}#location-${location.slug}-answer`,
              url: canonical,
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: [`#location-${location.slug}-answer`]
              }
            }
          ]
        }
      ];
    })
  );

const STATIC_PRERENDER_META = {
  ...buildLocationPrerenderEntries(),
  '/': {
    title: HOME_META.title,
    description: HOME_META.description,
    keywords: `${SEO_KEYWORDS_COMMON}, office booth provider`,
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'Ace Office Pods (aceofficepods.com), trading as Ace Workplace Solutions (registration no. 202403171118), is a Malaysian office pod supplier. Not affiliated with Supreme Office Furniture or any other office pod brand.',
      'Ace Office Pods (Ace Workplace Solutions), supplying office pods and office booths for calls, focus, and meetings in Malaysia.',
      'Add private space for calls, focused work, and meetings without building new rooms.',
      'Compare models, pricing, installation support, and office fit before deciding.',
      '## Office pods for practical daily use',
      'Office pods are enclosed workspace units used to create quieter call and meeting zones inside active offices. Teams typically use them to reduce interruptions during client calls, private discussions, and focused tasks.',
      'For most buyers, the practical decision comes down to matching model size to usage pattern: one-person calls, one-person focus, two-person discussions, or small team meetings.',
      '## Why companies compare office pods before buying',
      'Most projects evaluate pod size, expected daily usage, acoustic performance expectations, installation constraints, and budget range before selecting a model.',
      'Comparing these factors early helps avoid mismatch between room capacity, workflow, and final project cost.',
      '## Local delivery and installation context in Malaysia',
      'Delivery and installation planning often includes access route checks, lift or staircase handling, floor protection, and final placement coordination. Projects outside Klang Valley or with restricted access are usually quoted based on actual site conditions.',
      '## Areas we serve',
      'Ace Office Pods supports office pod enquiries, delivery planning, and installation coordination across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur.',
      'Kuala Lumpur areas include KLCC, KL Sentral, Bangsar, Bangsar South, Mont Kiara, Sri Hartamas, TTDI, Cheras, Ampang, Setapak, Wangsa Maju, Kepong, Bukit Jalil, Old Klang Road, and Mid Valley.',
      'Selangor and nearby areas include Petaling Jaya, Shah Alam, Subang Jaya, USJ, Puchong, Cyberjaya, Putrajaya, Damansara, Kota Damansara, Ara Damansara, Tropicana, Sunway, Bandar Sunway, Kelana Jaya, Glenmarie, Klang, Kajang, Seri Kembangan, Balakong, Rawang, Nilai, and Seremban.',
      'Our team can help with model selection, layout planning, delivery coordination, installation, and post-installation support based on the agreed project scope.',
      '## Common buying path',
      '- Define whether the primary use is calls, focused work, or meetings',
      '- Compare model sizes and starting pricing',
      '- Confirm delivery and installation scope',
      '- Finalize options and project timeline',
      '## Helpful next steps',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team](/contact)',
      '[Read FAQs](/faq)',
      '## Further reading',
      '[Office pod prices in Malaysia — full model and cost guide](/articles/office-pod-price-guide-malaysia)',
      '[How to choose an office pod in Malaysia](/articles/how-to-choose-office-pod-malaysia)',
      '[Office pod vs building a room — total cost comparison](/articles/office-pod-vs-building-room-malaysia)'
    ],
    noscriptFaqHeading: 'Common questions about office pods',
    noscriptFaqItems: HOME_FAQ_ITEMS,
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      buildWebsiteSchema(),
      buildHomepageWebPageSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: HOME_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#home-answer`,
        url: canonical,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#home-answer']
        }
      }
    ]
  },
  '/pricing': {
    title: 'Office Pod Pricing in Malaysia | Ace Office Pods',
    description:
      'Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod price Malaysia, office booth price`,
    h1: 'How much does an office pod cost?',
    body: [
      'Ace Uno is the entry model at RM8,850 for the pod only. Standard Klang Valley delivery is RM350 and installation is RM350, making the standard installed total RM9,550 before the optional stool. Meeting pods start from RM22,200.',
      '## Office pod starting prices in Malaysia',
      ...PRICING_LIST_ITEMS.map((item) => `- ${item.name} - From RM${item.price.toLocaleString('en-MY')}`),
      '## What affects the final price?',
      'Final pricing may vary depending on pod model, quantity, delivery location, floor/access conditions, installation scope, optional furniture, finishes, power requirements, and project timeline.',
      '## Bulk and project pricing',
      'Corporate buyers, procurement teams, contractors, interior designers, dealers, resellers, and project buyers can request project pricing or bulk pricing depending on quantity, model mix, location, and installation scope.',
      '## Pricing clarity and scope confirmation',
      'A practical quote typically confirms model, quantity, selected options, delivery area, installation arrangement, and any access constraints before final approval.',
      'This helps teams compare office pods on total project scope instead of headline figures alone.',
      'Service and installation planning are available across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur offices.',
      '## What buyers usually request in pricing comparisons',
      '- Side-by-side model shortlist with starting prices',
      '- Clarification on inclusions in base scope',
      '- Notes for outside Klang Valley or restricted-access handling',
      '- Expected lead time and installation planning assumptions',
      '## Why total scope matters',
      'Two similar model options can still have different final project cost when access route, installation coordination, or selected options vary.',
      'Evaluating total scope early gives procurement, office management, and leadership a more reliable basis for commercial decisions.',
      '## Pricing review workflow for teams',
      'A practical workflow is to shortlist models first, validate use-case fit, then review delivery and installation assumptions before final approval.',
      'This sequence keeps pricing discussions grounded in operational needs rather than headline-only comparison.',
      '## Related planning links',
      '[Compare office pods](/compare-office-pods)',
      '[Read FAQs](/faq)',
      '[Contact our team](/contact)'
    ],
    noscriptFaqHeading: 'Common pricing questions',
    noscriptFaqItems: PRICING_FAQ_ITEMS,
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pod Pricing in Malaysia',
        url: canonical,
        description:
          'Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options.',
        isPartOf: {
          '@id': `${SEO_BASE_URL}/#website`
        },
        publisher: {
          '@id': `${SEO_BASE_URL}/#organization`
        },
        about: {
          '@type': 'Thing',
          name: 'office pod pricing in Malaysia'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pricing',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Office Pod Pricing in Malaysia',
        url: canonical,
        itemListElement: PRICING_LIST_ITEMS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            brand: {
              '@type': 'Brand',
              name: SEO_BRAND_PRIMARY
            },
            category: 'Office pods',
            url: `${SEO_BASE_URL}${item.path}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MYR',
              price: String(item.price),
              url: `${SEO_BASE_URL}${item.path}`,
              seller: {
                '@id': `${SEO_BASE_URL}/#organization`
              }
            }
          }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#office-pod-price-answer`,
        name: 'Office pods price in Malaysia',
        url: canonical,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#office-pod-price-answer']
        },
        mainEntity: {
          '@type': 'Question',
          name: 'How much does an office pod cost in Malaysia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Ace Uno is the entry model at RM8,850 for the pod only. Standard Klang Valley delivery is RM350 and installation is RM350, making the standard installed total RM9,550 before the optional stool. Meeting pods start from RM22,200.'
          }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: PRICING_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  },
  '/office-pods-near-me': {
    title: 'Office Pods Near Me | Klang Valley Showroom',
    description:
      'View office pods by appointment in Klang, with pricing, delivery, and installation support across Klang Valley and West Malaysia.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pods near me, office pods near me Malaysia, office pods Klang Valley, office pods Selangor, office pods Kuala Lumpur`,
    h1: 'Office pods near me',
    body: [
      'Ace Office Pods supplies acoustic office pods and office booths from Klang, Selangor, with showroom viewing by appointment and project support across Klang Valley and West Malaysia.',
      '## Local office pod supply and installation',
      'For near me buyers, the useful question is not only location. It is whether the supplier can handle viewing, model selection, delivery access, installation planning, and support after delivery.',
      '## Contact',
      `Showroom: ${SEO_BRAND_STREET_ADDRESS}, ${SEO_BRAND_POSTAL_CODE} ${SEO_BRAND_SHOWROOM_LOCALITY}, ${SEO_BRAND_SHOWROOM_REGION}. Viewing by appointment.`,
      `Phone / WhatsApp: ${SEO_BRAND_PHONE}`,
      `Email: ${SEO_BRAND_EMAIL}`,
      '## Areas commonly served',
      'Klang, Shah Alam, Petaling Jaya, Subang Jaya, Kuala Lumpur, Puchong, Cyberjaya, and Putrajaya.',
      'Other West Malaysia locations can be quoted based on delivery distance, site access, floor level, lift access, and installation scope.',
      '## Starting prices',
      ...PRICING_LIST_ITEMS.map((item) => `- ${item.name} - From RM${item.price.toLocaleString('en-MY')}`),
      '## Related planning links',
      '[View pricing](/pricing)',
      '[View office pod models](/office-pods)',
      '[Contact our team](/contact)'
    ],
    noscriptFaqHeading: 'Common local questions',
    noscriptFaqItems: [
      {
        question: 'Where can I find office pods near me in Malaysia?',
        answer:
          'Ace Office Pods supplies acoustic office pods and office booths from Klang, Selangor, with delivery and installation planning across Klang Valley and West Malaysia. Showroom viewing is available by appointment.'
      },
      {
        question: 'Can I view an office pod before buying?',
        answer:
          'Yes. Buyers can arrange a showroom viewing in Klang to compare office pod models, check size, review finishes, and understand acoustic performance before confirming a quote.'
      },
      {
        question: 'Do you install office pods near Kuala Lumpur, Selangor, and Klang Valley?',
        answer:
          'Yes. Ace Office Pods supports office pod delivery and installation planning for Kuala Lumpur, Selangor, Klang Valley, and other West Malaysia locations depending on access, quantity, and project scope.'
      },
      {
        question: 'How much do office pods near me cost?',
        answer:
          'Ace Office Pods start from RM8,850 for the Ace Uno pod only. Delivery and installation are itemised separately, and final project pricing depends on the model, quantity, location, access, add-ons, and selected configuration.'
      }
    ],
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      buildWebsiteSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pods Near Me in Klang Valley and Malaysia',
        url: canonical,
        description:
          'Find office pods near you in Malaysia. Ace Office Pods offers showroom viewing by appointment in Klang, with office pod delivery and installation planning across Klang Valley and West Malaysia.',
        isPartOf: {
          '@id': `${SEO_BASE_URL}/#website`
        },
        publisher: {
          '@id': `${SEO_BASE_URL}/#organization`
        },
        mainEntity: {
          '@id': `${SEO_BASE_URL}/#organization`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Office Pods Near Me',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Office Pod Pricing in Malaysia',
        url: canonical,
        itemListElement: PRICING_LIST_ITEMS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            brand: {
              '@type': 'Brand',
              name: SEO_BRAND_PRIMARY
            },
            category: 'Office pods',
            url: `${SEO_BASE_URL}${item.path}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MYR',
              price: String(item.price),
              url: `${SEO_BASE_URL}${item.path}`,
              seller: {
                '@id': `${SEO_BASE_URL}/#organization`
              }
            }
          }
        }))
      }
    ]
  },
  '/office-pods': {
    title: 'Office Pods and Office Booths Malaysia | Ace Office Pods',
    description:
      'Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Compare models by use case, capacity, and price.',
    keywords: `${SEO_KEYWORDS_COMMON}, office booth Malaysia`,
    h1: 'Office pods and office booths for calls, focus, and meetings',
    body: [
      'Ace Office Pods by Ace Workplace Solutions offers acoustic office pods and office booths in Malaysia for private calls, focused work, hybrid meetings, and small team discussions. In workplace planning, “office pods” and “office booths” are often used interchangeably for enclosed acoustic spaces designed for calls, focused work, and small meetings.',
      'Our office booth range includes compact phone-booth style pods, one-person focus pods, two-person discussion pods, and larger meeting pods for team collaboration. These are privacy-focused, sound-reducing solutions for open-plan offices, and acoustic results vary by model and placement.',
      '## Office pod types by use case',
      '- One-person call pod for private calls and short tasks',
      '- One-person focus pod for longer concentrated work',
      '- Two-person discussion pod for quick collaboration',
      '- Team meeting pod for small group sessions',
      '## Compare office pod models',
      '- Ace Uno — 1 person, calls, video meetings, and focused work, pod only from RM8,850',
      '- Ace Plus — 1 person, longer focus and repeated daily calls, unverified first-party approximately 27 dB(A) claim, from RM14,500',
      '- Ace Flex — 1 person, spacious solo work, no published dB rating, from RM19,900',
      '- Ace Flex Duo — 2 people, one-to-one discussions, no published dB rating, from RM23,900',
      '- Ace Meet — 2–4 people, small team meetings, no published dB rating, from RM22,200',
      '- Ace Hub — up to 6 people, larger group collaboration, no published dB rating, from RM27,800',
      'Office pod, office booth, privacy pod, and work pod are overlapping terms for enclosed workspaces. A phone pod or phone booth usually describes a compact one-person model for private calls and focused work. Soundproof office pod claims should be reviewed against the stated acoustic result and the surrounding office conditions.',
      '## What to compare before selecting a model',
      'Compare intended daily usage, team size, available floor space, acoustic expectations, and project budget. This reduces the risk of choosing a pod that is either too small for meetings or oversized for call use.',
      '## Delivery and installation planning in Malaysia',
      'Site access can influence project execution. Teams usually confirm lift access, staircase handling, loading zones, and final placement path before installation day.',
      'Service and installation planning are available across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur offices.',
      '## Commercial review points for office pod buyers',
      'Beyond sizing and appearance, most teams compare operational practicality: expected utilization, support process, and whether the selected pod type still fits future layout changes.',
      'A practical shortlist often combines one-person and meeting-focused models so calls, focused work, and collaboration can be supported without building permanent rooms.',
      '## Procurement scope alignment',
      'For procurement and project stakeholders, clear scope usually includes model selection, selected options, delivery assumptions, installation constraints, and target timeline.',
      'When this scope is confirmed early, supplier comparison becomes clearer and internal approvals are generally faster.',
      '## Proof for commercial comparison',
      'Ace Office Pods supports delivery, installation, and after-sales service in Malaysia. Review completed installations, published pricing, and model-specific acoustic information before finalising a shortlist.',
      '## Related pages',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Compare office phone booth and phone pod options](/office-phone-booth-malaysia)',
      '[View completed installations](/portfolio)',
      '[Review supplier comparison criteria](/articles/office-pod-brands-malaysia-comparison)',
      '[Contact our team](/contact)',
      '[Read FAQs](/faq)'
    ],
    noscriptFaqHeading: 'Common questions about office pods and office booths',
    noscriptFaqItems: OFFICE_PODS_FAQ_ITEMS,
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Office Pods and Office Booths Malaysia',
        url: canonical,
        description:
          'Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Ace Office Pods by Ace Workplace Solutions helps teams choose the right pod by use case, capacity, and project needs.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Office Pods',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: OFFICE_PODS_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Office pod models in Malaysia',
        url: canonical,
        itemListElement: PRICING_LIST_ITEMS.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            brand: { '@type': 'Brand', name: SEO_BRAND_PRIMARY },
            category: 'Office pods',
            url: `${SEO_BASE_URL}${item.path}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MYR',
              price: String(item.price),
              url: `${SEO_BASE_URL}${item.path}`
            }
          }
        }))
      }
    ]
  },
  '/meeting-pods-malaysia': {
    title: 'Meeting Pods Malaysia for 2–6 Pax Teams | Ace Office Pods',
    description:
      'Compare meeting pods in Malaysia for small-team discussions and hybrid calls. Review Ace Meet and Ace Hub with pricing, installation, and support details.',
    keywords: `${SEO_KEYWORDS_COMMON}, meeting pods malaysia, office meeting pod malaysia, 4 person meeting pod, 6 person meeting pod`,
    h1: 'Meeting pods in Malaysia for small-team collaboration',
    body: [
      'Compare meeting pods for 2–6 pax team discussions and hybrid calls.',
      'Review Ace Meet and Ace Hub by team size, practical use case, and pricing factors.',
      '## How teams shortlist meeting pods',
      'Most buyers compare meeting pods by expected participant count, call frequency, discussion style, and available office footprint. A 2–4 pax pod often suits recurring team check-ins, while larger pods support broader collaboration sessions.',
      '## Practical model comparison points',
      '- Typical team size for each model',
      '- Intended use: calls, discussions, or mixed meeting formats',
      '- Starting price and optional configuration impact',
      '- Delivery and installation considerations by site access',
      '## Pricing and project scope notes',
      'Starting prices are useful for first comparison, but final scope often includes selected options, installation requirements, and access logistics. Reviewing total scope early improves budget certainty.',
      '## Malaysia installation context',
      'Projects in Klang Valley commonly include delivery and installation within agreed scope. Outside Klang Valley or restricted-access handling is typically quoted based on site conditions and logistics needs.',
      'Service and installation planning are available across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur offices.',
      '## When to choose different meeting pod sizes',
      'Teams that run short recurring discussions and hybrid calls often prioritize a 2–4 pax format. Teams that need broader internal room for larger sessions usually compare bigger meeting pod configurations.',
      'The best fit depends on actual usage pattern, not only maximum capacity. Reviewing meeting duration, participant turnover, and call frequency helps avoid over-sizing or under-sizing.',
      '## Commercial planning notes',
      'Meeting pod projects are typically reviewed as a full package: model, options, delivery conditions, installation scope, and target handover timing. This helps teams compare offers on readiness and execution clarity.',
      '## Related pages',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team](/contact)',
      '[Read FAQs](/faq)'
    ],
    noscriptFaqHeading: 'Common meeting pod questions',
    noscriptFaqItems: [
      FAQ_PAGE_ITEMS[2],
      FAQ_PAGE_ITEMS[1],
      FAQ_PAGE_ITEMS[5],
      FAQ_PAGE_ITEMS[10]
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Meeting Pods Malaysia for 2–6 Pax Teams',
        url: canonical,
        description:
          'Compare meeting pods in Malaysia for small-team discussions and hybrid calls. Review Ace Meet and Ace Hub with pricing, installation, and support details.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Meeting Pods Malaysia',
            item: canonical
          }
        ]
      }
    ]
  },
  '/office-phone-booth-malaysia': {
    title: 'Office Phone Booth Malaysia for Calls and Focus | Ace Office Pods',
    description:
      'Find enclosed office phone booth solutions in Malaysia for calls and focused work. Compare Ace Uno, Ace Plus, and Ace Flex by space, use case, and pricing.',
    keywords: `${SEO_KEYWORDS_COMMON}, office phone booth malaysia, phone booth office malaysia, call pod malaysia, single person office pod`,
    h1: 'Office phone booth solutions in Malaysia',
    body: [
      'Compare office phone booth style pods, phone pods, and privacy booths for private calls and focused work.',
      'Review Ace Uno, Ace Plus, and Ace Flex by space, use case, and project fit.',
      '## What an office phone booth is used for',
      'A phone booth style office pod is usually selected for private calls, short virtual meetings, and focused individual tasks inside open offices. Teams use these pods to create privacy without building permanent rooms.',
      '## How to compare one-person pod models',
      '- Match model size to expected daily call volume',
      '- Check whether the pod will be used mainly for calls or longer focused work',
      '- Review starting pricing and selected option impact',
      '- Confirm installation access and placement path',
      '## Pricing and setup considerations',
      'Final project pricing can vary based on model, quantity, selected options, and site access conditions. For many offices, confirming delivery and installation details early helps avoid timeline delays.',
      '## Malaysia project context',
      'Office phone booth projects in Klang Valley generally follow a straightforward delivery and installation process when access conditions are confirmed. Additional handling for complex access routes is usually reviewed during quotation.',
      'Service and installation planning are available across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur offices.',
      '## How teams use phone booth pods daily',
      'Phone booth style pods are commonly used for client calls, internal check-ins, and focused tasks that need fewer interruptions than open workstations provide.',
      'Where teams face frequent background noise or high call volume, one-person pods can reduce disruption while keeping larger meeting spaces available for group sessions.',
      '## Phone pod privacy and acoustic performance',
      'A phone pod or office phone booth should be compared using model-specific acoustic information, ventilation, and intended session length—not name alone. Ace publishes an unverified first-party approximately 27 dB(A) claim for Ace Plus only; no verified supporting test document has been provided. Ace Uno and Ace Flex have no published dB rating on this site.',
      '## Buyer comparison notes',
      'A practical comparison includes footprint, comfort for intended session length, and clarity on delivery and installation scope. This reduces late-stage adjustments during implementation.',
      '## Related pages',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[View all office pods](/office-pods)',
      '[How to compare acoustic claims](/articles/office-pod-brands-malaysia-comparison)',
      '[Contact our team](/contact)',
      '[Read FAQs](/faq)'
    ],
    noscriptFaqHeading: 'Common office phone booth questions',
    noscriptFaqItems: [
      FAQ_PAGE_ITEMS[2],
      FAQ_PAGE_ITEMS[1],
      FAQ_PAGE_ITEMS[6],
      FAQ_PAGE_ITEMS[8]
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Phone Booth Malaysia for Calls and Focus',
        url: canonical,
        description:
          'Find enclosed office phone booth solutions in Malaysia for calls and focused work. Compare Ace Uno, Ace Plus, and Ace Flex by space, use case, and pricing.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Office Phone Booth Malaysia',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: [
          ['What is the difference between a phone pod and an office phone booth?', 'The terms are often used interchangeably. Both usually describe a compact enclosed workspace for private calls and focused work; the right choice depends on the model size, ventilation, acoustic performance, and daily usage.'],
          ['Are phone booth pods soundproof?', 'Phone booth pods reduce surrounding noise and improve speech privacy, but they are not automatically completely soundproof. Review the stated acoustic result for the specific model and consider the surrounding office conditions.'],
          ['Which phone pod is best for calls?', 'Ace Uno is the entry one-person acoustic pod for calls, video meetings, and focused work. Ace Plus offers a smaller footprint, while Ace Flex provides more internal room.'],
          ['What affects office phone booth pricing in Malaysia?', 'Final pricing depends on the model, selected options, quantity, delivery location, and site-access conditions for installation.']
        ].map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
      }
    ]
  },
  '/faq': {
    title: 'Office Pod FAQ | Ace Office Pods',
    description:
      'Read direct answers to common office pod buyer questions on pricing, inclusions, installation, and after-sales support.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod FAQ, office booth FAQ`,
    h1: 'Office pod FAQ',
    body: [
      'Direct answers for buyers comparing office pods in Malaysia.',
      'Get clear guidance on pricing, installation, support, and model fit.',
      '## FAQ scope',
      'These FAQs focus on practical buyer questions around pricing, inclusions, model fit, delivery, installation, and post-sales support for office pods in Malaysia.',
      '## Buyer planning checklist',
      '- Compare model type to daily use case',
      '- Confirm what is included in scope',
      '- Review delivery and installation constraints',
      '- Clarify lead time and support process',
      '## Related pages',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team](/contact)',
      '[Read office pod models](/office-pods)'
    ],
    noscriptFaqHeading: 'Office pod frequently asked questions',
    noscriptFaqItems: FAQ_PAGE_ITEMS,
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: FAQ_PAGE_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'FAQ',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#faq-intro`,
        url: canonical,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#faq-intro']
        }
      }
    ]
  },
  '/portfolio': {
    title: 'Office Pod Installations Malaysia | Ace Portfolio',
    description:
      'Explore completed Ace Office Pods projects across Malaysia, including office booth and meeting pod installations for corporate and education workplaces.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod portfolio, office booth installation`,
    h1: 'Past office pod projects across Malaysia',
    body: [
      'Ace Office Pods has completed acoustic pod installations across Malaysia for corporate, financial, education, and logistics clients. All projects are completed by our in-house team with delivery and installation included.',
      '## Completed projects',
      '### Everllence — Kuala Lumpur',
      'Model: Ace Plus. Multi-unit installation for a financial advisory firm in Kuala Lumpur. Pods deployed across an open-plan office floor for private client calls and focused analytical work. Project scope included delivery, installation, and post-install acoustic verification.',
      '### Parker Hannifin — Kuala Lumpur',
      'Model: Ace Flex. One-person pod installation for private calls and focused work.',
      '### Alphabet Capital — Shah Alam',
      'Model: Legacy Ace Solo. One-person office phone booth installation for private calls and focused work.',
      '### CMA CGM — Bangsar, Kuala Lumpur',
      'Model: Legacy Ace Solo. Installation for a global logistics operator at their Malaysia office in Bangsar. Pod deployed for confidential shipping and operations calls in an open-plan office.',
      "### Taylor's College — Subang Jaya",
      "Model: Ace Plus. Installation for Taylor's College Subang Jaya campus. Pod deployed in a student services or administrative area for private advising and support sessions.",
      '## What these projects demonstrate',
      'Installations span single-unit deployments to multi-pod floor plans. Clients across finance, logistics, education, and engineering use Ace Office Pods for call privacy, focused work, and small team meetings within open-plan offices.',
      '## Project planning links',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team](/contact)',
      '[Read FAQs](/faq)'
    ],
    noscriptFaqHeading: 'Common buyer questions',
    noscriptFaqItems: [HOME_FAQ_ITEMS[0], HOME_FAQ_ITEMS[1], HOME_FAQ_ITEMS[5]],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pod Portfolio Malaysia',
        url: canonical,
        description:
          'Explore Ace Office Pods portfolio projects across Malaysia. See past office pod and office booth installations for calls, focused work, and meetings with practical commercial outcomes.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Portfolio',
            item: canonical
          }
        ]
      }
    ]
  },
  '/articles': {
    title: 'Office Pod Articles and Guides | Ace Office Pods',
    description:
      'Browse practical articles on office pods, office booths, phone booths, and meeting pod planning for modern workplaces in Malaysia.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod articles, office booth guide`,
    h1: 'Office pod articles and planning guides',
    body: [
      'Explore practical guidance on office pods and office booths, including use-case planning, sizing, and workspace fit.',
      'Read topic-specific articles to shortlist the right pod setup for calls, focused work, and team collaboration.',
      '## All office pod articles',
      ...ARTICLES.map((article) => `[${article.title}](/articles/${article.slug})`)
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Office Pod Articles and Guides',
        url: canonical,
        description:
          'Browse practical articles on office pods, office booths, phone booths, and meeting pod planning for modern workplaces in Malaysia.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Articles',
            item: canonical
          }
        ]
      }
    ]
  },
  '/compare-office-pods': {
    title: 'Compare Office Pod Prices, Installation & Support',
    description:
      'Compare office pods beyond headline price. Review installation, support, warranty coverage, and office-fit considerations before buying.',
    keywords: `${SEO_KEYWORDS_COMMON}, compare office pods, office booth comparison`,
    h1: 'Compare office pods by price, installation, and support',
    body: [
      'Compare models beyond headline pricing with practical buying factors in one view.',
      'Review installation, support, and office fit before making a final decision.',
      '## Office pod model comparison',
      '- Ace Uno — 1 pax, 1418 × 1018 mm, pod only from RM8,850 — best for calls, video meetings, and focus',
      '- Ace Plus — 1 pax, 1000 × 1000 mm, from RM14,500 — best for extended daily use; unverified first-party approximately 27 dB(A) claim',
      '- Ace Flex — 1 pax, 1600 × 1200 mm, from RM19,900 — best for spacious solo work',
      '- Ace Flex Duo — 2 pax, 1600 × 1200 mm, from RM23,900 — best for one-to-one discussions',
      '- Ace Meet — 2–4 pax, 2200 × 1200 mm, from RM22,200 — best for small team meetings',
      '- Ace Hub — up to 6 pax, 2200 × 1500 mm, from RM27,800 — best for larger group collaboration',
      '## Price comparison beyond headline numbers',
      'A meaningful comparison should include model suitability, selected options, delivery assumptions, and installation requirements. Headline pricing alone can hide project differences that matter during execution.',
      '## What procurement teams usually compare',
      '- Intended daily use: calls, focused work, or meetings',
      '- Model capacity and internal comfort for the expected use',
      '- Delivery and installation requirements by location',
      '- Post-sales support and response expectations',
      '## Installation and support impact',
      'Installation planning affects timeline and final project experience. Support terms affect long-term usability after handover. Comparing these items early improves decision quality.',
      '## Practical framework for comparison discussions',
      'A straightforward framework helps teams align quickly: define use case, shortlist model sizes, compare scope assumptions, and validate installation constraints.',
      'This structure reduces uncertainty during procurement review because each option is assessed against the same criteria.',
      '## Why this matters in Malaysia projects',
      'Building access and installation coordination can vary by office location. Including these factors in early comparison helps reduce timeline and scope surprises.',
      '## Related pages',
      '[View pricing](/pricing)',
      '[Read FAQs](/faq)',
      '[Contact our team](/contact)',
      '[View office pod models](/office-pods)'
    ],
    noscriptFaqHeading: 'Common comparison questions',
    noscriptFaqItems: [HOME_FAQ_ITEMS[0], HOME_FAQ_ITEMS[1], HOME_FAQ_ITEMS[3], HOME_FAQ_ITEMS[5]],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Compare Office Pods by Price, Installation and Support',
        url: canonical,
        description:
          'Compare office pods beyond headline price. Review installation, support, warranty coverage, and office-fit considerations before buying.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Compare Office Pods',
            item: canonical
          }
        ]
      }
    ]
  },
  '/contact': {
    title: 'Contact Ace Office Pods | WhatsApp, Email, and Sales Support',
    description: 'Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries via WhatsApp, email, or phone in Malaysia.',
    keywords: `${SEO_KEYWORDS_COMMON}, contact Ace Office Pods, office pod sales enquiry`,
    h1: 'Contact Ace Office Pods',
    body: [
      'Contact Ace Office Pods by Ace Workplace Solutions for office pod enquiries, model guidance, and quote support.',
      'Reach our team by WhatsApp, email, or phone.',
      '## Showroom',
      `Address: ${SEO_BRAND_STREET_ADDRESS}, ${SEO_BRAND_POSTAL_CODE} ${SEO_BRAND_SHOWROOM_LOCALITY}, ${SEO_BRAND_SHOWROOM_REGION}`,
      'Hours: Mon–Fri, 9am–6pm (showroom by appointment)',
      'Showroom viewing is available by appointment. Buyers can compare office pod size, finish, comfort, and acoustic performance before confirming a quote.',
      '## What to prepare before contacting sales',
      'Sharing your office location, expected pod usage, and preferred model shortlist helps the team provide a more accurate recommendation and quotation scope.',
      '## Typical enquiry topics',
      '- Model comparison by use case',
      '- Starting price and option planning',
      '- Delivery and installation scope',
      '- Lead time and project scheduling',
      '## Areas we serve',
      'Ace Office Pods supports office pod enquiries, delivery planning, and installation coordination across Malaysia, with a focus on Klang Valley and Greater Kuala Lumpur.',
      'Kuala Lumpur areas include KLCC, KL Sentral, Bangsar, Bangsar South, Mont Kiara, Sri Hartamas, TTDI, Cheras, Ampang, Setapak, Wangsa Maju, Kepong, Bukit Jalil, Old Klang Road, and Mid Valley.',
      'Selangor and nearby areas include Petaling Jaya, Shah Alam, Subang Jaya, USJ, Puchong, Cyberjaya, Putrajaya, Damansara, Kota Damansara, Ara Damansara, Tropicana, Sunway, Bandar Sunway, Kelana Jaya, Glenmarie, Klang, Kajang, Seri Kembangan, Balakong, Rawang, Nilai, and Seremban.',
      'Our team can help with model selection, layout planning, delivery coordination, installation, and post-installation support based on the agreed project scope.',
      '## Related planning links',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Read FAQs](/faq)',
      '[View office pod models](/office-pods)'
    ],
    noscriptFaqHeading: 'Common pre-sales questions',
    noscriptFaqItems: [HOME_FAQ_ITEMS[0], HOME_FAQ_ITEMS[1], FAQ_PAGE_ITEMS[10]],
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Ace Office Pods',
        url: canonical,
        description: 'Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries via WhatsApp, email, or phone in Malaysia.',
        isPartOf: {
          '@id': `${SEO_BASE_URL}/#website`
        },
        about: {
          '@id': `${SEO_BASE_URL}/#organization`
        },
        mainEntity: {
          '@id': `${SEO_BASE_URL}/#organization`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact',
            item: canonical
          }
        ]
      }
    ]
  },
  '/installation-support': {
    title: 'Office Pod Delivery, Installation and Support | Ace Office Pods',
    description:
      'See what to expect from site review to handover with clear lead times, installation planning, and after-sales support for office pod projects.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod installation, office booth delivery`,
    h1: 'Office pod delivery, installation, and support',
    body: [
      'Understand each project stage from needs review and site check to final handover.',
      'Plan with clear lead times, installation coordination, and after-sales support.',
      '## How office pod installation works',
      '1. Consultation and site assessment — model options are matched to space and access requirements',
      '2. Quotation and order confirmation — a transparent scope and cost breakdown is issued, 50% deposit starts production',
      '3. Production and scheduling — units are built to specification while delivery timing is coordinated',
      '4. Delivery and installation — the Ace team assembles the pod on-site within the agreed timeline',
      '5. Handover and support — usage walkthrough provided, after-sales contact path established'
    ],
    noscriptFaqHeading: 'Installation questions',
    noscriptFaqItems: INSTALLATION_FAQ_ITEMS,
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pod Delivery, Installation and Support',
        url: canonical,
        description:
          'See what to expect from site review to handover with clear lead times, installation planning, and after-sales support for office pod projects.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How office pod installation works',
        description: 'The step-by-step process for purchasing and installing an Ace Office Pod, from initial consultation to post-delivery support.',
        url: canonical,
        totalTime: 'P6W',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Consultation and Assessment',
            text: 'From enquiry to viewing and assessment, we align pod fit with your workspace needs.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Model options are matched to space, team size, and budget.' },
              { '@type': 'HowToDirection', text: 'Access routes and placement zones are reviewed upfront.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Quotation and Confirmation',
            text: 'Once specifications are finalized, we issue a clear quote and confirm the order.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'A detailed cost and scope breakdown is provided.' },
              { '@type': 'HowToDirection', text: 'A 50% deposit starts production and project scheduling.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Production and Scheduling',
            text: 'Pods enter production while delivery timing is coordinated with your team.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Units are built to the approved project specification.' },
              { '@type': 'HowToDirection', text: 'Delivery windows are arranged to reduce office disruption.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Delivery and Installation',
            text: 'On the confirmed date, our team delivers and assembles the pod on site.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Setup is handled by trained installation personnel.' },
              { '@type': 'HowToDirection', text: 'Installation is completed according to the planned timeline.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Handover and Support',
            text: 'We walk through pod use so your team can start confidently from day one.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Ventilation, lighting, and usage guidance are explained clearly.' },
              { '@type': 'HowToDirection', text: 'After-sales support remains available after handover.' }
            ]
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Installation and Support',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: INSTALLATION_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  },
  '/pod-relocation': {
    title: 'Office Pod Relocation Service Malaysia | Ace Office Pods',
    description:
      'Moving offices? See how Ace relocates office pods — site assessment, dismantling, transport, reinstallation, and post-move inspection, with a written quote.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod relocation, move office pod, relocate meeting pod`,
    h1: 'Office pod relocation, done properly',
    body: [
      "Moving offices doesn't mean leaving your pod behind. Every Ace Office Pod is modular by design and can be dismantled, transported, and reinstalled at a new location.",
      'See what is checked before handover and how relocation is quoted.',
      '## How pod relocation works',
      '1. Site assessment and quote — access at both the pickup and destination sites is reviewed before a written quote is issued',
      '2. Dismantling — the pod is carefully dismantled, protecting panels, glazing, door hardware, and acoustic seals',
      '3. Transport and reinstallation — components are transported and reassembled to the original specification',
      '4. Inspection and handover — panel fit, glass and door alignment, acoustic seals, ventilation, and power are checked before handover'
    ],
    noscriptFaqHeading: 'Pod relocation questions',
    noscriptFaqItems: RELOCATION_FAQ_ITEMS,
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pod Relocation Service Malaysia',
        url: canonical,
        description:
          'Moving offices? See how Ace relocates office pods — site assessment, dismantling, transport, reinstallation, and post-move inspection, with a written quote.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How office pod relocation works',
        description: 'The step-by-step process for relocating an Ace Office Pod to a new office location, from site assessment to post-move inspection.',
        url: canonical,
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Site Assessment & Quote',
            text: 'Access at both the pickup and destination locations is reviewed before a written quote is issued.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Access, distance, and placement are confirmed at both locations.' },
              { '@type': 'HowToDirection', text: 'Relocation cost is confirmed in writing before work begins.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Dismantling',
            text: 'The Ace installation team dismantles the pod at its current location, protecting panels, glazing, door hardware, and acoustic seals.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'The same team that installs new pods handles disassembly.' },
              { '@type': 'HowToDirection', text: 'Glass, door mechanisms, and acoustic seals are protected for transport.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Transport & Reinstallation',
            text: 'Components are transported to the new site and reassembled following the original specification.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'Panels and hardware are handled the same way as new production units.' },
              { '@type': 'HowToDirection', text: 'The pod is rebuilt following its original configuration and finish.' }
            ]
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Inspection & Handover',
            text: 'Panel fit, glass and door alignment, acoustic seals, ventilation, lighting, and power are checked before handover.',
            itemListElement: [
              { '@type': 'HowToDirection', text: 'A full post-move check is completed before handover.' },
              { '@type': 'HowToDirection', text: 'Any warranty implications of the move are confirmed in writing.' }
            ]
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pod Relocation',
            item: canonical
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url: canonical,
        mainEntity: RELOCATION_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  },
  '/about': {
    title: 'About Ace Office Pods | Ace Workplace Solutions',
    description: 'Learn about Ace Office Pods by Ace Workplace Solutions, our Klang showroom, West Malaysia service area, and approach to clear product information.',
    h1: 'About Ace Office Pods',
    body: [
      'Ace Office Pods is operated by ACE WORKPLACE SOLUTIONS (registration no. 202403171118), a Malaysian supplier of enclosed office pods for calls, focused work, interviews, and small meetings.',
      '## Company and service details',
      'The Ace showroom is in Klang, Selangor, with visits by appointment. Delivery and installation enquiries are supported across Klang Valley and West Malaysia, with project scope confirmed in the quotation.',
      '## What we supply',
      'The Ace range covers one-person call and focus pods, two-person pods, and meeting pods for small teams. Product pages state the intended use, starting price, and available model-specific specifications.',
      '[View the office pod range](/office-pods)',
      '[See starting prices](/pricing)',
      '## How we handle product claims',
      'Acoustic performance and other technical claims are treated as model-specific. A claim shown for one pod is not automatically applied to another. Where supporting test documentation has not been recorded, the website labels the claim as unverified instead of presenting it as independently certified.',
      'Prices shown online are starting or stated-scope prices. Delivery, installation, access constraints, optional items, and outstation work are confirmed in the written quotation.',
      '[Read the editorial and product information policy](/editorial-policy)',
      '[Contact Ace Office Pods](/contact)'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Ace Office Pods',
        url: canonical,
        dateModified: '2026-08-08',
        isPartOf: { '@id': `${SEO_BASE_URL}/#website` },
        about: { '@id': `${SEO_BASE_URL}/#organization` }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: canonical }
        ]
      }
    ]
  },
  '/editorial-policy': {
    title: 'Editorial & Product Information Policy | Ace Office Pods',
    description: 'How Ace Office Pods reviews product facts, pricing scope, evidence, article sources, updates, and corrections.',
    h1: 'Editorial and product information policy',
    body: [
      'This policy explains how Ace Office Pods handles product facts, pricing, evidence, articles, and corrections on aceofficepods.com.',
      '## Who publishes the website',
      'Product pages and articles are published by the Ace Office Pods team at Ace Workplace Solutions. The content is commercial information about Ace products and services.',
      '## Product facts and evidence',
      'We use model-specific product records for dimensions, capacity, included features, starting prices, and technical claims. A claim for one model is not treated as evidence for another model. If supporting documentation has not been recorded, the website labels the claim as unverified or avoids presenting it as independently certified.',
      '## Prices and quotations',
      'Online prices are starting prices or prices for the scope stated on the relevant page. A written project quotation is the controlling commercial reference.',
      '## Articles and external sources',
      'When an article relies on external research, regulations, standards, or third-party technical information, the relevant source should be linked or named. Commercial opinion and model-specific first-party claims should not be presented as independent evidence.',
      '## Review and corrections',
      'Pages are updated when product data, prices, evidence status, or service information changes. To report an error, email sales@aceofficepods.com with the page URL and statement to review.',
      '[About Ace Office Pods](/about)',
      '[Browse articles](/articles)',
      '[Contact us](/contact)'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ace Office Pods Editorial and Product Information Policy',
        url: canonical,
        dateModified: '2026-08-08',
        isPartOf: { '@id': `${SEO_BASE_URL}/#website` },
        publisher: { '@id': `${SEO_BASE_URL}/#organization` }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: canonical }
        ]
      }
    ]
  },
  '/privacy': {
    title: 'Privacy Policy | Ace Office Pods',
    description: 'Privacy policy for aceofficepods.com under Malaysia\'s Personal Data Protection Act 2010.',
    robots: 'noindex, follow',
    h1: 'Privacy Policy',
    body: [
      'This policy explains how Ace Workplace Solutions collects, uses, and protects personal data in accordance with the Personal Data Protection Act 2010 (Malaysia).',
      'We collect enquiry and contact data only to respond to your questions and manage projects. We do not sell personal data to third parties.',
      'Contact: sales@aceofficepods.com'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: canonical
      }
    ]
  },
  '/terms': {
    title: 'Terms of Use | Ace Office Pods',
    description: 'Terms of use for aceofficepods.com covering acceptable use, pricing information, limitation of liability, and governing law under Malaysia.',
    robots: 'noindex, follow',
    h1: 'Terms of Use',
    body: [
      'By using aceofficepods.com you agree to these terms. This website is operated by Ace Workplace Solutions (registration no. 202403171118).',
      'Product descriptions and pricing are for reference only. Final pricing depends on model, quantity, delivery location, and installation scope.',
      'These terms are governed by the laws of Malaysia.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Use',
        url: canonical
      }
    ]
  },
  '/locations': {
    title: 'Office Pod Delivery Locations in Malaysia',
    description:
      'Explore Ace Office Pods delivery and installation locations with completed projects in Kuala Lumpur, Shah Alam, and Subang Jaya, plus delivery to Penang and Johor Bahru.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pods Kuala Lumpur, office pods Shah Alam, office pods Subang Jaya, office pods Penang, office pods Johor Bahru`,
    h1: 'Office pod delivery locations',
    body: [
      'Explore areas where Ace Office Pods has completed customer installations. Each location page uses real project examples to show the pod models delivered and the local installation context.',
      '## Kuala Lumpur',
      'Completed projects for Everllence, Parker Hannifin, and CMA CGM in Bangsar.',
      '[View office pod projects in Kuala Lumpur](/locations/kuala-lumpur)',
      '## Shah Alam',
      'Completed legacy Ace Solo installation for Alphabet Capital.',
      '[View office pod projects in Shah Alam](/locations/shah-alam)',
      '## Subang Jaya',
      "Completed Ace Plus installation for Taylor's College.",
      '[View office pod projects in Subang Jaya](/locations/subang-jaya)',
      '## Penang',
      'Office pod supply and delivery available for Penang Island and Seberang Perai workplaces. No completed project listed yet — contact us for a Penang project quote.',
      '[View office pods in Penang](/locations/penang)',
      '## Johor Bahru',
      'Office pod supply and delivery available for Johor Bahru workplaces. No completed project listed yet — contact us for a JB project quote.',
      '[View office pods in Johor Bahru](/locations/johor-bahru)',
      '## Showroom in Klang',
      'These are delivery and installation areas, not separate Ace branches. The physical showroom remains in Klang, Selangor, with viewing available by appointment.'
    ],
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Office Pod Delivery Locations',
        url: canonical,
        description: 'Office pod delivery and installation locations supported by completed Ace Office Pods projects in Klang Valley.',
        isPartOf: {
          '@id': `${SEO_BASE_URL}/#website`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SEO_BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Locations',
            item: canonical
          }
        ]
      }
    ]
  },
  '/locations/penang': {
    title: 'Office Pods Penang | Delivery & Installation',
    description: 'Office pods in Penang — acoustic phone booths and meeting pods for George Town and Bayan Lepas workplaces. Compare models, pricing, delivery lead times, and installation support.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pods Penang, office pod George Town, soundproof pod Penang, meeting pod Penang`,
    h1: 'Office pods in Penang',
    body: [
      'Ace Office Pods supplies and delivers acoustic office pods and phone booths to Penang workplaces.',
      'Our range covers one-person focus pods and phone booths through to four and six-person meeting pods, with delivery and installation coordination available for Penang Island and Seberang Perai sites.',
      '## Models available for Penang delivery',
      'All six Ace Office Pod models are available — Ace Uno (pod only from RM8,850), Ace Plus (from RM14,500), Ace Flex (from RM19,900), Ace Flex Duo (from RM23,900), Ace Meet (from RM22,200), and Ace Hub (from RM27,800).',
      '## Delivery and installation planning',
      'Penang deliveries are planned around site access, loading arrangements, floor level, lift or staircase clearance, and installation timing. Our team confirms these details as part of the project scope before delivery.',
      '## Areas served in Penang',
      'Ace Office Pods delivers to offices across Penang including George Town, Bayan Lepas, Bukit Mertajam, Butterworth, Penang Hill area, and surrounding commercial areas on Penang Island and Seberang Perai.',
      '## Frequently asked questions',
      'How much does an office pod cost in Penang? Ace office pods start from RM8,850 for the Ace Uno pod only. Delivery and installation depend on location, quantity, options, and site requirements.',
      'How long does delivery to Penang take? Standard lead time is approximately 3 to 6 working weeks from order confirmation. Penang logistics are confirmed with the quotation.',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team for a Penang quote](/contact)'
    ],
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Office pod delivery and installation in Penang',
        url: canonical,
        description: 'Ace Office Pods supplies acoustic office pods and phone booths to Penang workplaces with delivery and installation coordination.',
        provider: { '@id': `${SEO_BASE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Penang' },
        serviceType: ['Office pod supply', 'Office pod delivery', 'Office pod installation']
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you deliver and install office pods in Penang?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ace Office Pods supplies and coordinates delivery and installation for Penang office projects on both Penang Island and Seberang Perai. Delivery lead time and logistics are confirmed as part of the project scope.' }
          },
          {
            '@type': 'Question',
            name: 'How much does an office pod cost in Penang?',
            acceptedAnswer: { '@type': 'Answer', text: 'Ace office pods start from RM8,850 for the Ace Uno pod only. Delivery and installation depend on model, quantity, options, delivery distance, and site requirements.' }
          },
          {
            '@type': 'Question',
            name: 'How long does delivery to Penang take?',
            acceptedAnswer: { '@type': 'Answer', text: 'Standard lead time is approximately 3 to 6 working weeks from order confirmation. Penang delivery logistics are confirmed with the quotation.' }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#location-penang-answer`,
        url: canonical,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#location-penang-answer']
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SEO_BASE_URL}/locations` },
          { '@type': 'ListItem', position: 3, name: 'Penang', item: canonical }
        ]
      }
    ]
  },
  '/locations/johor-bahru': {
    title: 'Office Pods Johor Bahru | Delivery & Installation',
    description: 'Office pods in Johor Bahru — acoustic phone booths and meeting pods for JB workplaces. Compare models, pricing, delivery lead times, and installation support.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pods Johor Bahru, office pod JB, soundproof pod Johor, meeting pod Johor Bahru`,
    h1: 'Office pods in Johor Bahru',
    body: [
      'Ace Office Pods supplies and delivers acoustic office pods and phone booths to Johor Bahru workplaces.',
      'Our range covers one-person focus pods and phone booths through to four and six-person meeting pods, with delivery and installation coordination available for JB sites.',
      '## Models available for Johor Bahru delivery',
      'All six Ace Office Pod models are available — Ace Uno (pod only from RM8,850), Ace Plus (from RM14,500), Ace Flex (from RM19,900), Ace Flex Duo (from RM23,900), Ace Meet (from RM22,200), and Ace Hub (from RM27,800).',
      '## Delivery and installation planning',
      'Johor Bahru deliveries are planned around site access, loading arrangements, floor level, lift or staircase clearance, and installation timing. Our team confirms these details as part of the project scope before delivery.',
      '## Areas served in Johor Bahru',
      'Ace Office Pods delivers to offices across Johor Bahru including the city centre, Iskandar Puteri, Medini, Bukit Indah, Johor Jaya, and surrounding commercial areas.',
      '## Frequently asked questions',
      'How much does an office pod cost in Johor Bahru? Ace office pods start from RM8,850 for the Ace Uno pod only. Delivery and installation depend on location, quantity, options, and site requirements.',
      'How long does delivery to JB take? Standard lead time is approximately 3 to 6 working weeks from order confirmation. Johor Bahru logistics are confirmed with the quotation.',
      '[View pricing](/pricing)',
      '[Compare office pods](/compare-office-pods)',
      '[Contact our team for a JB quote](/contact)'
    ],
    schemas: (canonical) => [
      buildLocalBusinessSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Office pod delivery and installation in Johor Bahru',
        url: canonical,
        description: 'Ace Office Pods supplies acoustic office pods and phone booths to Johor Bahru workplaces with delivery and installation coordination.',
        provider: { '@id': `${SEO_BASE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Johor Bahru' },
        serviceType: ['Office pod supply', 'Office pod delivery', 'Office pod installation']
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do you deliver and install office pods in Johor Bahru?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ace Office Pods supplies and coordinates delivery and installation for Johor Bahru office projects. Delivery lead time and logistics are confirmed as part of the project scope.' }
          },
          {
            '@type': 'Question',
            name: 'How much does an office pod cost in Johor Bahru?',
            acceptedAnswer: { '@type': 'Answer', text: 'Ace office pods start from RM8,850 for the Ace Uno pod only. Delivery and installation depend on model, quantity, options, delivery distance, and site requirements.' }
          },
          {
            '@type': 'Question',
            name: 'How long does delivery to Johor Bahru take?',
            acceptedAnswer: { '@type': 'Answer', text: 'Standard lead time is approximately 3 to 6 working weeks from order confirmation. Johor Bahru delivery logistics are confirmed with the quotation.' }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonical}#location-johor-bahru-answer`,
        url: canonical,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#location-johor-bahru-answer']
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SEO_BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SEO_BASE_URL}/locations` },
          { '@type': 'ListItem', position: 3, name: 'Johor Bahru', item: canonical }
        ]
      }
    ]
  },
  '/office-chairs': {
    title: 'Office Chairs | Ace Office Pods',
    description: 'Office chair collection from Ace Office Pods is coming soon. Contact our team for updates and early project support.',
    robots: 'noindex, follow',
    keywords: `${SEO_KEYWORDS_COMMON}, office chairs`,
    h1: 'Office chairs',
    body: ['Office chair collection from Ace Office Pods is coming soon.', 'Contact our team for updates and early project support.'],
    schemas: []
  }
};

const resolveOutputPath = (route) => {
  if (route === '/') {
    return path.resolve(process.cwd(), 'dist/index.html');
  }
  return path.resolve(process.cwd(), `dist${route}/index.html`);
};

const formatRM = (amount) => `RM${amount.toLocaleString('en-MY')}`;

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderInlineHtml = (text) => {
  const value = String(text);
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let output = '';
  let match;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > lastIndex) {
      output += escapeHtml(value.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      output += `<strong>${escapeHtml(token.slice(2, -2))}</strong>`;
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        output += `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`;
      } else {
        output += escapeHtml(token);
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < value.length) {
    output += escapeHtml(value.slice(lastIndex));
  }

  return output;
};

const renderStructuredBodyHtml = (body = []) => {
  const lines = Array.isArray(body) ? body.map((line) => String(line)) : [];
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith('## ')) {
      blocks.push(`<h2>${renderInlineHtml(line.slice(3))}</h2>`);
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(`<h3>${renderInlineHtml(line.slice(4))}</h3>`);
      index += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (index < lines.length && lines[index].startsWith('- ')) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(`<ul>${items.map((item) => `<li>${renderInlineHtml(item)}</li>`).join('')}</ul>`);
      continue;
    }

    const isTableHeader = line.startsWith('|') && line.endsWith('|');
    const isSeparator = index + 1 < lines.length && /^\|[-\s|:]+\|$/.test(lines[index + 1]);
    if (isTableHeader && isSeparator) {
      const headerCells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());
      index += 2;

      const rows = [];
      while (index < lines.length && lines[index].startsWith('|') && lines[index].endsWith('|')) {
        rows.push(
          lines[index]
            .split('|')
            .slice(1, -1)
            .map((cell) => cell.trim())
        );
        index += 1;
      }

      const thead = `<thead><tr>${headerCells.map((cell) => `<th>${renderInlineHtml(cell)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows
        .map((row) => `<tr>${row.map((cell) => `<td>${renderInlineHtml(cell)}</td>`).join('')}</tr>`)
        .join('')}</tbody>`;
      blocks.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    blocks.push(`<p>${renderInlineHtml(line)}</p>`);
    index += 1;
  }

  return blocks.join('');
};

const buildFallbackBody = ({ h1, body = [], noscriptFaqHeading, noscriptFaqItems = [] }) => {
  const structuredBody = renderStructuredBodyHtml(body);
  const faqBlock =
    noscriptFaqHeading && noscriptFaqItems.length
      ? `<section><h2>${escapeHtml(noscriptFaqHeading)}</h2>${noscriptFaqItems
          .map((item) => `<article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`)
          .join('')}</section>`
      : '';
  const navigation = `<nav aria-label="Site navigation"><h2>Explore Ace Office Pods</h2><ul>${PRERENDER_NAV_LINKS
    .map(([label, href]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
    .join('')}</ul></nav>`;
  return `<main><section><h1>${escapeHtml(h1)}</h1><p>${escapeHtml(NOSCRIPT_BRAND_OWNERSHIP_TEXT)}</p>${structuredBody}</section>${faqBlock}${navigation}</main>`;
};

const injectSeoHtml = (html, route, meta) => {
  const canonical = `${SEO_BASE_URL}${route}`;
  const robots = meta.robots || 'index, follow';
  const keywords = meta.keywords || '';
  const routeSchemas = typeof meta.schemas === 'function' ? meta.schemas(canonical) : meta.schemas || [];
  const schemas = [...routeSchemas];
  const hasSchemaType = (schema, type) => {
    const schemaType = schema['@type'];
    return Array.isArray(schemaType) ? schemaType.includes(type) : schemaType === type;
  };
  if (!schemas.some((schema) => hasSchemaType(schema, 'Organization'))) {
    schemas.unshift(buildOrganizationSchema());
  }
  if (!schemas.some((schema) => hasSchemaType(schema, 'WebSite'))) {
    schemas.unshift(buildWebsiteSchema());
  }
  const schemaScripts = schemas
    .map((schemaObject) => `    <script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schemaObject)}</script>`)
    .join('\n');

  // Strip previously injected tags first so re-running prerender on already-processed HTML is idempotent.
  let output = html
    .replace(/\s*<meta property="og:image"[^>]*\/>/g, '')
    .replace(/\s*<meta name="twitter:image"[^>]*\/>/g, '')
    .replace(/<div id="root">[\s\S]*?<\/main><\/div>/, '<div id="root"></div>')
    .replace(/\s*<noscript><main>[\s\S]*?<\/main><\/noscript>\n?/, '');

  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  const fontPreloadHint = PRELOAD_FONT_400
    ? `    <link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${PRELOAD_FONT_400}" />\n`
    : '';
  const heroPreloadHint = route === '/' && PRELOAD_HERO_AVIF
    ? `    <link rel="preload" as="image" type="image/avif" href="/assets/${PRELOAD_HERO_AVIF}" fetchpriority="high" />\n`
    : '';

  output = output.replace(
    '</head>',
    `${fontPreloadHint}` +
      `${heroPreloadHint}` +
      `    <meta name="description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta name="robots" content="${escapeHtml(robots)}" />\n` +
      `${keywords ? `    <meta name="keywords" content="${escapeHtml(keywords)}" />\n` : ''}` +
      `    <meta property="og:type" content="${escapeHtml(meta.ogType || 'website')}" />\n` +
      `${meta.ogPublishedTime ? `    <meta property="article:published_time" content="${escapeHtml(meta.ogPublishedTime)}" />\n` : ''}` +
      `    <meta property="og:title" content="${escapeHtml(meta.title)}" />\n` +
      `    <meta property="og:description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta property="og:url" content="${canonical}" />\n` +
      `    <meta property="og:image" content="${escapeHtml(meta.ogImage || DEFAULT_OG_IMAGE)}" />\n` +
      `    <meta name="twitter:card" content="summary_large_image" />\n` +
      `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />\n` +
      `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta name="twitter:image" content="${escapeHtml(meta.ogImage || DEFAULT_OG_IMAGE)}" />\n` +
      `    <link rel="canonical" href="${canonical}" />\n` +
      `${schemaScripts ? `${schemaScripts}\n` : ''}` +
      '  </head>'
  );

  const prerenderBody = buildFallbackBody(meta);
  // Inject into #root so static HTML parsers (AEO tools, ChatGPT Browse, Perplexity) see real content.
  // React's createRoot().render() replaces this when JS loads — no hydration config needed.
  output = output.replace('<div id="root"></div>', `<div id="root">${prerenderBody}</div>`);
  // Avoid duplicating the complete crawlable fallback in both #root and noscript.
  output = output.replace(
    '</body>',
    '    <noscript><p>JavaScript is required to use the interactive product configurator.</p></noscript>\n  </body>'
  );

  return output;
};

const buildProductPrerenderMeta = (route, productMeta) => {
const slug = route.split('/').pop();
const sharedMeta = getProductMeta(productMeta);
return ({
  title: sharedMeta.title,
  description: sharedMeta.description,
  ogImage: `${SEO_BASE_URL}${getProductPublicImage(slug)}`,
  keywords: `${SEO_KEYWORDS_COMMON}, ${productMeta.name}, ${route.split('/').pop().replaceAll('-', ' ')}`,
  h1: productMeta.name,
  body: [
    `Starting from ${formatRM(productMeta.startingPrice)}${productMeta.priceBasis === 'pod only' ? ' for the pod only' : ''}`,
    productMeta.shortDesc,
    ...(productMeta.useCases ?? []),
    ...(productMeta.schemaProperties?.map((p) => `${p.name}: ${p.value}`) ?? [])
  ],
  ...(productMeta.faqItems?.length
    ? { noscriptFaqHeading: `Common questions about ${productMeta.name}`, noscriptFaqItems: productMeta.faqItems }
    : {}),
  schemas: (canonical) => [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productMeta.name,
      brand: {
        '@type': 'Brand',
        name: SEO_BRAND_PRIMARY
      },
      description: productMeta.shortDesc,
      image: [`${SEO_BASE_URL}${getProductPublicImage(slug)}`],
      url: canonical,
      ...(productMeta.schemaProperties?.length
        ? {
            additionalProperty: productMeta.schemaProperties
              .filter((property) => property?.name && property?.value)
              .map((property) => ({
                '@type': 'PropertyValue',
                name: property.name,
                value: property.value
              }))
          }
        : {}),
      offers: {
        '@type': 'Offer',
        price: String(productMeta.startingPrice),
        priceCurrency: 'MYR',
        itemCondition: 'https://schema.org/NewCondition',
        url: canonical,
        seller: {
          '@id': `${SEO_BASE_URL}/#organization`
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SEO_BASE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Ace Pods',
          item: `${SEO_BASE_URL}/office-pods`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: productMeta.name,
          item: canonical
        }
      ]
    },
    ...(productMeta.faqItems?.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          url: canonical,
          mainEntity: productMeta.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
          }))
        }]
      : []),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#${slug}-answer`,
      url: canonical,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [`#${slug}-answer`]
      }
    }
  ]
});
};

const extractArticleFaqs = (content) => {
  const faqs = [];
  let inFaqSection = false;
  let currentQuestion = null;
  const currentAnswerParts = [];

  for (const line of content) {
    if (typeof line !== 'string') continue;
    if (/^##\s+frequently asked questions/i.test(line)) {
      inFaqSection = true;
      continue;
    }
    if (!inFaqSection) continue;
    if (/^##\s+/.test(line) && !/^##\s+frequently/i.test(line)) {
      if (currentQuestion && currentAnswerParts.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswerParts.join(' ') });
        currentAnswerParts.length = 0;
        currentQuestion = null;
      }
      break;
    }
    if (/^###\s+/.test(line)) {
      if (currentQuestion && currentAnswerParts.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswerParts.join(' ') });
        currentAnswerParts.length = 0;
      }
      currentQuestion = line.replace(/^###\s+/, '').trim();
    } else if (currentQuestion && line.trim()) {
      currentAnswerParts.push(line.trim());
    }
  }
  if (currentQuestion && currentAnswerParts.length) {
    faqs.push({ question: currentQuestion, answer: currentAnswerParts.join(' ') });
  }
  return faqs;
};

const buildArticlePrerenderMeta = (route, articleMeta) => {
  const faqItems = extractArticleFaqs(articleMeta.content);
  const relatedArticles = getRelatedArticles(ARTICLES, articleMeta.slug);
  const articleImage = `${SEO_BASE_URL}/articles/images/${articleMeta.slug}.webp`;
  return {
  title: articleMeta.seoTitle || `${articleMeta.title} | Ace Office Pods`,
  description: articleMeta.seoDescription || articleMeta.excerpt,
  ogImage: articleImage,
  ogType: 'article',
  ogPublishedTime: articleMeta.date,
  keywords: `${SEO_KEYWORDS_COMMON}, office pod article`,
  h1: articleMeta.title,
  body: [
    ...articleMeta.content,
    '## Related office pod guides',
    ...relatedArticles.map((article) => `[${article.title}](/articles/${article.slug})`)
  ],
  ...(faqItems.length ? { noscriptFaqHeading: 'Frequently asked questions', noscriptFaqItems: faqItems } : {}),
  schemas: (canonical) => [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleMeta.title,
      description: articleMeta.seoDescription || articleMeta.excerpt,
      image: articleImage,
      datePublished: articleMeta.date,
      dateModified: articleMeta.date,
      ...(articleMeta.citations?.length ? { citation: articleMeta.citations } : {}),
      mainEntityOfPage: canonical,
      author: {
        '@type': 'Organization',
        name: SEO_BRAND_PRIMARY,
        url: SEO_BASE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: SEO_BRAND_PRIMARY,
        url: SEO_BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SEO_BASE_URL}/ace-pods-logo.png`
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SEO_BASE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Articles',
          item: `${SEO_BASE_URL}/articles`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: articleMeta.title,
          item: canonical
        }
      ]
    },
    ...(faqItems.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          url: canonical,
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer }
          }))
        }]
      : []),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#article-${articleMeta.slug}-answer`,
      url: canonical,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: [`#article-${articleMeta.slug}-answer`]
      }
    },
    ...(articleMeta.slug === 'office-pods-office-booths-modern-workplace'
      ? [{
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'Office pod terminology',
          hasDefinedTerm: [
            { '@type': 'DefinedTerm', name: 'Office pod', description: 'Enclosed pre-manufactured workspace for calls, focus work, or meetings inside an existing office.' },
            { '@type': 'DefinedTerm', name: 'Office booth', description: 'Compact enclosed pod, typically one-person, for phone calls or focused work.' },
            { '@type': 'DefinedTerm', name: 'Meeting pod', description: 'Larger enclosed pod for two to six people to meet or collaborate.' }
          ]
        }]
      : [])
  ]
  };
};

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();

  // Discover hashed asset filenames for preload hints
  const assetsDir = path.resolve(process.cwd(), 'dist/assets');
  const assetFiles = await readdir(assetsDir).catch(() => []);
  PRELOAD_FONT_400 = assetFiles.find((f) => f.startsWith('plus-jakarta-sans-latin-400-normal-') && f.endsWith('.woff2')) || '';
  PRELOAD_HERO_AVIF = assetFiles.find((f) => f.startsWith('hero-pods-') && f.endsWith('.avif')) || '';

  const baseHtmlPath = path.resolve(process.cwd(), 'dist/index.html');
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  for (const route of PUBLIC_ROUTES) {
    const staticRouteMeta = STATIC_PRERENDER_META[route];
    const productSlug = route.startsWith('/pods/') ? route.split('/').pop() : null;
    const articleSlug = route.startsWith('/articles/') ? route.split('/').pop() : null;
    const productRouteMeta = productSlug ? POD_SEO_BY_SLUG[productSlug] : null;
    const articleRouteMeta = articleSlug ? ARTICLES.find((article) => article.slug === articleSlug) : null;
    if (productSlug && !productRouteMeta) {
      throw new Error(`Missing SEO catalog data for pod route: ${route}`);
    }
    if (articleSlug && !articleRouteMeta) {
      throw new Error(`Missing SEO catalog data for article route: ${route}`);
    }
    const resolvedMeta =
      staticRouteMeta ||
      (productRouteMeta ? buildProductPrerenderMeta(route, productRouteMeta) : null) ||
      (articleRouteMeta ? buildArticlePrerenderMeta(route, articleRouteMeta) : null);
    if (!resolvedMeta) {
      throw new Error(`Missing prerender SEO meta for route: ${route}`);
    }
    const routeHtml = injectSeoHtml(baseHtml, route, resolvedMeta);
    const outputPath = resolveOutputPath(route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml, 'utf8');
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
