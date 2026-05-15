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
        keep_classnames: true, // 保留类名（关键：Safari 对类名压缩敏感）
        keep_fnames: true // 保留函数名（尤其是构造函数）
      },
      compress: {
        keep_classnames: true, // 压缩时也保留类名
        keep_fnames: true // 压缩时保留函数名
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

