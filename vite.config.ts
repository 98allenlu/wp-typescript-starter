import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./assets/public/src', import.meta.url)),
      '@imports': fileURLToPath(new URL('./assets/public/src/imports', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});