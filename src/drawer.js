import { format } from "date-fns";
import pubsub, { getElement } from "./utilis";

export default function drawer() {
  const drawer = document.createElement("div");
  drawer.id = "drawer-navigation";
  drawer.className =
    "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white rounded-r-2xl border-r-2 border-gray-600 w-64 dark:bg-gray-800 font-josefin scrollbar-hidden";
  drawer.setAttribute("tabindex", "-1");
  drawer.setAttribute("aria-labelledby", "drawer-navigation-label");
  drawer.innerHTML = `
  <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-300">

            </h5>
            <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close menu</span>
            </button>
            <div class="py-4 overflow-y-auto flex flex-col justify-between h-full">
                <ul class="space-y-2 font-medium">
                    <li id="home">
                        <div
                            class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-700">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24"
                                hight="24">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                                        stroke-width="1.5" stroke-linecap="round"
                                        class="dark:stroke-white stroke-black">
                                    </path>
                                    <path d="M15 18H9" class="dark:stroke-white stroke-black" stroke-width="1.5"
                                        stroke-linecap="round"></path>
                                </g>
                            </svg>
                            <span class="ms-3">Home</span>
                        </div>
                    </li>

                    <li id="tasks">
                        <button type="button" 
                            class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700"
                            aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                            <svg class="dark:fill-white fill-black" version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 496 496" xml:space="preserve" width="24" height="24">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <g>
                                                <path
                                                    d="M112.68,260c-8.16,0-15.824,4.344-20,11.32l-12.04,20.072l-0.64-1.28v-24.696l26.008-10.408 C114.504,251.616,120,243.512,120,234.36c0-7.152-3.472-13.896-9.264-18.072c-5.808-4.168-13.312-5.288-20.08-3.008l-2.832,0.952 l3.232-6.464C94.288,201.296,96,194.056,96,186.832C96,174.24,85.76,164,73.168,164c-8.704,0-16.52,4.832-20.424,12.624 l-19.896,39.8L16.16,298.432L16,404l6.28,32H0v56h120v-56H96v-53.576l14.656-21.984l21.792-57.504 c2.36-6.296,3.552-12.896,3.552-19.616C136,270.464,125.536,260,112.68,260z M95.768,228.44c1.92-0.64,3.976-0.336,5.632,0.848 c1.656,1.184,2.6,3.032,2.6,5.072c0,2.568-1.536,4.832-3.92,5.792L80,248.184v-14.44L95.768,228.44z M104,452v24H16v-24H104z M117.464,297.312L96.84,352.328L80,377.576V436H38.56L32,403.208V300.792l15.632-78.168l19.424-38.832 c1.16-2.344,3.504-3.792,6.112-3.792c3.76,0,6.832,3.072,6.832,6.832c0,4.752-1.128,9.52-3.256,13.792L64,226.112v67.784 l15.36,30.72l27.04-45.064c1.312-2.192,3.72-3.552,6.28-3.552c4.04,0,7.32,3.28,7.32,7.32 C120,288.12,119.152,292.832,117.464,297.312z">
                                                </path>
                                                <path
                                                    d="M473.76,436l6.088-30.432L480,300l-16.16-81.568l-20.584-41.808C439.36,168.832,431.536,164,422.832,164 C410.24,164,400,174.24,400,186.832c0,7.216,1.712,14.464,4.944,20.944l3.224,6.448l-2.824-0.952 c-6.76-2.288-14.272-1.16-20.08,3.008c-5.792,4.184-9.264,10.928-9.264,18.08c0,9.16,5.496,17.256,13.984,20.648L416,265.416 v24.696l-0.64,1.28l-12.04-20.064c-4.176-6.984-11.84-11.328-20-11.328c-12.856,0-23.32,10.464-23.32,23.32 c0,6.72,1.192,13.32,3.552,19.616l20.952,55.872L400,382.424V436h-24v56h120v-56H473.76z M395.912,240.152 c-2.376-0.96-3.912-3.224-3.912-5.792c0-2.04,0.944-3.88,2.6-5.072c1.656-1.192,3.696-1.496,5.632-0.848L416,233.744v14.44 L395.912,240.152z M399.168,352.328l-20.624-55.016c-1.696-4.48-2.544-9.192-2.544-13.992c0-4.04,3.28-7.32,7.32-7.32 c2.56,0,4.968,1.36,6.28,3.552l27.04,45.056l15.36-30.72v-67.784l-12.744-25.48c-2.128-4.264-3.256-9.04-3.256-13.792 c0-3.76,3.072-6.832,6.832-6.832c2.6,0,4.944,1.448,6.112,3.784l19.424,38.832L464,300.792v102.424L457.44,436H416v-58.424 L399.168,352.328z M480,476h-88v-24h88V476z">
                                                </path>
                                                <path
                                                    d="M349.112,148H368v-48h-18.888c-2.552-10.848-6.784-21.08-12.632-30.528l13.344-13.352l-33.936-33.936l-13.36,13.336 c-9.456-5.848-19.68-10.08-30.528-12.632V4h-48v18.888c-10.848,2.552-21.08,6.784-30.528,12.632L180.12,22.176l-33.936,33.936 l13.344,13.352c-5.848,9.456-10.08,19.68-12.632,30.528H128v48h18.888c2.552,10.848,6.784,21.08,12.632,30.528l-13.344,13.352 l33.936,33.936l12.256-12.256c-0.096,0.808-0.248,1.6-0.248,2.432c0,7.12,3.76,13.328,9.368,16.88 c-0.848,2.224-1.368,4.608-1.368,7.12c0,11.032,8.968,20,20,20h56c11.032,0,20-8.968,20-20c0-2.52-0.52-4.904-1.368-7.12 c5.608-3.544,9.368-9.76,9.368-16.88c0-0.736-0.136-1.44-0.216-2.152l11.976,11.976l33.936-33.936l-13.344-13.352 C342.328,169.08,346.552,158.848,349.112,148z M276.128,244h-56c-2.2,0-4-1.8-4-4s1.8-4,4-4h56c2.2,0,4,1.8,4,4 S278.328,244,276.128,244z M284.128,220h-8h-56h-8c-2.2,0-4-1.8-4-4s1.8-4,4-4h72c2.2,0,4,1.8,4,4S286.328,220,284.128,220z M256.128,146.528c9.288-3.312,16-12.112,16-22.528c0-13.232-10.768-24-24-24s-24,10.768-24,24c0,10.416,6.712,19.216,16,22.528 V196h-16v-21.24l-3.992-2.312C202.864,162.44,192.128,143.88,192.128,124c0-30.872,25.128-56,56-56s56,25.128,56,56 c0,19.872-10.736,38.44-28.008,48.448l-3.992,2.312V196h-16V146.528z M248.128,132c-4.416,0-8-3.584-8-8s3.584-8,8-8 c4.416,0,8,3.584,8,8S252.544,132,248.128,132z M334.672,138.672c-2.216,13.2-7.264,25.4-14.992,36.248l-3.92,5.504l11.44,11.456 l-11.312,11.312l-11.456-11.456l-5.512,3.928c-1.464,1.04-3.064,2.08-4.776,3.112c-1.848-1.08-3.848-1.944-6.016-2.384v-12.6 c19.848-13.304,32-35.808,32-59.808c0-39.704-32.296-72-72-72c-39.704,0-72,32.296-72,72c0,23.992,12.152,46.496,32,59.8v12.608 c-2.216,0.448-4.256,1.336-6.144,2.456c-1.744-1.056-3.392-2.112-4.896-3.184l-5.512-3.928l-11.456,11.456l-11.312-11.312 l11.44-11.456l-3.92-5.504c-7.728-10.848-12.776-23.048-14.992-36.248L160.2,132H144v-16h16.2l1.128-6.672 c2.216-13.2,7.264-25.4,14.992-36.248l3.92-5.504L168.8,56.12l11.312-11.312l11.456,11.44l5.504-3.92 C207.92,44.6,220.12,39.552,233.32,37.336L240,36.2V20h16v16.2l6.672,1.128c13.2,2.216,25.4,7.264,36.248,14.992l5.504,3.92 L315.88,44.8l11.312,11.312l-11.44,11.456l3.92,5.504c7.728,10.848,12.776,23.048,14.992,36.248L335.8,116H352v16h-16.2 L334.672,138.672z">
                                                </path>
                                                <rect x="240" y="276" width="16" height="16"></rect>
                                                <rect x="240" y="308" width="16" height="16"></rect>
                                                <rect x="240" y="340" width="16" height="16"></rect>
                                                <rect x="240" y="372" width="16" height="16"></rect>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Tasks</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdown-example" class="hidden py-2 space-y-2">
                            <div id="newTask" data-modal-target="crud-modal" data-modal-toggle="crud-modal">
                                <div
                                    class="cursor-pointer flex items-center justify-between w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 focus:bg-gray-700">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M12 7V17M12 12H17M7 12H9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                class="stroke-black dark:stroke-white" stroke-width="1.5"
                                                stroke-linecap="round" stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                    <p class="text-center w-full text-xs mt-[.2rem] italic text-gray-300">New Task</p>
                                </div>
                            </div>
                        </div>
                    </li>


                    <li id="active">
                        <div
                            class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-700">
                            <svg class="fill-black dark:fill-white" viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                                id="Daily_x5F_active_x5F_user" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <path
                                            d="M151.762,370.541c-3.488-1.346-7.412,0.385-8.762,3.874s0.385,7.413,3.874,8.763 c32.244,12.471,35.709,55.182,35.834,71.343H63.563c0.126-16.167,3.593-58.872,35.835-71.343c3.489-1.35,5.223-5.273,3.874-8.763 c-1.349-3.489-5.271-5.226-8.761-3.874c-49.245,19.048-44.546,88.328-44.322,91.268c0.27,3.533,3.213,6.26,6.754,6.26h132.385 c3.541,0,6.485-2.727,6.754-6.258C196.306,458.869,201.007,389.589,151.762,370.541z">
                                        </path>
                                        <path
                                            d="M370.538,391.494c3.74,0,6.774-3.033,6.774-6.773c0-3.741-3.034-6.775-6.774-6.775h-53.607 c-3.74,0-6.774,3.034-6.774,6.775v76.574c0,3.74,3.034,6.773,6.774,6.773h53.607c3.74,0,6.774-3.033,6.774-6.773v-50.916 c0-3.741-3.034-6.774-6.774-6.774s-6.774,3.033-6.774,6.774v44.142h-40.059v-63.026H370.538z">
                                        </path>
                                        <path
                                            d="M280.767,300.421c3.741,0,6.774-3.034,6.774-6.774s-3.033-6.774-6.774-6.774H227.16c-3.742,0-6.774,3.034-6.774,6.774 v167.648c0,3.74,3.032,6.773,6.774,6.773h53.607c3.741,0,6.774-3.033,6.774-6.773V319.864c0-3.74-3.033-6.774-6.774-6.774 c-3.74,0-6.774,3.034-6.774,6.774v134.656h-40.059v-154.1H280.767z">
                                        </path>
                                        <path
                                            d="M123.135,362.84c38.155,0,69.196-31.039,69.196-69.193s-31.041-69.195-69.196-69.195 c-38.154,0-69.194,31.041-69.194,69.195S84.981,362.84,123.135,362.84z M123.135,238c30.685,0,55.647,24.963,55.647,55.646 c0,30.682-24.963,55.646-55.647,55.646c-30.683,0-55.646-24.964-55.646-55.646C67.489,262.963,92.452,238,123.135,238z">
                                        </path>
                                        <path
                                            d="M329.528,199.951V65.823c0-3.741-3.034-6.774-6.774-6.774h-44.913v-8.343c0-3.741-3.033-6.774-6.774-6.774 c-3.74,0-6.773,3.033-6.773,6.774v28.087c0,3.74,3.033,6.774,6.773,6.774c3.741,0,6.774-3.034,6.774-6.774v-6.196h38.139v38.207 h-20.26c-3.74,0-6.774,3.034-6.774,6.774s3.034,6.774,6.774,6.774h20.26v75.599c0,10.193-8.294,18.485-18.487,18.485H182.847 c-3.741,0-6.774,3.034-6.774,6.774s3.033,6.774,6.774,6.774h114.646C315.157,231.985,329.528,217.614,329.528,199.951z">
                                        </path>
                                        <path
                                            d="M110.372,201.824c3.742,0,6.774-3.033,6.774-6.773v-70.698h144.341c3.741,0,6.774-3.034,6.774-6.774 s-3.033-6.774-6.774-6.774H117.146V72.597h19.091c3.742,0,6.774-3.033,6.774-6.773c0-3.741-3.033-6.774-6.774-6.774h-25.865 c-3.742,0-6.774,3.033-6.774,6.774v129.228C103.598,198.791,106.63,201.824,110.372,201.824z">
                                        </path>
                                        <path
                                            d="M216.563,85.567c3.741,0,6.774-3.034,6.774-6.774v-6.196h22.077c3.742,0,6.774-3.033,6.774-6.773 c0-3.741-3.033-6.774-6.774-6.774h-22.077v-8.343c0-3.741-3.033-6.774-6.774-6.774c-3.742,0-6.774,3.033-6.774,6.774v28.087 C209.789,82.533,212.821,85.567,216.563,85.567z">
                                        </path>
                                        <path
                                            d="M162.058,85.567c3.742,0,6.774-3.034,6.774-6.774v-6.196h21.942c3.741,0,6.774-3.033,6.774-6.773 c0-3.741-3.033-6.774-6.774-6.774h-21.942v-8.343c0-3.741-3.033-6.774-6.774-6.774c-3.741,0-6.774,3.033-6.774,6.774v28.087 C155.284,82.533,158.317,85.567,162.058,85.567z">
                                        </path>
                                        <path
                                            d="M162.84,167.837c-3.742,0-6.774,3.033-6.774,6.773v11.561c0,3.74,3.032,6.774,6.774,6.774h34.73 c3.742,0,6.774-3.034,6.774-6.774v-34.731c0-3.74-3.033-6.774-6.774-6.774h-34.73c-3.742,0-6.774,3.034-6.774,6.774 c0,3.741,3.032,6.774,6.774,6.774h27.956v21.183h-21.182v-4.786C169.614,170.87,166.581,167.837,162.84,167.837z">
                                        </path>
                                        <path
                                            d="M235.556,167.837c-3.742,0-6.774,3.033-6.774,6.773v11.561c0,3.74,3.032,6.774,6.774,6.774h34.73 c3.74,0,6.774-3.034,6.774-6.774v-34.731c0-3.74-3.034-6.774-6.774-6.774h-34.73c-3.742,0-6.774,3.034-6.774,6.774 c0,3.741,3.032,6.774,6.774,6.774h27.956v21.183H242.33v-4.786C242.33,170.87,239.297,167.837,235.556,167.837z">
                                        </path>
                                        <path
                                            d="M455.254,144.665c-3.741,0-6.774,3.034-6.774,6.774v303.081h-40.06V133.183h46.834c3.74,0,6.773-3.033,6.773-6.773 c0-3.741-3.033-6.774-6.773-6.774h-53.608c-3.74,0-6.774,3.033-6.774,6.774v334.886c0,3.74,3.034,6.773,6.774,6.773h53.608 c3.74,0,6.773-3.033,6.773-6.773V151.439C462.027,147.699,458.994,144.665,455.254,144.665z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Active</span>
                            <span id="activeTasksCount"
                                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">0</span>
                            </div>
                        </li>

                    <li id="completed">
                        <div
                            class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-700">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="24"
                                height=24>
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M15.3742 5.98559L10.3742 14.9856C9.72664 16.1511 7.97832 15.1798 8.62585 14.0143L13.6258 5.01431C14.2734 3.84876 16.0217 4.82005 15.3742 5.98559Z"
                                        class="fill-black dark:fill-white"></path>
                                    <path
                                        d="M5.1247 9.71907L10.1247 13.7191C11.1659 14.552 9.91646 16.1137 8.87531 15.2808L3.87531 11.2808C2.83415 10.4479 4.08354 8.88615 5.1247 9.71907Z"
                                        class="fill-black dark:fill-white"></path>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Completed</span>
                            <span id="completedTasksCount"
                                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">0</span>
                            </div>
                        </li>

                    <li id="notes">
                        <div
                            class="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-700">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24"
                                height=24>
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M11.7769 10L16.6065 11.2941" class="dark:stroke-white stroke-black"
                                        stroke-width="1.5" stroke-linecap="round"></path>
                                    <path d="M11 12.8975L13.8978 13.6739" class="dark:stroke-white stroke-black"
                                        stroke-width="1.5" stroke-linecap="round"></path>
                                    <path
                                        d="M20.3116 12.6473C19.7074 14.9024 19.4052 16.0299 18.7203 16.7612C18.1795 17.3386 17.4796 17.7427 16.7092 17.9223C16.6129 17.9448 16.5152 17.9621 16.415 17.9744C15.4999 18.0873 14.3834 17.7881 12.3508 17.2435C10.0957 16.6392 8.96815 16.3371 8.23687 15.6522C7.65945 15.1114 7.25537 14.4115 7.07573 13.641C6.84821 12.6652 7.15033 11.5377 7.75458 9.28263L8.27222 7.35077C8.35912 7.02646 8.43977 6.72546 8.51621 6.44561C8.97128 4.77957 9.27709 3.86298 9.86351 3.23687C10.4043 2.65945 11.1042 2.25537 11.8747 2.07573C12.8504 1.84821 13.978 2.15033 16.2331 2.75458C18.4881 3.35883 19.6157 3.66095 20.347 4.34587C20.9244 4.88668 21.3285 5.58657 21.5081 6.35703C21.669 7.04708 21.565 7.81304 21.2766 9"
                                        class="dark:stroke-white stroke-black" stroke-width="1.5"
                                        stroke-linecap="round"></path>
                                    <path
                                        d="M3.27222 16.647C3.87647 18.9021 4.17859 20.0296 4.86351 20.7609C5.40432 21.3383 6.10421 21.7424 6.87466 21.922C7.85044 22.1495 8.97798 21.8474 11.2331 21.2432C13.4881 20.6389 14.6157 20.3368 15.347 19.6519C15.8399 19.1902 16.2065 18.6126 16.415 17.9741M8.51621 6.44531C8.16368 6.53646 7.77741 6.63996 7.35077 6.75428C5.09569 7.35853 3.96815 7.66065 3.23687 8.34557C2.65945 8.88638 2.25537 9.58627 2.07573 10.3567C1.91482 11.0468 2.01883 11.8129 2.30728 13"
                                        class="dark:stroke-white stroke-black" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </g>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Notes</span>
                            <span
                                class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">3</span>
                        </div>
                    </li>
                </ul>
                <div class="text-black dark:text-white mt-6" id="todaysDate"></div>
            </div>
  `;

  return drawer;
}
export let userName;

