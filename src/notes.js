export default function allProjects() {
  let ele = document.createElement("div");
  ele.className =
    //? might have to add padding bot
    "flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen ";
  ele.id = "allProjectsPage";
  ele.innerHTML = `
    <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Notes</h1>
  
              <div class="flex flex-wrap justify-center items-start gap-4 p-5">
                  <div
                      class="bg-white dark:bg-gray-800 shadow-lg  shadow-rose-500 dark:shadow-rose-600 dark:shadow-sm rounded-lg p-4 flex flex-col justify-between items-center relative max-w-96">
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
    `;

  return ele;
}
