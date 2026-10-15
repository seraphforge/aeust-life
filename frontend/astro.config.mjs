import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  output: 'static',
  build: { inlineStylesheets: 'never' },
  trailingSlash: 'never',
  vite: {
    build: { assetsInlineLimit: 0 },
    // Keep workspace paths intact; avoids Windows mapped-drive probing in Vite.
    resolve: { preserveSymlinks: true },
    css: { postcss: { plugins: [tailwindcss()] } },
    server: { proxy: { '/api': 'http://127.0.0.1:8787' } },
    preview: { proxy: { '/api': 'http://127.0.0.1:8787' } },
  },
});
