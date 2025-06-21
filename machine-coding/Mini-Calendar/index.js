const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const init = () => {
  const todayBtn = document.querySelector(".calendar__header--btn.today");
  const prevBtn = document.querySelector(".calendar__header--btn.prev");
  const nextBtn = document.querySelector(".calendar__header--btn.next");
  const calendar_header = document.querySelector(".calendar__header--month");
  todayBtn.addEventListener("click", () => {
    renderCalendar();
  });
  prevBtn.addEventListener("click", () => {
    const [month, year] = calendar_header.innerHTML.split(", ");
    let monthNum = months.indexOf(month);

    let yearNum = +year;
    if (monthNum === 0) {
      yearNum--;
      monthNum = 11;
    } else {
      monthNum--;
    }

    renderCalendar(monthNum, yearNum);
  });
  nextBtn.addEventListener("click", () => {
    const [month, year] = calendar_header.innerHTML.split(", ");
    let monthNum = months.indexOf(month);
    let yearNum = +year;
    if (monthNum === 11) {
      yearNum++;
      monthNum = 0;
    } else {
      monthNum++;
    }
    renderCalendar(monthNum, yearNum);
  });
  renderCalendar();
};
const renderCalendar = (month = null, year = null) => {
  const calendar_days = document.querySelector(".calendar__days");
  const date = new Date();
  // month is 0 for Jan, won't work if we simply put month
  const currentMonth = month !== null && month >= 0 ? month : date.getMonth();
  const currentYear = year ? year : date.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstDayIndex = firstDay.getDay();
  // 0 means 1 day less than 1st date
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayDate = lastDay.getDate();
  const lastDayIndex = lastDay.getDay();
  // 0 means 1 day less than 1st date
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();

  const nextDays = 7 - lastDayIndex - 1;
  const calendar_header = document.querySelector(".calendar__header--month");
  calendar_header.innerHTML = `${months[currentMonth]}, ${currentYear}`;

  let daysDivs = "";
  // prev month days
  for (let i = firstDayIndex; i > 0; i--) {
    daysDivs += `<div class="calendar__day prev">${
      prevLastDayDate - i + 1
    }</div>`;
  }
  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    if (
      date.getDate() === i &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      daysDivs += `<div class="calendar__day today">${i}</div>`;
    } else {
      daysDivs += `<div class="calendar__day">${i}</div>`;
    }
  }
  // next month days
  for (let i = 1; i <= nextDays; i++) {
    daysDivs += `<div class="calendar__day next">${i}</div>`;
  }
  calendar_days.innerHTML = daysDivs;
};

init();
