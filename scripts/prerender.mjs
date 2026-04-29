import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import {
  FAQ_PAGE_ITEMS,
  HOME_FAQ_ITEMS,
  SEO_BASE_URL,
  SEO_BRAND_ALTERNATE_NAMES,
  SEO_BRAND_LEGAL,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SAME_AS,
  SEO_KEYWORDS_COMMON
} from '../src/seo/constants.js';
import { POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';

const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.png`;
const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SEO_BRAND_PRIMARY,
  legalName: SEO_BRAND_LEGAL,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  identifier: '202403171118',
  url: SEO_BASE_URL,
  sameAs: SEO_BRAND_SAME_AS,
  description: 'Silent acoustic office pods for calls, focus, and meetings.'
});

const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SEO_BRAND_PRIMARY,
  alternateName: SEO_BRAND_ALTERNATE_NAMES,
  url: SEO_BASE_URL
});

const STATIC_PRERENDER_META = {
  '/': {
    title: 'Office Pods for Calls, Focus and Meetings | Ace Office Pods',
    description:
      'Explore office pods and office booths for calls, focused work, and meetings. Ace Office Pods by Ace Workplace Solutions helps teams add private space without major renovation, with clear pricing, installation, and support.',
    keywords: `${SEO_KEYWORDS_COMMON}, office booth provider`,
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'Add private space for calls, focused work, and meetings without building new rooms.',
      'Compare models, pricing, installation support, and office fit before deciding.'
    ],
    schemas: (canonical) => [
      buildOrganizationSchema(),
      buildWebsiteSchema(),
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
      'Office pod pricing depends on model, size, selected features, delivery, installation conditions, and any add-ons.',
      'Starting from RM12,500 (Ace Solo), RM14,400 (Ace Plus), RM19,900 (Ace Flex), RM19,900 (Ace Flex Duo), RM22,200 (Ace Meet), and RM27,800 (Ace Hub).'
    ],
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
      }
    ]
  },
  '/office-pods': {
    title: 'Office Pods Malaysia for Calls, Focus and Meetings | Ace Office Pods',
    description:
      'Explore acoustic office pods and office booths for calls, focused work, and team meetings. Ace Office Pods by Ace Workplace Solutions helps you compare pod types by use case and choose the right fit.',
    keywords: `${SEO_KEYWORDS_COMMON}, office booth Malaysia`,
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'Ace Office Pods by Ace Workplace Solutions offers acoustic office pods for private calls, focused work, and small team meetings.',
      'Compare pod types by use case, capacity, and project requirements.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Office Pods Malaysia',
        url: canonical,
        description:
          'Explore acoustic office pods and office booths for calls, focused work, and team meetings. Ace Office Pods by Ace Workplace Solutions helps you compare pod types by use case and choose the right fit.'
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

const buildFallbackBody = ({ h1, body = [] }) => {
  const paragraphs = body.map((line) => `<p>${escapeHtml(line)}</p>`).join('');
  return `<main><section><h1>${escapeHtml(h1)}</h1>${paragraphs}</section></main>`;
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

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();
  const baseHtmlPath = path.resolve(process.cwd(), 'dist/index.html');
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  for (const route of PUBLIC_ROUTES) {
    const staticRouteMeta = STATIC_PRERENDER_META[route];
    const productSlug = route.startsWith('/pods/') ? route.split('/').pop() : null;
    const productRouteMeta = productSlug ? POD_SEO_BY_SLUG[productSlug] : null;
    if (productSlug && !productRouteMeta) {
      throw new Error(`Missing SEO catalog data for pod route: ${route}`);
    }
    const resolvedMeta = staticRouteMeta || (productRouteMeta ? buildProductPrerenderMeta(route, productRouteMeta) : null);
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
