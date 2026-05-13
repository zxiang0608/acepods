import sharp from 'sharp';
import path from 'node:path';

const assetsDir = path.resolve('assets');
const canvasSize = 1200;
const targetFootprint = 0.8; // 80% visual footprint target
const targetSize = Math.round(canvasSize * targetFootprint);

const jobs = [
  ['hub-table.png', 'hub-table-normalized.png'],
  ['hub-centre-table-whiteboard.png', 'hub-centre-table-whiteboard-normalized.png'],
  ['POD images/TEAM POD 6 Seaters - Ace Meeting XL/All colours/Grey ash-01.png', 'grey-ash-01-normalized.png'],
  ['hub-table-sofa-whiteboard.png', 'hub-table-sofa-whiteboard-normalized.png']
];

const trimOpaqueBounds = (data, width, height, channels, alphaThreshold = 8) => {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a <= alphaThreshold) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
};

const isBackgroundLike = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const spread = max - min;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance >= 228 && spread <= 18;
};

const removeEdgeBackground = async (inputPath) => {
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

  for (let idx = 0; idx < pixelCount; idx++) {
    if (!visited[idx]) continue;
    data[idx * channels + 3] = 0;
  }

  return sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toBuffer();
};

for (const [inputRelativePath, outputName] of jobs) {
  const inputPath = path.join(assetsDir, inputRelativePath);
  const outputPath = path.join(assetsDir, outputName);
  const bgRemovedBuffer = await removeEdgeBackground(inputPath);
  const source = sharp(bgRemovedBuffer).ensureAlpha();
  const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
  const bounds = trimOpaqueBounds(data, info.width, info.height, info.channels);

  if (!bounds) {
    throw new Error(`No visible content after background removal for ${inputRelativePath}`);
  }

  const cropped = source.extract(bounds);
  const scale = Math.min(targetSize / bounds.width, targetSize / bounds.height);
  const outW = Math.max(1, Math.round(bounds.width * scale));
  const outH = Math.max(1, Math.round(bounds.height * scale));
  const left = Math.round((canvasSize - outW) / 2);
  const top = Math.round((canvasSize - outH) / 2);

  const resized = await cropped.resize(outW, outH, { fit: 'contain', kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resized, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`${inputRelativePath} -> ${outputName} | cropped=${bounds.width}x${bounds.height} scaled=${outW}x${outH} canvas=${canvasSize}x${canvasSize}`);
}
