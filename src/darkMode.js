import { getElement } from "./utilis";

export default (function darkMode() {
  //* On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

export function toggleDarkMode() {
  const circle = getElement("#circle");
  const html = document.querySelector("html");

  const isDarkMode = circle.classList.contains("translate-x-5");

  circle.classList.toggle("translate-x-5", !isDarkMode);
  html.classList.toggle("dark", !isDarkMode);
}
