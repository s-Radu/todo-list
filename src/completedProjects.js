export default function completedProjects() {
  let ele = document.createElement("div");
  ele.className =
    "hidden flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen";
  ele.id = "completedPage";
  ele.innerHTML = `
  <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Completed Projects</h1>

            <div class="flex flex-wrap justify-center items-start gap-4 p-5 overflow-y-auto scrollbar-hide w-full">
                <div
                    class="bg-white dark:bg-gray-800 shadow-lg dark:shadow-sm shadow-green-300 dark:shadow-green-400 rounded-lg p-4 flex flex-col justify-between items-center max-w-96">
                    <h2 class="text-xl font-semibold m-4 text-gray-500 dark:text-gray-200">Task 1</h2>
                    <p class="text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
                        repellendus mollitia quo rerum fuga! In?</p>
                    <p class="text-sm text-gray-500 italic m-4 self-end">Due: <span>25.02.2024</span></p>
                    <button
                        class="bg-gray-600 hover:bg-gray-500 dark:bg-blue-900 dark:hover:bg-blue-800 text-white rounded-lg py-1 px-2 mt-4">Complete</button>
                </div>
            </div>
  `;

  return ele;
}
