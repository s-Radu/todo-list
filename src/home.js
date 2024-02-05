export default function home() {
  let home = document.createElement("div");
  home.className = "container mx-auto rounded-2xl font-josefin m-4 home";
  home.innerHTML = `
<h1 class="text-center text-4xl text-black dark:text-white">Your easiest to do app</h1>
`;

  return home;
}
