import sharp from 'sharp';

const EXPECTED_CANVAS = { width: 1600, height: 1200 };
const EXPECTED_VISIBLE_HEIGHT = 1000;
const EXPECTED_BASELINE = 1100;

const catalogueFiles = [
  'assets/products/catalog/ace-uno.png',
  'assets/products/catalog/ace-uno-homepage-front.png',
  'assets/products/catalog/ace-uno-pine-green.png',
  'assets/products/catalog/ace-uno-shadow-grey.png',
  'assets/products/catalog/ace-uno-dusty-turquoise.png',
  'assets/products/catalog/ace-plus.png',
  'assets/products/catalog/ace-flex.png',
  'assets/products/catalog/ace-flex-duo.png',
  'assets/products/catalog/ace-meet.png',
  'assets/products/catalog/ace-hub.png'
];

const getVisibleBounds = async (file) => {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let top = info.height;
  let bottom = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * 4 + 3] <= 16) continue;
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  if (bottom < top) throw new Error(`${file} has no visible product pixels`);
  return { width: info.width, height: info.height, top, bottom, visibleHeight: bottom - top + 1 };
};

const failures = [];

for (const file of catalogueFiles) {
  try {
    const bounds = await getVisibleBounds(file);
    if (bounds.width !== EXPECTED_CANVAS.width || bounds.height !== EXPECTED_CANVAS.height) {
      failures.push(`${file}: expected ${EXPECTED_CANVAS.width}x${EXPECTED_CANVAS.height} canvas, got ${bounds.width}x${bounds.height}`);
    }
    if (bounds.visibleHeight !== EXPECTED_VISIBLE_HEIGHT) {
      failures.push(`${file}: expected ${EXPECTED_VISIBLE_HEIGHT}px visible height, got ${bounds.visibleHeight}px`);
    }
    if (bounds.bottom + 1 !== EXPECTED_BASELINE) {
      failures.push(`${file}: expected baseline y=${EXPECTED_BASELINE}, got y=${bounds.bottom + 1}`);
    }
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error('Product media validation failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated ${catalogueFiles.length} catalogue images: shared canvas, visible height, and baseline match.`);
