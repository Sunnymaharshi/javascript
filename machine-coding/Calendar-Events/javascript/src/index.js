import eventFormValidation from "./validation.js";
import events, { saveEvents } from "./events.js";
import { openModal, closeModal } from "./modal.js";
import { formatDateTimeForInput } from "./util.js";
let eventsData = events;
init();
function init() {
  renderCalendar();
  setInterval(addTimeIndicator, 60000);
  addEventListeners();
  scrollTo9AM();
}
function renderCalendar(startDate = null) {
  const sticky_grid = document.getElementById("sticky-grid");
  const scroll_grid = document.getElementById("scroll-grid");
  let currentWeekStart;
  // empty the grid before updating
  sticky_grid.innerHTML = "";
  scroll_grid.innerHTML = "";

  // calculate start date of the week
  if (startDate === null) {
    currentWeekStart = new Date();
    currentWeekStart.setDate(
      currentWeekStart.getDate() - currentWeekStart.getDay()
    );
  } else {
    currentWeekStart = startDate;
  }
  // reset hours to 12AM
  currentWeekStart.setHours(0, 0, 0, 0);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // render day headers
  const empty_header = document.createElement("div");
  empty_header.className = "day-header";
  sticky_grid.appendChild(empty_header);
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);

    const day_header = document.createElement("div");
    day_header.className = "day-header";
    if (date.toDateString() === today.toDateString()) {
      day_header.classList.add("current-day");
    }
    day_header.textContent = `${days[i]} ${date.getDate()}`;
    sticky_grid.appendChild(day_header);
  }

  // generate all day slots
  const allDayLabel = document.createElement("div");
  allDayLabel.className = "all-day-label";
  allDayLabel.textContent = "All Day";
  sticky_grid.appendChild(allDayLabel);
  for (let day = 0; day < 7; day++) {
    const all_day_slot = document.createElement("div");
    all_day_slot.className = "all-day-slot";
    all_day_slot.dataset.allDay = day;
    sticky_grid.appendChild(all_day_slot);
  }
  // generate time slots - time label & each hour for 7 days
  for (let hour = 0; hour < 24; hour++) {
    const time_label = document.createElement("div");
    time_label.className = "time-label";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    time_label.textContent = `${displayHour} ${ampm}`;
    scroll_grid.appendChild(time_label);
    for (let day = 0; day < 7; day++) {
      const time_slot = document.createElement("div");
      time_slot.className = "time-slot";
      // store dayIndex & hour in dataset
      time_slot.dataset.day = day;
      time_slot.dataset.hour = hour;
      scroll_grid.appendChild(time_slot);
    }
  }
  updateMonthRange(currentWeekStart);
  addEventsToCalender(currentWeekStart);
  addTimeIndicator();
}
function addTimeIndicator() {
  const currentWeekStart = getCurrentWeekStartDate();
  const existingIndicator = document.querySelector("current-time-indicator");
  if (existingIndicator) {
    existingIndicator.remove();
  }
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const nowWeekStart = new Date(now);
  nowWeekStart.setDate(now.getDate() - currentDay);
  nowWeekStart.setHours(0, 0, 0, 0);
  if (nowWeekStart.getTime() === currentWeekStart.getTime()) {
    // Find the current time slot
    const currentTimeSlot = document.querySelector(
      `[data-day="${currentDay}"][data-hour="${currentHour}"]`
    );
    if (currentTimeSlot) {
      const indicator = document.createElement("div");
      indicator.className = "current-time-indicator";
      // Position the indicator within the current time slot
      const minuteOffset = (currentMinutes / 60) * 100;
      indicator.style.top = `${minuteOffset}%`;
      currentTimeSlot.appendChild(indicator);
    }
  }
}
function addEventListeners() {
  const prevBtn = document.getElementById("prev-btn");
  const todayBtn = document.getElementById("today-btn");
  const nextBtn = document.getElementById("next-btn");
  const calendar_container = document.querySelector(".calendar-container");
  const event_form = document.getElementById("event-form");
  const modalClose = document.getElementById("modal-close-btn");
  const modalCancel = document.getElementById("modal-cancel-btn");
  prevBtn.addEventListener("click", () => {
    changeWeek(-1);
  });
  todayBtn.addEventListener("click", () => {
    renderCalendar();
  });
  nextBtn.addEventListener("click", () => {
    changeWeek(1);
  });
  calendar_container.addEventListener("click", handleTimeSlotClick);
  event_form.addEventListener("input", eventFormValidation);
  event_form.addEventListener("submit", handleEventFormSubmit);
  modalClose.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
}

