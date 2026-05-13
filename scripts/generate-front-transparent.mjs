import sharp from 'sharp';
import path from 'node:path';

const files = [
  'ace-flex-duo-front.png',
  'ace-flex-front.png',
  'ace-hub-front.png',
  'ace-meet-front.png',
  'ace-plus-front.png'
];

const assetsDir = path.resolve('assets');

const isBackgroundLike = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Light neutral background tones only (not colored pod parts).
  return luminance >= 228 && spread <= 18;
};

for (const name of files) {
  const inputPath = path.join(assetsDir, name);
  const outputPath = path.join(assetsDir, name.replace('.png', '-transparent.png'));

  const image = sharp(inputPath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const pixelCount = width * height;
  const visited = new Uint8Array(pixelCount);
  const queue = new Uint32Array(pixelCount);
  let qh = 0;
  let qt = 0;

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;

    const offset = idx * channels;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];

    if (a === 0) {
      visited[idx] = 1;
      return;
    }

    if (!isBackgroundLike(r, g, b)) return;

    visited[idx] = 1;
    queue[qt++] = idx;
  };

  // Seed flood-fill from all edges so only edge-connected background is removed.
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (qh < qt) {
    const idx = queue[qh++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  let removed = 0;
  for (let idx = 0; idx < pixelCount; idx++) {
    if (!visited[idx]) continue;
    const offset = idx * channels;
    data[offset + 3] = 0;
    removed++;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const pct = ((removed / pixelCount) * 100).toFixed(2);
  console.log(`${name} -> ${path.basename(outputPath)} (removed edge-bg pixels: ${removed}/${pixelCount}, ${pct}%)`);
}
