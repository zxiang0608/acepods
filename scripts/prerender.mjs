import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import {
  FAQ_PAGE_ITEMS,
  HOME_FAQ_ITEMS,
  OFFICE_PODS_FAQ_ITEMS,
  PRICING_FAQ_ITEMS,
  SEO_BASE_URL,
  SEO_BRAND_ALTERNATE_NAMES,
  SEO_BRAND_AREA_SERVED,
  SEO_BRAND_EMAIL,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_LOGO,
  SEO_BRAND_PHONE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SAME_AS,
  SEO_KEYWORDS_COMMON
} from '../src/seo/constants.js';
import { ARTICLES } from '../src/data/articles.js';
import { POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';

const POD_ROUTE_ORDER = ['ace-solo', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];
const PRICING_LIST_ITEMS = POD_ROUTE_ORDER.map((slug) => ({
  slug,
  name: POD_SEO_BY_SLUG[slug].name,
  price: POD_SEO_BY_SLUG[slug].startingPrice,
  path: `/pods/${slug}`
}));

const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.png`;
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
  description: 'Ace Office Pods (Ace Workplace Solutions) supplies office pods and office booths for calls, focus, and meetings in Malaysia.'
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

const STATIC_PRERENDER_META = {
  '/': {
    title: 'Ace Office Pods by Ace Workplace Solutions | Office Pods and Booths Malaysia',
    description:
      'Ace Office Pods (Ace Workplace Solutions), supplying office pods and office booths for calls, focus, and meetings in Malaysia with clear pricing, installation, and support.',
    keywords: `${SEO_KEYWORDS_COMMON}, office booth provider`,
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'Ace Office Pods (Ace Workplace Solutions), supplying office pods and office booths for calls, focus, and meetings in Malaysia.',
      'Add private space for calls, focused work, and meetings without building new rooms.',
      'Compare models, pricing, installation support, and office fit before deciding.'
    ],
    schemas: (canonical) => [
      buildOrganizationSchema(),
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
      'Office pod pricing depends on model size, configuration, quantity, delivery access, installation requirements, and optional add-ons. The prices below are starting prices for Ace Office Pods models in Malaysia.',
      '## Office pod starting prices in Malaysia',
      ...PRICING_LIST_ITEMS.map((item) => `- ${item.name} - From RM${item.price.toLocaleString('en-MY')}`),
      '## What affects the final price?',
      'Final pricing may vary depending on pod model, quantity, delivery location, floor/access conditions, installation scope, optional furniture, finishes, power requirements, and project timeline.',
      '## Bulk and project pricing',
      'Corporate buyers, procurement teams, contractors, interior designers, dealers, resellers, and project buyers can request project pricing or bulk pricing depending on quantity, model mix, location, and installation scope.'
    ],
    noscriptFaqHeading: 'Common pricing questions',
    noscriptFaqItems: PRICING_FAQ_ITEMS,
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Pod Pricing in Malaysia',
        url: canonical,
        description:
          'Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options.'
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
            url: `${SEO_BASE_URL}${item.path}`,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'MYR',
              price: String(item.price),
              availability: 'https://schema.org/InStock',
              url: `${SEO_BASE_URL}${item.path}`
            }
          }
        }))
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
  '/office-pods': {
    title: 'Office Pods and Office Booths Malaysia | Ace Office Pods',
    description:
      'Explore acoustic office pods and office booths in Malaysia for private calls, focused work, and meetings. Ace Office Pods by Ace Workplace Solutions helps teams choose the right pod by use case, capacity, and project needs.',
    keywords: `${SEO_KEYWORDS_COMMON}, office booth Malaysia`,
    h1: 'Office pods and office booths for calls, focus, and meetings',
    body: [
      'Ace Office Pods by Ace Workplace Solutions offers acoustic office pods and office booths in Malaysia for private calls, focused work, hybrid meetings, and small team discussions. In workplace planning, “office pods” and “office booths” are often used interchangeably for enclosed acoustic spaces designed for calls, focused work, and small meetings.',
      'Our office booth range includes compact phone-booth style pods, one-person focus pods, two-person discussion pods, and larger meeting pods for team collaboration. These are privacy-focused, sound-reducing solutions for open-plan offices, and acoustic results vary by model and placement.'
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
      'Review Ace Meet and Ace Hub by team size, practical use case, and pricing factors.'
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
      'Find office phone booth solutions in Malaysia for private calls and focused work. Compare Ace Solo, Ace Plus, and Ace Flex by space, use case, and pricing.',
    keywords: `${SEO_KEYWORDS_COMMON}, office phone booth malaysia, phone booth office malaysia, call pod malaysia, single person office pod`,
    h1: 'Office phone booth solutions in Malaysia',
    body: [
      'Compare office phone booth style pods for private calls and focused work.',
      'Review Ace Solo, Ace Plus, and Ace Flex by space, use case, and project fit.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Office Phone Booth Malaysia for Calls and Focus',
        url: canonical,
        description:
          'Find office phone booth solutions in Malaysia for private calls and focused work. Compare Ace Solo, Ace Plus, and Ace Flex by space, use case, and pricing.'
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
      'Get clear guidance on pricing, installation, support, and model fit.'
    ],
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
      }
    ]
  },
  '/portfolio': {
    title: 'Office Pod Portfolio Malaysia | Past Installations and Project Work | Ace Office Pods',
    description:
      'Explore Ace Office Pods portfolio projects across Malaysia. See past office pod and office booth installations for calls, focused work, and meetings with practical commercial outcomes.',
    keywords: `${SEO_KEYWORDS_COMMON}, office pod portfolio, office booth installation`,
    h1: 'Past office pod projects across Malaysia',
    body: [
      'View real office pod projects completed across Malaysia.',
      'Explore installation examples for calls, focused work, and team meetings.'
    ],
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
      'Read topic-specific articles to shortlist the right pod setup for calls, focused work, and team collaboration.'
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
    title: 'Compare Office Pods by Price, Installation and Support | Ace Office Pods',
    description:
      'Compare office pods beyond headline price. Review installation, support, warranty coverage, and office-fit considerations before buying.',
    keywords: `${SEO_KEYWORDS_COMMON}, compare office pods, office booth comparison`,
    h1: 'Compare office pods by price, installation, and support',
    body: [
      'Compare models beyond headline pricing with practical buying factors in one view.',
      'Review installation, support, and office fit before making a final decision.'
    ],
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
      'Reach our team by WhatsApp, email, or phone.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Contact Ace Office Pods',
        url: canonical,
        description: 'Contact Ace Office Pods by Ace Workplace Solutions for office pod sales enquiries via WhatsApp, email, or phone in Malaysia.'
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
      'Plan with clear lead times, installation coordination, and after-sales support.'
    ],
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
            name: 'Installation & Support',
            item: canonical
          }
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
  return `<main><section><h1>${escapeHtml(h1)}</h1>${structuredBody}</section>${faqBlock}</main>`;
};

const injectSeoHtml = (html, route, meta) => {
  const canonical = `${SEO_BASE_URL}${route}`;
  const robots = meta.robots || 'index, follow';
  const keywords = meta.keywords || '';
  const routeSchemas = typeof meta.schemas === 'function' ? meta.schemas(canonical) : meta.schemas || [];
  const schemas = [...routeSchemas];
  if (!schemas.some((schema) => schema['@type'] === 'Organization')) {
    schemas.unshift(buildOrganizationSchema());
  }
  if (!schemas.some((schema) => schema['@type'] === 'WebSite')) {
    schemas.unshift(buildWebsiteSchema());
  }
  const schemaScripts = schemas
    .map((schemaObject) => `    <script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schemaObject)}</script>`)
    .join('\n');

  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  output = output.replace(
    '</head>',
    `    <meta name="description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta name="robots" content="${escapeHtml(robots)}" />\n` +
      `${keywords ? `    <meta name="keywords" content="${escapeHtml(keywords)}" />\n` : ''}` +
      `    <meta property="og:type" content="${escapeHtml(meta.ogType || 'website')}" />\n` +
      `    <meta property="og:title" content="${escapeHtml(meta.title)}" />\n` +
      `    <meta property="og:description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta property="og:url" content="${canonical}" />\n` +
      `    <meta name="twitter:card" content="summary_large_image" />\n` +
      `    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />\n` +
      `    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />\n` +
      `    <link rel="canonical" href="${canonical}" />\n` +
      `${schemaScripts ? `${schemaScripts}\n` : ''}` +
      '  </head>'
  );

  output = output.replace('</body>', `    <noscript>${buildFallbackBody(meta)}</noscript>\n  </body>`);

  return output;
};

