class CalendarMonths {
  constructor(date) {
    this.date = new CalendarDate(date);
  }

  render(domElement) {
    const [prevMonth, nextMonth] = [
      CalendarDate.subtractDate(this.date.currentDate, 1).currentMonth,
      CalendarDate.addDate(this.date.currentDate, 1).currentMonth,
    ];
    const header = `
        <div className="calendar-header">
            <div>${prevMonth}</div>
            <div>${this.date.currentMonth}</div>
            <div>${nextMonth}</div>
        </div>
    `;
    domElement.insertAdjacentHTML("afterbegin", header);
  }
}
