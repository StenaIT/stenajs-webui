import { getDateToFocusOn } from "../KeyboardNavigation";
import { Month } from "../../../../util/calendar/CalendarDataFactory";

describe("KeyboardNavigation", () => {
  describe("getDateToFocusOn", () => {
    describe("PageUp", () => {
      describe("when day does not exist in previous month", () => {
        describe("for not leap years", () => {
          it("selects last day of month", () => {
            const r = getDateToFocusOn(
              new Date(2023, Month.MARCH, 30),
              "PageUp",
            );
            expect(r?.getFullYear()).toBe(2023);
            expect(r?.getMonth()).toBe(Month.FEBRUARY);
            expect(r?.getDate()).toBe(28);
          });
        });
        describe("for leap years", () => {
          it("selects last day of month", () => {
            const r = getDateToFocusOn(
              new Date(2024, Month.MARCH, 30),
              "PageUp",
            );
            expect(r?.getFullYear()).toBe(2024);
            expect(r?.getMonth()).toBe(Month.FEBRUARY);
            expect(r?.getDate()).toBe(29);
          });
        });
      });
    });
    describe("PageDown", () => {
      describe("when day does not exist in previous month", () => {
        it("selects last day of month", () => {
          const r = getDateToFocusOn(
            new Date(2023, Month.MARCH, 31),
            "PageDown",
          );
          expect(r?.getFullYear()).toBe(2023);
          expect(r?.getMonth()).toBe(Month.APRIL);
          expect(r?.getDate()).toBe(30);
        });
      });
    });
  });
});
