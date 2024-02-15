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

//? Removes the new project from the list
function removeNewProject(e) {
  let element = e.target.closest("li");

  //* Remove the project from the projects array
  projects = projects.filter((project) => {
    //* Convert the project name to a URL-friendly format
    const projectId = generateNewProjectId(project.name);
    return projectId !== element.id;
  });
  console.log(...projects);
  element.remove();
}

//? Generates a new project id based on the name provided in the form
function generateNewProjectId(name) {
  return `${name.replace(/\s+/g, "-").toLowerCase()}`;
}

//? Creates a new list item element with an id and title provided by the form
function createNewElement(newId, newTitle) {
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
function createNewProjectElement(project) {
  const newId = generateNewProjectId(project.name);
  const newElement = createNewElement(newId, project.name);

  //! Add an event listener to the new project element
  newElement.addEventListener("click", removeNewProject);

  return newElement;
}
function appendNewProjectElement(newElement) {
  insertNewElement(newElement);
}

//? get data from the form

let projects = [];

function getFormData(e) {
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
    console.log(...projects);
    form.reset();
    modal.hide();

    //? Create a new project element with the data provided in the form
    const newElement = createNewProjectElement(newProject);

    //* Append the new project element to the DOM
    appendNewProjectElement(newElement);
  }
}

// setTimeout(() => {
//   const submitButton = getElement("[data-submit");
//   submitButton.addEventListener("click", getFormData);
//   console.log("event added");
// }, 100);

//? Insted of using the setTimeout we can use a mutation observer to observe the content div and add the event listener to the submit button, observing means it will watch for changes in the content div and once the submit button is added to the content div it will add the event listener to it

const parentElement = document.getElementById("content");

//> Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

//> Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      const submitButton = getElement("[data-submit");
      if (submitButton) {
        submitButton.addEventListener("click", getFormData);
        console.log("event added");
        observer.disconnect(); //> Stop observing once the element is found
      }
    }
  }
};

//> Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

//> Start observing the target node for configured mutations
observer.observe(parentElement, config);
