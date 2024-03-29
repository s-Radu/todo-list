import arrowLeft from "./imgs/arrowLeft.png";
import arrowRight from "./imgs/arrowRight.png";
import pubsub, { getElement } from "./utilis.js";

export default function home() {
  let home = document.createElement("div");
  home.className = //! change back hidden when done creating the new page
    "relative container mx-auto flex flex-col rounded-2xl min-h-screen";
  home.id = "homePage";
  home.innerHTML = `
<h1 class="text-center text-4xl text-black dark:text-white mt-6 md:mt-40">Welcome to ToDoMaster!</h1>
    <p class="text-center text-lg m-4 text-gray-500 dark:text-gray-300 w-3/4 mx-auto">ToDoMaster is your personal task manager, designed to simplify and enhance your productivity, take notes and keep track of your tasks.
      With ToDoMaster, you can easily create, manage, and track your tasks in one place.
        Use the navigation menu on the left to switch between different tasks or categories.
        If you have a task in mind, quickly add it using the 'Quick Add' button on the right.
        Start organizing your life with ToDoMaster today!
    </p>
    <p id="tasksCount" class="text-center text-lg m-4 text-gray-500 dark:text-gray-300 w-3/4 mx-auto"></p>
    
      <img src="${arrowLeft}" alt="arrow left" class="absolute hidden md:block left-10 top-0 w-44 h-44">
      <img src="${arrowRight}" alt="arrow right" class="absolute hidden md:block right-28 top-0 w-44 h-44">
`;

  return home;
}

//* Subscribe to 'tasksUpdated' event
pubsub.subscribe("tasksUpdated", (newTasksCount) => {
  const tasksCountElement = getElement("#tasksCount");
  if (tasksCountElement) {
    tasksCountElement.textContent = `You have ${newTasksCount} active tasks at the moment`;
  }
});
