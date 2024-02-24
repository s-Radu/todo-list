import { getElement } from "./utilis.js";
import { userName } from "./drawer.js";
import { format } from "date-fns";
import pubsub from "./utilis.js";

const DROPDOWN_SELECTOR = "#dropdown-example";
const NEW_TASK_SELECTOR = "#newTask";

//? get the task id
function getTaskId(e) {
  return e.target.closest("div.task-item").dataset.taskId;
}

//? Removes the new task from the list
function deleteTask(taskId, taskList) {
  const updatedTasks = taskList.filter((task) => {
    return task.id !== taskId;
  });

  //? Update local storage
  localStorage.setItem(
    taskList === activeTasks ? "activeTasks" : "completedTasks",
    JSON.stringify(updatedTasks)
  );

  //? Publish the updated number of tasks
  pubsub.publish(
    taskList === activeTasks ? "tasksUpdated" : "completedTasksUpdated",
    updatedTasks.length
  );

  //? Remove the task from the navbar and the page
  const taskElements = getElement(`[data-task-id="${taskId}"]`, true);
  taskElements.forEach((element) => {
    element.remove();
  });

  return updatedTasks;
}

function removeTask(e) {
  let taskId = getTaskId(e);

  //! Ask the user to confirm the deletion
  let userResponse = confirm(
    `${userName}, are you sure you want to delete this task?`
  );
  if (userResponse) {
    activeTasks = deleteTask(taskId, activeTasks);
    completedTasks = deleteTask(taskId, completedTasks);
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
    addNewTaskCardToDOM(
      task.name,
      task.description,
      formatDate(task.date), //? format(task.date, "EEEE, d MMMM yyyy"
      task.category,
      task.id,
      "activeTasksPage"
    );
  });
  pubsub.publish("tasksUpdated", activeTasks.length);
});

document.addEventListener("DOMContentLoaded", () => {
  completedTasks.forEach((task) => {
    addNewTaskCardToDOM(
      task.name,
      task.description,
      formatDate(task.date), //? format(task.date, "EEEE, d MMMM yyyy"
      task.category,
      task.id,
      "completedTasksPage",
      false,
      false,
      task.shadowColor
    );
  });
  pubsub.publish("completedTasksUpdated", completedTasks.length);
});

function capitulizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFormData(e) {
  e.preventDefault();

  const modalEl = getElement("#crud-modal");
  const modal = FlowbiteInstances.getInstance("Modal", "crud-modal");
  const form = modalEl.querySelector("form");
  const name = capitulizeFirstLetter(form.querySelector("#name").value);
  const date = form.querySelector("#date").value;
  const category = capitulizeFirstLetter(form.querySelector("#category").value);
  const description = capitulizeFirstLetter(
    form.querySelector("#description").value
  );

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

    addNewTaskCardToDOM(
      name,
      description,
      //? Make use of date-fns to update the date on the new task card
      formatDate(date), //? format(date, "EEEE, d MMMM yyyy"
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

function createTODOCardElement(
  name,
  description,
  date,
  category,
  id,
  showCompleteButton = true,
  showEditButton = true,
  shadowColor = "shadow-green-400"
) {
  let element = document.createElement("div");
  let shadow = shadowColor ? shadowColor : "shadow-green-400";
  element.dataset.taskId = id;
  element.dataset.category = category;
  element.className = `task-item max-w-sm m-4 p-6 bg-white rounded-xl shadow-md ${shadow} dark:bg-gray-800 dark:border-gray-700`;

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
        <svg class="ml-4 w-3 h-3 text-gray-600 dark:text-white" aria-hidden="true"
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

function moveTaskToCompleted(taskId) {
  //* Find the project in the projects array
  const task = activeTasks.find((task) => task.id === taskId);

  //* Remove the task from the tasks array
  activeTasks = deleteTask(taskId, activeTasks);

  //? Add the task to the completedTasks array
  task.shadowColor = "shadow-blue-400";
  completedTasks.push(task);

  //! Update local storage
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

  //? update pubsub
  pubsub.publish("tasksUpdated", activeTasks.length);
  pubsub.publish("completedTasksUpdated", completedTasks.length);

  const todaysDate = new Date();

  addNewTaskCardToDOM(
    task.name,
    task.description,
    formatDate(todaysDate), //! format(task.date, "EEEE, d MMMM yyyy"
    task.category,
    task.id,
    "completedTasksPage",
    false,
    false,
    task.shadowColor
  );
}

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy");
}

function moveToComplete(e) {
  let taskId = getTaskId(e);
  moveTaskToCompleted(taskId);
}

function addNewTaskCardToDOM(
  name,
  description,
  date,
  category,
  id,
  page,
  showCompleteButton = true,
  showEditButton = true,
  shadowColor
) {
  const newTaskCard = createTODOCardElement(
    name,
    description,
    date,
    category,
    id,
    showCompleteButton,
    showEditButton,
    shadowColor
  );

  //? Add event listener to the delete button
  const deleteButton = newTaskCard.querySelector("[data-delete]");
  deleteButton.addEventListener("click", removeTask);

  if (showCompleteButton) {
    //? Add event listener to the complete button
    const completeBtn = newTaskCard.querySelector("[data-complete]");
    completeBtn.addEventListener("click", moveToComplete);
  }
  if (showEditButton) {
    //? Add event listener to the edit button
    const editBtn = newTaskCard.querySelector("[data-edit]");
    editBtn.addEventListener("click", editTask);
  }

  //? Add the new task card to the page
  const pageElement = getElement(`[data-${page}]`);
  pageElement.appendChild(newTaskCard);
}

function editTask(e) {
  const parentElement = getElement("[data-activeTasksPage]");
  const taskId = getTaskId(e);
  let task = activeTasks.find((task) => task.id === taskId);

  parentElement.appendChild(
    showEditModal(task.name, task.description, task.date, task.category)
  );

  function saveChanges(e) {
    e.preventDefault();
    const form = e.target.closest("form");
    const name = capitulizeFirstLetter(form.querySelector("#name").value);
    const date = form.querySelector("#date").value;
    const category = capitulizeFirstLetter(
      form.querySelector("#category").value
    );
    const description = capitulizeFirstLetter(
      form.querySelector("#description").value
    );

    if (name === "" || date === "") {
      alert("Please fill in all the fields");
    } else {
      const id = generateNewTaskId();
      const newTask = { id, name, date, category, description };
      activeTasks.push(newTask);

      //* Save the tasks to local storage
      localStorage.setItem("activeTasks", JSON.stringify(activeTasks));

      //? update the pubsub
      pubsub.publish("tasksUpdated", activeTasks.length);

      //? Create a new task element with the data provided in the form
      const newElement = createNewTaskElement(newTask);

      //* Append the new task element to the DOM
      appendNewTaskElementToNav(newElement);

      addNewTaskCardToDOM(
        name,
        description,
        //? Make use of date-fns to update the date on the new task card
        formatDate(date), //? format(date, "EEEE, d MMMM yyyy"
        category,
        id,
        "activeTasksPage"
      );
      //? Reset the form and hide the modal
      removeEditModal(e);
      form.reset();
      //? to remove the current task, we just uncoment the below function
      deleteTask(taskId, activeTasks);
    }
  }
  const submitButton = getElement("[data-editSubmit]");
  submitButton.addEventListener("click", saveChanges);
}

function showEditModal(name, description, date, category) {
  let element = document.createElement("div");

  //! Set the position of the modal based on the current scroll position
  const yAxys = window.scrollY + window.innerHeight / 2;
  const xAxys = window.scrollX + window.innerWidth / 2;

  element.setAttribute("data-editModal", "");
  element.className = `absolute z-20 shadow-md -translate-x-2/4 -translate-y-2/4 shadow-green-600 rounded-lg p-4 w-full max-w-sm max-h-full`;
  element.style.top = `${yAxys}px`;
  element.style.left = `${xAxys}px`;
  element.innerHTML = `
  <div class="relative bg-white rounded-lg shadow-button shadow-green-500 dark:bg-gray-700">

                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit current task
                    </h3>
                    <button type="button" data-closeEditModal
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-green-500 text-base rounded-lg focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-green-500 dark:text-green-500 dark:focus:ring-gray-400 dark:focus:border-gray-600"
                                placeholder="${name}" required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="date"
                                class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Date</label>
                            <input type="date" name="date" id="date"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-green-500 dark:text-green-500 dark:focus:ring-gray-400 dark:focus:border-gray-600"
                                required="" placeholder="${date}">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="category"
                                class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Category</label>
                            <select id="category"
                                class="bg-gray-50 border border-gray-300 text-green-500 text-base rounded-lg focus:ring-gray-400 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-green-500 dark:text-green-500 dark:focus:ring-gray-400 dark:focus:border-gray-600">
                                <option selected="" value="${category}">${category}</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Important">Important</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Sometimes">Sometimes</option>
                            </select>
                        </div>
                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Product
                                Description</label>
                            <textarea id="description" rows="4"
                                class="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-green-500 dark:text-green-500 dark:focus:ring-gray-400 dark:focus:border-gray-400"
                                placeholder="${description}"></textarea>
                        </div>
                    </div>
                    <did class="flex w-full justify-center items-center">
                        <button data-editSubmit type='submit'
                            class="text-white bg-gray-600 shadow-sm shadow-green-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Save changes
                        </button>
                    </did>
                </form>
            </div>
  `;

  const closeButton = element.querySelector("[data-closeEditModal");
  closeButton.addEventListener("click", removeEditModal);

  return element;
}

function removeEditModal(e) {
  const modal = e.target.closest("[data-editModal]");
  modal.remove();
}
