import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer-core';
import { getRouteManifest } from './route-manifest.mjs';

const HOST = 'http://127.0.0.1:4173';
const PREVIEW_STARTUP_TIMEOUT_MS = 20000;
const SEO_READY_TIMEOUT_MS = 20000;

const waitForPreviewServer = async (timeoutMs) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(HOST, { redirect: 'manual' });
      if (response.ok) return;
    } catch {
      // retry until timeout
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not become ready within ${timeoutMs}ms`);
};

const resolveOutputPath = (route) => {
  if (route === '/') {
    return path.resolve(process.cwd(), 'dist/index.html');
  }
  return path.resolve(process.cwd(), `dist${route}/index.html`);
};

const run = async () => {
  const { PUBLIC_ROUTES } = await getRouteManifest();

  const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4173'], {
    stdio: 'inherit'
  });

  let browser;
  try {
    await waitForPreviewServer(PREVIEW_STARTUP_TIMEOUT_MS);

    browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();

    for (const route of PUBLIC_ROUTES) {
      const url = `${HOST}${route}`;
      await page.goto(url, { waitUntil: 'domcontentloaded' });

      const expectedCanonical = `https://aceofficepods.com${route}`;
      await page.waitForFunction(
        (canonical) =>
          document.documentElement.dataset.seoReady === '1' &&
          Boolean(document.querySelector('h1')) &&
          document.querySelector('link[rel="canonical"]')?.getAttribute('href') === canonical,
        { timeout: SEO_READY_TIMEOUT_MS },
        expectedCanonical
      );

      const html = await page.content();
      const outputPath = resolveOutputPath(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, 'utf8');
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    preview.kill('SIGINT');
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
