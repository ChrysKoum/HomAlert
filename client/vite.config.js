// client/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Export Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    // If deploying to Vercel, output to 'dist'. Otherwise, output to Express 'public' for local dev.
    outDir: process.env.VERCEL ? 'dist' : path.resolve(__dirname, '../public'),
    emptyOutDir: !!process.env.VERCEL, // Clear output dir on Vercel
    manifest: true, // Generate manifest.json for asset mapping
  },
  css: {
    postcss: "./postcss.config.cjs", // Explicitly specify the PostCSS configuration file
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3005', // Proxy API requests to Express server
    },
  },
});
