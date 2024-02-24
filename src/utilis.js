export function getElement(selector, all = false) {
  const parentElement = document.getElementById("content");
  return all
    ? parentElement.querySelectorAll(selector)
    : parentElement.querySelector(selector);
}

export function createElement(
  tag,
  attributes,
  dataAttributes,
  classes,
  content
) {
  const element = document.createElement(tag);
  //! Add attributes !
  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  //! Add data attributes
  if (dataAttributes) {
    for (const key in dataAttributes) {
      element.dataset[key] = dataAttributes[key];
    }
  }

  //! Add classes
  if (classes) {
    element.className = classes;
  }

  //! Add content
  if (content) {
    element.innerHTML = content;
  }

  return element;
}

export function preventUserToSelectOlderDate(element, selector) {
  element = getElement(selector);
  if (element) {
    const today = new Date().toISOString().split("T")[0];
    element.min = today;
  } else {
    console.error(`No element found with selector ${selector}`);
  }
}

class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map((callback) => callback(data));
  }

  unsubscribe(event, callback) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    this.events[event] = this.events[event].filter(
      (subscribedCallback) => subscribedCallback !== callback
    );
  }
}

export default new PubSub();
