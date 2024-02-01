/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  safelist: [
    "w-64",
    "w-1/2",
    "rounded-l-lg",
    "rounded-r-lg",
    "bg-gray-200",
    "grid-cols-4",
    "grid-cols-7",
    "h-6",
    "leading-6",
    "h-9",
    "leading-9",
    "shadow-lg",
  ],
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
    },
  },
  purge: ["./dist/**/*.html", "./src/**/*.js"],
  plugins: [require("flowbite/plugin")],
};
