/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo 2', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".animate-in": {
          animation: "fadeIn 0.3s ease-in-out",
        },
        ".fade-in-80": {
          opacity: "0.8",
        },
        ".zoom-in-95": {
          transform: "scale(0.95)",
        },
      });
    }),
  ],
}

  
