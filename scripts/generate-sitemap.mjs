import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { getRouteManifest } from './route-manifest.mjs';
import { ARTICLES } from '../src/data/articles.js';

const BASE_URL = 'https://aceofficepods.com';
const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';

const MANUAL_LASTMOD = {
  '/locations/kuala-lumpur': '2026-06-12',
  '/locations/shah-alam': '2026-06-12',
  '/locations/subang-jaya': '2026-06-12',
  '/locations/penang': '2026-06-12',
  '/locations/johor-bahru': '2026-06-12',
  '/locations': '2026-06-12'
};

const ARTICLE_DATE_MAP = Object.fromEntries(
  ARTICLES.map((a) => [`/articles/${a.slug}`, a.date])
);

const formatMalaysiaDateTime = (value) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value}T00:00:00+08:00`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: MALAYSIA_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    })
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value: partValue }) => [type, partValue])
  );

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+08:00`;
};

const sourceFilesForRoute = (route) => {
  if (route === '/') return ['src/App.jsx', 'src/seo/constants.js'];
  if (route.startsWith('/pods/')) return ['src/pages/ProductPage.jsx', 'src/data/products.js'];
  if (route.startsWith('/articles/')) return ['src/pages/ArticleDetailPage.jsx', 'src/data/articles.js'];
  if (route.startsWith('/locations/')) return ['src/pages/LocationPage.jsx', 'src/data/locations.js'];

  const staticRouteSources = {
    '/portfolio': ['src/pages/PortfolioPage.jsx'],
    '/articles': ['src/pages/ArticlesPage.jsx', 'src/data/articles.js'],
    '/office-pods': ['src/pages/OfficePodsPage.jsx'],
    '/office-pods-near-me': ['src/pages/OfficePodsNearMePage.jsx', 'src/data/products.js', 'src/seo/constants.js'],
    '/meeting-pods-malaysia': ['src/pages/MeetingPodsMalaysiaPage.jsx', 'src/data/products.js'],
    '/office-phone-booth-malaysia': ['src/pages/OfficePhoneBoothMalaysiaPage.jsx', 'src/data/products.js'],
    '/compare-office-pods': ['src/pages/CompareOfficePodsPage.jsx'],
    '/pricing': ['src/pages/PricingPage.jsx'],
    '/contact': ['src/pages/ContactPage.jsx', 'src/seo/constants.js'],
    '/about': ['src/pages/AboutPage.jsx', 'src/seo/constants.js'],
    '/editorial-policy': ['src/pages/EditorialPolicyPage.jsx', 'src/seo/constants.js'],
    '/faq': ['src/pages/FaqPage.jsx', 'src/seo/constants.js'],
    '/installation-support': ['src/pages/InstallationSupportPage.jsx'],
    '/pod-relocation': ['src/pages/PodRelocationPage.jsx'],
    '/locations': ['src/pages/LocationsPage.jsx', 'src/data/locations.js']
  };

  return staticRouteSources[route] || [];
};

const getLastmod = (route) => {
  if (MANUAL_LASTMOD[route]) return formatMalaysiaDateTime(MANUAL_LASTMOD[route]);
  if (ARTICLE_DATE_MAP[route]) return formatMalaysiaDateTime(ARTICLE_DATE_MAP[route]);

  const sourceFiles = sourceFilesForRoute(route);
  if (!sourceFiles.length) return null;

  try {
    const timestamp = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sourceFiles], {
      encoding: 'utf8'
    }).trim();
    return timestamp ? formatMalaysiaDateTime(timestamp) : null;
  } catch {
    return null;
  }
};

const buildXml = async () => {
  const { INDEXABLE_ROUTES } = await getRouteManifest();
  const urlNodes = INDEXABLE_ROUTES.map((route) => {
    const lastmod = getLastmod(route);
    return [
      '  <url>',
      `    <loc>${BASE_URL}${route}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      '  </url>'
    ].join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>\n`;
};

const run = async () => {
  const sitemapXml = await buildXml();
  await writeFile('public/sitemap.xml', sitemapXml, 'utf8');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
