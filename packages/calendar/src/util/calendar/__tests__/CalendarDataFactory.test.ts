import {
  calculateOverflowingMonth,
  createDay,
  getMonthInYear,
  getMonthsInYear,
  getWeeksForMonth,
  Months,
  WeekDays
} from "../CalendarDataFactory";

describe("CalendarDataFactory", () => {
  describe("getMonthInYear", () => {
    it("should wrap to next year when month is too high", () => {
      const month = getMonthInYear(2017, 12);
      expect(month.weeks[0].startYear).toBe(2018);
    });
    it("should return correct monthFormat", () => {
      expect(getMonthInYear(2018, Months.JANUARY).monthString).toBe("2018-01");
      expect(getMonthInYear(2018, Months.FEBRUARY).monthString).toBe("2018-02");
      expect(getMonthInYear(2018, Months.DECEMBER).monthString).toBe("2018-12");
    });
  });
  describe("createDay", () => {
    it("should handle 2018-02-01", () => {
      const date = new Date(2018, 1, 1);
      const day = createDay(date);
      expect(day.name).toBe("Thu");
      expect(day.dateString).toBe("2018-02-01");
    });
  });
  describe("getWeeksForMonth", () => {
    it("should return correct weeks", () => {
      const weeks = getWeeksForMonth(2018, Months.FEBRUARY);
      expect(weeks.length).toBe(6);
      expect(weeks[0].startMonth).toBe(0);
      expect(weeks[0].endMonth).toBe(1);
      expect(weeks[0].weekNumber).toBe(5);
      expect(weeks[0].days.length).toBe(7);
      expect(weeks[1].weekNumber).toBe(6);
      expect(weeks[1].startMonth).toBe(1);
      expect(weeks[1].endMonth).toBe(1);
      expect(weeks[1].days.length).toBe(7);
      expect(weeks[2].weekNumber).toBe(7);
      expect(weeks[2].startMonth).toBe(1);
      expect(weeks[2].endMonth).toBe(1);
      expect(weeks[2].days.length).toBe(7);
      expect(weeks[3].weekNumber).toBe(8);
      expect(weeks[3].startMonth).toBe(1);
      expect(weeks[3].endMonth).toBe(1);
      expect(weeks[3].days.length).toBe(7);
      expect(weeks[4].weekNumber).toBe(9);
      expect(weeks[4].startMonth).toBe(1);
      expect(weeks[4].endMonth).toBe(2);
      expect(weeks[4].days.length).toBe(7);
    });

    it("should return correct days", () => {
      const weeks = getWeeksForMonth(2018, Months.FEBRUARY);
      expect(weeks[0].days[0].dateString).toBe("2018-01-29");
      expect(weeks[0].days[0].dayOfWeek).toBe(WeekDays.MONDAY);
      expect(weeks[0].days[0].year).toBe(2018);
      expect(weeks[0].days[0].month).toBe(Months.JANUARY);
      expect(weeks[0].days[0].dayOfMonth).toBe(29);
      expect(weeks[0].days[1].dateString).toBe("2018-01-30");
      expect(weeks[0].days[2].dateString).toBe("2018-01-31");
      expect(weeks[0].days[3].dateString).toBe("2018-02-01");
      expect(weeks[0].days[6].dateString).toBe("2018-02-04");
    });

    it("should handle weeks where first days are part of previous month", () => {
      expect(getWeeksForMonth(2019, Months.JANUARY).length > 0).toBe(true);
    });

    it("should handle december 2018", () => {
      expect(getWeeksForMonth(2018, Months.DECEMBER).length).toBe(6);
    });
  });

  describe("calculateOverflowingMonth", () => {
    it("should handle positive overflows", () => {
      const { year, month } = calculateOverflowingMonth(2018, 12);
      expect(year).toBe(2019);
      expect(month).toBe(Months.JANUARY);
      const r = calculateOverflowingMonth(2018, 13);
      expect(r.year).toBe(2019);
      expect(r.month).toBe(Months.FEBRUARY);
    });
    it("should handle negative overflows", () => {
      const { year, month } = calculateOverflowingMonth(2018, -1);
      expect(year).toBe(2017);
      expect(month).toBe(Months.DECEMBER);
      const r = calculateOverflowingMonth(2018, -2);
      expect(r.year).toBe(2017);
      expect(r.month).toBe(Months.NOVEMBER);
    });
  });

  describe("getMonthsInYear", () => {
    it("should handle when interval passes a new year", () => {
      const monthsInYear = getMonthsInYear(2018, Months.DECEMBER, 3);
      expect(monthsInYear[0].year).toBe(2018);
      expect(monthsInYear[0].monthInYear).toBe(Months.DECEMBER);
      expect(monthsInYear[0].weeks.length > 0).toBe(true);
      expect(monthsInYear[1].year).toBe(2019);
      expect(monthsInYear[1].monthInYear).toBe(Months.JANUARY);
      expect(monthsInYear[1].weeks.length > 0).toBe(true);
    });
  });
});
