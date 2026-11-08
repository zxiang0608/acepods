import { access, copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// These are transparent derivatives of the approved Supreme gallery images.
// The source files remain unchanged; this pass creates an alpha matte for the
// flat studio background and applies a restrained RGB-only sharpen while
// preserving the original alpha edges.
const jobs = [
  {
    input: 'assets/products/ace-pod-one/gallery/supreme-satu-front.png',
    output: 'assets/products/ace-pod-one/gallery/ace-pod-one-front.png',
    background: { r: 230, g: 230, b: 230 },
    tolerance: 4,
    feather: 12,
    sharpen: 0.5
  },
  {
    input: 'assets/products/ace-pod-one/gallery/supreme-satu-angle.png',
    output: 'assets/products/ace-pod-one/gallery/ace-pod-one-angle.png',
    background: { r: 255, g: 255, b: 255 },
    tolerance: 5,
    feather: 18,
    sharpen: 0.5
  },
  {
    input: 'assets/products/ace-pod-four/gallery/supreme-quattro-front.png',
    output: 'assets/products/ace-pod-four/gallery/ace-pod-four-front.png',
    background: { r: 255, g: 255, b: 255 },
    tolerance: 5,
    feather: 18,
    sharpen: 0.5
  },
  {
    input: 'assets/products/ace-pod-four/gallery/supreme-quattro-angle.png',
    output: 'assets/products/ace-pod-four/gallery/ace-pod-four-angle.png',
    background: { r: 255, g: 255, b: 255 },
    tolerance: 5,
    feather: 18,
    sharpen: 0.5
  }
];

const makeTransparent = async (job) => {
  const { data, info } = await sharp(job.input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { r: backgroundR, g: backgroundG, b: backgroundB } = job.background;
  const featherEnd = job.tolerance + job.feather;

  for (let offset = 0; offset < data.length; offset += 4) {
    const distance = Math.max(
      Math.abs(data[offset] - backgroundR),
      Math.abs(data[offset + 1] - backgroundG),
      Math.abs(data[offset + 2] - backgroundB)
    );

    if (distance <= job.tolerance) {
      data[offset + 3] = 0;
    } else if (distance < featherEnd) {
      data[offset + 3] = Math.round(255 * ((distance - job.tolerance) / job.feather));
    }
  }

  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    rgb[targetOffset] = data[sourceOffset];
    rgb[targetOffset + 1] = data[sourceOffset + 1];
    rgb[targetOffset + 2] = data[sourceOffset + 2];
  }

  const sharpenedRgb = await sharp(rgb, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
    .sharpen(job.sharpen)
    .raw()
    .toBuffer();

  const output = Buffer.alloc(data.length);
  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    output[sourceOffset] = sharpenedRgb[targetOffset];
    output[sourceOffset + 1] = sharpenedRgb[targetOffset + 1];
    output[sourceOffset + 2] = sharpenedRgb[targetOffset + 2];
    output[sourceOffset + 3] = data[sourceOffset + 3];
  }

  await mkdir(path.dirname(job.output), { recursive: true });
  await sharp(output, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(job.output);

  console.log(`${job.input} -> ${job.output}`);
};

for (const job of jobs) {
  await makeTransparent(job);
}

// These approved customer-facing images are not generated from the flat studio
// sources above, so derive sharpened published versions from preserved internal
// originals while preserving their alpha channels.
const approvedDerivativeJobs = [
  {
    input: 'assets/products/ace-pod-four/source/ace-pod-four-lifestyle.png',
    output: 'assets/products/ace-pod-four/gallery/ace-pod-four-lifestyle.png',
    sharpen: 0.5
  },
  {
    input: 'assets/products/ace-pod-one/source/ace-pod-one-dimensions.png',
    output: 'assets/products/ace-pod-one/technical-drawing/ace-pod-one-dimensions.png',
    sharpen: 0.5
  },
  {
    input: 'assets/products/ace-pod-four/source/ace-pod-four-dimensions.png',
    output: 'assets/products/ace-pod-four/technical-drawing/ace-pod-four-dimensions.png',
    sharpen: 0.5
  }
];

const ensureInternalSource = async (job) => {
  try {
    await access(job.input);
  } catch {
    await mkdir(path.dirname(job.input), { recursive: true });
    await copyFile(job.output, job.input);
  }
};

const sharpenApprovedImage = async (job) => {
  const { data, info } = await sharp(job.input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgb = Buffer.alloc(info.width * info.height * 3);

  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    rgb[targetOffset] = data[sourceOffset];
    rgb[targetOffset + 1] = data[sourceOffset + 1];
    rgb[targetOffset + 2] = data[sourceOffset + 2];
  }

  const sharpenedRgb = await sharp(rgb, {
    raw: { width: info.width, height: info.height, channels: 3 }
  })
    .sharpen(job.sharpen)
    .raw()
    .toBuffer();

  const output = Buffer.alloc(data.length);
  for (let sourceOffset = 0, targetOffset = 0; sourceOffset < data.length; sourceOffset += 4, targetOffset += 3) {
    output[sourceOffset] = sharpenedRgb[targetOffset];
    output[sourceOffset + 1] = sharpenedRgb[targetOffset + 1];
    output[sourceOffset + 2] = sharpenedRgb[targetOffset + 2];
    output[sourceOffset + 3] = data[sourceOffset + 3];
  }

  const encoded = await sharp(output, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(job.output, encoded);
  console.log(`${job.input} -> ${job.output}`);
};

for (const job of approvedDerivativeJobs) {
  await ensureInternalSource(job);
  await sharpenApprovedImage(job);
}
