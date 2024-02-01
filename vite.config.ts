import { resolve } from 'path';

import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';

import { manifest } from './src/manifest';

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
        newtab: resolve(__dirname, 'src/newtab/index.html'),
        options: resolve(__dirname, 'src/options/index.html'),
      },
    },
  },
  plugins: [crx({ manifest })],
  server: { port: 3000, hmr: { port: 3000 } },
});
