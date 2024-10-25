import {
  getLocaleForLocaleCode,
  getSupportedLocaleCodeMatchingLanguage,
  getSupportedLocaleCode,
} from "../LocaleMapper";
import { enUS, sv } from "date-fns/locale";

describe("LocaleMapper", () => {
  describe("getLocaleForLocaleCode", () => {
    it("returns that locale", () => {
      expect(getLocaleForLocaleCode("en-US")).toBe(enUS);
    });
  });
  describe("when locale exists, sv-SE", () => {
    it("returns that locale", () => {
      expect(getLocaleForLocaleCode("sv-SE")).toBe(sv);
    });
  });
  describe("getMappedLocaleCodeMatchingLanguage", () => {
    describe("when locale with same language exists", () => {
      it("returns that locale code", () => {
        expect(getSupportedLocaleCodeMatchingLanguage("sv-FI")).toBe("sv-SE");
      });
    });
  });
  describe("getSupportedLocaleCode", () => {
    describe("when exact match exists, sv-SE", () => {
      it("returns that locale", () => {
        expect(getSupportedLocaleCode("sv-SE", true, "en-GB")).toBe("sv-SE");
      });
    });
    describe("when language matching is disabled", () => {
      describe("when language match exists", () => {
        it("returns the fallback", () => {
          expect(getSupportedLocaleCode("sv-FI", false, "en-GB")).toBe("en-GB");
        });
      });
      describe("when no match", () => {
        it("returns the fallback", () => {
          expect(getSupportedLocaleCode("abcdabcd", false, "en-GB")).toBe(
            "en-GB",
          );
        });
      });
    });
    describe("when language matching is enabled", () => {
      describe("when language match exists", () => {
        it("returns the matched code", () => {
          expect(getSupportedLocaleCode("sv-FI", true, "en-GB")).toBe("sv-SE");
        });
      });
      describe("when no match", () => {
        it("returns the fallback", () => {
          expect(getSupportedLocaleCode("abcdabcd", false, "en-GB")).toBe(
            "en-GB",
          );
        });
      });
    });
  });
});
