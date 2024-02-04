export function getElement(selector) {
  const content = document.getElementById("content");
  return content.querySelector(selector);
}
