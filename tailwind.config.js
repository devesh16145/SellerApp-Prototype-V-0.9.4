/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#2B7A0B',
        'agri-yellow': '#FFDE00',
        'agri-gray': '#F5F5F5'
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}
