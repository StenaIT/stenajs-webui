import { isDateRangeInvalid } from "../DateRangeValidator";

describe("DateRangeValidator", () => {
  describe("isDateRangeInvalid", () => {
    describe("when range is empty", () => {
      it("returns false", () => {
        expect(
          isDateRangeInvalid({ startDate: undefined, endDate: undefined }),
        ).toBe(false);
      });
    });
    describe("when startDate is empty", () => {
      it("returns false", () => {
        expect(
          isDateRangeInvalid({ startDate: undefined, endDate: new Date() }),
        ).toBe(false);
      });
    });
    describe("when endDate is empty", () => {
      it("returns false", () => {
        expect(
          isDateRangeInvalid({ startDate: new Date(), endDate: undefined }),
        ).toBe(false);
      });
    });
    describe("when startDate and endDate is same day", () => {
      it("returns false", () => {
        expect(
          isDateRangeInvalid({
            startDate: new Date(2020, 1, 1, 12, 0),
            endDate: new Date(2020, 1, 1, 13, 0),
          }),
        ).toBe(false);
        expect(
          isDateRangeInvalid({
            startDate: new Date(2020, 1, 1, 13, 0),
            endDate: new Date(2020, 1, 1, 12, 0),
          }),
        ).toBe(false);
      });
    });
    describe("when startDate and endDate is not same day", () => {
      describe("and startDate is before endDate", () => {
        it("returns false", () => {
          expect(
            isDateRangeInvalid({
              startDate: new Date(2020, 1, 11, 12, 0),
              endDate: new Date(2020, 1, 12, 12, 0),
            }),
          ).toBe(false);
        });
      });
      describe("and startDate is after endDate", () => {
        it("returns true", () => {
          expect(
            isDateRangeInvalid({
              startDate: new Date(2020, 1, 12, 12, 0),
              endDate: new Date(2020, 1, 11, 12, 0),
            }),
          ).toBe(true);
        });
      });
    });
  });
});
