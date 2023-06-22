class CalendarDate {
  constructor(date = new Date()) {
    this.currentDate = date instanceof Date ? date : new Date(date);
  }

  get currentMonth() {
    return this.currentDate.toLocaleString("default", { month: "long" });
  }

  get currentYear() {
    return this.currentDate.getFullYear();
  }

  set changedDate(newDate) {
    this.currentDate = newDate;
  }

  getDaysInMonth(dateTime) {
    const dateObj = dateTime ?? this.currentDate;
    const date = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
    return date.getDate();
  }

  checkDateExists(date, dayOfTheWeek) {
    const weekday = date.getDay();
    return weekday === dayOfTheWeek;
  }

  static subtractDate(date, months) {
    const newDate = new Date(date.getTime());
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - months);
    return new CalendarDate(newDate);
  }

  static addDate(date, months) {
    const newDate = new Date(date.getTime());
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + months);
    return new CalendarDate(newDate);
  }
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Starts from zero
const NUMBER_OF_DAYS_IN_A_WEEK = 6;

const createAppendDayElement = (attributes, content, weekdaysElement) => {
  const dayElement = document.createElement("div");
  dayElement.classList.add(
    "calendar-day",
    "plain",
    "uppercase",
    attributes.isWeekday && "bottom-spacing"
  );
  for (const attr in attributes) {
    dayElement.setAttribute(attr, attributes[attr]);
  }
  if (content) {
    dayElement.textContent = content;
  }

  weekdaysElement.appendChild(dayElement);
};

const createMonthOverviewElement = (content, attributes, classNames) => {
  const monthElement = document.createElement("div");
  monthElement.textContent = content;
  const icon = document.createElement("i");
  const isPrevIcon = classNames && classNames.includes("prevMonth");
  if (classNames) {
    icon.classList.add(
      "fa",
      `fa-long-arrow-${isPrevIcon ? "left" : "right"}`,
      "plain"
    );
  }
  icon.style[!isPrevIcon ? "marginLeft" : "marginRight"] = "10px";
  monthElement.appendChild(icon);

  monthElement[!isPrevIcon ? "appendChild" : "prepend"](icon);

  monthElement.classList.add(...(classNames ?? []), "calendar-month", "plain");
  for (const attr in attributes) {
    monthElement.setAttribute(attr, attributes[attr]);
  }
  return monthElement;
};
