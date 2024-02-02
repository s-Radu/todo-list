/** @type {import('tailwindcss').Config} */
const safelist = require("./safelist");

module.exports = {
  mode: "jit",
  content: ["./dist/*.html", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  safelist: [safelist],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      fontFamily: {
        josefin: "Josefin Sans, sans-serif",
        nunito: "Nunito, sans-serif",
        montserrat: "Montserrat, sans-serif",
      },
      boxShadow: {
        button: "0 0 64px -10px rgba(0,0,0,0.7)",
      },
    },
    variants: {
      extend: {
        opacity: ["hover", "focus"],
      },
    },
  },
  purge: ["./dist/**/*.html", "./src/**/*.js"],
  plugins: [require("flowbite/plugin")],
};
