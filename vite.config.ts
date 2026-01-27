import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      mangle: {
        reserved: ['lightCSS', 'LightCSS'],
        toplevel: true,
        keep_classnames: true
      },
      module: true
    },
    lib: {
      entry: './lib/main.ts',
      name: 'LightCSS',
      fileName: (format) => `light-css.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          LightCSS: 'lightCSS'
        }
      }
    }
  }
});

