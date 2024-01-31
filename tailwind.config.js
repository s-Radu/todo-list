/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  darkMode: "class",
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
  plugins: [],
};
