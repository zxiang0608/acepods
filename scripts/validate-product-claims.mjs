import { readFile } from 'node:fs/promises';
import { ACE_PLUS_ACOUSTIC_CLAIM, ACE_UNO_PRICING, POD_SEO_BY_SLUG } from '../src/data/podSeoCatalog.js';

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
assert(POD_SEO_BY_SLUG['ace-uno']?.acousticPerformance?.publishedDbRating === null, 'Ace Uno must not expose a published dB rating.');
assert(/^Ace Uno is .{100,260}$/i.test(POD_SEO_BY_SLUG['ace-uno']?.geoDefinition || ''), 'Ace Uno must retain a standalone, citation-ready GEO definition.');
assert(ACE_UNO_PRICING.podOnly === 8850, 'Ace Uno pod-only price must be RM8,850.');
assert(ACE_UNO_PRICING.standardKlangValleyDelivery === 350, 'Ace Uno standard Klang Valley delivery must be RM350.');
assert(ACE_UNO_PRICING.standardKlangValleyInstallation === 350, 'Ace Uno standard Klang Valley installation must be RM350.');
assert(
  ACE_UNO_PRICING.podOnly + ACE_UNO_PRICING.standardKlangValleyDelivery + ACE_UNO_PRICING.standardKlangValleyInstallation === ACE_UNO_PRICING.standardInstalledTotal,
  'Ace Uno standard installed total must equal pod + delivery + installation.'
);
assert(ACE_UNO_PRICING.standardInstalledTotal === 9550, 'Ace Uno standard installed total must be RM9,550.');
assert(ACE_UNO_PRICING.optionalHighBarStool === 250, 'Ace Uno optional high bar stool must be RM250.');
assert(ACE_UNO_PRICING.standardInstalledTotalWithStool === 9800, 'Ace Uno standard installed total with the optional stool must be RM9,800.');
assert(ACE_PLUS_ACOUSTIC_CLAIM.approximateDbA === 27, 'Ace Plus public acoustic claim must remain approximately 27 dB(A).');
assert(ACE_PLUS_ACOUSTIC_CLAIM.verified === false, 'Ace Plus 27 dB(A) claim must remain explicitly unverified.');
assert(/no verified.*test document provided/i.test(ACE_PLUS_ACOUSTIC_CLAIM.qualifiedDisplay), 'Ace Plus acoustic copy must disclose that no verified test document was provided.');

