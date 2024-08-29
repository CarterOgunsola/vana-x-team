export function renderEvents(events) {
  const listWrap = document.querySelector('[data-event="list-wrap"]');
  if (!listWrap) {
    console.error("List wrapper not found!");
    return;
  }

  const cardTemplate = document.querySelector('[data-event="main-card"]');
  if (!cardTemplate) {
    console.error("Card template not found!");
    return;
  }

  // Remove only the dynamically added events
  Array.from(listWrap.children).forEach((child) => {
    if (child.hasAttribute("data-dynamic-event")) {
      child.remove();
    }
  });

  events.forEach((event) => {
    const eventCard = cardTemplate.cloneNode(true);
    eventCard.style.display = "block";
    eventCard.setAttribute("data-dynamic-event", "true");

    if (event.isPast) {
      eventCard.classList.add("is--past");
    }

    // Helper function to safely set text content
    const setTextContent = (selector, content) => {
      const elements = eventCard.querySelectorAll(`[data-event="${selector}"]`);
      elements.forEach((element) => {
        element.textContent = content;
      });
    };

    // Populate event details
    setTextContent("event-name", event.name);
    setTextContent(
      "event-date",
      event.isPast ? `${event.date} — Past Event` : event.date
    );
    setTextContent("location", event.location);
    setTextContent("event-start-time", event.startTime);
    setTextContent("event-end-time", event.endTime);

    const linkElements = eventCard.querySelectorAll(
      '[data-event="event-link-url"]'
    );
    linkElements.forEach((linkElement) => {
      linkElement.href = event.url;
    });

    const imageElement = eventCard.querySelector('[data-event="event-image"]');
    if (imageElement) {
      imageElement.src = event.imageUrl;
      imageElement.alt = event.name;
    }

    listWrap.appendChild(eventCard);
  });
}
