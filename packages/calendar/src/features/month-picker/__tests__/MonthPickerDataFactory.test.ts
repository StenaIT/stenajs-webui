import { createMonths } from "../MonthPickerDataFactory";

describe("MonthPickerDataFactory", () => {
  describe("createMonths", () => {
    describe("From Jan 2024 and 12 months", () => {
      it("works", () => {
        const input = createMonths(new Date(2024, 3), 12, 4);
        expect(input.rows.length).toBe(4);
        expect(input.years["2024"].rows).toEqual([0, 1, 2]);
        expect(input.years["2025"].rows).toEqual([3]);
      });
      it("sets last column and row", () => {
        const input = createMonths(new Date(2024, 3), 12, 4);
        expect(input.rows.length).toBe(4);
        expect(input.lastMonthRow).toEqual(3);
        expect(input.lastMonthColumn).toEqual(2);
      });
    });
  });
});