const files = (await Promise.all(WEB_ROOTS.map(walk))).flat().filter((file) => !SKIP_FILES.has(file));
const legacyPricePatterns = [
  /RM\s*8,?800\b/i,
  /RM\s*9,?650\b/i,
  /RM\s*12,?500\b/i
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
  for (const { pattern, reason } of forbiddenClaimPatterns) {
    if (pattern.test(text)) fail(`${file}: ${reason}.`);
  }
  for (const line of text.split('\n')) {
    if (
      /27\s*dB/i.test(line) &&
      !/(?:unverified|first-party|no verified|approximateDbA|question["']?\s*:)/i.test(line)
    ) {
      fail(`${file}: every 27 dB(A) reference must identify the figure as unverified/first-party or disclose that no verified document was provided.`);
    }
  }
}

const pricingPage = await readFile('src/pages/PricingPage.jsx', 'utf8');
for (const field of ['podOnly', 'standardKlangValleyDelivery', 'standardKlangValleyInstallation', 'standardInstalledTotal']) {
  assert(pricingPage.includes(`ACE_UNO_PRICING.${field}`), `Pricing page must use ACE_UNO_PRICING.${field}.`);
}

const productsSource = await readFile('src/data/products.js', 'utf8');
assert(productsSource.includes('publishedAcousticClaim: ACE_PLUS_ACOUSTIC_CLAIM.qualifiedDisplay'), 'Ace Plus product data must use the canonical qualified acoustic claim.');
assert((productsSource.match(/publishedAcousticClaim:/g) || []).length === 1, 'Exactly one product may expose a published acoustic claim.');

const unoCatalog = POD_SEO_BY_SLUG['ace-uno'];
assert(unoCatalog.useCases.some((text) => /RM9,800/.test(text)), 'Ace Uno crawlable product facts must expose the approved RM9,800 total with stool.');
assert(unoCatalog.faqItems.some(({ answer }) => /RM250/.test(answer) && /RM9,800/.test(answer)), 'Ace Uno FAQ must expose the approved optional stool price and total.');

const vercelConfig = JSON.parse(await readFile('vercel.json', 'utf8'));
const soloRedirect = vercelConfig.redirects?.find((redirect) => redirect.source === '/pods/ace-solo');
assert(soloRedirect?.destination === 'https://aceofficepods.com/pods/ace-uno' && soloRedirect?.permanent === true, 'Vercel must permanently redirect Ace Solo to the canonical Ace Uno URL.');
const discoveryHeaders = vercelConfig.headers?.find((entry) => entry.source?.includes('ai/summary.json'));
assert(discoveryHeaders?.source?.includes('ai/products/ace-uno.json'), 'Vercel discovery cache headers must include the Ace Uno facts endpoint.');

const mainSource = await readFile('src/main.jsx', 'utf8');
assert(mainSource.includes('<Route path="/pods/ace-solo" element={<Navigate replace to="/pods/ace-uno" />} />'), 'SPA fallback must redirect Ace Solo to Ace Uno.');

const schemaSource = await readFile('src/seo/schema.js', 'utf8');
const prerenderSource = await readFile('scripts/prerender.mjs', 'utf8');
assert(!schemaSource.includes('schema.org/InStock'), 'Product schema must not claim InStock without current inventory evidence.');
assert(!prerenderSource.includes('schema.org/InStock'), 'Prerendered product schema must not claim InStock without current inventory evidence.');
assert(!prerenderSource.includes('priceValidUntil'), 'Prerendered product schema must not invent a price-validity date.');

const sitemap = await readFile('public/sitemap.xml', 'utf8');
assert(sitemap.includes('https://aceofficepods.com/pods/ace-uno'), 'Sitemap must contain the Ace Uno canonical URL.');
assert(!sitemap.includes('/pods/ace-solo'), 'Sitemap must not contain the legacy Ace Solo URL.');

const merchantFeed = await readFile('public/google-merchant-feed.xml', 'utf8');
const merchantProductIds = [...merchantFeed.matchAll(/<g:id>([^<]+)<\/g:id>/g)].map((match) => match[1]);
const currentProductSlugs = Object.keys(POD_SEO_BY_SLUG);
assert(
  merchantProductIds.length === currentProductSlugs.length && currentProductSlugs.every((slug) => merchantProductIds.includes(slug)),
  'Merchant feed must contain exactly the six current Ace pod models.'
);
assert(!merchantFeed.includes('<g:id>ace-solo</g:id>'), 'Merchant feed must exclude the legacy Ace Solo model.');
assert((merchantFeed.match(/<g:availability>in_stock<\/g:availability>/g) || []).length === currentProductSlugs.length, 'Every current Ace pod model must be marked in stock in the Merchant feed.');

for (const file of ['public/ai/summary.json', 'public/ai/service.json']) {
  const data = JSON.parse(await readFile(file, 'utf8'));
  const products = data.products || [];
  const uno = products.find((product) => product.name === 'Ace Uno');
  assert(uno?.url === 'https://aceofficepods.com/pods/ace-uno', `${file}: Ace Uno must use its canonical URL.`);
  assert(uno?.startingPrice?.value === ACE_UNO_PRICING.podOnly, `${file}: Ace Uno price must be RM8,850.`);
}

const unoGeo = JSON.parse(await readFile('public/ai/products/ace-uno.json', 'utf8'));
assert(unoGeo.canonicalUrl === 'https://aceofficepods.com/pods/ace-uno', 'Ace Uno GEO record must use the canonical product URL.');
assert(unoGeo.definition === POD_SEO_BY_SLUG['ace-uno'].geoDefinition, 'Ace Uno GEO definition must come from the canonical product catalog.');
assert(unoGeo.pricing?.podOnly === ACE_UNO_PRICING.podOnly, 'Ace Uno GEO pod-only price must be RM8,850.');
assert(unoGeo.pricing?.standardKlangValleyDelivery === ACE_UNO_PRICING.standardKlangValleyDelivery, 'Ace Uno GEO delivery price must be RM350.');
assert(unoGeo.pricing?.standardKlangValleyInstallation === ACE_UNO_PRICING.standardKlangValleyInstallation, 'Ace Uno GEO installation price must be RM350.');
assert(unoGeo.pricing?.standardInstalledTotalBeforeOptionalStool === ACE_UNO_PRICING.standardInstalledTotal, 'Ace Uno GEO installed total must be RM9,550.');
assert(unoGeo.pricing?.optionalHighBarStool === ACE_UNO_PRICING.optionalHighBarStool, 'Ace Uno GEO optional stool price must be RM250.');
assert(unoGeo.pricing?.standardInstalledTotalWithOptionalStool === ACE_UNO_PRICING.standardInstalledTotalWithStool, 'Ace Uno GEO installed total with stool must be RM9,800.');
assert(unoGeo.acousticPerformance?.publishedDbRating === null, 'Ace Uno GEO record must explicitly expose no published dB rating.');
assert(/no published dB rating/i.test(unoGeo.acousticPerformance?.statement || ''), 'Ace Uno GEO acoustic statement must disclose the lack of a published dB rating.');
assert(!/27\s*dB/i.test(JSON.stringify(unoGeo)), 'Ace Uno GEO record must not inherit the Ace Plus 27 dB(A) figure.');
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

console.log('Product claim validation passed: Uno pricing, Plus-only acoustic attribution, evidence qualifiers, and Solo redirects are consistent.');
