/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Trebuchet MS", "sans-serif"],
        serif: ["Georgia", "serif"],
        handwritting: ["Caveat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
