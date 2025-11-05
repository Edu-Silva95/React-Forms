module.exports = {
  // Use the new PostCSS adapter package for Tailwind
  // so Vite/PostCSS can load the plugin correctly.
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
