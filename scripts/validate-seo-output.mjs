import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { getRouteManifest } from './route-manifest.mjs';
import { SEO_BASE_URL } from '../src/seo/constants.js';

const extractOne = (html, pattern, label, route) => {
  const match = html.match(pattern);
  if (!match) throw new Error(`${route}: missing ${label}`);
  return match[1];
};

const validateRoute = async (route) => {
  const outputPath =
    route === '/'
      ? path.resolve('dist/index.html')
      : path.resolve('dist', route.replace(/^\/+/, ''), 'index.html');
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
  }

  return errors.map((error) => `${route}: ${error}`);
};

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();
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
      if (file.endsWith('.json')) JSON.parse(content);
    } catch (error) {
      errors.push(`${file}: ${error.message}`);
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
