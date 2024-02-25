import { createElement } from "./utilis.js";

export default function allTasks() {
  let page = createElement({
    tag: "div",
    id: "notesPage",
    //! add hidden when done creating the new page
    classes: "flex flex-col container mx-auto m-4 min-h-screen",
    content: `
    <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Notes</h1>

              <div class="flex flex-wrap justify-center items-start gap-4 p-5" id="allNotes">

              <div id="newNote"
              class="shadow-md mx-auto m-4 shadow-rose-500 rounded-lg p-4 flex flex-col items-center min-w-40 max-w-screen-sm dark:bg-gray-800 dark:shadow-rose-600 hover:shadow-button hover:shadow-rose-500 hover:scale-105 transition-all duration-300 ease-in-expo ">
  
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


                  <div
                      class="bg-white dark:bg-gray-800 shadow-lg shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 flex flex-col justify-between items-center relative max-w-84">
                        <span class="absolute top-4 right-4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                         </span>
                      <h2 class="text-xl font-semibold m-4 text-gray-500 dark:text-gray-200">Task 1</h2>
                      <p class="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                          repellendus mollitia quo rerum fuga! In?</p>
                      <p class="text-sm text-gray-500 italic m-4 self-end">Due: <span>25.02.2024</span></p>
                  </div>
                  <div
                      class="bg-white dark:bg-gray-800 shadow-lg shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 flex flex-col justify-between items-center relative max-w-[30rem]">
                        <span class="absolute top-4 right-4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                         </span>
                      <h2 class="text-xl font-semibold m-4 text-gray-500 dark:text-gray-200">Task 1</h2>
                      <p class="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                          repellendus mollitia quo rerum fuga! In?</p>
                      <p class="text-sm text-gray-500 italic m-4 self-end">Due: <span>25.02.2024</span></p>
                  </div>
                  <div
                      class="bg-white dark:bg-gray-800 shadow-lg shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 flex flex-col justify-between items-center relative max-w-80">
                        <span class="absolute top-4 right-4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                         </span>
                      <h2 class="text-xl font-semibold m-4 text-gray-500 dark:text-gray-200">Task 1</h2>
                      <p class="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                          repellendus mollitia quo rerum fuga! In?</p>
                      <p class="text-sm text-gray-500 italic m-4 self-end">Due: <span>25.02.2024</span></p>
                  </div>
                  <div
                      class="bg-white dark:bg-gray-800 shadow-lg shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 flex flex-col justify-between items-center relative max-w-64">
                        <span class="absolute top-4 right-4 cursor-pointer hover:scale-105 text-gray-400 dark:hover:text-white hover:text-black">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                         </span>
                      <h2 class="text-xl font-semibold m-4 text-gray-500 dark:text-gray-200">Task 1</h2>
                      <p class="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                          repellendus mollitia quo rerum fuga! In?</p>
                      <p class="text-sm text-gray-500 italic m-4 self-end">Due: <span>25.02.2024</span></p>
                     </div>
                </div>
     `,
  });

  return page;
}

//? Add funcitonality to handle the adding, deleting, editing, sorting and storing in the local storage of new notes.
