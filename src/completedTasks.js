export default function completedTasks() {
  let ele = document.createElement("div");
  ele.className =
    "hidden flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen";
  ele.id = "completedPage";
  ele.innerHTML = `
  <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Completed Tasks</h1>

   <div data-completedTasksPage class="flex flex-wrap justify-center items-start gap-4 p-5 overflow-y-auto scrollbar-hide w-full"></div>
  `;

  return ele;
}