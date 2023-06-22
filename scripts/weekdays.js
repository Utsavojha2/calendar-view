class CalendarWeekdays {
  constructor(date) {
    this.date = new CalendarDate(date);
    this.calendarHeader = document.querySelector(".calendar-header");
    this.calendarWeekdays = document.querySelector(".calendar-weekdays");
  }

  renderMonth() {
    const [prevMonth, nextMonth] = [
      CalendarDate.subtractDate(this.date.currentDate, 1).currentMonth,
      CalendarDate.addDate(this.date.currentDate, 1).currentMonth,
    ];

    const previousMonthElement = createMonthOverviewElement(
      prevMonth.substring(0, 3),
      {
        "data-value": `01-${prevMonth}-${this.date.currentYear}`,
      },
      ["prevMonth"]
    );

    previousMonthElement.addEventListener(
      "click",
      this.onPrevMonthClick.bind(this)
    );

    const nextMonthElement = createMonthOverviewElement(
      nextMonth.substring(0, 3),
      {
        "data-value": `01-${nextMonth}-${this.date.currentYear}`,
      },
      ["nextMonth"]
    );

    nextMonthElement.addEventListener(
      "click",
      this.onNextMonthClick.bind(this)
    );

    [
      previousMonthElement,
      createMonthOverviewElement(this.date.currentMonth, {
        "data-value": `${this.date.currentDate.getDate() ?? "01"}-${
          this.date.currentMonth
        }-${this.date.currentYear}`,
      }),
      nextMonthElement,
    ].forEach((el) => this.calendarHeader.appendChild(el));
  }

  onPrevMonthClick() {
    this.onClearCurrentWindow();
    const prevDate = CalendarDate.subtractDate(this.date.currentDate, 1);
    this.date = prevDate;
    renderCalendarView(this.date.currentDate);
  }

  onNextMonthClick() {
    this.onClearCurrentWindow();
    const prevDate = CalendarDate.addDate(this.date.currentDate, 1);
    this.date = prevDate;
    renderCalendarView(this.date.currentDate);
  }

  renderWeekdays() {
    for (const day of WEEKDAYS) {
      createAppendDayElement(
        { isWeekday: true },
        day.substring(0, 3),
        this.calendarWeekdays
      );
    }
  }

  renderDays() {
    const { currentMonth, currentYear } = this.date;
    let currentWeekday = 0;

    for (let day = 1; day <= this.date.getDaysInMonth(); day++) {
      const date = new Date(`${day} ${currentMonth} ${currentYear}`);
      while (!this.date.checkDateExists(date, currentWeekday)) {
        createAppendDayElement(
          {
            "data-previous": true,
          },
          null,
          this.calendarWeekdays
        );
        if (currentWeekday === 6) {
          currentWeekday = 0;
        } else {
          currentWeekday++;
        }
      }

      const dayString = day >= 10 ? day : `0${day}`;

      const isTodayDate =
        date.toLocaleDateString() === new Date().toLocaleDateString();

      createAppendDayElement(
        { "data-current": true, ...(isTodayDate && { "data-today": true }) },
        dayString,
        this.calendarWeekdays
      );
      if (day === this.date.getDaysInMonth()) {
        break;
      }
      if (currentWeekday === 6) {
        currentWeekday = 0;
      } else {
        currentWeekday++;
      }
    }

    const remainingWeekdaysToBeShown =
      NUMBER_OF_DAYS_IN_A_WEEK - currentWeekday;

    for (let i = 0; i < remainingWeekdaysToBeShown; i++) {
      createAppendDayElement(
        { "data-future": true },
        null,
        this.calendarWeekdays
      );
    }

    this.renderPreviousMonth(new Date(`${currentMonth} ${currentYear}`));
    this.renderFutureMonth();
  }

  renderPreviousMonth(currentStateDate) {
    const substractedDate = CalendarDate.subtractDate(currentStateDate, 1);
    const prevMonthDays = substractedDate.getDaysInMonth(
      substractedDate.currentDate
    );

    const prevDateElements = [
      ...document.querySelectorAll('.calendar-day[data-previous="true"]'),
    ];

    prevDateElements.forEach((el, i, prevElement) => {
      el.classList.add("fade-in");
      el.textContent = prevMonthDays - prevElement.length + i + 1;
    });
  }

  renderFutureMonth() {
    const futureDateElements = [
      ...document.querySelectorAll('.calendar-day[data-future="true"]'),
    ];
    futureDateElements.forEach((el, i) => {
      el.classList.add("fade-in");
      el.textContent = `0${i + 1}`;
    });
  }

  onClearCurrentWindow() {
    this.calendarHeader.innerHTML = "";
    this.calendarWeekdays.innerHTML = "";
  }
}

const renderCalendarView = (date) => {
  const calendar = new CalendarWeekdays(date ?? new Date());
  calendar.renderMonth();
  calendar.renderWeekdays();
  calendar.renderDays();
};

window.addEventListener("DOMContentLoaded", () => {
  renderCalendarView();
});
