import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    insertTypesEntry: true,
    rollupTypes: true,
    tsconfigPath: './tsconfig.json',
    outDir: 'dist',
    entryRoot: 'src',
    include: ['src/**/*']
  })],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      mangle: {
        reserved: ['lightCSS', 'LightCSS'],
        toplevel: true,
        keep_classnames: true,
        keep_fnames: true
      },
      compress: {
        keep_classnames: true,
        keep_fnames: true
      },
      module: true
    },
    lib: {
      entry: './src/index.ts',
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

