import { readFile } from 'node:fs/promises';

const KEY = 'ace-pods-indexnow';
const HOST = 'aceofficepods.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const extractUrls = (sitemapXml) => {
  const matches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, (m) => m[1]);
};

const run = async () => {
  const sitemapXml = await readFile('public/sitemap.xml', 'utf8');
  const urlList = extractUrls(sitemapXml);

  if (!urlList.length) {
    console.log('IndexNow: no URLs found in sitemap');
    return;
  }

  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList });

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body
  });

  console.log(`IndexNow: submitted ${urlList.length} URLs — HTTP ${response.status}`);
};

run().catch((error) => {
  console.error('IndexNow error:', error);
  process.exit(1);
});
