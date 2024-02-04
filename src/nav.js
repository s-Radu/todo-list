export default function nav() {
  let nav = document.createElement("nav");
  nav.className =
    "bg-white border-b-2 border-gray-800 dark:border-gray-600 dark:bg-gray-900";
  nav.innerHTML = `
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex justify-between items-center w-32 ml-4">
                    <button class="text-white">Something</button>
                    <a href="#"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40"
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
                        </svg>
                    </a>
                </div>

                <div class="flex justify-between items-center w-32 mr-4">
                    <button class="text-white text-6xl font-josefin">+</button>
                    <div id="toggle"
                        class="w-12 h-6 flex items-center bg-black rounded-full p-1 cursor-pointer transform duration-200 ease-in-expo">
                        <div id="circle"
                            class="w-5 h-5 bg-white rounded-full shadow-md shadow-black duration-500 translate-x-5  ease-in-expo">
                        </div>
                    </div>
                </div>

            </div>
    `;

  return nav;
}
