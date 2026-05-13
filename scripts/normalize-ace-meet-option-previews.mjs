import sharp from 'sharp';
import path from 'node:path';

const assetsDir = path.resolve('assets');
const canvasSize = 1200;
const targetFootprint = 0.8; // 80% of canvas
const targetSize = Math.round(canvasSize * targetFootprint);

const jobs = [
  ['meet-table-transparent.png', 'meet-table-normalized.png'],
  ['meet-adjustable-transparent.png', 'meet-adjustable-normalized.png'],
  ['meet-table-whiteboard-transparent.png', 'meet-table-whiteboard-normalized.png'],
  ['grey-ash-transparent.png', 'grey-ash-normalized.png'],
  ['meet-sofa-table-whiteboard-transparent.png', 'meet-sofa-table-whiteboard-normalized.png'],
  ['office-chair.png', 'office-chair-normalized.png'],
  ['sofa.png', 'sofa-normalized.png']
];

const trimTransparentBounds = (data, width, height, channels, alphaThreshold = 8) => {
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

for (const [inputName, outputName] of jobs) {
  const inputPath = path.join(assetsDir, inputName);
  const outputPath = path.join(assetsDir, outputName);

  const source = sharp(inputPath).ensureAlpha();
  const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
  const bounds = trimTransparentBounds(data, info.width, info.height, info.channels);

  if (!bounds) {
    throw new Error(`No visible alpha content found for ${inputName}`);
  }

  const cropped = source.extract(bounds);
  const scale = Math.min(targetSize / bounds.width, targetSize / bounds.height);
  const outW = Math.max(1, Math.round(bounds.width * scale));
  const outH = Math.max(1, Math.round(bounds.height * scale));
  const left = Math.round((canvasSize - outW) / 2);
  const top = Math.round((canvasSize - outH) / 2);

  const resizedBuffer = await cropped
    .resize(outW, outH, { fit: 'contain', kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedBuffer, left, top }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`${inputName} -> ${outputName} | cropped=${bounds.width}x${bounds.height} scaled=${outW}x${outH} canvas=${canvasSize}x${canvasSize}`);
}
