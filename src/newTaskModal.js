export default function newTaskModal() {
  let modal = document.createElement("div");
  modal.id = "crud-modal";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-hidden", "true");
  modal.className =
    "hidden overflow-y-auto overflow-x-hidden bg-opacity-75 bg-black fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full";
  modal.innerHTML = `
      <div class="absolute shadow-sm shadow-black dark:shadow-white left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-lg p-4 w-full max-w-md max-h-full">
  
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
  
                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              Create new task
                          </h3>
                          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span class="sr-only">Close modal</span>
                          </button>
                      </div>
  
                      <form class="p-4 md:p-5">
                          <div class="grid gap-4 mb-4 grid-cols-2">
                              <div class="col-span-2">
                                  <label for="name"
                                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                                  <input type="text" name="name" id="name"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-600"
                                      placeholder="Type task name" required="">
                              </div>
                              <div class="col-span-2 sm:col-span-1">
                                  <label for="date"
                                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                  <input type="date" name="date" id="date"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-600"
                                      required="">
                              </div>
                              <div class="col-span-2 sm:col-span-1">
                                  <label for="category"
                                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                  <select id="category"
                                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-600">
                                      <option selected="" value="Urgent">Select category</option>
                                      <option value="Urgent">Urgent</option>
                                      <option value="Important">Important</option>
                                      <option value="Upcoming">Upcoming</option>
                                      <option value="Sometimes">Sometimes</option>
                                  </select>
                              </div>
                              <div class="col-span-2">
                                  <label for="description"
                                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task
                                      Description</label>
                                  <textarea id="description" rows="4"
                                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                                      placeholder="Write task description here"></textarea>
                              </div>
                          </div>
                          <did class="flex w-full justify-center items-center">
                          <button data-submit
                              class="text-white bg-gray-600 shadow-sm shadow-gray-700 dark:shadow-gray-400 hover:bg-gray-500 inline-flex items-center rounded-lg text-sm px-5 py-2.5 text-center">
                              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd"
                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                      clip-rule="evenodd"></path>
                              </svg>
                              Add task
                          </button>
                          </did>
                      </form>
                  </div>
              </div>
      `;

  return modal;
}
//? Might have to get rid of submit button and add a click event listener to the modal to add the new Task
