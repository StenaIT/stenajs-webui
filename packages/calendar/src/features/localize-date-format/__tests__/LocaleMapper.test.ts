import {
  getLocaleForLocaleCode,
  getMappedLocaleCodeMatchingLanguage,
} from "../LocaleMapper";
import { enUS, sv } from "date-fns/locale";

describe("LocaleMapper", () => {
  describe("getLocaleForLocaleCode", () => {
    describe("when locale exists, en-US", () => {
      it("returns that locale", () => {
        expect(getLocaleForLocaleCode("en-US")).toBe(enUS);
      });
    });
    describe("when locale exists, sv-SE", () => {
      it("returns that locale", () => {
        expect(getLocaleForLocaleCode("sv-SE")).toBe(sv);
      });
    });
    describe("when match for language exists, sv-FI", () => {
      it("returns that locale", () => {
        expect(getLocaleForLocaleCode("sv-FI")).toBe(sv);
      });
    });
  });
  describe("getMappedLocaleCodeMatchingLanguage", () => {
    describe("when locale with same language exists", () => {
      it("returns that locale code", () => {
        expect(getMappedLocaleCodeMatchingLanguage("sv-FI")).toBe("sv-SE");
      });
    });
  });
});
