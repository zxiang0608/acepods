import { mkdir, writeFile } from 'node:fs/promises';
import { ARTICLES } from '../src/data/articles.js';
import { POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';
import {
  HOME_FAQ_ITEMS,
  SEO_BASE_URL,
  SEO_BRAND_EMAIL,
  SEO_BRAND_LEGAL,
  SEO_BRAND_PHONE,
  SEO_BRAND_PRIMARY,
  SEO_BRAND_SHOWROOM_LOCALITY,
  SEO_BRAND_SHOWROOM_REGION
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
const products = Object.entries(POD_SEO_BY_SLUG).map(([slug, product]) => ({
  name: product.name,
  url: `${SEO_BASE_URL}/pods/${slug}`,
  description: product.shortDesc,
  startingPrice: {
    currency: 'MYR',
    value: product.startingPrice
  }
}));

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
    'Malaysian supplier and local manufacturer of acoustic office pods, phone booths, focus pods, and meeting pods for calls, focused work, interviews, and small meetings.',
  updated: latestArticleDate,
  facts: {
    podsSold: '180+ since 2023',
    manufacturing: 'Locally made in Malaysia',
    acousticPerformance: 'Approximately 27 dBA noise reduction on five models',
    startingPrice: 'RM12,500',
    leadTime: 'Approximately 3-6 working weeks after 50% deposit',
    serviceArea: 'Klang Valley and West Malaysia',
    showroom: `${SEO_BRAND_SHOWROOM_LOCALITY}, ${SEO_BRAND_SHOWROOM_REGION}, Malaysia`
  },
  products,
  resources: {
    products: `${SEO_BASE_URL}/office-pods`,
    pricing: `${SEO_BASE_URL}/pricing`,
    comparison: `${SEO_BASE_URL}/compare-office-pods`,
    installation: `${SEO_BASE_URL}/installation-support`,
    relocation: `${SEO_BASE_URL}/pod-relocation`,
    articles: `${SEO_BASE_URL}/articles`,
    llms: `${SEO_BASE_URL}/llms.txt`,
    fullReference: `${SEO_BASE_URL}/llms-full.txt`,
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
    feed: `${SEO_BASE_URL}/feed.xml`
  },
  contact: {
    phone: SEO_BRAND_PHONE,
    email: SEO_BRAND_EMAIL,
    url: `${SEO_BASE_URL}/contact`
  }
};

const faq = {
  schemaVersion: '1.0',
  name: `${SEO_BRAND_PRIMARY} frequently asked questions`,
  url: `${SEO_BASE_URL}/faq`,
  updated: latestArticleDate,
  questions: HOME_FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))
};

const service = {
  schemaVersion: '1.0',
  provider: {
    name: SEO_BRAND_PRIMARY,
    legalName: SEO_BRAND_LEGAL,
    url: SEO_BASE_URL
  },
  updated: latestArticleDate,
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
      description: 'Product viewing and acoustic testing at the Klang showroom by appointment.',
      url: `${SEO_BASE_URL}/contact`
    }
  ],
  serviceArea: ['Klang Valley', 'West Malaysia', 'Malaysia'],
  products
};

const aiTxt = `# ${SEO_BRAND_PRIMARY} AI discovery

Canonical: ${SEO_BASE_URL}
Sitemap: ${SEO_BASE_URL}/sitemap.xml
LLMs: ${SEO_BASE_URL}/llms.txt
Full reference: ${SEO_BASE_URL}/llms-full.txt
Summary: ${SEO_BASE_URL}/ai/summary.json
FAQ: ${SEO_BASE_URL}/ai/faq.json
Services: ${SEO_BASE_URL}/ai/service.json
Articles feed: ${SEO_BASE_URL}/feed.xml

AI search and citation crawlers may access public pages. Product prices are starting prices in MYR and should be verified on the linked product or pricing page. Contact ${SEO_BRAND_EMAIL} for current project quotations.
`;

const run = async () => {
  await mkdir('public/.well-known', { recursive: true });
  await mkdir('public/ai', { recursive: true });
  await Promise.all([
    writeFile('public/feed.xml', buildFeed(), 'utf8'),
    writeFile('public/.well-known/ai.txt', aiTxt, 'utf8'),
    writeFile('public/ai/summary.json', `${JSON.stringify(summary, null, 2)}\n`, 'utf8'),
    writeFile('public/ai/faq.json', `${JSON.stringify(faq, null, 2)}\n`, 'utf8'),
    writeFile('public/ai/service.json', `${JSON.stringify(service, null, 2)}\n`, 'utf8')
  ]);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
