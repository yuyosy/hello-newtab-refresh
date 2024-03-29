import { resolve } from 'path';

import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

import { manifest } from './src/manifest';

if (process.env.NODE_ENV === 'development') {
  manifest.name = `${manifest.name} [${process.env.NODE_ENV}]`;
}

process.env.VITE_APP_VERSION = JSON.stringify(process.env.npm_package_version).replace(
  /"/g,
  '',
);

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/dev',
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**, .git/**, dist/**, .vscode/**',
    },
    rollupOptions: {
      input: {
        newtab: resolve(__dirname, 'src/pages/newtab/index.html'),
        options: resolve(__dirname, 'src/pages/options/index.html'),
      },
    },
  },
  plugins: [crx({ manifest })],
  server: { port: 3000, hmr: { port: 3000 } },
});
