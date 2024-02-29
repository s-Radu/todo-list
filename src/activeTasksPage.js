import { createElement } from "./utilis.js";
export default function activeTasks() {
  let page = createElement({
    tag: "div",
    classes:
      "hidden flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen",
    id: "activePage",
    content: `
    <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">Active Tasks</h1>
    <div data-activeTasksPage class="flex flex-wrap justify-center items-start  p-5 overflow-y-auto scrollbar-hide w-full"></div>`,
  });

  return page;
}
