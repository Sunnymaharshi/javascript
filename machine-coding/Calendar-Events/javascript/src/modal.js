import eventFormValidation from "./validation.js";
import { formatDateTimeForInput } from "./util.js";
function openModal(isEdit = false, eventData = null) {
  const event_modal = document.getElementById("event-modal");
  const modal_heading = event_modal.querySelector("h1");
  if (isEdit && eventData) {
    modal_heading.textContent = "Edit Event";
    document.getElementById("event-name").value = eventData.title;
    document.getElementById("event-name").dataset.id = eventData.id;
    document.getElementById("event-type").value = eventData.type;
    document.getElementById("event-start").value = formatDateTimeForInput(
      new Date(eventData.start)
    );

    document.getElementById("event-end").value = formatDateTimeForInput(
      new Date(eventData.end)
    );
  } else {
    modal_heading.textContent = "Create Event";
  }
  event_modal.style.display = "block";
  eventFormValidation();
}
function closeModal() {
  const modal = document.getElementById("event-modal");
  modal.style.display = "none";
  document.getElementById("event-form").reset();
}

export { openModal, closeModal };
