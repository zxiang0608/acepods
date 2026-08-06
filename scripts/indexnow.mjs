import { readFile } from 'node:fs/promises';

const KEY = '570e4db31801b90351dd6554fc4983b9';
const HOST = 'aceofficepods.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const extractUrls = (sitemapXml) => {
  const matches = sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, (m) => m[1]);
};

const run = async () => {
  const localKey = (await readFile(`public/${KEY}.txt`, 'utf8')).trim();
  if (localKey !== KEY) {
    throw new Error(`IndexNow key file does not match the configured key: public/${KEY}.txt`);
  }

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

  if (!response.ok) {
    const responseBody = await response.text();
    const message = `IndexNow: submission rejected for ${urlList.length} URLs — HTTP ${response.status}${
      responseBody ? `: ${responseBody.slice(0, 500)}` : ''
    }`;

    if (process.env.INDEXNOW_STRICT === '1') {
      throw new Error(message);
    }

    console.error(`${message}. Set INDEXNOW_STRICT=1 to fail the build on submission errors.`);
    return;
  }

  console.log(`IndexNow: accepted ${urlList.length} URLs — HTTP ${response.status}`);
};

run().catch((error) => {
  console.error('IndexNow error:', error);
  process.exit(1);
});
