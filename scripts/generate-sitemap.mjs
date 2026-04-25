import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { getRouteManifest } from './route-manifest.mjs';

const BASE_URL = 'https://aceofficepods.com';

const sourceFilesForRoute = (route) => {
  if (route === '/') return ['src/App.jsx', 'src/seo/constants.js'];
  if (route.startsWith('/pods/')) return ['src/pages/ProductPage.jsx', 'src/data/products.js'];

  const staticRouteSources = {
    '/portfolio': ['src/pages/PortfolioPage.jsx'],
    '/office-pods': ['src/pages/OfficePodsPage.jsx'],
    '/compare-office-pods': ['src/pages/CompareOfficePodsPage.jsx'],
    '/pricing': ['src/pages/PricingPage.jsx'],
    '/faq': ['src/pages/FaqPage.jsx', 'src/seo/constants.js'],
    '/installation-support': ['src/pages/InstallationSupportPage.jsx']
  };

  return staticRouteSources[route] || [];
};

const getLastmod = (route) => {
  const sourceFiles = sourceFilesForRoute(route);
  if (!sourceFiles.length) return null;

  try {
    const timestamp = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sourceFiles], {
      encoding: 'utf8'
    }).trim();
    return timestamp || null;
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
