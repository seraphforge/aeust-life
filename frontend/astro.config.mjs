import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://seraphforge.github.io',
  base: '/aeust-life',

  output: 'static',
  trailingSlash: 'always',

  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },

  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
    resolve: { preserveSymlinks: true },

    server: {
      proxy: { '/api': 'http://127.0.0.1:8787' },
    },
    preview: {
      proxy: { '/api': 'http://127.0.0.1:8787' },
    },
  },
});