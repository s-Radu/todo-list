export default function activeTasks() {
  let ele = document.createElement("div");
  ele.className =
    "hidden flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen";
  ele.id = "activePage";
  ele.innerHTML = `
  <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Active Tasks</h1>

    <div data-activeTasksPage class="flex flex-wrap justify-center items-start  p-5 overflow-y-auto scrollbar-hide w-full"></div>
  `;

  return ele;
}
