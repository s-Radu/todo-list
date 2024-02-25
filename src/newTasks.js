import {
  getElement,
  createElement,
  preventUserToSelectOlderDate,
} from "./utilis.js";
import { userName } from "./drawer.js";
import { format } from "date-fns";
import pubsub from "./utilis.js";

const DROPDOWN_SELECTOR = "#dropdown-example";
const NEW_TASK_SELECTOR = "#newTask";

let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
let activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];

//! get the task id
function getTaskId(e) {
  return e.target.closest("div.task-item").dataset.taskId;
}

//! format date using date-fns
function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy");
}

//! Capitulize first letter of the string
function capitulizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//! Removes the new task from the list
function deleteTaskFromList(taskId, taskList) {
  const index = taskList.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    taskList.splice(index, 1);
  }
  return taskList;
}
//! update local storage
function updateLocalStorage(taskList, isActiveTaskList) {
  localStorage.setItem(
    isActiveTaskList ? "activeTasks" : "completedTasks",
    JSON.stringify(taskList)
  );
  publishTaskUpdate(taskList, isActiveTaskList);
}

//! update pubsub
function publishTaskUpdate(taskList, isActiveTaskList) {
  pubsub.publish(
    isActiveTaskList ? "tasksUpdated" : "completedTasksUpdated",
    taskList.length
  );
}

//! remove task from the page
function removeTaskFromUI(taskId) {
  const taskElements = getElement(`[data-task-id="${taskId}"]`, true);
  taskElements.forEach((element) => {
    element.remove();
  });
}

//! delete task
function deleteTask(taskId, taskList, isActiveTaskList) {
  const updatedTaskList = deleteTaskFromList(taskId, taskList);
  updateLocalStorage(updatedTaskList, isActiveTaskList);
  removeTaskFromUI(taskId);
  return updatedTaskList;
}

//! Remove the task
function removeTask(e) {
  let taskId = getTaskId(e);

  //! Ask the user to confirm the deletion
  let userResponse = askUserForResponse();
  if (userResponse) {
    activeTasks = deleteTask(taskId, activeTasks, true);
    completedTasks = deleteTask(taskId, completedTasks, false);
  }
}
//! Ask the user to confirm the deletion
function askUserForResponse() {
  return confirm(`${userName}, are you sure you want to delete this task?`);
}

//! Generates a new task id using the crypto.randomUUID method
function generateNewTaskId() {
  return crypto.randomUUID();
}

//! Creates a new list item element with an id and title provided by the form
function createNewNavTask(newId, newTitle) {
  const newElement = createElement({
    tag: "div",
    dataAttributes: { taskId: `${newId}` },
    classes: `task-item cursor-pointer flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700`,
    content: `${newTitle} 
            <span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </span>`,
  });

  return newElement;
}

//! Inserts the new element into the dropdown list
function insertNewElement(newElement) {
  const parentUl = getElement(DROPDOWN_SELECTOR);
  const newTaskEle = getElement(NEW_TASK_SELECTOR);

  parentUl.insertBefore(newElement, newTaskEle);
}

//! Create a new task element
function createNewTaskElement(task) {
  const newElement = createNewNavTask(task.id, task.name);

  //! Add an event listener to the new task element
  newElement.addEventListener("click", removeTask);

  return newElement;
}

//! Append the new task element to the nav
function appendNewTaskElementToNav(newElement) {
  insertNewElement(newElement);
}

//! Get form element, with or without capitulizing the first letter
function getFormElementValue(form, selector, capitulized = true) {
  if (capitulized) {
    return capitulizeFirstLetter(form.querySelector(selector).value);
  } else {
    return form.querySelector(selector).value;
  }
}

//! Replace the text if the element has empty value
function replaceTextIfEmptyValue(element, text) {
  if (element === "") {
    return text;
  } else {
    return element;
  }
}

