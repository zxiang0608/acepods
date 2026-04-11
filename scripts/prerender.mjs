import path from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';

const SEO_BASE_URL = 'https://aceofficepods.com';
const DEFAULT_OG_IMAGE = `${SEO_BASE_URL}/og-image.png`;

const PRODUCT_PRERENDER_META = {
  '/pods/ace-solo': {
    name: 'Ace Solo',
    description: 'Private pod for calls and quick focused work',
    startingPrice: 12500
  },
  '/pods/ace-solo-plus': {
    name: 'Ace Solo Plus',
    description: 'The perfect quiet workspace for two-person collaborations.',
    startingPrice: 14400
  },
  '/pods/ace-solo-pro': {
    name: 'Ace Solo Pro',
    description: 'Enhanced workspace and comfort',
    startingPrice: 19900
  },
  '/pods/ace-meeting': {
    name: 'Ace Meeting',
    description: 'Meeting pod for small team discussions',
    startingPrice: 22200
  },
  '/pods/ace-meeting-xl': {
    name: 'Ace Meeting XL',
    description: 'Meeting pod for larger team discussions',
    startingPrice: 27800
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

const injectProductSeoHtml = (html, route, meta) => {
  const canonical = `${SEO_BASE_URL}${route}`;
  const title = `${meta.name} Office Pod Pricing, Specs and Colors | AcePods`;
  const description = `${meta.name}: ${meta.description}. Starting from ${formatRM(meta.startingPrice)} in Malaysia.`;
  const startingLine = `Starting from ${formatRM(meta.startingPrice)}`;
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: meta.name,
    brand: {
      '@type': 'Brand',
      name: 'AcePods'
    },
    description: meta.description,
    image: [DEFAULT_OG_IMAGE],
    url: canonical,
    offers: {
      '@type': 'Offer',
      price: String(meta.startingPrice),
      priceCurrency: 'MYR',
      availability: 'https://schema.org/InStock',
      url: canonical
    }
  };

  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  output = output.replace(
    '</head>',
    `    <meta name="description" content="${escapeHtml(description)}" />\n` +
      `    <meta name="robots" content="index, follow" />\n` +
      `    <link rel="canonical" href="${canonical}" />\n` +
      `    <script type="application/ld+json" data-seo-schema="true">${JSON.stringify(productSchema)}</script>\n` +
      '  </head>'
  );

  output = output.replace(
    '<div id="root"></div>',
    `<div id="root"><main><section><h1>${escapeHtml(meta.name)}</h1><p>${escapeHtml(startingLine)}</p><p>${escapeHtml(meta.description)}</p></section></main></div>`
  );

  return output;
};

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();
  const baseHtmlPath = path.resolve(process.cwd(), 'dist/index.html');
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  for (const route of PUBLIC_ROUTES) {
    if (route === '/') continue;
    const routeMeta = PRODUCT_PRERENDER_META[route];
    const routeHtml = routeMeta ? injectProductSeoHtml(baseHtml, route, routeMeta) : baseHtml;
    const outputPath = resolveOutputPath(route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml, 'utf8');
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
