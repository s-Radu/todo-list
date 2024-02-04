/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./dist/*.html",
    "./src/*.js",
    "./node_modules/flowbite/**/*.js",
    {
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
    },
  ],
  darkMode: "class",

  theme: {
    extend: {
      gridTemplateRows: {
        autoFill: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
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
      variants: {
        extend: {
          opacity: ["hover", "focus"],
        },
      },
    },
  },
  purge: ["./dist/**/*.html", "./src/**/*.js"],
  plugins: [require("flowbite/plugin")],
};