function updateMonthRange(currentWeekStart) {
  const calendar_header = document.getElementById("week-range");
  const end_date = new Date(currentWeekStart);
  end_date.setDate(currentWeekStart.getDate() + 6);
  const options = { month: "short", year: "numeric" };
  const startStr = currentWeekStart.toLocaleDateString("en-US", options);
  const endStr = end_date.toLocaleDateString("en-US", options);
  calendar_header.dataset.startTime = currentWeekStart.getTime();
  const sameMonth = currentWeekStart.getMonth() === end_date.getMonth();
  calendar_header.textContent = sameMonth
    ? startStr
    : `${startStr} - ${endStr}`;
}
function getCurrentWeekStartDate() {
  const calendar_header = document.getElementById("week-range");
  return new Date(+calendar_header.dataset.startTime);
}
function addEventsToCalender(currentWeekStart) {
  for (const event of eventsData) {
    const start_date = new Date(event.start);
    const end_date = new Date(event.end);
    const event_day = start_date.getDay();
    const eventWeekStart = new Date(start_date);
    eventWeekStart.setDate(start_date.getDate() - event_day);
    eventWeekStart.setHours(0, 0, 0, 0);
    // check start date of event week & current week are same
    // means event is in current week
    if (eventWeekStart.getTime() === currentWeekStart.getTime()) {
      const startHour = start_date.getHours();
      const startMinutes = start_date.getMinutes();
      // duration in hours
      const duration =
        (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60);

      const time_slot =
        event.type.toLowerCase() === "task"
          ? document.querySelector(
              `[data-day="${event_day}"][data-hour="${startHour}"]`
            )
          : document.querySelector(`[data-all-day="${event_day}"]`);
      if (time_slot) {
        const eventElement = document.createElement("div");
        const closeBtn = document.createElement("button");
        closeBtn.textContent = "X";
        closeBtn.className = "event-remove";
        closeBtn.title = "Delete event";
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeEvent(event.id);
        });
        const textDiv = document.createElement("div");
        textDiv.className = "event-title";
        eventElement.className = `event ${event.type.toLocaleLowerCase()}`;
        textDiv.textContent = event.title;
        eventElement.dataset.id = event.id;

        textDiv.title = `${
          event.title
        }\n${start_date.toLocaleString()} - ${end_date.toLocaleString()}`;
        if (event.type.toLowerCase() === "task") {
          // Position the event within the time slot
          // convert min to hour and calculate percentage
          // to get how far from top, event to be placed
          const topOffset = (startMinutes / 60) * 100;

          // convert hour duration to percentage
          // take min of percentage & remaining from top
          // to prevent overflow outside time slot
          // const height = Math.min(duration * 100, 100 - topOffset);

          // to overflow outside time slot if > an hour
          const height = duration * 100;

          eventElement.style.top = `${topOffset}%`;
          eventElement.style.height = `${height}%`;
          if (height < 50) {
            eventElement.style.padding = "2px 3px";
            eventElement.style.fontSize = "10px";
          }
        } else {
          eventElement.style.top = 0;
          eventElement.style.height = `100%`;
        }
        eventElement.appendChild(textDiv);
        eventElement.appendChild(closeBtn);
        time_slot.appendChild(eventElement);
        updateEventPositionsInTimeSlot(time_slot);
      }
    }
  }
}
function updateEventPositionsInTimeSlot(timeSlot) {
  const events = timeSlot.querySelectorAll(".event");
  const eventCount = events.length;
  if (eventCount > 0) {
    // Calculate width and position for each event
    const eventWidth = 90 / eventCount;
    events.forEach((event, index) => {
      const leftOffset = index * eventWidth;
      // Update event positioning
      event.style.left = `${leftOffset}%`;
      event.style.width = `${eventWidth}%`;
      event.style.right = "auto";
      // Adjust styling based on number of events
      if (eventCount > 1) {
        event.style.padding = "2px 3px";
        event.style.fontSize = "8px";
      }
    });
  }
}
function changeWeek(direction) {
  const currentWeekStart = getCurrentWeekStartDate();
  currentWeekStart.setDate(currentWeekStart.getDate() + direction * 7);
  renderCalendar(currentWeekStart);
}

