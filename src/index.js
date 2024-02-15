import "./style.css";
import "flowbite";
import "./darkMode.js";

//> module imports
import { getElement } from "./utilis";
import { toggleDarkMode } from "./darkMode";
import * as newProjects from "./newProjects";
import { getUserName } from "./drawer";
import nav from "./nav";
import navDrawer from "./drawer";
import newProjectModal from "./newProjectModal";
import homePage from "./home";
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
  // parentElement.appendChild(projectsPage());
  // parentElement.appendChild(activeProjectsPage());
  // parentElement.appendChild(completedProjectsPage());
  // parentElement.appendChild(notesPage());
  parentElement.appendChild(newProjectModal());
  parentElement.appendChild(footer());

  //> DOM elements
  let darkModeToggle = getElement(TOGGLE_SELECTOR);
  const newProjectElements = getElement("[data-newProject]", true);

  //> Event listeners
  darkModeToggle.addEventListener("click", toggleDarkMode);

  //? Adds the event listener to both our buttons

  //> Functions
  // getUserName(); //> Will be put back to work as soon as we got things moving better
})();
