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

//? Returns a spread out array of ids
export function getIds() {
  return [...ids];
}

//? Returns a spread out array of newProjectsIds
export function getNewProjectsIds() {
  return [...newProjectsIds];
}

//? Adds delegated event listener to the dropdown so we can have enevt listeners on newly added projects
export function addEventListenerToDropdown() {
  const parentElement = getElement(DROPDOWN_SELECTOR);

  if (parentElement) {
    parentElement.addEventListener("click", handleDropdownClick);
  }
}

//? the event listener that will get added to the dropdown list item elements
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

//? the event listener that will get added to the new project list item elements
export function addNewProjectIfClicked(e) {
  e.stopPropagation();

  //> Modified so we can make use of both buttons to add new projects
  const ele = e.target.closest("[data-newProject]");
  if (ele) {
    createNewProject();
  }
}

//? Removes the new project from the list
function removeNewProject(e) {
  let element = e.target.closest("li");
  newProjectsIds = newProjectsIds.filter((id) => id !== element.id);

  element.remove();
}

//? Creates a new project and adds it to the ids array
function createNewProject() {
  const newId = generateNewProjectId();
  const newElement = createNewElement(newId);

  insertNewElement(newElement);
  newProjectsIds.push(newId);
}

//? Generates a new project id [ will later be changed into adding the id by the title of the project added by the user]
function generateNewProjectId() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `newProject-${randomNumber}`;
}

//? Creates a new list item element with an id provided by the above function
function createNewElement(newId) {
  const newTitle = generateNewProjectId();
  const newElement = document.createElement("li");
  newElement.id = newId;
  newElement.innerHTML = generateNewProjectElement(newTitle);

  return newElement;
}

//? Generates a new project list item element with classes and a title
function generateNewProjectElement(newTitle) {
  return `
        <div class="cursor-pointer flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
         hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700">${newTitle}
         <span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
         </span>
         </div>
        `;
}

//? Inserts the new element into the dropdown list
function insertNewElement(newElement) {
  const parentUl = getElement(DROPDOWN_SELECTOR);
  const newProjectLi = getElement(NEW_PROJECT_SELECTOR);

  parentUl.insertBefore(newElement, newProjectLi);
}
