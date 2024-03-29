import { createElement } from "./utilis.js";

export default function nav() {
  let navEle = createElement({
    tag: "nav",
    classes:
      "bg-white border-b-2 container mx-auto rounded-2xl border-gray-800 dark:border-gray-600 dark:bg-gray-800",
    content: `
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex justify-between items-center w-32 md:ml-4">

                        <button class="rounded-lg hover:scale-105 relative group" type="button" data-drawer-target="drawer-navigation"
                            data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M3 5H21M10 10H21M10 14H21M3 19H21M3 9L6 12L3 15" class="stroke-black dark:stroke-white"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </g>
                                <span
                                class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0  group-hover:opacity-100 -bottom-10 -left-1/3 transition-all duration-200 ease-in-expo"
                                x-show="showTooltip">
                                Open menu
                            </span>
                            </svg>
                        </button>

                    <button class="hover:scale-105 group relative" id="mainHome">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40"
                            hight="40">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                    stroke-width="1.5" stroke-linecap="round" class="dark:stroke-white stroke-black">
                                </path>
                                <path d="M15 18H9" class="dark:stroke-white stroke-black" stroke-width="1.5"
                                    stroke-linecap="round"></path>
                            </g>
                            <span
                                class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0  group-hover:opacity-100 -bottom-10 -left-1/3 transition-all duration-200 ease-in-expo"
                                x-show="showTooltip">
                                Home
                            </span>
                        </svg>
                    </button>
                </div>

                <div class="flex justify-between items-center w-32 md:mr-4" >
                        <div class="group relative">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                            class="cursor-pointer hover:scale-105 " data-modal-target="crud-modal"
                            data-modal-toggle="crud-modal" data-tooltip="Quick note">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M12 7V17M12 12H17M7 12H9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    class="dark:stroke-white stroke-black" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round">
                                </path>
                            </g>
                            <span
                                class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0  group-hover:opacity-100 -bottom-10 -left-1/3 transition-all duration-200 ease-in-expo"
                                x-show="showTooltip">
                                Quick task
                            </span>
                        </svg>
                    </div>
                    <div id="toggle"
                        class="w-12 h-6 flex items-center group relative bg-gray-800 dark:bg-gray-300 rounded-full p-1 cursor-pointer transform duration-200 ease-in-expo hover:scale-105">
                        <div id="circle"
                            class="w-5 h-5 bg-gray-300 dark:bg-gray-800 rounded-full shadow-md shadow-black duration-500 translate-x-5  ease-in-expo">
                        </div>
                        <span
                                class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0  group-hover:opacity-100 -bottom-16 -left-1/3 transition-all duration-200 ease-in-expo"
                                x-show="showTooltip">
                                Toggle dark mode
                            </span>
                    </div>
                </div>

            </div>
      `,
  });

  return navEle;
}
