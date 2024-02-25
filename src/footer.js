import { createElement } from "./utilis.js";

export default function footer() {
  let footer = createElement({
    tag: "footer",
    id: "footer",
    classes: `fixed left-0 right-0 container mx-auto z-20 max-h-20 p-4 bg-white border-t border-gray-200 rounded-t-xl shadow flex flex-col md:flex-row items-center justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600`,
    content: `
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 
        <a href="https://github.com/s-Radu" class="hover:underline hover:text-gray-500 dark:hover:text-white">lilVoid™</a>. All Rights Reserved.
    </span>
              <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                  <li id="navAbout">
                      <p class="hover:underline me-4 md:me-6 cursor-pointer" type="button"
                          data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example"
                          data-drawer-placement="right" aria-controls="drawer-right-example">
                          About
                      </p>
                  </li>
                  <li id="navPrivacy">
                      <p class="hover:underline me-4 md:me-6 cursor-pointer" type="button"
                          data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example"
                          data-drawer-placement="right" aria-controls="drawer-right-example">
                          Privacy Policy
                      </p>
                  </li>
                  <li id="navLicencing">
                      <p class="hover:underline me-4 md:me-6 cursor-pointer" type="button"
                          data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example"
                          data-drawer-placement="right" aria-controls="drawer-right-example">
                          Licencing
                      </p>
                  </li>
                  <li id="navContact">
                      <p class="hover:underline me-4 md:me-6 cursor-pointer" type="button"
                          data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example"
                          data-drawer-placement="right" aria-controls="drawer-right-example">
                          Contact
                      </p>
                  </li>
              </ul>
              `,
  });

  let drawerContents = {
    navAbout: { title: "About", content: about.content },
    navPrivacy: { title: "Privacy policy", content: privacy.content },
    navLicencing: { title: "Licencing", content: licencing.content },
    navContact: { title: "Contact us", content: contact.content },
  };

  let drawer = createDrawer(
    drawerContents["navAbout"].title,
    drawerContents["navAbout"].content
  );
  footer.appendChild(drawer);

  let listItems = footer.querySelectorAll("li");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      let content = drawerContents[item.id];
      if (content) {
        drawer.querySelector("#drawer-title").textContent = content.title;
        drawer.querySelector("#drawer-content").innerHTML = content.content;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
  return footer;
}

function createDrawer(title, content) {
  const drawer = createElement({
    tag: "div",
    id: "drawer-right-example",
    attributes: { tabindex: "-1", "aria-labelledby": "drawer-right-label" },
    classes: `fixed top-0 bottom-0 -right-2 md:-right-6 z-40 min-h-screen p-4 overflow-y-auto rounded-l-xl border-l-2 border-black dark:border-white transition-transform translate-x-full bg-white w-80 dark:bg-gray-600`,
    content: `
    <span id="drawer-right-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <svg class="w-6 h-6 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <p class="text-2xl text-gray-700 dark:text-gray-300" id="drawer-title">${title}</p>
    </span>

    <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        <span class="sr-only">Close menu</span>
    </button>

    <div class="flex flex-col h-full" id="drawer-content">${content}</div>`,
  });

  return drawer;
}

let about = {
  content: `
    <p class=" text-md text-gray-500 dark:text-gray-400">
    The To-Do List task is a simple, web-based application designed to help users manage their tasks.
    </p>
    <p class="mb-6 text-md text-gray-500 dark:text-gray-400">
    It provides an intuitive interface where users
    can add, update, and delete tasks and notes, helping them to stay organized and productive.
    </p>
    
    <h2 class="text-xl text-gray-500 dark:text-gray-300">
    Key Features:
    </h2>
    
    <ul class="mt-4">
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        Task Management: Users can add new tasks to their list, providing a task name and optionally a due
        date or priority level.
        Tasks can be marked as completed when done, and can be edited or deleted at any time.
    </li>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        Task Sorting and Filtering: Tasks can be sorted by All tasks, Active tasks, or Completed tasks,
        making it easy for users to prioritize their work. Users can also filter their tasks to view only
        completed or incomplete tasks.
    </li>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        Persistent Storage: Tasks are stored in the user's browser using local storage, so they persist even
        when the user closes and reopens the browser.
    </li>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        Responsive Design: The application is designed to work well on both desktop and mobile devices, so
        users can manage their tasks wherever they are.
    </li>
    </ul>
    <p class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
    This task is built using
    <span class="hover:underline hover:text-black hover:dark:text-white cursor-pointer">HTML</span>,
    <span class="hover:underline hover:text-black hover:dark:text-white cursor-pointer">TailwindCSS</span>,
    and
    <span class="hover:underline hover:text-black hover:dark:text-white cursor-pointer">JavaScript</span>,
    and demonstrates skills in DOM manipulation,
    event handling, and local storage.
    </p>
    `,
};

let privacy = {
  content: `
    <h2 class="text-xl text-gray-500 dark:text-gray-300">
    This privacy policy governs your use of the software application To-Do List ("Application") for mobile
    devices and web browsers.
    </h2>
    <ul class="mt-4">
    <p class="text-[1.1rem] text-black dark:text-white">What information does the Application obtain and
        how is it used?
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        The Application does not collect or transmit any personally identifiable information about you, such
        as your name, address, phone number or email address.
    
        The Application does store certain types of data on your device. This data includes the tasks that
        you add to your to-do list, along with any associated information such as due dates or priority
        levels. This data is stored locally on your device and is not transmitted to us or any third
        parties.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Can users see their personal data?
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        The Application itself does not collect, transmit, or maintain user data. As a result, you can not
        directly view your personal data. However, you can access and view the tasks that you have added to
        the Application at any time.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Do you share personal information?
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        No. The Application is a standalone application. It does not use any third party services, analytics
        providers, or vendors.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Do you use vendors or analytics providers?
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        No. The Application is a standalone application. It does not use any third party services, analytics
        providers, or vendors.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Compliance with Children's Online Privacy Protection
        Act
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        As we do not collect any personal information, we do not knowingly solicit data from or market to
        children under the age of 13.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Changes
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        This Privacy Policy may be updated from time to time for any reason. We will notify you of any
        changes to our Privacy Policy by posting the new Privacy Policy here. You are advised to consult
        this Privacy Policy regularly for any changes.
    </li>
    
    <p class="text-[1.1rem] text-black dark:text-white">Contact us
    </p>
    <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
        If you have any questions regarding privacy while using the Application, or have questions about our
        practices, please contact us via email at
        <span
            class="hover:cursor-pointer hover:text-black hover:dark:text-white hover:underlined">doNotContact@doNot@dont.com</span>
    </li>
    </ul>`,
};

let licencing = {
  content: `
            <ul class="mt-4">
                <p class="text-[1.1rem] text-black dark:text-white">Grant of License
                </p>
                <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
                    This Agreement permits you to use one copy of the software included in this package ("Software"), on
                    any single computer, provided the Software is in use on only one computer at any time.
                </li>

                <p class="text-[1.1rem] text-black dark:text-white">Copyright
                </p>
                <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
                    The Software is owned by
                    <span class="text-black dark:text-white hover:underline cursor-pointer">lilVoid</span> and is
                    protected by
                    copyright law. Therefore,
                    you must treat the Software like any other copyrighted material.
                </li>

                <p class="text-[1.1rem] text-black dark:text-white">Restrictions on Use
                </p>
                <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
                    You may not distribute copies of the Software to others or electronically transfer the Software from
                    one computer to another over a network. The Software contains trade secrets and to protect them you
                    may not decompile, reverse engineer, disassemble, or otherwise reduce the Software to a
                    human-perceivable form.
                </li>

                <p class="text-[1.1rem] text-black dark:text-white">Termination
                </p>
                <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
                    This license is effective until terminated. You may terminate it at any point by destroying the
                    Software together with all copies of the Software. It will also terminate if you fail to comply with
                    any term or condition of this Agreement.
                </li>

                <p class="text-[1.1rem] text-black dark:text-white">No Warranty
                </p>
                <li class="mb-6 indent-2 text-base text-gray-500 dark:text-gray-400">
                    The Software is being delivered to you AS IS and
                    <span class="text-black dark:text-white hover:underline cursor-pointer">lilVoid</span> makes no
                    warranty as to
                    its use or performance.
                </li>
            </ul>
`,
};
let contact = {
  content: `
            <div class="flex flex-col justify-center items-center h-full">
                <h1 class="text-2xl text-center text-black dark:text-white">Don't</h1>
                <h1 class="text-2xl text-center text-black dark:text-white">contact</h1>
                <h1 class="text-2xl text-center text-black dark:text-white">us</h1>
            </div>
`,
};
