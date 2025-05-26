// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Vite's root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // React components
    './views/**/*.ejs', // EJS templates
    './public/**/*.html', // Any other HTML files
  ],
  darkMode: 'class', 
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
  server: {
    port: 5173, 
  },
  build: {
    outDir: '../public/assets', 
    emptyOutDir: true,          
  },
};
