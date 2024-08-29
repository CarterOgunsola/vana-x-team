import "../styles/index.css";
import { initAll } from "./utils/initAll";
import { getEvents } from "./components/eventList.js";
import { renderEvents } from "./components/eventRenderer.js";

async function initializeEventList() {
  try {
    const events = await getEvents();
    renderEvents(events);
  } catch (error) {
    console.error("Failed to initialize event list:", error);
    const listWrap = document.querySelector('[data-event="list-wrap"]');
    if (listWrap) {
      listWrap.innerHTML =
        "<p>Sorry, we couldn't load the events at this time. Please try again later.</p>";
    }
  }
}

function init() {
  initAll();
  initializeEventList();
}

function domReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(init);

export { init };
