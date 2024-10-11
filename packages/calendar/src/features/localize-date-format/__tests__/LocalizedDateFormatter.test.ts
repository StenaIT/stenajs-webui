import { formatLocalizedDate } from "../LocalizedDateFormatter";

describe("LocalizedDateFormatter", () => {
  describe("formatLocalizedDate", () => {
    describe("for Sweden", () => {
      it("works", () => {
        expect(formatLocalizedDate(new Date(2024, 3, 14), "sv")).toBe(
          "2024-04-14",
        );
      });
    });
    describe("for UK", () => {
      it("works", () => {
        expect(formatLocalizedDate(new Date(2024, 3, 14), "en-GB")).toBe(
          "14/04/2024",
        );
      });
    });
  });
});
