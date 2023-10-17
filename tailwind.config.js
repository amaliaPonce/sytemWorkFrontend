/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#607D8B',
      },
      fontFamily: {
        'staatliches': ['Staatliches', 'sans'],
      },
    },
  },
  plugins: [],
}
