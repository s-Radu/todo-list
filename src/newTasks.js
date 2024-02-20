import { getElement } from "./utilis.js";
import { userName } from "./drawer.js";
import { add, format } from "date-fns";
import pubsub from "./utilis.js";

const DROPDOWN_SELECTOR = "#dropdown-example";
const NEW_TASK_SELECTOR = "#newTask";

//? get the task id
function getTaskId(e) {
  return e.target.closest("div.task-item").dataset.taskId;
}

//? Removes the new task from the list
function deleteTask(taskId) {
  //* Remove active task from the tasks array
  activeTasks = activeTasks.filter((task) => {
    return task.id !== taskId;
  });

  //? Remove completed task from the tasks array

  completedTasks = completedTasks.filter((task) => {
    return task.id !== taskId;
  });

  //? Update local storage
  localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

  //? Publish the updated number of tasks
  pubsub.publish("tasksUpdated", activeTasks.length);
  pubsub.publish("completedTasksUpdated", completedTasks.length);

  //* Remove the task from the navbar and the page
  const taskElements = getElement(`[data-task-id="${taskId}"]`, true);
  taskElements.forEach((element) => {
    element.remove();
  });
}

function removeTask(e) {
  let taskId = getTaskId(e);

  //! Ask the user to confirm the deletion
  let userResponse = confirm(
    `${userName}, are you sure you want to delete this task?`
  );
  if (userResponse) {
    deleteTask(taskId);
  }
}

//? Generates a new task id using the crypto.randomUUID method
function generateNewTaskId() {
  return crypto.randomUUID();
}

