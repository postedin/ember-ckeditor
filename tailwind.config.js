/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./tests/dummy/app/**/*.{html,js,ts,hbs}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
