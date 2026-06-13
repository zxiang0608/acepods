import path from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import sharp from 'sharp';

const ROOT_DIRECTORIES = ['public', 'assets'];
const JPEG_EXTENSION = /\.jpe?g$/i;
const GALLERY_BASENAME = /^(IMG-|20(?:25|26)\d|everllence-|bangsar-|shah-alam-|subang-jaya-|kuala-lumpur-|flexduo|id-candy-)/i;

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    })
  );

  return files.flat();
};

const isGalleryPhoto = (filePath) => {
  const normalizedPath = filePath.split(path.sep).join('/');
  if (!JPEG_EXTENSION.test(normalizedPath)) return false;

  return (
    normalizedPath.startsWith('assets/Portfolio/') ||
    normalizedPath.startsWith('assets/POD images/Installation pictures/') ||
    GALLERY_BASENAME.test(path.basename(normalizedPath))
  );
};

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const run = async () => {
  const files = (await Promise.all(ROOT_DIRECTORIES.map(walk))).flat().filter(isGalleryPhoto).sort();

  for (const sourcePath of files) {
    const outputPath = sourcePath.replace(JPEG_EXTENSION, '.avif');

    try {
      await stat(outputPath);
      console.log(`skip ${sourcePath} (AVIF exists)`);
      continue;
    } catch {
      // Continue when the AVIF counterpart does not exist.
    }

    const originalSize = (await stat(sourcePath)).size;
    await sharp(sourcePath).avif({ quality: 65 }).toFile(outputPath);
    const convertedSize = (await stat(outputPath)).size;

    console.log(`${sourcePath}: ${formatSize(originalSize)} -> ${formatSize(convertedSize)}`);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
