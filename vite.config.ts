import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './lib/main.ts',
      name: 'LightCSS',
      fileName: 'light-css'
    }
  }
});

