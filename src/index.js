import "./style.css";
import "flowbite";
import "./darkMode.js";

//> module imports
import { getElement } from "./utilis";
import { toggleDarkMode } from "./darkMode";
//TODO if we delete import newProjects the code will not work because webpack will not bundle the file, so we need to bring the final function here in order to add it to an event listener so it will work
import { getFormData } from "./newProjects";
import { getUserName } from "./drawer";
import nav from "./nav";
import navDrawer from "./drawer";
import newProjectModal from "./newProjectModal";
import homePage, { setupSubscriptions } from "./home";
import projectsPage from "./allProjects";
import activeProjectsPage from "./activeProjects";
import completedProjectsPage from "./completedProjects";
import notesPage from "./notes";
import footer from "./footer";

//! IIFE

(function () {
  const TOGGLE_SELECTOR = "#toggle";

  //> Content Page
  const parentElement = document.getElementById("content");

  //> Append elements
  parentElement.appendChild(nav());
  parentElement.appendChild(navDrawer());
  parentElement.appendChild(homePage());
  // setupSubscriptions();
  parentElement.appendChild(projectsPage());
  parentElement.appendChild(activeProjectsPage());
  parentElement.appendChild(completedProjectsPage());
  parentElement.appendChild(notesPage());
  parentElement.appendChild(newProjectModal());
  parentElement.appendChild(footer());

  //> DOM elements
  let darkModeToggle = getElement(TOGGLE_SELECTOR);

  let ids = ["home", "allProjects", "active", "completed", "notes"];

  //> Event listeners
  darkModeToggle.addEventListener("click", toggleDarkMode);

  //? Adds the event listener to both our buttons

  //> Functions
  // getUserName(); //> Will be put back to work as soon as we got things moving better

  ids.forEach((id) => {
    getElement(`#${id}`).addEventListener("click", (e) => {
      const pages = [
        "homePage",
        "allProjectsPage",
        "activePage",
        "completedPage",
        "notesPage",
      ];

      pages.forEach((page) => {
        if (page === `${id}Page`) {
          getElement(`#${page}`).classList.remove("hidden");
        } else {
          getElement(`#${page}`).classList.add("hidden");
        }
      });
    });
  });

  //* Add event listener to the new project button

  //> Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true };

  //> Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const submitButton = getElement("[data-submit");
        if (submitButton) {
          submitButton.addEventListener("click", getFormData);
          observer.disconnect(); //> Stop observing once the element is found
        }
      }
    }
  };

  //> Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  //> Start observing the target node for configured mutations
  observer.observe(parentElement, config);
})();
