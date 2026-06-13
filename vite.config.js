import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { existsSync } from 'node:fs';

const optimizedRasterImports = () => ({
  name: 'optimized-raster-imports',
  enforce: 'pre',
  resolveId(source, importer) {
    if (!importer || !/\.(png|jpe?g)$/i.test(source)) return null;
    const sourcePath = path.resolve(path.dirname(importer), source);
    const assetsRoot = path.resolve('assets');
    const relativePath = path.relative(assetsRoot, sourcePath);
    if (relativePath.startsWith('..')) return null;

    const optimizedPath = path.join(assetsRoot, '.optimized', `${relativePath}.webp`);
    return existsSync(optimizedPath) ? optimizedPath : null;
  }
});

export default defineConfig({
  plugins: [optimizedRasterImports(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