//? Creates a new list item element with an id and title provided by the form
function createNewNavTask(newId, newTitle) {
  const newElement = document.createElement("div");
  newElement.dataset.taskId = newId;
  newElement.className = `task-item cursor-pointer flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
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
  const newTaskEle = getElement(NEW_TASK_SELECTOR);

  parentUl.insertBefore(newElement, newTaskEle);
}

function createNewTaskElement(task) {
  const newElement = createNewNavTask(task.id, task.name);

  //! Add an event listener to the new task element
  newElement.addEventListener("click", removeTask);

  return newElement;
}

function appendNewTaskElementToNav(newElement) {
  insertNewElement(newElement);
}

//? get data from the form

let activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];

//* Display the tasks on the page from local storage
document.addEventListener("DOMContentLoaded", () => {
  activeTasks.forEach((task) => {
    const newElement = createNewTaskElement(task);
    appendNewTaskElementToNav(newElement);
    const str = format(task.date, "EEEE, d MMMM yyyy");
    addNewTaskCardToDOM(
      task.name,
      task.description,
      str,
      task.category,
      task.id,
      "activeTasksPage"
    );
  });
  pubsub.publish("tasksUpdated", activeTasks.length);
});

document.addEventListener("DOMContentLoaded", () => {
  completedTasks.forEach((task) => {
    const str = format(task.date, "EEEE, d MMMM yyyy");
    addNewTaskCardToDOM(
      task.name,
      task.description,
      str,
      task.category,
      task.id,
      "completedTasksPage"
    );
  });
  pubsub.publish("completedTasksUpdated", completedTasks.length);
});

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
    const id = generateNewTaskId();
    const newTask = { id, name, date, category, description };
    activeTasks.push(newTask);

    //* Save the tasks to local storage
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));

    //? update the pubsub
    pubsub.publish("tasksUpdated", activeTasks.length);
    //? Reset the form and hide the modal
    form.reset();
    modal.hide();

    //? Create a new task element with the data provided in the form
    const newElement = createNewTaskElement(newTask);

    //* Append the new task element to the DOM
    appendNewTaskElementToNav(newElement);

    //? Make use of date-fns to update the date on the new task card
    const str = format(date, "EEEE, d MMMM yyyy");
    addNewTaskCardToDOM(
      name,
      description,
      str,
      category,
      id,
      "activeTasksPage"
    );
  }
}

// setTimeout(() => {
//   const submitButton = getElement("[data-submit");
//   submitButton.addEventListener("click", getFormData);
//   console.log("event added");
// }, 100);

//? Insted of using the setTimeout we can use a mutation observer to observe the content div and add the event listener to the submit button, observing means it will watch for changes in the content div and once the submit button is added to the content div it will add the event listener to it

//* modify the code so the user can also delete or mark the todo as complete and move it to the right page
//< make sure the todo is saved to the local storage

function createTODOCardElement(
  name,
  description,
  date,
  category,
  id,
  showCompleteButton = true,
  showEditButton = true
) {
  let element = document.createElement("div");
  element.dataset.taskId = id;
  element.dataset.category = category;
  element.className = `task-item max-w-sm m-4 p-6 bg-white rounded-xl shadow-md shadow-green-400 dark:bg-gray-800 dark:border-gray-700`;

  let completeButtonHTML = showCompleteButton
    ? `
    <button data-complete
        class="text-white bg-gray-600 shadow-sm shadow-gray-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
        Completed
    </button>`
    : "";

  let editButtonHTML = showEditButton
    ? `
    <button data-edit
        class="text-white bg-gray-600 shadow-sm shadow-gray-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
        Edit
    </button>`
    : "";

  element.innerHTML = `
    <div class="flex items-center justify-between mb-4">
    <h5 class="text-2xl font-bold text-gray-900 dark:text-white">${name}</h5>
    <span class="cursor-pointer hover:scale-110" data-delete="${id}">
        <svg class="w-3 h-3 text-gray-600 dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    </span>
    </div>
    <div class="flex flex-col items-center">
      <p class="text-xl text-gray-800 dark:text-gray-300">${description}</p>
      <p class=" m-4 text-sm text-gray-800 dark:text-gray-300">Due: ${date}</p>
      <p class=" text-sm text-gray-800 dark:text-gray-300">Category: ${category}</p>
    </div>
    <div class="flex justify-around items-center mt-6">
        ${completeButtonHTML}
        ${editButtonHTML}
    </div>
    `;

  return element;
}

let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

function completeTesk(taskId) {
  //* Find the project in the projects array
  const task = activeTasks.find((task) => task.id === taskId);

  //* Remove the task from the tasks array
  activeTasks = activeTasks.filter((task) => task.id !== taskId);

  //* Add the task to the completedTasks array
  completedTasks.push(task);

  //? Update local storage
  localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

  //? update pubsub
  pubsub.publish("tasksUpdated", activeTasks.length);

  //* Remove the task from the navbar and the page
  const taskElements = getElement(`[data-task-id="${taskId}"]`, true);
  taskElements.forEach((element) => {
    element.remove();
  });

  //* Add the task to the completed page
  const str = format(task.date, "EEEE, d MMMM yyyy");

  addNewTaskCardToDOM(
    task.name,
    task.description,
    str,
    task.category,
    task.id,
    "completedTasksPage",
    false,
    false
  );

  //? Publish the updated number of tasks
  pubsub.publish("completedTasksUpdated", completedTasks.length);
}

function moveToComplete(e) {
  let taskId = getTaskId(e);
  completeTesk(taskId);
}

function addNewTaskCardToDOM(name, description, date, category, id, page) {
  // const page = "activeTasksPage";
  const newTaskCard = createTODOCardElement(
    name,
    description,
    date,
    category,
    id,
    true,
    true
  );

  //? Add event listener to the delete button
  let deleteButton = newTaskCard.querySelector("[data-delete]");
  deleteButton.addEventListener("click", removeTask);

  //? Add event listener to the complete button
  const completeBtn = newTaskCard.querySelector("[data-complete]");
  completeBtn.addEventListener("click", moveToComplete);

  //? Add the new task card to the page
  const pageElement = getElement(`[data-${page}]`);
  pageElement.appendChild(newTaskCard);
}
