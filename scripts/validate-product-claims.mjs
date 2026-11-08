import { readFile } from 'node:fs/promises';
import {
  ACE_ACOUSTIC_CLAIMS_BY_SLUG,
  ACE_ACOUSTIC_TEST_REPORT,
  ACE_UNO_PRICING,
  POD_SEO_BY_SLUG
} from '../src/data/podSeoCatalog.js';

const WEB_ROOTS = ['src', 'public', 'scripts'];
const TEXT_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.json', '.txt', '.xml', '.html', '.csv']);
const SKIP_FILES = new Set(['scripts/validate-product-claims.mjs']);

const walk = async (directory) => {
  const { readdir } = await import('node:fs/promises');
  const { extname, join } = await import('node:path');
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (TEXT_EXTENSIONS.has(extname(entry.name))) files.push(path);
  }
  return files;
};

const failures = [];
const fail = (message) => failures.push(message);
const assert = (condition, message) => {
  if (!condition) fail(message);
};

assert(POD_SEO_BY_SLUG['ace-uno']?.startingPrice === ACE_UNO_PRICING.podOnly, 'Ace Uno canonical starting price must equal the pod-only price.');
assert(POD_SEO_BY_SLUG['ace-uno']?.acousticPerformance?.publishedDbRating === 25, 'Ace Uno acoustic claim must expose the approved approximate 25 dB(A) figure.');
assert(POD_SEO_BY_SLUG['ace-uno']?.acousticPerformance?.statement === 'Approximately 25 dB(A).', 'Ace Uno acoustic claim must use the approved approximate display wording.');
assert(/^Ace Uno is .{100,260}$/i.test(POD_SEO_BY_SLUG['ace-uno']?.geoDefinition || ''), 'Ace Uno must retain a standalone, citation-ready GEO definition.');
assert(ACE_UNO_PRICING.podOnly === 9150, 'Ace Uno pod-only price must be RM9,150.');
assert(ACE_UNO_PRICING.standardKlangValleyDelivery === 400, 'Ace Uno standard Klang Valley delivery must be RM400 per trip.');
assert(ACE_UNO_PRICING.standardKlangValleyInstallation === 350, 'Ace Uno standard Klang Valley installation must be RM350.');
assert(
  ACE_UNO_PRICING.podOnly + ACE_UNO_PRICING.standardKlangValleyDelivery + ACE_UNO_PRICING.standardKlangValleyInstallation === ACE_UNO_PRICING.standardInstalledTotal,
  'Ace Uno standard installed total must equal pod + delivery + installation.'
);
assert(ACE_UNO_PRICING.standardInstalledTotal === 9900, 'Ace Uno standard installed total must be RM9,900.');
assert(ACE_UNO_PRICING.optionalHighBarStool === 250, 'Ace Uno optional high bar stool must be RM250.');
assert(ACE_UNO_PRICING.standardInstalledTotalWithStool === 10150, 'Ace Uno standard installed total with the optional stool must be RM10,150.');
assert(ACE_ACOUSTIC_TEST_REPORT.reportNumber === '7191320248-MEC23-EMK', 'Acoustic claim evidence must retain the reviewed report number.');
assert(ACE_ACOUSTIC_TEST_REPORT.driveUrl.includes('1_8SGyNjSsWxvJejSN58T5ydEehBwy8vs'), 'Acoustic claim evidence must retain the Drive report link.');
const expectedAcousticDisplays = {
  'ace-uno': 'Approximately 25 dB(A)',
  'ace-plus': 'Verified — 27 dB(A), TÜV SÜD',
  'ace-flex': 'Verified — 27 dB(A), TÜV SÜD',
  'ace-flex-duo': 'Verified — 27 dB(A), TÜV SÜD',
  'ace-meet': 'Verified — 27 dB(A), TÜV SÜD',
  'ace-hub': 'Verified — 27 dB(A), TÜV SÜD'
};
for (const [slug, display] of Object.entries(expectedAcousticDisplays)) {
  const claim = ACE_ACOUSTIC_CLAIMS_BY_SLUG[slug];
  assert(claim?.qualifiedDisplay === display, `${slug} acoustic claim must display ${display}.`);
  assert(claim?.publishedDbRating === (slug === 'ace-uno' ? 25 : 27), `${slug} acoustic claim must retain its approved report result.`);
  assert(POD_SEO_BY_SLUG[slug]?.acousticPerformance?.qualifiedDisplay === display, `${slug} canonical acoustic record must expose ${display}.`);
  assert(POD_SEO_BY_SLUG[slug]?.schemaProperties?.some(({ name, value }) => name === 'Published acoustic claim' && value === display), `${slug} SEO schema must expose the approved acoustic claim display.`);
}

