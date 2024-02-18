export function getElement(selector, all = false) {
  const parentElement = document.getElementById("content");
  return all
    ? parentElement.querySelectorAll(selector)
    : parentElement.querySelector(selector);
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
