import { createElement, getElement } from "./utilis.js";
import { capitulizeFirstLetter } from "./newTasks.js";
import { format } from "date-fns";
import { userName } from "./drawer.js";
import pubsub from "./utilis.js";

let activeNotes = JSON.parse(localStorage.getItem("activeNotes")) || [];

export default function notesPage() {
  let page = createElement({
    tag: "div",
    id: "notesPage",
    //! add hidden when done creating the new page
    classes: "hidden flex flex-col container mx-auto m-4 min-h-screen",
    content: `
    <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Notes</h1>

        <div class="flex flex-wrap justify-start items-start gap-4 p-5 relative" id="allNotes">

         <div id="newNote"
              class="shadow-md m-4 shadow-rose-500 border-t-2 border-rose-500 rounded-lg p-4 flex flex-col items-center min-w-32 min-h-32 max-w-screen-sm hover:opacity-80">
  
              <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="cursor-pointer animate-pulse transition-all duration-150 ease-in-out w-20 h-20 dark:text-gray-400 text-gray-600 hover:text-gray-900 hover:scale-110 dark:hover:text-gray-100 ">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"
                      stroke-width="0.336"></g>
                  <g id="SVGRepo_iconCarrier">
                      <path d="M9 12H15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                      <path d="M12 9L12 15" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                      <path
                          d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
                          stroke="currentColor" stroke-width="1.2"></path>
                  </g>
              </svg>
          </div>  

        </div>    
     `,
  });

  const newNoteBtn = page.querySelector("#newNote");
  newNoteBtn.addEventListener("click", appendForm);

  return page;
}

function generateNewNoteId() {
  return crypto.randomUUID();
}

function appendForm(e) {
  const parentElement = e.target.closest("#allNotes");
  const form = createForm();
  parentElement.appendChild(form);
}

function createForm() {
  const form = createElement({
    tag: "form",
    classes:
      "absolute flex flex-col items-center  z-20 p-4 top-0 left-0 min-w-72 min-h-60 rounded-2xl bg-white dark:bg-gray-800 shadow-md shadow-rose-500 transition-all duration-300 ease-in-out animate-fade-in-down",
    content: `
    <div class="relative w-full flex flex-col items-center">
        <h2 class="text-2xl font-semibold m-4 text-gray-400">Add a new note</h2>
        <span class="absolute top-0 right-0 -translate-y-2/4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black" data-delete=''>
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </span>
    </div>

    <div class="flex flex-col mx-auto ">
        <input type="text" class="border-2 border-gray-400 dark:border-gray-600 rounded-lg p-2 m-2" placeholder="Title">
        <textarea class="border-2 border-gray-400 dark:border-gray-600 rounded-lg p-2 m-2" placeholder="Content"></textarea>
    </div>
        <button class="bg-gray-500 dark:bg-gray-600 text-gray-900 dark:text-white hover:scale-105 hover:shadow-md hover:shadow-rose-400 transition-all duration-300 ease-in-out rounded-lg p-2 m-2">Add Note</button>
        `,
  });
  const addNoteButton = form.querySelector("button");
  addNoteButton.addEventListener("click", addNewNote);

  const deleteBtn = form.querySelector("[data-delete]");
  deleteBtn.addEventListener("click", removeForm);

  return form;
}

function addNewNote(e) {
  e.preventDefault();
  const parentElement = getElement("#allNotes");
  const form = e.target.closest("form");
  const title = capitulizeFirstLetter(form.querySelector("input").value);
  const content = capitulizeFirstLetter(form.querySelector("textarea").value);
  const date = todaysDate();
  const id = generateNewNoteId();

  if (!title || !content) {
    alert("Please fill in both fields");
    return;
  }

  const note = createNewNote({
    title,
    content,
    date,
    id,
  });

  const newNote = {
    title,
    content,
    date,
    id,
  };

  updateNotesArray(newNote);
  updateLocalStorage();
  updatePubSub();

  parentElement.appendChild(note);
  removeForm(e);
}

function deleteNote(e, id) {
  const deleteButton = e.target.closest("[data-delete]");
  let askForConfirmation = confirm(
    `${userName} are you sure you want to delete this note?`
  );
  if (askForConfirmation) {
    if (deleteButton) {
      const parentElement = deleteButton.closest("div");
      if (parentElement && parentElement.id === id) {
        parentElement.remove();
        deleteNoteFromLocalStorage(id);
        updatePubSub();
      }
    }
  } else {
    return;
  }
}

function deleteNoteFromLocalStorage(id) {
  const noteToDelete = activeNotes.find((note) => note.id === id);
  const index = activeNotes.indexOf(noteToDelete);
  activeNotes.splice(index, 1);
  updateLocalStorage();
}

function createNewNote({ title, content, date, id }) {
  let note = createElement({
    tag: "div",
    id: id,
    classes: `bg-white dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-150 ease-in-out shadow-lg shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 m-4 flex flex-col justify-between items-center relative max-w-96`,
    content: `
    <span class="absolute top-4 right-4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black" data-delete>
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    </span>
    <h2 class="text-2xl font-semibold m-4 ">${title}</h2>
    <p class=" text-base">${content}</p>
    <p class="text-sm  italic m-4 self-end">Added: ${date}</span></p>
`,
  });

  const deleteBtn = note.querySelector("[data-delete]");
  deleteBtn.addEventListener("click", (e) => deleteNote(e, id));

  return note;
}

function todaysDate() {
  const now = new Date();
  const str = format(now, "EEEE, d MMMM yyyy HH:mm:ss");

  return str;
}

function removeForm(e) {
  const form = e.target.closest("form");
  form.remove();
  form.reset();
}

function updateNotesArray(newNote) {
  activeNotes.push(newNote);
}

function updateLocalStorage() {
  localStorage.setItem("activeNotes", JSON.stringify(activeNotes));
}

function updatePubSub() {
  pubsub.publish("notes", activeNotes.length);
}

document.addEventListener("DOMContentLoaded", () => {
  activeNotes.forEach((note) => {
    const parentElement = getElement("#allNotes");
    const newNote = createNewNote({
      title: note.title,
      content: note.content,
      date: note.date,
      id: note.id,
    });
    parentElement.appendChild(newNote);
    updatePubSub();
  });
});

//TODO Save data to local storage and add it on the page when page refreshed
//TODO update pubsub