const files = (await Promise.all(WEB_ROOTS.map(walk))).flat().filter((file) => !SKIP_FILES.has(file));
const legacyPricePatterns = [
  /RM\s*8,?800\b/i,
  /RM\s*9,?650\b/i,
  /RM\s*12,?500\b/i,
  /RM\s*9,?850\b/i,
  /RM\s*10,?100\b/i,
  /RM\s*15,?500\b/i,
  /RM\s*31,?500\b/i
];
const retiredDeliveryPatterns = [
  /RM\s*350\s+(?:standard\s+)?(?:Klang Valley\s+)?delivery/i,
  /delivery(?:\s+(?:is|at)|\s*[:|])\s*RM\s*350/i,
  /delivery and installation[^.\n]{0,20}RM\s*350\s+each/i
];
const forbiddenClaimPatterns = [
  { pattern: /certifiedTestedDba/i, reason: 'legacy template field would present an unverified certification' },
  { pattern: /(?:independently\s+certified|certified\s+by\s+T[ÜU]V|T[ÜU]V\s+certified)[^\n]{0,120}(?:27\s*dB|Ace|our pods?)/i, reason: 'independent-certification language is not supported by the reviewed document' },
  { pattern: /(?:Ace|our)\s+(?:Office\s+Pods?|pods?)[^\n]{0,100}(?:100%\s+locally\s+made|made\s+in\s+Malaysia|manufactur(?:ed|es|ing)?\s+in)/i, reason: 'manufacturing-origin claim requires documentary evidence' },
  { pattern: /(?:Ace\s+pod\s+range|five\s+of\s+our\s+six\s+models)[^\n]{0,120}27\s*dB/i, reason: 'Plus acoustic figure must not be applied across the range' },
  { pattern: /Ace\s+(?:Flex(?:\s+Duo)?|Meet|Hub)[^\n]{0,100}(?:achieves|carries|rated|rating|noise\s+reduction)[^\n]{0,60}27\s*dB/i, reason: 'Plus acoustic figure must not be inherited by another model' },
  { pattern: /Ace\s+Uno[^\n]{0,140}(?:guaranteed\s+soundproof|confidentiality|confidential\s+calls?)/i, reason: 'Ace Uno must not promise soundproofing or confidentiality' }
];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const pattern of legacyPricePatterns) {
    if (pattern.test(text)) fail(`${file}: contains a retired Ace Uno price (${pattern}).`);
  }
  for (const pattern of retiredDeliveryPatterns) {
    if (pattern.test(text)) fail(`${file}: contains the superseded RM350 delivery charge.`);
  }
  for (const { pattern, reason } of forbiddenClaimPatterns) {
    if (pattern.test(text)) fail(`${file}: ${reason}.`);
  }
  for (const line of text.split('\n')) {
    if (
      /27\s*dB/i.test(line) &&
      !/(?:unverified|first-party|no verified|approximateDbA|approximately|owner-directed|TÜV|question["']?\s*:)/i.test(line)
    ) {
      fail(`${file}: every 27 dB(A) reference must identify the figure as approximate or retain its evidence qualifier.`);
    }
  }
}

const pricingPage = await readFile('src/pages/PricingPage.jsx', 'utf8');
for (const field of ['podOnly', 'standardKlangValleyDelivery', 'standardKlangValleyInstallation', 'standardInstalledTotal']) {
  assert(pricingPage.includes(`ACE_UNO_PRICING.${field}`), `Pricing page must use ACE_UNO_PRICING.${field}.`);
}

const productsSource = await readFile('src/data/products.js', 'utf8');
assert(productsSource.includes("publishedAcousticClaim: ACE_ACOUSTIC_CLAIMS_BY_SLUG['ace-uno'].qualifiedDisplay"), 'Ace Uno product data must use the canonical acoustic claim.');
assert((productsSource.match(/publishedAcousticClaim:/g) || []).length === Object.keys(expectedAcousticDisplays).length, 'Every current product must expose one canonical acoustic claim.');

const unoCatalog = POD_SEO_BY_SLUG['ace-uno'];
assert(unoCatalog.useCases.some((text) => /RM10,150/.test(text)), 'Ace Uno crawlable product facts must expose the approved RM10,150 total with stool.');
assert(unoCatalog.faqItems.some(({ answer }) => /RM250/.test(answer) && /RM10,150/.test(answer)), 'Ace Uno FAQ must expose the approved optional stool price and total.');

const vercelConfig = JSON.parse(await readFile('vercel.json', 'utf8'));
const expectedLegacyRedirects = {
  '/pods/ace-solo': '/pods/ace-uno',
  '/pods/ace-solo-plus': '/pods/ace-plus',
  '/pods/ace-solo-pro': '/pods/ace-flex',
  '/pods/ace-duo': '/pods/ace-flex',
  '/pods/ace-meeting': '/pods/ace-meet',
  '/pods/ace-meeting-xl': '/pods/ace-hub'
};
for (const [source, destinationPath] of Object.entries(expectedLegacyRedirects)) {
  const redirect = vercelConfig.redirects?.find((entry) => entry.source === source);
  assert(
    redirect?.destination === `https://aceofficepods.com${destinationPath}` && redirect?.permanent === true,
    `Vercel must permanently redirect ${source} to ${destinationPath}.`
  );
}
const discoveryHeaders = vercelConfig.headers?.find((entry) => entry.source?.includes('ai/summary.json'));
assert(discoveryHeaders?.source?.includes('ai/products/ace-uno.json'), 'Vercel discovery cache headers must include the Ace Uno facts endpoint.');

const mainSource = await readFile('src/main.jsx', 'utf8');
for (const [source, destinationPath] of Object.entries(expectedLegacyRedirects)) {
  assert(
    mainSource.includes(`<Route path="${source}" element={<Navigate replace to="${destinationPath}" />} />`),
    `SPA fallback must redirect ${source} to ${destinationPath}.`
  );
}

const schemaSource = await readFile('src/seo/schema.js', 'utf8');
const prerenderSource = await readFile('scripts/prerender.mjs', 'utf8');
assert(!schemaSource.includes('schema.org/InStock'), 'Product schema must not claim InStock without current inventory evidence.');
assert(!prerenderSource.includes('schema.org/InStock'), 'Prerendered product schema must not claim InStock without current inventory evidence.');
assert(!prerenderSource.includes('priceValidUntil'), 'Prerendered product schema must not invent a price-validity date.');
assert(!schemaSource.includes("itemOffered: { '@type': 'Product', name: 'Acoustic office pods and office booths' }"), 'Organization schema must not emit an incomplete generic Product item.');
assert(!prerenderSource.includes("itemOffered: { '@type': 'Product', name: 'Acoustic office pods and office booths' }"), 'Prerendered organization schema must not emit an incomplete generic Product item.');

const sitemap = await readFile('public/sitemap.xml', 'utf8');
assert(sitemap.includes('https://aceofficepods.com/pods/ace-uno'), 'Sitemap must contain the Ace Uno canonical URL.');
assert(!sitemap.includes('/pods/ace-solo'), 'Sitemap must not contain the legacy Ace Solo URL.');

const merchantFeed = await readFile('public/google-merchant-feed.xml', 'utf8');
const merchantProductIds = [...merchantFeed.matchAll(/<g:id>([^<]+)<\/g:id>/g)].map((match) => match[1]);
const merchantEligibleProductSlugs = ['ace-uno', 'ace-plus', 'ace-flex', 'ace-flex-duo', 'ace-meet', 'ace-hub'];
assert(
  merchantProductIds.length === merchantEligibleProductSlugs.length && merchantEligibleProductSlugs.every((slug) => merchantProductIds.includes(slug)),
  'Merchant feed must contain exactly the six media-ready Ace pod models.'
);
assert(!merchantFeed.includes('<g:id>ace-solo</g:id>'), 'Merchant feed must exclude the legacy Ace Solo model.');
assert((merchantFeed.match(/<g:availability>in_stock<\/g:availability>/g) || []).length === merchantEligibleProductSlugs.length, 'Every media-ready Ace pod model must be marked in stock in the Merchant feed.');

for (const file of ['public/ai/summary.json', 'public/ai/service.json']) {
  const data = JSON.parse(await readFile(file, 'utf8'));
  const products = data.products || [];
  const uno = products.find((product) => product.name === 'Ace Uno');
  assert(uno?.url === 'https://aceofficepods.com/pods/ace-uno', `${file}: Ace Uno must use its canonical URL.`);
  assert(uno?.startingPrice?.value === ACE_UNO_PRICING.podOnly, `${file}: Ace Uno price must be RM9,150.`);
}

const unoGeo = JSON.parse(await readFile('public/ai/products/ace-uno.json', 'utf8'));
assert(unoGeo.canonicalUrl === 'https://aceofficepods.com/pods/ace-uno', 'Ace Uno GEO record must use the canonical product URL.');
assert(unoGeo.definition === POD_SEO_BY_SLUG['ace-uno'].geoDefinition, 'Ace Uno GEO definition must come from the canonical product catalog.');
assert(unoGeo.pricing?.podOnly === ACE_UNO_PRICING.podOnly, 'Ace Uno GEO pod-only price must be RM9,150.');
assert(unoGeo.pricing?.standardKlangValleyDelivery === ACE_UNO_PRICING.standardKlangValleyDelivery, 'Ace Uno GEO delivery price must be RM400 per trip.');
assert(unoGeo.pricing?.deliveryChargeBasis === 'per trip', 'Ace Uno GEO delivery must identify its per-trip basis.');
assert(unoGeo.pricing?.standardKlangValleyInstallation === ACE_UNO_PRICING.standardKlangValleyInstallation, 'Ace Uno GEO installation price must be RM350.');
assert(unoGeo.pricing?.standardInstalledTotalBeforeOptionalStool === ACE_UNO_PRICING.standardInstalledTotal, 'Ace Uno GEO installed total must be RM9,900.');
assert(unoGeo.pricing?.optionalHighBarStool === ACE_UNO_PRICING.optionalHighBarStool, 'Ace Uno GEO optional stool price must be RM250.');
assert(unoGeo.pricing?.standardInstalledTotalWithOptionalStool === ACE_UNO_PRICING.standardInstalledTotalWithStool, 'Ace Uno GEO installed total with stool must be RM10,150.');
assert(unoGeo.acousticPerformance?.publishedDbRating === 25, 'Ace Uno GEO record must expose the approved approximate 25 dB(A) figure.');
assert(unoGeo.acousticPerformance?.statement === 'Approximately 25 dB(A).', 'Ace Uno GEO acoustic statement must use the approved approximate display wording.');
assert(unoGeo.legacyRoute?.legacyPath === '/pods/ace-solo' && unoGeo.legacyRoute?.canonicalPath === '/pods/ace-uno' && unoGeo.legacyRoute?.redirectStatus === 301, 'Ace Uno GEO record must preserve the permanent Solo-to-Uno redirect context.');

const summaryGeo = JSON.parse(await readFile('public/ai/summary.json', 'utf8'));
assert(summaryGeo.resources?.aceUnoFacts === 'https://aceofficepods.com/ai/products/ace-uno.json', 'AI summary must link to the dedicated Ace Uno facts record.');
const aiDiscoveryText = await readFile('public/.well-known/ai.txt', 'utf8');
assert(aiDiscoveryText.includes('Ace Uno facts: https://aceofficepods.com/ai/products/ace-uno.json'), 'AI discovery file must link to the dedicated Ace Uno facts record.');
const llmsText = await readFile('public/llms.txt', 'utf8');
assert(llmsText.includes('[Structured Ace Uno facts](/ai/products/ace-uno.json)'), 'llms.txt must link to the dedicated Ace Uno facts record.');

if (failures.length > 0) {
  console.error(`Product claim validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Product claim validation passed: acoustic claim displays, evidence record, Uno pricing, and Solo redirects are consistent.');
