import {
  limitRange,
  wrapBounds,
  wrapBoundsNextLine,
} from "../NumberBoundsWrapper";

describe("NumberBoundsWrapper", () => {
  describe("wrapBoundsNextLine", () => {
    it("wraps x around maxX", () => {
      expect(wrapBoundsNextLine(11, 0, 10, 10).realX).toBe(0);
    });
    it("wraps x around 0", () => {
      expect(wrapBoundsNextLine(-5, 1, 10, 10).realX).toBe(6);
    });
    it("increases y if x overflows", () => {
      expect(wrapBoundsNextLine(15, 0, 10, 10).realY).toBe(1);
    });
    it("increases y twice if x overflows twice", () => {
      expect(wrapBoundsNextLine(25, 0, 10, 10).realY).toBe(2);
    });
    it("decreases y if x underflows", () => {
      expect(wrapBoundsNextLine(-5, 5, 10, 10).realY).toBe(4);
    });
    it("decreases y twice if x underflows twice", () => {
      expect(wrapBoundsNextLine(-15, 5, 10, 10).realY).toBe(3);
    });
  });

  describe("limitRange", () => {
    it("works", () => {
      expect(limitRange(5, 0, 10)).toBe(5);
      expect(limitRange(0, 5, 10)).toBe(5);
      expect(limitRange(15, 5, 10)).toBe(10);
    });
  });

  describe("wrapBounds", () => {
    it("wraps x to 0 when too large", () => {
      expect(wrapBounds(15, 5, 10, 10)).toEqual({ realX: 0, realY: 5 });
    });
    it("wraps x to max when too small", () => {
      expect(wrapBounds(-5, 5, 10, 10)).toEqual({ realX: 10, realY: 5 });
    });
    it("wraps y to 0 when too large", () => {
      expect(wrapBounds(5, 15, 10, 10)).toEqual({ realX: 5, realY: 0 });
    });
    it("wraps y to max when too small", () => {
      expect(wrapBounds(5, -5, 10, 10)).toEqual({ realX: 5, realY: 10 });
    });
  });
});
