import "./style.css";
import "flowbite";
import "./darkMode.js";

//> module imports
import { getElement } from "./utilis";
import { toggleDarkMode } from "./darkMode";
import { getUserName } from "./drawer";
import nav from "./nav";
import drawer from "./drawer";
import home from "./home";

//! IIFE

(function () {
  //> Content Page
  const content = document.getElementById("content");

  //> Append elements
  content.appendChild(nav());
  content.appendChild(drawer());
  content.appendChild(home());

  //> DOM elements
  let darkModeToggle = getElement("#toggle");

  //> Event listeners

  darkModeToggle.addEventListener("click", toggleDarkMode);

  //> Functions
  // getUserName(); //> Will be put back to work as soon as we got things moving better

  //? this is how we delegate the event listener for the parent element of each drawer option

  document.addEventListener("click", (e) => {
    if (e.target.closest("#home")) {
      console.log("works");
    }
  });
})();
