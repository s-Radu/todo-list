import { getElement } from "./utilis";

export function createDrawer(content) {
  const ele = document.createElement("div");
  ele.id = "drawer-right-example";
  ele.setAttribute("tabindex", "-1");
  ele.setAttribute("aria-labelledby", "drawer-right-label");
  ele.className =
    "fixed top-0 bottom-0 right-0 z-40 min-h-screen p-4 overflow-y-auto rounded-l-xl border-l-2 border-black dark:border-white transition-transform translate-x-full bg-white w-80 dark:bg-gray-600";
  ele.innerHTML = content;
  return ele;
}
