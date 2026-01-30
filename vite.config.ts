import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
    rollupTypes: true,
    outDir: './',
    entryRoot: 'lib',
    include: ['lib/**/*']
  })],
  build: {
    sourcemap: false,
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