const buildProductPrerenderMeta = (route, productMeta) => ({
  title: `${productMeta.name} Office Pod Pricing, Specs and Colors | Ace Office Pods`,
  description: `${productMeta.name}: ${productMeta.shortDesc}. Starting from ${formatRM(productMeta.startingPrice)} in Malaysia from Ace Office Pods by Ace Workplace Solutions. View office pod and office booth colors, add-ons, installation, and delivery details.`,
  keywords: `${SEO_KEYWORDS_COMMON}, ${productMeta.name}, ${route.split('/').pop().replaceAll('-', ' ')}`,
  h1: productMeta.name,
  body: [`Starting from ${formatRM(productMeta.startingPrice)}`, productMeta.shortDesc],
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
      image: [DEFAULT_OG_IMAGE],
      url: canonical,
      offers: {
        '@type': 'Offer',
        price: String(productMeta.startingPrice),
        priceCurrency: 'MYR',
        availability: 'https://schema.org/InStock',
        url: canonical
      }
    }
  ]
});

const buildArticlePrerenderMeta = (route, articleMeta) => ({
  title: articleMeta.seoTitle || `${articleMeta.title} | Ace Office Pods`,
  description: articleMeta.seoDescription || articleMeta.excerpt,
  keywords: `${SEO_KEYWORDS_COMMON}, office pod article`,
  h1: articleMeta.title,
  body: articleMeta.content,
  schemas: (canonical) => [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleMeta.title,
      description: articleMeta.seoDescription || articleMeta.excerpt,
      datePublished: articleMeta.date,
      dateModified: articleMeta.date,
      mainEntityOfPage: canonical,
      author: {
        '@type': 'Organization',
        name: SEO_BRAND_PRIMARY
      },
      publisher: {
        '@type': 'Organization',
        name: SEO_BRAND_PRIMARY
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
    }
  ]
});

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();
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