export function getUserName() {
  setTimeout(() => {
    userName = prompt("Name? ");
    const userNameDisplay = document.querySelector("#drawer-navigation-label");
    if (userName === null || userName === "") {
      userName = "new user";
    }
    userNameDisplay.textContent = userName;
  }, 500);
}

// function todaysDate() {
//   let str = "";
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const now = new Date();

//   str += `${days[now.getDay()]} ${now.getDate()} ${
//     months[now.getMonth()]
//   } ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

//   const todaysDate = getElement("#todaysDate");
//   todaysDate.textContent = str;
// }

// setInterval(todaysDate, 1000);

//? Formating the above function to make use of date-fns library

function todaysDate() {
  const now = new Date();
  const str = format(now, "EEEE, d MMMM yyyy HH:mm:ss");

  const todaysDate = getElement("#todaysDate");
  todaysDate.textContent = str;
}

setInterval(todaysDate, 1000);

//! Subscribe to the 'tasksUpdated' and 'completedTasksUpdated' events
pubsub.subscribe("tasksUpdated", updateTasksCount);
pubsub.subscribe("completedTasksUpdated", updateCompletedTasksCount);

function updateTasksCount(tasksCount) {
  const tasksCountElement = getElement("#activeTasksCount");
  if (tasksCountElement) {
    tasksCountElement.textContent = tasksCount;
  }
}

function updateCompletedTasksCount(tasksCount) {
  const taskCountElement = getElement("#completedTasksCount");
  if (taskCountElement) {
    taskCountElement.textContent = tasksCount;
  }
}
