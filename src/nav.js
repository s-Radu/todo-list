export default function nav() {
  let nav = document.createElement("nav");
  nav.className =
    "hidden md:flex flex-col justify-between items-center bg-white dark:bg-gray-900 fixed h-full w-64 z-20 top-0 start-0 ";
  nav.innerHTML = `
  <div class="items-center justify-between flex flex-col w-auto h-96" id="navbar-sticky">
            <div class="w-full ">
                <a href="#"> <img src="./images/logo.png" alt="Logo page" class="w-20 h-20 m-4"> </a>
            </div>
            <ul
                class="flex flex-col justify-between font-josefin p-4 mt-4 h-full w-64 bg-gray-50 border-0 dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-white bg-blue-700  bg-transparent  dark:text-blue-500"
                        aria-current="page" data-page="//">Home</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                        data-page="//">Today</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                        data-page="//">Week</a>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                        data-page="//">Projects</a>
                    <ul
                        class="flex flex-col justify-between p-2 ml-2 -lg bg-gray-50 border-0 dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#"
                                class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                                data-page="//">Random</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                                data-page="//">Another
                                random</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#"
                        class="block py-2 px-3 text-gray-900 bg-transparent hover:text-blue-700  dark:hover:text-blue-500 dark:text-white"
                        data-page="//">Notes</a>
                </li>
            </ul>
        </div>
        <button type="button"
            class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 shadow-button shadow-black dark:shadow-white focus:outline-none focus:ring-blue-300 rounded-full px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg></button>
    `;

  return nav;
}
