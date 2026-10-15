
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages 設定
  site: 'https://seraphforge.github.io',
  base: '/aeust-life',

  // 靜態網站輸出
  output: 'static',
  trailingSlash: 'never',

  build: {
    inlineStylesheets: 'never',
  },

  vite: {
    // Tailwind CSS v4
    plugins: [tailwindcss()],

    build: {
      assetsInlineLimit: 0,
    },

    // Windows npm Workspaces 相容性
    resolve: {
      preserveSymlinks: true,
    },

    // 本機開發 API
    server: {
      proxy: {
        '/api': 'http://127.0.0.1:8787',
      },
    },

    // 本機預覽 API
    preview: {
      proxy: {
        '/api': 'http://127.0.0.1:8787',
      },
    },
  },
});
