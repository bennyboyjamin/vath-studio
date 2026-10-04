/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        secondary: '#EC4899',
        dark: '#0F172A',
      },
      fontFamily: {
        sans: ['Noto Sans Lao', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