function removeEvent(eventId) {
  const confirmation = confirm("Are you sure you want to delete this task?");
  if (confirmation) {
    eventsData = eventsData.filter((e) => e.id !== eventId);
    const event = document.querySelector(`.event[data-id="${eventId}"`);
    event.remove();
    saveEvents(eventsData);
    renderCalendar(getCurrentWeekStartDate());
  }
}
function handleTimeSlotClick(e) {
  const sunday_error = document.getElementById("sundayMessage");
  const targetElement = e.target.classList.contains("event-title")
    ? e.target.parentElement
    : e.target;
  const targetClasses = Array.from(targetElement.classList);
  const list = ["time-slot", "event", "all-day-slot"];
  if (list.some((cls) => targetClasses.includes(cls))) {
    if (targetClasses.includes("event")) {
      const eventData = eventsData.find(
        (event) => event.id === targetElement.dataset.id
      );
      openModal(true, eventData);
    } else if (
      targetElement.dataset.allDay === "0" ||
      targetElement.dataset.day === "0"
    ) {
      sunday_error.style.display = "block";
      setTimeout(() => {
        sunday_error.style.display = "none";
      }, 2000);
    } else {
      const timeSlot = targetElement;
      const currentWeekStart = getCurrentWeekStartDate();
      let startDate = new Date(currentWeekStart);
      let endDate;
      if (timeSlot.classList.contains("all-day-slot")) {
        const day = parseInt(timeSlot.dataset.allDay);
        startDate.setDate(currentWeekStart.getDate() + day);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 0, 0);
        document.getElementById("event-type").value = "HOLIDAY";
      } else {
        const day = parseInt(timeSlot.dataset.day);
        const hour = parseInt(parseInt(timeSlot.dataset.hour));
        startDate.setDate(currentWeekStart.getDate() + day);
        startDate.setHours(hour, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(hour + 1, 0, 0, 0);
        document.getElementById("event-type").value = "TASK";
      }

      document.getElementById("event-start").value =
        formatDateTimeForInput(startDate);

      document.getElementById("event-end").value =
        formatDateTimeForInput(endDate);
      openModal();
    }
  }
}
function handleEventFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const eventId = document.getElementById("event-name").dataset.id;

  const eventData = {
    title: formData.get("name"),
    type: formData.get("type"),
    start: new Date(formData.get("start")).getTime(),
    end: new Date(formData.get("end")).getTime(),
    id: eventId ? eventId : Date.now().toString(),
  };
  if (eventData.end <= eventData.start) {
    alert("End time must be after start time");
    return;
  }
  if (eventId) {
    const index = eventsData.findIndex((e) => e.id === eventId);
    if (index !== -1) {
      eventsData[index] = eventData;
    }
  } else {
    eventsData.push(eventData);
  }
  saveEvents(eventsData);
  closeModal();
  // re-render same week
  renderCalendar(getCurrentWeekStartDate());
}

function scrollTo9AM() {
  const slot_9AM = document.querySelector('[data-day="0"][data-hour="9"]');
  setTimeout(() => {
    slot_9AM.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 600);
}
