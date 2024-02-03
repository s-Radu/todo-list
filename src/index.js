import "./style.css";
import "flowbite";
import "./darkMode.js";

//? Eveything from below will have to be restructured, for not we just test if they work and how it looks

import nav from "./nav.js";
const content = document.getElementById("content");

content.appendChild(nav());

document.addEventListener("mouseover", (e) => {
  _handleNavPageHover(e);
});
document.addEventListener("mouseout", (e) => {
  _handleNavPageHover(e);
});

let span = document.createElement("span");
span.className = "font-josefin text-2xl text-gray-700 dark:text-gray-500";

function _handleNavPageHover(e) {
  if (e.target.hasAttribute("data-page")) {
    if (e.type === "mouseover") {
      span.textContent = `${e.target.getAttribute("data-page")} `;
      e.target.insertBefore(span, e.target.firstChild);
    } else if (e.type === "mouseout") {
      e.target.removeChild(span);
    }
  }
}
