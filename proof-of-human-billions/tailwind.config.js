/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0B5FFF',
        brandDark: '#0045E5',
        brandLight: '#E6F0FF',
      },
    },
  },
  plugins: [],
}
