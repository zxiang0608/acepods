import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import { SEO_BASE_URL } from '../src/seo/constants.js';

const outputPathForRoute = (route) =>
  route === '/'
    ? path.resolve('dist/index.html')
    : path.resolve('dist', route.replace(/^\/+/, ''), 'index.html');

const extractOne = (html, pattern, label, route) => {
  const match = html.match(pattern);
  if (!match) throw new Error(`${route}: missing ${label}`);
  return match[1];
};

const validateRoute = async (route) => {
  const outputPath = outputPathForRoute(route);
  const html = await readFile(outputPath, 'utf8');
  const errors = [];
  const title = extractOne(html, /<title>([\s\S]*?)<\/title>/i, 'title', route);
  const description = extractOne(
    html,
    /<meta name="description" content="([^"]*)"/i,
    'meta description',
    route
  );
  const canonical = extractOne(
    html,
    /<link rel="canonical" href="([^"]*)"/i,
    'canonical',
    route
  );
  const h1Count = (html.match(/<h1\b/gi) || []).length;

  if (title.length > 70) errors.push(`title is ${title.length} characters`);
  if (description.length > 180) errors.push(`description is ${description.length} characters`);
  if (h1Count !== 1) errors.push(`expected one H1, found ${h1Count}`);
  if (canonical !== `${SEO_BASE_URL}${route}`) {
    errors.push(`canonical is ${canonical}`);
  }
  if (canonical.includes('www.') || !canonical.startsWith('https://')) {
    errors.push('canonical must use the HTTPS apex domain');
  }
  if (!/<nav aria-label="Site navigation">/i.test(html)) {
    errors.push('missing crawlable static site navigation');
  }

  const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json" data-seo-schema="true">([\s\S]*?)<\/script>/g)];
  for (const [, schemaText] of schemaMatches) {
    let schema;
    try {
      schema = JSON.parse(schemaText);
    } catch (error) {
      errors.push(`invalid JSON-LD: ${error.message}`);
      continue;
    }

    if (['Product', 'Article'].includes(schema['@type'])) {
      const images = Array.isArray(schema.image) ? schema.image : [schema.image].filter(Boolean);
      if (!images.length) errors.push(`${schema['@type']} schema has no image`);
      if (images.some((image) => String(image).endsWith('/og-image.jpg'))) {
        errors.push(`${schema['@type']} schema uses the generic social image`);
      }
    }
    if (
      route === '/articles/open-office-noise-productivity-research' &&
      schema['@type'] === 'Article' &&
      (!Array.isArray(schema.citation) || schema.citation.length === 0)
    ) {
      errors.push('research Article schema has no external citations');
    }
  }

  return errors.map((error) => `${route}: ${error}`);
};

const run = async () => {
  const { INDEXABLE_ROUTES, PUBLIC_ROUTES } = await getRouteManifest();
  const results = await Promise.all(PUBLIC_ROUTES.map(validateRoute));
  const errors = results.flat();
  const discoveryFiles = [
    'dist/llms.txt',
    'dist/llms-full.txt',
    'dist/feed.xml',
    'dist/.well-known/ai.txt',
    'dist/ai/summary.json',
    'dist/ai/faq.json',
    'dist/ai/service.json'
  ];

  for (const file of discoveryFiles) {
    try {
      const content = await readFile(path.resolve(file), 'utf8');
      if (!content.trim()) errors.push(`${file}: file is empty`);
      if (file.endsWith('.json')) {
        const data = JSON.parse(content);
        if (file.endsWith('/faq.json')) {
          if (!Array.isArray(data.faqs) || data.faqs.length === 0) {
            errors.push(`${file}: must expose a non-empty faqs array for AI discovery clients`);
          }
        }
        if (file.endsWith('/service.json')) {
          if (typeof data.name !== 'string' || data.name.length < 3) {
            errors.push(`${file}: must expose a top-level service name`);
          }
          if (!Array.isArray(data.capabilities) || data.capabilities.length === 0) {
            errors.push(`${file}: must expose a non-empty capabilities array`);
          }
        }
      }
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
    }
  }

  try {
    const robots = await readFile(path.resolve('dist/robots.txt'), 'utf8');
    const requiredCrawlerRules = [
      'OAI-SearchBot',
      'ChatGPT-User',
      'Claude-SearchBot',
      'Claude-User',
      'Googlebot',
      'Google-Extended'
    ];

    for (const crawler of requiredCrawlerRules) {
      const escapedCrawler = crawler.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const allowedCrawler = new RegExp(
        `User-agent:\\s*${escapedCrawler}\\s*(?:\\r?\\n)+Allow:\\s*/(?:\\s|$)`,
        'i'
      );
      const wildcardAllowsAll = /User-agent:\s*\*\s*(?:\r?\n)+Allow:\s*\/(?:\s|$)/i.test(robots);

      if (!allowedCrawler.test(robots) && !wildcardAllowsAll) {
        errors.push(`dist/robots.txt: ${crawler} is not allowed to crawl the site`);
      }
    }

    if (!/Sitemap:\s*https:\/\/aceofficepods\.com\/sitemap\.xml/i.test(robots)) {
      errors.push('dist/robots.txt: missing canonical sitemap declaration');
    }
  } catch (error) {
    errors.push(`dist/robots.txt: ${error.message}`);
  }

  const indexableRouteSet = new Set(INDEXABLE_ROUTES);
  const inboundLinks = new Map(INDEXABLE_ROUTES.map((route) => [route, new Set()]));
  for (const sourceRoute of INDEXABLE_ROUTES) {
    const html = await readFile(outputPathForRoute(sourceRoute), 'utf8');
    const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
    for (const href of hrefs) {
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const targetRoute = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
      if (indexableRouteSet.has(targetRoute) && targetRoute !== sourceRoute) {
        inboundLinks.get(targetRoute).add(sourceRoute);
      }
    }
  }

  for (const [route, sources] of inboundLinks) {
    if (route !== '/' && sources.size === 0) {
      errors.push(`${route}: no crawlable inbound link from another indexable page`);
    }
  }

  if (errors.length) {
    throw new Error(`SEO validation failed:\n- ${errors.join('\n- ')}`);
  }

  console.log(`SEO validation: ${PUBLIC_ROUTES.length} prerendered routes passed`);
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
