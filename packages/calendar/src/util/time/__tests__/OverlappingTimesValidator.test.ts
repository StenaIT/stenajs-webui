import {
  hasOverlappingTimes,
  timesOverlap,
} from "../OverlappingTimesValidator";

describe("OverlappingTimeValidator", () => {
  describe("timesOverlap", () => {
    it("returns true when startTime", () => {
      expect(
        timesOverlap(
          { startTime: 900, endTime: 1100 },
          { startTime: 1000, endTime: 1200 }
        )
      ).toBe(true);
    });

    it("returns true when endTime", () => {
      expect(
        timesOverlap(
          { startTime: 900, endTime: 1100 },
          { startTime: 800, endTime: 1000 }
        )
      ).toBe(true);
    });

    it("returns true when d2 is fully overlapping d1", () => {
      expect(
        timesOverlap(
          { startTime: 900, endTime: 1100 },
          { startTime: 800, endTime: 1200 }
        )
      ).toBe(true);
    });

    it("returns false when not overlaps", () => {
      expect(
        timesOverlap(
          { startTime: 900, endTime: 1100 },
          { startTime: 1200, endTime: 1300 }
        )
      ).toBe(false);
    });

    it("returns false if any value is null", () => {
      expect(() =>
        timesOverlap(
          { startTime: 900, endTime: null },
          { startTime: 1000, endTime: 1300 }
        )
      ).toThrow();
    });
  });

  describe("hasOverlappingTimes", () => {
    it("returns no if no times overlap", () => {
      const overlapping = hasOverlappingTimes([
        { startTime: 900, endTime: 1600 },
        { startTime: 1700, endTime: 1900 },
      ]);
      expect(overlapping).toBe(false);
    });

    it("returns true if two times overlap", () => {
      const overlapping = hasOverlappingTimes([
        { startTime: 900, endTime: 1800 },
        { startTime: 1700, endTime: 1900 },
      ]);
      expect(overlapping).toBe(true);
    });
  });
});
