/** @type {import('tailwindcss').Config} */

const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{html,ts}'),
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
      },
    },
  },
  plugins: [],
};
