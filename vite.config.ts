import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        custom: path.resolve(__dirname, 'public/assets/js/custom.js')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const normalizedName = assetInfo.name.replace('public/', '');
          
          if (normalizedName.includes('custom.js')) {
            return 'assets/js/custom.js';
          }
          
          const extType = normalizedName.split('.').at(1);
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            if (normalizedName.includes('images/')) {
              return normalizedName;
            }
            return `assets/images/${path.basename(normalizedName)}`;
          }
          
          if (extType === 'css') {
            if (normalizedName.includes('css/')) {
              return normalizedName;
            }
            return `assets/css/[name]-[hash][extname]`;
          }
          
          if (extType === 'js') {
            if (normalizedName.includes('js/')) {
              return normalizedName;
            }
            return `assets/js/[name]-[hash][extname]`;
          }
          
          return `assets/${path.basename(normalizedName)}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  base: './',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets'),
      crypto: 'crypto-browserify' // <-- Moved here
    }
  }
});