//! get data from the form
export function getFormData(e) {
  e.preventDefault();

  const modalEl = getElement("#crud-modal");
  const modal = FlowbiteInstances.getInstance("Modal", "crud-modal");
  const form = modalEl.querySelector("form");
  const name = getFormElementValue(form, "#name");
  const date = getFormElementValue(form, "#date", false);
  const category = getFormElementValue(form, "#category");
  let description = getFormElementValue(form, "#description");
  description = replaceTextIfEmptyValue(
    description,
    "No task description provided"
  );

  if (name === "" || date === "") {
    alert("Please fill in all the fields");
  } else {
    const id = generateNewTaskId();
    const newTask = { id, name, date, category, description };
    activeTasks.push(newTask);

    //* Save the tasks to local storage
    updateLocalStorage(activeTasks, true);

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

//! Create a new task element with the data provided in the form
function createTODOCardElement(
  name,
  description,
  date,
  category,
  id,
  showCompleteButton = true,
  showEditButton = true,
  categoryEle = true,
  isCompleted = false,
  shadowColor = "shadow-green-400"
) {
  let shadow = shadowColor ? shadowColor : "shadow-green-400";

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

  let categoryHTML = categoryEle
    ? ` <p class=" text-sm text-gray-800 dark:text-gray-300">Category: ${category}</p>`
    : "";

  const dateLabel = isCompleted ? "Completed: " : "Due: ";

  let element = createElement({
    tag: "div",
    dataAttributes: {
      taskId: `${id}`,
      category: `${category}`,
    },
    classes: `task-item max-w-sm m-4 p-6 bg-white rounded-xl shadow-md ${shadow} dark:bg-gray-800 dark:border-gray-700`,
    content: ` 
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
                  <p class=" m-4 text-sm text-gray-800 dark:text-gray-300">${dateLabel} ${date}</p>
                  ${categoryHTML}
                </div>
              <div class="flex justify-around items-center mt-6">
                  ${completeButtonHTML}
                  ${editButtonHTML}
              </div>
  `,
  });

  return element;
}

//! Move the task to the completed tasks page
function moveTaskToCompleted(taskId) {
  //* Find the project in the projects array
  const task = activeTasks.find((task) => task.id === taskId);

  //* Remove the task from the tasks array
  activeTasks = deleteTask(taskId, activeTasks, true);

  //? Add the task to the completedTasks array
  const TODAYS_DATE = new Date();

  task.shadowColor = "shadow-blue-400";
  task.date = formatDate(TODAYS_DATE);

  completedTasks.push(task);

  //! Update local storage
  updateLocalStorage(completedTasks, false);

  addNewTaskCardToDOM(
    task.name,
    task.description,
    task.date, //? already formated
    "", //? Don't display the category on the completed tasks
    task.id,
    "completedTasksPage",
    false,
    false,
    false,
    true,
    task.shadowColor
  );
}

//! get element id so it cn be moved to the completed tasks
function moveToComplete(e) {
  let taskId = getTaskId(e);
  moveTaskToCompleted(taskId);
}

//! Add a new task card to the DOM
function addNewTaskCardToDOM(
  name,
  description,
  date,
  category,
  id,
  page,
  showCompleteButton = true,
  showEditButton = true,
  categoryEle = true,
  dateLabel = false,
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
    categoryEle,
    dateLabel,
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

//! Edit the task
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
    const name = getFormElementValue(form, "#name");
    const date = getFormElementValue(form, "#date", false);
    const category = getFormElementValue(form, "#category");
    let description = getFormElementValue(form, "#description");
    description = replaceTextIfEmptyValue(
      description,
      "No task description provided"
    );

    if (name === "" || date === "") {
      alert("Please fill in all the fields");
    } else {
      //? to remove the current task
      deleteTask(taskId, activeTasks, true);

      const id = generateNewTaskId();
      const newTask = { id, name, date, category, description };
      activeTasks.push(newTask);

      //* Save the tasks to local storage
      updateLocalStorage(activeTasks, true);

      //? Create a new task element with the data provided in the form
      const newElement = createNewTaskElement(newTask);

      //* Append the new task element to nav
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
    }
  }
  const submitButton = getElement("[data-editSubmit]");
  submitButton.addEventListener("click", saveChanges);
}

//! Show the edit modal
function showEditModal(name, description, date, category) {
  let element = createElement({
    tag: "div",
    dataAttributes: { editModal: "" },
    classes:
      "absolute z-20 -translate-x-2/4 -translate-y-2/4 shadow-green-600 rounded-lg p-4 w-full max-w-sm max-h-full",
    content: `
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
   `,
  });

  //! prevent user from selecting a date in the past
  setTimeout(() => preventUserToSelectOlderDate(element, "#date"), 0);

  //! Set the position of the modal based on the current scroll position
  const yAxys = window.scrollY + window.innerHeight / 2;
  const xAxys = window.scrollX + window.innerWidth / 2;

  element.style.top = `${yAxys}px`;
  element.style.left = `${xAxys}px`;

  const closeButton = element.querySelector("[data-closeEditModal");
  closeButton.addEventListener("click", removeEditModal);

  return element;
}

//! Remove the edit modal
function removeEditModal(e) {
  const modal = e.target.closest("[data-edit-modal]");
  modal.remove();
}

//! Display the tasks on the page from local storage
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
      "activeTasksPage",
      true,
      true,
      true,
      false,
      task.shadowColor
    );
  });
  publishTaskUpdate(activeTasks, true);
});

document.addEventListener("DOMContentLoaded", () => {
  completedTasks.forEach((task) => {
    addNewTaskCardToDOM(
      task.name,
      task.description,
      formatDate(task.date), //? format(task.date, "EEEE, d MMMM yyyy"
      "", //? Don't display the category on the completed tasks
      task.id,
      "completedTasksPage",
      false,
      false,
      false,
      true,
      task.shadowColor
    );
  });
  publishTaskUpdate(completedTasks, false);
});
