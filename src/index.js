import "./style.css";
import "flowbite";
import "./darkMode.js";

//> module imports
import { getElement } from "./utilis";
import { toggleDarkMode } from "./darkMode";
import * as newProjects from "./newProjects";
import { getUserName } from "./drawer";
import nav from "./nav";
import drawer from "./drawer";
import home from "./home";

//! IIFE

(function () {
  const TOGGLE_SELECTOR = "#toggle";

  //> Content Page
  const content = document.getElementById("content");

  //> Append elements
  content.appendChild(nav());
  content.appendChild(drawer());
  content.appendChild(home());

  //> DOM elements
  let darkModeToggle = getElement(TOGGLE_SELECTOR);

  //> Event listeners
  darkModeToggle.addEventListener("click", toggleDarkMode);

  //> Functions
  // getUserName(); //> Will be put back to work as soon as we got things moving better

  newProjects.getIds().forEach((id) => {
    const element = getElement(`#${id}`);

    if (element) {
      element.addEventListener("click", newProjects.addNewProjectIfClicked);
    }
  });

  newProjects.addEventListenerToDropdown();
})();
