const baseConfig = require('../../apps/web/tailwind.config.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./src/**/*.{ts,tsx}'],
};
