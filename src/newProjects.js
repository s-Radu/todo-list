//? this is how we delegate the event listener for the parent element of each drawer option
import { getElement } from "./utilis";

export let ids = [
  "home",
  "projects",
  "allProjects",
  "active",
  "completed",
  "notes",
  "newProject",
];

export let newProjectsIds = [
  "newProject-something",
  "newProject-test",
  "newProject-dummy",
];

export function check() {
  newProjectsIds.forEach((id) => {
    const element = getElement(`#${id}`);

    if (element) {
      element.addEventListener("click", deleteNewProject);
    }
  });
}

export function addNewProject(e) {
  e.stopPropagation();

  const ele = e.target.closest("#newProject");
  if (ele) {
    newProject();
  }
}

function deleteNewProject(e) {
  let element = e.target.closest("li");
  newProjectsIds = newProjectsIds.filter((id) => id !== element.id);

  element.remove();

  console.log(newProjectsIds);
}

function newProject() {
  //? the below will be deleted as the title the user gives to the project will be used as an ID for the new project
  const randomNumber = Math.floor(Math.random() * 1000);

  const newTitle = "New Project";
  const newId = `newProject-${randomNumber}`;
  const newElement = document.createElement("li");
  newElement.id = newId;
  newElement.innerHTML = `
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

  //> Get the parent ul and the newProject li
  const parentUl = getElement("#dropdown-example");
  const newProjectLi = getElement("#newProject");

  //> Insert the new element before newProject
  parentUl.insertBefore(newElement, newProjectLi);
  newProjectsIds.push(newId);
}
