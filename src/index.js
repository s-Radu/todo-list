import "./style.css";
import "flowbite";
import "./darkMode.js";

//? Eveything from below will have to be restructured, for not we just test if they work and how it looks
//> module imports
import nav from "./nav.js";

//> DOM elements
const content = document.getElementById("content");

//> Append elements
content.appendChild(nav());

//> Event listeners

content.addEventListener("mouseover", (e) => {
  _handleNavPageHover(e);
});
content.addEventListener("mouseout", (e) => {
  _handleNavPageHover(e);
});
document.addEventListener("DOMContentLoaded", () => {
  _handlePageChangeTxt();
});

//> Functions

let span = document.createElement("span");
span.className = "font-josefin text-2xl text-gray-700 dark:text-gray-500";

function _handlePageChangeTxt() {
  let currentPage = content.querySelector('a[aria-current="page"]');

  if (currentPage) {
    span.textContent = `${currentPage.getAttribute("data-page")} `;
    currentPage.insertBefore(span, currentPage.firstChild);
  }
}

function _handleNavPageHover(e) {
  if (e.target === span) return;

  if (e.target.hasAttribute("data-page")) {
    if (e.type === "mouseover") {
      span.textContent = `${e.target.getAttribute("data-page")} `;
      e.target.insertBefore(span, e.target.firstChild);
    } else if (e.type === "mouseout" && e.relatedTarget !== span) {
      e.target.removeChild(span);
    }
  }
}
