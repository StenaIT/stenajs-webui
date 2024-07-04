import { parseLocalizedDateString } from "../LocalizedDateParser";

describe("LocalizedDateParser", () => {
  describe("parseLocalizedDateStringElseUndefined", () => {
    describe("for invalid localeCode", () => {
      it("returns undefined", () => {
        const d = parseLocalizedDateString("2024-03-12", "hejhej");
        expect(d).toBeUndefined();
      });
    });
    describe("for Sweden", () => {
      it("works", () => {
        const d = parseLocalizedDateString("2024-03-12", "sv");
        expect(d?.getFullYear()).toBe(2024);
        expect(d?.getMonth()).toBe(2);
        expect(d?.getDate()).toBe(12);
      });
    });
    describe("for UK", () => {
      it("works", () => {
        const d = parseLocalizedDateString("12/03/2024", "en-GB");
        expect(d?.getFullYear()).toBe(2024);
        expect(d?.getMonth()).toBe(2);
        expect(d?.getDate()).toBe(12);
      });
    });
  });
});
