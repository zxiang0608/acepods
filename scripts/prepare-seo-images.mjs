import path from 'node:path';
import { mkdir, readdir, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { ARTICLES } from '../src/data/articles.js';

const ARTICLE_SOURCE_POOL = [
  'assets/hero-pods.png',
  'assets/Office-1.png',
  'assets/office-2.png',
  'assets/office-3.png',
  'assets/pods-installation.png',
  'assets/open-office.png',
  'assets/ace-meeting.png',
  'assets/ace-meeting-XL.png'
];

const FALLBACK_IMAGES = [
  ['assets/hero-pods.png', 'assets/hero-pods.webp'],
  ['assets/Office-1.png', 'assets/Office-1.webp'],
  ['assets/office-2.png', 'assets/office-2.webp'],
  ['assets/office-3.png', 'assets/office-3.webp'],
  ['assets/open-office.png', 'assets/open-office.webp'],
  ['assets/pods-installation.png', 'assets/pods-installation.webp'],
  ['assets/delivery-pods.png', 'assets/delivery-pods.webp']
];
const LARGE_IMAGE_THRESHOLD = 750 * 1024;
const OPTIMIZED_ASSET_ROOT = 'assets/.optimized';

const slugHash = (value) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
};

const writeWebp = async (input, output, options = {}) => {
  await mkdir(path.dirname(output), { recursive: true });
  let pipeline = sharp(input).rotate();
  if (options.width || options.height) {
    pipeline = pipeline.resize({
      width: options.width,
      height: options.height,
      fit: options.fit || 'inside',
      withoutEnlargement: true
    });
  }
  await pipeline.webp({ quality: options.quality || 80, effort: 5 }).toFile(output);
};

const findLargeRasterImages = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.optimized') continue;
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findLargeRasterImages(entryPath)));
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const metadata = await stat(entryPath);
    if (metadata.size >= LARGE_IMAGE_THRESHOLD) files.push(entryPath);
  }

  return files;
};

const run = async () => {
  await Promise.all(
    FALLBACK_IMAGES.map(([input, output]) => writeWebp(input, output, { width: 1920, quality: 80 }))
  );

  await sharp('assets/og-image-source.png')
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover' })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile('public/og-image.jpg');

  await Promise.all(
    ARTICLES.map((article) => {
      const source = ARTICLE_SOURCE_POOL[slugHash(article.slug) % ARTICLE_SOURCE_POOL.length];
      return writeWebp(source, `public/articles/images/${article.slug}.webp`, {
        width: 1200,
        height: 675,
        fit: 'cover',
        quality: 80
      });
    })
  );

  const largeRasterImages = await findLargeRasterImages('assets');
  await Promise.all(
    largeRasterImages.map((source) => {
      const relativePath = path.relative('assets', source);
      const output = path.join(OPTIMIZED_ASSET_ROOT, `${relativePath}.webp`);
      return writeWebp(source, output, { width: 2400, height: 2400, quality: 82 });
    })
  );

  console.log(
    `SEO images: prepared ${FALLBACK_IMAGES.length} fallbacks, one social image, ${ARTICLES.length} article images, and ${largeRasterImages.length} optimized build assets`
  );
};

run().catch((error) => {
  console.error('SEO image preparation failed:', error);
  process.exit(1);
});
