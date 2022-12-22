/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': 'Roboto'
      },
      maxWidth: {
        'xm': '22.5rem'
      },
      minWidth: {
        'xs': '15rem'
      }
    },
  },
  plugins: [],
}
