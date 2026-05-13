import sharp from 'sharp';
import path from 'node:path';

const mappings = [
  ['meet-table.png', 'meet-table-transparent.png'],
  ['meet-adjustable.png', 'meet-adjustable-transparent.png'],
  ['meet-table-whiteboard.png', 'meet-table-whiteboard-transparent.png'],
  ['POD images/Team Pod 4 seater - Ace Meeting/All colours/Grey ash.png', 'grey-ash-transparent.png'],
  ['meet-sofa-table-whiteboard.webp', 'meet-sofa-table-whiteboard-transparent.png']
];

const assetsDir = path.resolve('assets');

const isBackgroundLike = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance >= 228 && spread <= 18;
};

for (const [inputRelativePath, outputName] of mappings) {
  const inputPath = path.join(assetsDir, inputRelativePath);
  const outputPath = path.join(assetsDir, outputName);

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
    data[idx * channels + 3] = 0;
    removed++;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const pct = ((removed / pixelCount) * 100).toFixed(2);
  console.log(`${inputRelativePath} -> ${outputName} (removed edge-bg: ${removed}/${pixelCount}, ${pct}%)`);
}
