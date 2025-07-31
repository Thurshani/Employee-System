/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add "Inter" as default font
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5',   // indigo-600
          dark: '#4338ca',      // indigo-700
          light: '#e0e7ff',     // indigo-100
        },
        accent: {
          DEFAULT: '#14b8a6',   // teal-500 (for secondary use)
          dark: '#0d9488',      // teal-600
        },
      },
    },
  },
  plugins: [],
}
