export default function home() {
  let home = document.createElement("div");
  home.className = "container mx-auto rounded-2xl m-4";
  home.id = "homePage";
  home.innerHTML = `
<h1 class="text-center text-4xl text-black dark:text-white">Your easiest to do app</h1>
<p class="text-center text-lg m-4 text-gray-500 dark:text-gray-300">Get started by adding a new task</p>
`;

  return home;
}

//? Could add another p element that shows how many open tasks are at the moment
