import { getElement } from "./utilis";

let circle;

function updateTheme(isDarkMode) {
  const html = document.querySelector("html");

  circle.classList.toggle("translate-x-5", isDarkMode);
  html.classList.toggle("dark", isDarkMode);
}

function setInitialTheme() {
  circle = getElement("#circle");

  const isDarkMode =
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  updateTheme(isDarkMode);
}

export function toggleDarkMode() {
  const isDarkMode = !circle.classList.contains("translate-x-5");

  updateTheme(isDarkMode);

  //? Update the color-theme in localStorage
  localStorage.setItem("color-theme", isDarkMode ? "dark" : "light");
}

//! Call the functions after the page has finished loading
window.onload = function () {
  setInitialTheme();
};
