import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import { FAQ_PAGE_ITEMS, HOME_FAQ_ITEMS, SEO_BASE_URL } from '../src/seo/constants.js';

const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.png`;

const PRODUCT_PRERENDER_META = {
  '/pods/ace-solo': {
    name: 'Ace Solo',
    description: 'Private pod for calls and quick focused work',
    startingPrice: 12500
  },
  '/pods/ace-plus': {
    name: 'Ace Plus',
    description: 'The perfect quiet workspace for two-person collaborations.',
    startingPrice: 14400
  },
  '/pods/ace-flex': {
    name: 'Ace Flex',
    description: 'Enhanced workspace and comfort',
    startingPrice: 19900
  },
  '/pods/ace-meet': {
    name: 'Ace Meet',
    description: 'Meeting pod for small team discussions',
    startingPrice: 22200
  },
  '/pods/ace-hub': {
    name: 'Ace Hub',
    description: 'Meeting pod for larger team discussions',
    startingPrice: 27800
  }
};

const STATIC_PRERENDER_META = {
  '/': {
    title: 'Office Pods for Calls, Focus and Meetings | AcePods',
    description:
      'Explore office pods for calls, focused work, and meetings. Add private space without major renovation, with clear pricing, installation, and support from AcePods.',
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'Add private space for calls, focused work, and meetings without building new rooms.',
      'Compare models, pricing, installation support, and office fit before deciding.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AcePods',
        url: SEO_BASE_URL,
        description: 'Acoustic office pods for calls, focus, and meetings.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AcePods',
        url: SEO_BASE_URL
      },
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
    title: 'Office Pod Pricing in Malaysia | AcePods',
    description:
      'Understand office pod pricing and what affects final project cost, including pod type, delivery, installation, and selected options.',
    h1: 'How much does an office pod cost?',
    body: [
      'Office pod pricing depends on model, size, selected features, delivery, installation conditions, and any add-ons.',
      'Starting from RM12,500 (Ace Solo), RM14,400 (Ace Plus), RM19,900 (Ace Flex), RM22,200 (Ace Meet), and RM27,800 (Ace Hub).'
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
    title: 'Office Pods Malaysia for Calls, Focus and Meetings | AcePods',
    description:
      'Explore acoustic office pods for calls, focused work, and team meetings. Compare pod types by use case and choose the right fit for your office.',
    h1: 'Office pods for calls, focus, and meetings',
    body: [
      'AcePods offers acoustic office pods for private calls, focused work, and small team meetings.',
      'Compare pod types by use case, capacity, and project requirements.'
    ],
    schemas: (canonical) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Office Pods Malaysia',
        url: canonical,
        description:
          'Explore acoustic office pods for calls, focused work, and team meetings. Compare pod types by use case and choose the right fit for your office.'
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
    title: 'Office Pod FAQ | AcePods',
    description:
      'Read direct answers to common office pod buyer questions on pricing, inclusions, installation, and after-sales support.',
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
  const schemas = typeof meta.schemas === 'function' ? meta.schemas(canonical) : meta.schemas || [];
  const schemaScripts = schemas
    .map((schemaObject) => `    <script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schemaObject)}</script>`)
    .join('\n');

  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  output = output.replace(
    '</head>',
    `    <meta name="description" content="${escapeHtml(meta.description)}" />\n` +
      `    <meta name="robots" content="index, follow" />\n` +
      `    <link rel="canonical" href="${canonical}" />\n` +
      `${schemaScripts ? `${schemaScripts}\n` : ''}` +
      '  </head>'
  );

  output = output.replace('</body>', `    <noscript>${buildFallbackBody(meta)}</noscript>\n  </body>`);

  return output;
};

const buildProductPrerenderMeta = (route, productMeta) => ({
  title: `${productMeta.name} Office Pod Pricing, Specs and Colors | AcePods`,
  description: `${productMeta.name}: ${productMeta.description}. Starting from ${formatRM(productMeta.startingPrice)} in Malaysia.`,
  h1: productMeta.name,
  body: [`Starting from ${formatRM(productMeta.startingPrice)}`, productMeta.description],
  schemas: (canonical) => [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productMeta.name,
      brand: {
        '@type': 'Brand',
        name: 'AcePods'
      },
      description: productMeta.description,
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
    const productRouteMeta = PRODUCT_PRERENDER_META[route];
    const resolvedMeta = staticRouteMeta || (productRouteMeta ? buildProductPrerenderMeta(route, productRouteMeta) : null);
    const routeHtml = resolvedMeta ? injectSeoHtml(baseHtml, route, resolvedMeta) : baseHtml;
    const outputPath = resolveOutputPath(route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml, 'utf8');
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
