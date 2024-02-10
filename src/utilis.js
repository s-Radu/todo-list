export function getElement(selector, all = false) {
  const parentElement = document.getElementById("content");
  return all
    ? parentElement.querySelectorAll(selector)
    : parentElement.querySelector(selector);
}
