import { isPropValid } from "../IsPropValid";
import { expect } from "vitest";

describe("isPropValid", () => {
  describe("ref", () => {
    it("works", () => {
      expect(isPropValid("ref")).toBe(true);
    });
  });

  describe("href", () => {
    it("works", () => {
      expect(isPropValid("href")).toBe(true);
    });
  });

  describe("myRandomProp", () => {
    it("works", () => {
      expect(isPropValid("myRandomProp")).toBe(false);
    });
  });

  describe("onClick", () => {
    it("works", () => {
      expect(isPropValid("onClick")).toBe(true);
    });
  });
});
