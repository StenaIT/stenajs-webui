import { getDateFormatForLocaleCode } from "../DateFormatProvider";

describe("DateFormatProvider", () => {
  describe("getDateFormatForLocaleCode", () => {
    describe("for Sweden", () => {
      it("returns correct date format", () => {
        expect(getDateFormatForLocaleCode("sv")).toBe("yyyy-MM-dd");
      });
    });
    describe("for UK", () => {
      it("returns correct date format", () => {
        expect(getDateFormatForLocaleCode("en-GB")).toBe("dd/MM/yyyy");
      });
    });
  });
});
