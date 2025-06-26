function eventFormValidation() {
  const eventSubmit = document.getElementById("event-submit");
  const eventName = document.getElementById("event-name").value.trim();
  const eventType = document.getElementById("event-type").value.trim();
  const eventStart = document.getElementById("event-start").value.trim();
  const eventEnd = document.getElementById("event-end").value.trim();
  if (eventName && eventType && eventStart && eventEnd) {
    eventSubmit.disabled = false;
  } else {
    eventSubmit.disabled = true;
  }
}
export default eventFormValidation;
