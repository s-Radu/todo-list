import { getElement } from "./utilis";

const DROPDOWN_SELECTOR = "#dropdown-example";
const NEW_PROJECT_SELECTOR = "#newProject";

let ids = [
  "home",
  "projects",
  "allProjects",
  "active",
  "completed",
  "notes",
  "newProject",
];

let newProjectsIds = [
  "newProject-something",
  "newProject-test",
  "newProject-dummy",
];

export function getIds() {
  return [...ids];
}

export function getNewProjectsIds() {
  return [...newProjectsIds];
}

export function addEventListenerToDropdown() {
  const parentElement = getElement(DROPDOWN_SELECTOR);

  if (parentElement) {
    parentElement.addEventListener("click", handleDropdownClick);
  }
}

function handleDropdownClick(e) {
  let ele = e.target.closest("li");
  if (ele) {
    newProjectsIds.forEach((id) => {
      if (ele.id === id) {
        removeNewProject(e);
      }
    });
  }
}

export function addNewProjectIfClicked(e) {
  e.stopPropagation();

  const ele = e.target.closest(NEW_PROJECT_SELECTOR);
  if (ele) {
    createNewProject();
  }
}

function removeNewProject(e) {
  let element = e.target.closest("li");
  newProjectsIds = newProjectsIds.filter((id) => id !== element.id);

  element.remove();
}

function createNewProject() {
  const newId = generateNewProjectId();
  const newElement = createNewElement(newId);

  insertNewElement(newElement);
  newProjectsIds.push(newId);
}

function generateNewProjectId() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `newProject-${randomNumber}`;
}

function createNewElement(newId) {
  const newTitle = generateNewProjectId();
  const newElement = document.createElement("li");
  newElement.id = newId;
  newElement.innerHTML = generateNewProjectElement(newTitle);

  return newElement;
}

function generateNewProjectElement(newTitle) {
  return `
        <a href="#" class="flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
         hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700">${newTitle}
         <span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
         </span>
         </a>
        `;
}

function insertNewElement(newElement) {
  const parentUl = getElement("#dropdown-example");
  const newProjectLi = getElement("#newProject");

  parentUl.insertBefore(newElement, newProjectLi);
}
