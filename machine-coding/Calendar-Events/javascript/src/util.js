function formatDateTimeForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
function createEventsInCurrentWeek(eventsData) {
  const currentWeekStart = new Date();
  currentWeekStart.setDate(
    currentWeekStart.getDate() - currentWeekStart.getDay()
  );
  return eventsData.map((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    startDate.setMonth(
      currentWeekStart.getMonth(),
      currentWeekStart.getDate() + startDate.getDay()
    );
    endDate.setMonth(
      currentWeekStart.getMonth(),
      currentWeekStart.getDate() + startDate.getDay()
    );
    return { ...event, start: startDate.getTime(), end: endDate.getTime() };
  });
}

export { createEventsInCurrentWeek, formatDateTimeForInput };
