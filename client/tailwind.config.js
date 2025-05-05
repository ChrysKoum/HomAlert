// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Vite's root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // React components
    './views/**/*.ejs', // EJS templates
    './public/**/*.html', // Any other HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
  server: {
    port: 5173, // Default dev server port
  },
  build: {
    outDir: '../public/assets', // Output directory for production build
    emptyOutDir: true,          // Clean the directory before building
  },
};
