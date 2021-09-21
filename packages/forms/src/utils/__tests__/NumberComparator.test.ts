import { isMaxReached, isMinReached } from "../NumberComparator";

describe("NumberComparator", () => {
  describe("isMinReached", () => {
    it("should return false if values are undefined", () => {
      const result = isMinReached(undefined, undefined);
      expect(result).toBe(false);
    });
    it("should return false if value is undefined", () => {
      const result = isMinReached(undefined, 1.5);
      expect(result).toBe(false);
    });
    it("should return false if min is undefined", () => {
      const result = isMinReached("1.5", undefined);
      expect(result).toBe(false);
    });
    it("should return false if value is NaN", () => {
      const result = isMinReached("hello", 1.5);
      expect(result).toBe(false);
    });
    it("should return false if value is greater than min", () => {
      const result = isMinReached("2.5", 1.5);
      expect(result).toBe(false);
    });

    it("should return true if value is equal to min", () => {
      const result = isMinReached("1.5", 1.5);
      expect(result).toBe(true);
    });
    it("should return true if value is less than min", () => {
      const result = isMinReached("0.5", 1.5);
      expect(result).toBe(true);
    });
  });

  describe("isMaxReached", () => {
    it("should return false if values are undefined", () => {
      const result = isMaxReached(undefined, undefined);
      expect(result).toBe(false);
    });
    it("should return false if value is undefined", () => {
      const result = isMaxReached(undefined, 1.5);
      expect(result).toBe(false);
    });
    it("should return false if max is undefined", () => {
      const result = isMaxReached("1.5", undefined);
      expect(result).toBe(false);
    });
    it("should return false if value is NaN", () => {
      const result = isMaxReached("hello", 1.5);
      expect(result).toBe(false);
    });
    it("should return false if value is less than max", () => {
      const result = isMaxReached("0.5", 1.5);
      expect(result).toBe(false);
    });

    it("should return true if value is equal to max", () => {
      const result = isMaxReached("1.5", 1.5);
      expect(result).toBe(true);
    });
    it("should return true if value is greater than max", () => {
      const result = isMaxReached("2.5", 1.5);
      expect(result).toBe(true);
    });
  });
});
