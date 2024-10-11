import { isDateInMinMaxRange } from "../DateMinMaxValidator";

describe("DateMinMaxValidator", () => {
  describe("isDateInMinMaxRange", () => {
    describe("when date is inside range", () => {
      it("returns true", () => {
        expect(
          isDateInMinMaxRange(
            new Date(1989, 6, 9, 12, 12, 12, 12),
            new Date(1989, 6, 8, 12, 12, 12, 12),
            new Date(1989, 6, 10, 12, 12, 12, 12),
          ),
        ).toBeTruthy();
      });
    });
    describe("when date is same date as min", () => {
      it("returns true", () => {
        expect(
          isDateInMinMaxRange(
            new Date(1989, 6, 8, 1, 12, 12, 12),
            new Date(1989, 6, 8, 12, 12, 12, 12),
            new Date(1989, 6, 10, 12, 12, 12, 12),
          ),
        ).toBeTruthy();
      });
    });
    describe("when date is same date as max", () => {
      it("returns true", () => {
        expect(
          isDateInMinMaxRange(
            new Date(1989, 6, 10, 21, 12, 12, 12),
            new Date(1989, 6, 8, 12, 12, 12, 12),
            new Date(1989, 6, 10, 12, 12, 12, 12),
          ),
        ).toBeTruthy();
      });
    });
    describe("when date is earlier than min", () => {
      it("returns false", () => {
        expect(
          isDateInMinMaxRange(
            new Date(1989, 6, 7, 21, 12, 12, 12),
            new Date(1989, 6, 8, 12, 12, 12, 12),
            new Date(1989, 6, 10, 12, 12, 12, 12),
          ),
        ).toBeFalsy();
      });
    });
    describe("when date is later than max", () => {
      it("returns false", () => {
        expect(
          isDateInMinMaxRange(
            new Date(1989, 6, 17, 21, 12, 12, 12),
            new Date(1989, 6, 8, 12, 12, 12, 12),
            new Date(1989, 6, 10, 12, 12, 12, 12),
          ),
        ).toBeFalsy();
      });
    });
  });
});
