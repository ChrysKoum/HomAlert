// client/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Export Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../public'), // Output to Express's public directory
    emptyOutDir: false, // Prevent Vite from deleting existing files in public
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
