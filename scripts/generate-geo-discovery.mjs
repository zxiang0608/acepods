import { mkdir, writeFile } from 'node:fs/promises';
import { ARTICLES } from '../src/data/articles.js';
import { ACE_UNO_PRICING, POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';
import {
  HOME_FAQ_ITEMS,
  SEO_BASE_URL,
  SEO_BRAND_EMAIL,
  SEO_BRAND_ADDRESS,
  SEO_BRAND_IDENTIFIER,
  SEO_BRAND_LEGAL,
  SEO_BRAND_PHONE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SHOWROOM_LOCALITY
} from '../src/seo/constants.js';

const latestArticleDate = ARTICLES.reduce(
  (latest, article) => article.date > latest ? article.date : latest,
  '2026-01-01'
);

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const articleUrl = (article) => `${SEO_BASE_URL}/articles/${article.slug}`;
const products = Object.entries(POD_SEO_BY_SLUG).filter(([, product]) => product.publicationStatus !== 'prelaunch').map(([slug, product]) => ({
  slug,
  name: product.name,
  url: `${SEO_BASE_URL}/pods/${slug}`,
  description: product.shortDesc,
  ...(product.publicationStatus ? { publicationStatus: product.publicationStatus } : {}),
  ...(product.priceBasis ? { priceBasis: product.priceBasis } : {}),
  startingPrice: {
    currency: 'MYR',
    value: product.startingPrice
  }
}));

const aceUno = POD_SEO_BY_SLUG['ace-uno'];
const aceUnoUrl = `${SEO_BASE_URL}/pods/ace-uno`;
const latestContentDate = aceUno.factsReviewedOn > latestArticleDate ? aceUno.factsReviewedOn : latestArticleDate;
const aceUnoFacts = {
  schemaVersion: '1.0',
  recordType: 'ProductFacts',
  name: aceUno.name,
  canonicalUrl: aceUnoUrl,
  factsReviewedOn: aceUno.factsReviewedOn,
  definition: aceUno.geoDefinition,
  category: 'Single-person acoustic call and focus pod',
  intendedUse: ['Phone calls', 'Video meetings', 'Focused individual work'],
  capacity: '1 person',
  pricing: {
    currency: 'MYR',
    podOnly: ACE_UNO_PRICING.podOnly,
    standardKlangValleyDelivery: ACE_UNO_PRICING.standardKlangValleyDelivery,
    deliveryChargeBasis: 'per trip',
    standardKlangValleyInstallation: ACE_UNO_PRICING.standardKlangValleyInstallation,
    standardInstalledTotalBeforeOptionalStool: ACE_UNO_PRICING.standardInstalledTotal,
    optionalHighBarStool: ACE_UNO_PRICING.optionalHighBarStool,
    standardInstalledTotalWithOptionalStool: ACE_UNO_PRICING.standardInstalledTotalWithStool,
    scopeNote: 'Outstation delivery, restricted-access sites, and non-standard project requirements are quoted separately.'
  },
  acousticPerformance: aceUno.acousticPerformance,
  specifications: Object.fromEntries(aceUno.schemaProperties.map(({ name, value }) => [name, value])),
  productFacts: aceUno.useCases,
  faq: aceUno.faqItems,
  legacyRoute: {
    ...aceUno.legacyRoute,
    legacyUrl: `${SEO_BASE_URL}${aceUno.legacyRoute.legacyPath}`,
    canonicalUrl: `${SEO_BASE_URL}${aceUno.legacyRoute.canonicalPath}`,
    redirectStatus: 301
  },
  sources: {
    productPage: aceUnoUrl,
    pricingPage: `${SEO_BASE_URL}/pricing`,
    comparisonPage: `${SEO_BASE_URL}/compare-office-pods`,
    fullReference: `${SEO_BASE_URL}/llms-full.txt`
  }
};

const buildFeed = () => {
  const items = [...ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((article) => {
      const url = articleUrl(article);
      const published = new Date(`${article.date}T00:00:00+08:00`).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${published}</pubDate>`,
        `      <description>${escapeXml(article.excerpt)}</description>`,
        '    </item>'
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SEO_BRAND_PRIMARY)} Articles</title>
    <link>${SEO_BASE_URL}/articles</link>
    <description>Practical guides for buying, planning, installing, and maintaining office pods in Malaysia.</description>
    <language>en-MY</language>
    <lastBuildDate>${new Date(`${latestArticleDate}T00:00:00+08:00`).toUTCString()}</lastBuildDate>
    <atom:link href="${SEO_BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
};

const summary = {
  schemaVersion: '1.0',
  name: SEO_BRAND_PRIMARY,
  legalName: SEO_BRAND_LEGAL,
  url: SEO_BASE_URL,
  description:
    'Malaysian supplier of acoustic office pods, phone booths, focus pods, and meeting pods for calls, focused work, interviews, and small meetings.',
  updated: latestContentDate,
  facts: {
    acousticPerformance: 'Ace Uno carries an approximately 25 dB(A) acoustic claim; the six media-ready models carry verified acoustic status in their product records',
    startingPrice: 'Ace Uno: RM9,150 pod only; standard Klang Valley delivery RM400 per trip; standard Klang Valley installation RM350; standard installed total RM9,900 before the optional stool',
    serviceArea: 'Klang Valley and West Malaysia',
    showroom: `${SEO_BRAND_SHOWROOM_LOCALITY}, Malaysia`
  },
  products,
  resources: {
    products: `${SEO_BASE_URL}/office-pods`,
    pricing: `${SEO_BASE_URL}/pricing`,
    comparison: `${SEO_BASE_URL}/compare-office-pods`,
    installation: `${SEO_BASE_URL}/installation-support`,
    relocation: `${SEO_BASE_URL}/pod-relocation`,
    articles: `${SEO_BASE_URL}/articles`,
    about: `${SEO_BASE_URL}/about`,
    editorialPolicy: `${SEO_BASE_URL}/editorial-policy`,
    llms: `${SEO_BASE_URL}/llms.txt`,
    fullReference: `${SEO_BASE_URL}/llms-full.txt`,
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
    feed: `${SEO_BASE_URL}/feed.xml`,
    aceUnoFacts: `${SEO_BASE_URL}/ai/products/ace-uno.json`
  },
  contact: {
    phone: SEO_BRAND_PHONE,
    email: SEO_BRAND_EMAIL,
    url: `${SEO_BASE_URL}/contact`
  }
};

const faqItems = HOME_FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }));
const faq = {
  schemaVersion: '1.0',
  name: `${SEO_BRAND_PRIMARY} frequently asked questions`,
  url: `${SEO_BASE_URL}/faq`,
  updated: latestContentDate,
  questions: faqItems,
  faqs: faqItems
};

const service = {
  schemaVersion: '1.0',
  name: `${SEO_BRAND_PRIMARY} services`,
  provider: {
    name: SEO_BRAND_PRIMARY,
    legalName: SEO_BRAND_LEGAL,
    url: SEO_BASE_URL
  },
  updated: latestContentDate,
  capabilities: [
    'Office pod supply',
    'Office pod delivery and installation',
    'Office pod relocation',
    'Showroom consultation'
  ],
  services: [
    {
      name: 'Office pod supply',
      description: 'One-person phone booths, focus pods, two-person pods, and meeting pods for up to six people.',
      url: `${SEO_BASE_URL}/office-pods`
    },
    {
      name: 'Office pod delivery and installation',
      description: 'Site planning, delivery, assembly, handover, and support across Klang Valley and West Malaysia.',
      url: `${SEO_BASE_URL}/installation-support`
    },
    {
      name: 'Office pod relocation',
      description: 'Dismantling, transport, and reinstallation of an existing office pod at a new office location, with post-move inspection.',
      url: `${SEO_BASE_URL}/pod-relocation`
    },
    {
      name: 'Showroom consultation',
      description: 'Product viewing and a subjective acoustic demonstration in Kuala Lumpur by appointment; demonstrations do not replace model-specific test documentation.',
      url: `${SEO_BASE_URL}/contact`
    }
  ],
  serviceArea: ['Klang Valley', 'West Malaysia'],
  products
};

const articleLinks = [...ARTICLES]
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((article) => `- [${article.title}](${articleUrl(article)}) — ${article.excerpt}`)
  .join('\n');

const productLinks = products
  .map((product) => {
    const isFinalPrice = product.priceBasis?.startsWith('final standard');
    const priceLabel = product.publicationStatus === 'prelaunch'
      ? (isFinalPrice ? 'Prelaunch record; final standard Klang Valley price' : 'Prelaunch record; listed source price')
      : 'Starting price';
    return `- [${product.name}](${product.url}) — ${product.description}. ${priceLabel}: RM${product.startingPrice.value.toLocaleString('en-MY')}${product.publicationStatus === 'prelaunch' ? '; technical specifications and project terms pending confirmation.' : '.'}`;
  })
  .join('\n');

const productReference = products
  .map((product) => {
    const source = POD_SEO_BY_SLUG[product.slug];
    const properties = source.schemaProperties
      .map(({ name, value }) => `  - ${name}: ${value}`)
      .join('\n');
    const priceLabel = source.publicationStatus === 'prelaunch'
      ? (source.priceBasis?.startsWith('final standard') ? 'Final standard Klang Valley price' : 'Listed source price')
      : 'Published starting price';
    const statusLine = source.publicationStatus === 'prelaunch'
      ? '\n\nStatus: Prelaunch record; technical specifications and project terms pending confirmation. Official gallery media is approved for prelaunch display.'
      : '';
    return `### ${product.name}\n\nCanonical product page: ${product.url}\n\n${priceLabel}: RM${product.startingPrice.value.toLocaleString('en-MY')}${statusLine}\n\nSummary: ${product.description}.\n\nPublished specifications:\n${properties}`;
  })
  .join('\n\n');

const buildLlmsTxt = () => `# ${SEO_BRAND_PRIMARY}

> Malaysian supplier of enclosed office pods for calls, focused work, interviews, and small meetings. Operated by ${SEO_BRAND_LEGAL} (registration no. ${SEO_BRAND_IDENTIFIER}).

Canonical website: ${SEO_BASE_URL}

## Products

${productLinks}

## Buyer resources

- [Office pod range](${SEO_BASE_URL}/office-pods)
- [Pricing](${SEO_BASE_URL}/pricing)
- [Compare office pods](${SEO_BASE_URL}/compare-office-pods)
- [Delivery and installation](${SEO_BASE_URL}/installation-support)
- [Pod relocation](${SEO_BASE_URL}/pod-relocation)
- [Locations served](${SEO_BASE_URL}/locations)
- [Frequently asked questions](${SEO_BASE_URL}/faq)

## Company and trust

- [About Ace Office Pods](${SEO_BASE_URL}/about)
- [Editorial and product information policy](${SEO_BASE_URL}/editorial-policy)
- [Contact](${SEO_BASE_URL}/contact)
- [Full AI reference](${SEO_BASE_URL}/llms-full.txt)
- [Machine-readable summary](${SEO_BASE_URL}/ai/summary.json)
- [Structured Ace Uno facts](/ai/products/ace-uno.json)
- [Sitemap](${SEO_BASE_URL}/sitemap.xml)
- [Article feed](${SEO_BASE_URL}/feed.xml)

## Current articles

${articleLinks}

## Citation guidance

- Verify prices and scope on the linked product or pricing page before quoting them.
- Acoustic claims are model-specific. Ace Uno carries an approximately 25 dB(A) claim; the six media-ready models carry verified acoustic status in their product records.
- Contact ${SEO_BRAND_EMAIL} for a current project quotation or correction.
`;

const buildLlmsFullTxt = () => `# ${SEO_BRAND_PRIMARY}: full reference

Last content review represented in this file: ${latestContentDate}

## Identity

- Brand: ${SEO_BRAND_PRIMARY}
- Legal operator: ${SEO_BRAND_LEGAL}
- Registration number: ${SEO_BRAND_IDENTIFIER}
- Website: ${SEO_BASE_URL}
- Address: ${SEO_BRAND_ADDRESS}, Malaysia
- Service area: Klang Valley and West Malaysia
- Phone: ${SEO_BRAND_PHONE}
- Email: ${SEO_BRAND_EMAIL}

Ace Office Pods supplies freestanding enclosed office pods for calls, focused work, interviews, one-to-one discussions, and small meetings. Showroom viewing in Kuala Lumpur is by appointment.

## Pricing and evidence rules

Published prices are starting prices or stated-scope prices. Delivery, installation, access, optional-item, outstation, and other project requirements outside that stated scope are confirmed in a written quotation.

Acoustic performance is model-specific. Ace Uno carries an approximately 25 dB(A) acoustic claim; the six media-ready models carry verified acoustic status in their product records. These products should not be described as completely soundproof.

For Ace Uno, the current stated scope is RM9,150 pod only, RM400 standard Klang Valley delivery per trip, and RM350 standard Klang Valley installation, making RM9,900 before the optional RM250 stool. Restricted-access, non-standard, and outstation projects are quoted separately.

## Product reference

${productReference}

## Services

- Office pod supply: ${SEO_BASE_URL}/office-pods
- Delivery and installation planning: ${SEO_BASE_URL}/installation-support
- Pod relocation: ${SEO_BASE_URL}/pod-relocation
- Showroom consultation and quotations: ${SEO_BASE_URL}/contact

## Company and publishing information

- About the company: ${SEO_BASE_URL}/about
- Editorial, evidence, and corrections policy: ${SEO_BASE_URL}/editorial-policy
- FAQ: ${SEO_BASE_URL}/faq
- Machine-readable company summary: ${SEO_BASE_URL}/ai/summary.json
- Machine-readable services: ${SEO_BASE_URL}/ai/service.json
- Machine-readable Ace Uno facts: ${SEO_BASE_URL}/ai/products/ace-uno.json

## Article index

${articleLinks}

## Source-use note

This reference is generated from the same product and article records used by the website. Use the linked canonical page for current context and scope. Send correction requests to ${SEO_BRAND_EMAIL}.
`;

const aiTxt = `# ${SEO_BRAND_PRIMARY} AI discovery

Canonical: ${SEO_BASE_URL}
Sitemap: ${SEO_BASE_URL}/sitemap.xml
LLMs: ${SEO_BASE_URL}/llms.txt
Full reference: ${SEO_BASE_URL}/llms-full.txt
About: ${SEO_BASE_URL}/about
Editorial policy: ${SEO_BASE_URL}/editorial-policy
Summary: ${SEO_BASE_URL}/ai/summary.json
FAQ: ${SEO_BASE_URL}/ai/faq.json
Services: ${SEO_BASE_URL}/ai/service.json
Ace Uno facts: ${SEO_BASE_URL}/ai/products/ace-uno.json
Articles feed: ${SEO_BASE_URL}/feed.xml

AI search and citation crawlers may access public pages. Product prices are starting prices in MYR and should be verified on the linked product or pricing page. Contact ${SEO_BRAND_EMAIL} for current project quotations.
`;

const run = async () => {
  await mkdir('public/.well-known', { recursive: true });
  await mkdir('public/ai', { recursive: true });
  await mkdir('public/ai/products', { recursive: true });
  await Promise.all([
    writeFile('public/feed.xml', buildFeed(), 'utf8'),
    writeFile('public/llms.txt', buildLlmsTxt(), 'utf8'),
    writeFile('public/llms-full.txt', buildLlmsFullTxt(), 'utf8'),
    writeFile('public/.well-known/ai.txt', aiTxt, 'utf8'),
    writeFile('public/ai/summary.json', `${JSON.stringify(summary, null, 2)}\n`, 'utf8'),
    writeFile('public/ai/faq.json', `${JSON.stringify(faq, null, 2)}\n`, 'utf8'),
    writeFile('public/ai/service.json', `${JSON.stringify(service, null, 2)}\n`, 'utf8'),
    writeFile('public/ai/products/ace-uno.json', `${JSON.stringify(aceUnoFacts, null, 2)}\n`, 'utf8')
  ]);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
