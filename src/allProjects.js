export default function allProjects() {
  let ele = document.createElement("div");
  ele.className =
    "hidden flex flex-col font-josefin text-white container mx-auto m-4 min-h-screen";
  ele.id = "allProjectsPage";
  ele.innerHTML = `
  <h1 class="text-center text-4xl m-4 text-gray-500 dark:text-white">All Projects</h1>

            <div data-allProjectsPage class="flex flex-wrap justify-center items-start gap-4 p-5 h-full w-full">
                
            </div>
  `;

  return ele;
}
