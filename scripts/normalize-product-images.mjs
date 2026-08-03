import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CANVAS = { width: 1600, height: 1200 };
const PRODUCT_MAX = { width: 1400, height: 1000 };
const BASELINE_Y = 1100;

const products = [
  {
    slug: 'ace-uno',
    source: 'assets/products/ace-uno/source/ace-uno-linen-sand.jpeg',
    contentMode: 'non-white'
  },
  {
    slug: 'ace-uno-forest-whisper',
    source: 'assets/products/ace-uno/source/ace-uno-forest-whisper.jpeg',
    contentMode: 'non-white'
  },
  {
    slug: 'ace-uno-sesame-black',
    source: 'assets/products/ace-uno/source/ace-uno-sesame-black.jpeg',
    contentMode: 'non-white'
  },
  {
    slug: 'ace-uno-soft-turquoise',
    source: 'assets/products/ace-uno/source/ace-uno-soft-turquoise.jpeg',
    contentMode: 'non-white'
  },
  { slug: 'ace-plus', source: 'assets/ace-plus-front-transparent.png' },
  { slug: 'ace-flex', source: 'assets/ace-flex-front-transparent.png' },
  { slug: 'ace-flex-duo', source: 'assets/ace-flex-duo-front-transparent.png' },
  { slug: 'ace-meet', source: 'assets/ace-meet-product-front-transparent-1024.png' },
  { slug: 'ace-hub', source: 'assets/ace-hub-front-transparent.png' }
];

const findContentBounds = async (source, mode = 'alpha') => {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width;
  let top = info.height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * 4;
      const alpha = data[offset + 3];
      const isContent =
        mode === 'non-white'
          ? alpha > 16 && (data[offset] < 245 || data[offset + 1] < 245 || data[offset + 2] < 245)
          : alpha > 16;

      if (!isContent) continue;
      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) {
    throw new Error(`No visible product pixels found in ${source}`);
  }

  return { left, top, width: right - left + 1, height: bottom - top + 1 };
};

const removeNearWhiteBackground = async (image) => {
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let offset = 0; offset < data.length; offset += 4) {
    const distanceFromWhite = Math.max(255 - data[offset], 255 - data[offset + 1], 255 - data[offset + 2]);

    if (distanceFromWhite <= 8) {
      data[offset + 3] = 0;
    } else if (distanceFromWhite < 28) {
      data[offset + 3] = Math.round(data[offset + 3] * ((distanceFromWhite - 8) / 20));
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
};

const outputDirectory = 'assets/products/catalog';
await mkdir(outputDirectory, { recursive: true });

for (const product of products) {
  const bounds = await findContentBounds(product.source, product.contentMode);
  const cropped = sharp(product.source).extract(bounds);
  const foreground = product.contentMode === 'non-white' ? await removeNearWhiteBackground(cropped) : cropped;
  const normalized = await foreground
    .resize({ ...PRODUCT_MAX, fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer({ resolveWithObject: true });

  const left = Math.round((CANVAS.width - normalized.info.width) / 2);
  const top = BASELINE_Y - normalized.info.height;
  const destination = path.join(outputDirectory, `${product.slug}.png`);

  await sharp({
    create: {
      ...CANVAS,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: normalized.data, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(destination);

  console.log(`${product.slug}: ${normalized.info.width}×${normalized.info.height}, baseline ${BASELINE_Y}px`);
}
