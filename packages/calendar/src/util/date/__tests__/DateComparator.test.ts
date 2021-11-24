import { isAfterOrSameDay, isBeforeOrSameDay } from "../DateComparator";

describe("DateComparator", () => {
  describe("isBeforeOrSameDay", () => {
    describe("when same day", () => {
      it("always returns true", () => {
        expect(
          isBeforeOrSameDay(
            new Date(1989, 6, 10, 12, 12, 12, 12),
            new Date(1989, 6, 10, 11, 12, 12, 12)
          )
        ).toBeTruthy();
      });
      expect(
        isBeforeOrSameDay(
          new Date(1989, 6, 10, 11, 12, 12, 12),
          new Date(1989, 6, 10, 12, 12, 12, 12)
        )
      ).toBeTruthy();
    });
    describe("when not same day", () => {
      describe("when is before", () => {
        it("returns true", () => {
          const d1 = new Date(1989, 6, 8, 12, 12, 12, 12);
          const d2 = new Date(1989, 6, 10, 12, 12, 12, 12);
          expect(isBeforeOrSameDay(d1, d2)).toBeTruthy();
        });
      });
      describe("when is after", () => {
        it("returns false", () => {
          const d1 = new Date(1989, 10, 10, 12, 12, 12, 12);
          const d2 = new Date(1989, 6, 10, 11, 12, 12, 12);
          expect(isBeforeOrSameDay(d1, d2)).toBeFalsy();
        });
      });
    });
  });
  describe("isAfterOrSameDay", () => {
    describe("when same day", () => {
      it("always returns true", () => {
        expect(
          isAfterOrSameDay(
            new Date(1989, 6, 10, 12, 12, 12, 12),
            new Date(1989, 6, 10, 11, 12, 12, 12)
          )
        ).toBeTruthy();
      });
      expect(
        isAfterOrSameDay(
          new Date(1989, 6, 10, 11, 12, 12, 12),
          new Date(1989, 6, 10, 12, 12, 12, 12)
        )
      ).toBeTruthy();
    });
    describe("when not same day", () => {
      describe("when is before", () => {
        it("returns false", () => {
          const d1 = new Date(1989, 6, 8, 12, 12, 12, 12);
          const d2 = new Date(1989, 6, 10, 12, 12, 12, 12);
          expect(isAfterOrSameDay(d1, d2)).toBeFalsy();
        });
      });
      describe("when is after", () => {
        it("returns true", () => {
          const d1 = new Date(1989, 10, 10, 12, 12, 12, 12);
          const d2 = new Date(1989, 6, 10, 11, 12, 12, 12);
          expect(isAfterOrSameDay(d1, d2)).toBeTruthy();
        });
      });
    });
  });
});
