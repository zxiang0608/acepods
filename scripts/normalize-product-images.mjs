import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CANVAS = { width: 1600, height: 1200 };
const PRODUCT_MAX = { width: 1400, height: 1000 };
const BASELINE_Y = 1100;

const products = [
  {
    slug: 'ace-pod-one',
    source: 'assets/products/ace-pod-one/gallery/supreme-satu-angle.png',
    contentMode: 'non-light',
    backgroundMode: 'light',
    sharpen: 0.5,
    publicDestination: 'public/products/ace-pod-one.png'
  },
  {
    slug: 'ace-pod-four',
    source: 'assets/products/ace-pod-four/gallery/supreme-quattro-angle.png',
    contentMode: 'non-light',
    backgroundMode: 'light',
    sharpen: 0.5,
    publicDestination: 'public/products/ace-pod-four.png'
  },
  {
    slug: 'ace-uno',
    source: 'assets/products/ace-uno/gallery/ace-uno-warm-sand-three-quarter.webp',
    contentMode: 'non-white'
  },
  {
    slug: 'ace-uno-homepage-front',
    source: 'assets/products/ace-uno/gallery/ace-uno-warm-sand-front-updated.png',
    contentMode: 'non-light',
    backgroundMode: 'light'
  },
  {
    slug: 'ace-uno-dusty-turquoise-front',
    source: 'assets/products/ace-uno/gallery/ace-uno-dusty-turquoise-front-updated.png',
    contentMode: 'non-light',
    backgroundMode: 'light'
  },
  {
    slug: 'ace-uno-pine-green-front',
    source: 'assets/products/ace-uno/gallery/ace-uno-pine-green-front-updated.png',
    contentMode: 'non-light',
    backgroundMode: 'light'
  },
  {
    slug: 'ace-uno-shadow-grey-front',
    source: 'assets/products/ace-uno/gallery/ace-uno-shadow-grey-front-updated.png',
    contentMode: 'non-light',
    backgroundMode: 'light'
  },
  {
    slug: 'ace-uno-pine-green',
    source: 'assets/products/ace-uno/gallery/ace-uno-pine-green-three-quarter.webp',
    contentMode: 'non-white'
  },
  {
    slug: 'ace-uno-shadow-grey',
    source: 'assets/products/ace-uno/source/ace-uno-shadow-grey-three-quarter-ai-2026-09-04.png',
    contentMode: 'non-light',
    backgroundMode: 'light'
  },
  {
    slug: 'ace-uno-dusty-turquoise',
    source: 'assets/products/ace-uno/gallery/ace-uno-dusty-turquoise-three-quarter.webp',
    contentMode: 'non-white'
  },
  { slug: 'ace-plus', source: 'assets/ace-plus-front-transparent.png' },
  { slug: 'ace-flex', source: 'assets/ace-flex-front-transparent.png' },
  { slug: 'ace-flex-duo', source: 'assets/ace-flex-duo-front-transparent.png' },
  { slug: 'ace-meet', source: 'assets/ace-meet-product-front-transparent-1024.png' },
  {
    slug: 'ace-meet-menu-sofa',
    source: 'assets/ace-meet-front-transparent.png'
  },
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
          : mode === 'non-light'
            ? alpha > 16 && Math.min(data[offset], data[offset + 1], data[offset + 2]) < 220
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

const removeLightBackground = async (image) => {
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let offset = 0; offset < data.length; offset += 4) {
    const darkestChannel = Math.min(data[offset], data[offset + 1], data[offset + 2]);

    if (darkestChannel >= 238) {
      data[offset + 3] = 0;
    } else if (darkestChannel > 220) {
      data[offset + 3] = Math.round(data[offset + 3] * ((darkestChannel - 220) / 18));
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
};

const sharpenRgbPreserveAlpha = async (image, sigma) => {
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgb = Buffer.alloc(info.width * info.height * 3);

  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    rgb[targetOffset] = data[sourceOffset];
    rgb[targetOffset + 1] = data[sourceOffset + 1];
    rgb[targetOffset + 2] = data[sourceOffset + 2];
  }

  const sharpenedRgb = await sharp(rgb, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
    .sharpen(sigma)
    .raw()
    .toBuffer();

  const output = Buffer.alloc(data.length);
  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    output[sourceOffset] = sharpenedRgb[targetOffset];
    output[sourceOffset + 1] = sharpenedRgb[targetOffset + 1];
    output[sourceOffset + 2] = sharpenedRgb[targetOffset + 2];
    output[sourceOffset + 3] = data[sourceOffset + 3];
  }

  return sharp(output, { raw: { width: info.width, height: info.height, channels: 4 } });
};

const outputDirectory = 'assets/products/catalog';
await mkdir(outputDirectory, { recursive: true });

for (const product of products) {
  const bounds = await findContentBounds(product.source, product.contentMode);
  const cropped = sharp(product.source).extract(bounds);
  const foreground = product.backgroundMode === 'light'
    ? await removeLightBackground(cropped)
    : product.contentMode === 'non-white'
      ? await removeNearWhiteBackground(cropped)
      : cropped;
  const normalizedPipeline = foreground
    .resize({ ...PRODUCT_MAX, fit: 'inside', withoutEnlargement: false });
  const sharpened = product.sharpen
    ? await sharpenRgbPreserveAlpha(normalizedPipeline, product.sharpen)
    : normalizedPipeline;
  const normalized = await sharpened
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

  if (product.publicDestination) {
    await mkdir(path.dirname(product.publicDestination), { recursive: true });
    await copyFile(destination, product.publicDestination);
  }

  console.log(`${product.slug}: ${normalized.info.width}×${normalized.info.height}, baseline ${BASELINE_Y}px`);
}
