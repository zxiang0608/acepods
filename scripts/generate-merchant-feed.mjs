import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'google-merchant-feed.xml');
const SITE_URL = 'https://aceofficepods.com';
const BRAND = 'Ace Office Pods';
const PRODUCT_TYPE = 'Office Pods > Acoustic Office Booths';

const PRODUCT_ORDER = [
  'ace-uno',
  'ace-plus',
  'ace-flex',
  'ace-flex-duo',
  'ace-meet',
  'ace-hub'
];

const xmlEscape = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const ensureImageFiles = () => {
  const missing = PRODUCT_ORDER
    .map((slug) => path.join(PUBLIC_DIR, 'products', `${slug}.png`))
    .filter((filePath) => !fs.existsSync(filePath));

  if (missing.length > 0) {
    const relMissing = missing.map((filePath) => path.relative(ROOT_DIR, filePath));
    throw new Error(`Missing required merchant feed image file(s):\n- ${relMissing.join('\n- ')}`);
  }
};

const toMerchantPrice = (amount) => `${Number(amount).toFixed(2)} MYR`;

const toMerchantTitle = (name) => (/\boffice pod\b/i.test(name) ? name : `${name} Office Pod`);

const buildFeedXml = () => {
  const items = PRODUCT_ORDER.map((slug) => {
    const product = POD_SEO_BY_SLUG[slug];
    if (!product) {
      throw new Error(`Missing product SEO catalog data for slug: ${slug}`);
    }

    const link = `${SITE_URL}/pods/${slug}`;
    const imageLink = `${SITE_URL}/products/${slug}.png`;

    return `    <item>
      <g:id>${xmlEscape(slug)}</g:id>
      <g:title>${xmlEscape(toMerchantTitle(product.name))}</g:title>
      <g:description>${xmlEscape(product.shortDesc)}</g:description>
      <g:link>${xmlEscape(link)}</g:link>
      <g:image_link>${xmlEscape(imageLink)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${xmlEscape(toMerchantPrice(product.startingPrice))}</g:price>
      <g:brand>${xmlEscape(BRAND)}</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>${xmlEscape(PRODUCT_TYPE)}</g:product_type>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xmlEscape(BRAND)} Merchant Feed</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape('Product feed for Ace Office Pods in Malaysia')}</description>
${items}
  </channel>
</rss>
`;
};

const main = () => {
  ensureImageFiles();
  const xml = buildFeedXml();
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
  console.log(`Merchant feed generated: ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
};

main();
