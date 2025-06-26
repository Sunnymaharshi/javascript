import { createEventsInCurrentWeek } from "./util.js";
const { default: jsonData } = await import("../data/events.json", {
  with: {
    type: "json",
  },
});
let eventsData = restoreEvents() || createEventsInCurrentWeek(jsonData);
function saveEvents(events) {
  if (events?.length > 0) {
    localStorage.setItem("events", JSON.stringify(events));
  }
}
function restoreEvents() {
  if (localStorage.getItem("events") !== null) {
    const events = JSON.parse(localStorage.getItem("events"));
    if (events?.length > 0) {
      return events;
    }
  }
  return null;
}

export default eventsData;
export { saveEvents, restoreEvents };
