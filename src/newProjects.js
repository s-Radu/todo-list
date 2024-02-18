import { getElement } from "./utilis";
import { add, format } from "date-fns";
import pubsub from "./utilis.js";

const DROPDOWN_SELECTOR = "#dropdown-example";
const NEW_PROJECT_SELECTOR = "#newProject";

//? Removes the new project from the list
function removeNewProject(e) {
  let projectId = e.target.closest("div.project-item").dataset.projectId;

  // Remove the project from the projects array
  projects = projects.filter((project) => {
    return generateNewProjectId(project.name) !== projectId;
  });
  pubsub.publish("projectsUpdated", projects.length);

  // Remove the project from the navbar and the page
  const projectElements = document.querySelectorAll(
    `[data-project-id="${projectId}"]`
  );
  projectElements.forEach((element) => {
    element.remove();
  });
}

//? Generates a new project id based on the name provided in the form
function generateNewProjectId(name) {
  return `${name.replace(/\s+/g, "-").toLowerCase()}`;
}

//? Creates a new list item element with an id and title provided by the form
function createNewNavProject(newId, newTitle) {
  const newElement = document.createElement("div");
  newElement.dataset.projectId = newId;
  newElement.className = `project-item cursor-pointer flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700`;
  newElement.innerHTML = `${newTitle}
          <span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
         </span>
         `;

  return newElement;
}

//? Inserts the new element into the dropdown list
function insertNewElement(newElement) {
  const parentUl = getElement(DROPDOWN_SELECTOR);
  const newProjectLi = getElement(NEW_PROJECT_SELECTOR);

  parentUl.insertBefore(newElement, newProjectLi);
}

function createNewProjectElement(project) {
  const newId = generateNewProjectId(project.name);
  const newElement = createNewNavProject(newId, project.name);

  //! Add an event listener to the new project element
  newElement.addEventListener("click", removeNewProject);

  return newElement;
}
function appendNewProjectElementToNav(newElement) {
  insertNewElement(newElement);
}

//? get data from the form

let projects = [];

export function getFormData(e) {
  e.preventDefault();

  const modalEl = getElement("#crud-modal");
  const modal = FlowbiteInstances.getInstance("Modal", "crud-modal");
  const form = modalEl.querySelector("form");
  const name = form.querySelector("#name").value;
  const date = form.querySelector("#date").value;
  const category = form.querySelector("#category").value;
  const description = form.querySelector("#description").value;

  if (name === "" || date === "" || category === "") {
    alert("Please fill in all the fields");
  } else {
    const newProject = { name, date, category, description };
    projects.push(newProject);
    pubsub.publish("projectsUpdated", projects.length);
    form.reset();
    modal.hide();

    //? Create a new project element with the data provided in the form
    const newElement = createNewProjectElement(newProject);

    //* Append the new project element to the DOM
    appendNewProjectElementToNav(newElement);

    const str = format(date, "EEEE, d MMMM yyyy");
    addNewProjectToDOM(name, description, str, category, name);
  }
}

// setTimeout(() => {
//   const submitButton = getElement("[data-submit");
//   submitButton.addEventListener("click", getFormData);
//   console.log("event added");
// }, 100);

//? Insted of using the setTimeout we can use a mutation observer to observe the content div and add the event listener to the submit button, observing means it will watch for changes in the content div and once the submit button is added to the content div it will add the event listener to it

//! new additions, save data to local storage, make sure you can use the date when you retrive it from the local storage, make use of date-fnc library to format the date
//? modify the code so the user can also delete or mark the todo as complete and move it to the right page
//< make sure the todo is saved to the local storage

function createTODOCardElement(name, description, date, category, id) {
  let element = document.createElement("div");
  element.dataset.projectId = id;
  element.dataset.category = category;
  element.className =
    "project-item max-w-sm  mx-auto  m-8 p-6 bg-white  rounded-xl shadow-sm shadow-black dark:shadow-white dark:bg-gray-800 dark:border-gray-700";
  element.innerHTML = `
    <div class="flex items-center justify-between mb-4">
    <h5 class="text-2xl font-bold text-gray-900 dark:text-white">${name}</h5>
    <span class="cursor-pointer" data-delete="${id}">
        <svg class="w-3 h-3 text-gray-600 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    </span>
    </div>
    <div class="flex flex-col items-center">
      <p class=" text-gray-800 dark:text-gray-300">${description}</p>
      <p class=" m-4 text-sm text-gray-800 dark:text-gray-300">Due: ${date}</p>
    </div>
    <div class="flex justify-around items-center mt-6">
        <button data-complete
            class="text-white bg-gray-600 shadow-sm shadow-gray-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
            Completed
        </button>
        <button data-edit
            class="text-white bg-gray-600 shadow-sm shadow-gray-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
            Edit
        </button>
    </div>
    `;
  return element;
}

function addNewProjectToDOM(name, description, date, category, id) {
  const pages = [
    //> they are data elements, so use data when selecting them
    "completedProjectsPage",
    "allProjectsPage",
    "activeProjectsPage",
  ];
  pages.forEach((page) => {
    const newProjectCard = createTODOCardElement(
      name,
      description,
      date,
      category,
      id
    );
    //? Add event listener to the delete button
    let deleteButton = newProjectCard.querySelector("[data-delete]");
    deleteButton.addEventListener("click", removeNewProject);

    const pageElement = getElement(`[data-${page}]`);
    pageElement.appendChild(newProjectCard);
  });
}
