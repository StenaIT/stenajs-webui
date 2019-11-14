import { getNumHoursAndMinutesFromMinutes } from "../DurationHelper";

describe("DurationHelper", () => {
  describe("getNumHoursAndMinutesFromMinutes", () => {
    describe("when num minutes is null", () => {
      it("returns 0 time", () => {
        const r = getNumHoursAndMinutesFromMinutes(null!);
        expect(r.minutes).toBe(0);
        expect(r.hours).toBe(0);
      });
    });
    describe("when num minutes is undefined", () => {
      it("returns 0 time", () => {
        const r = getNumHoursAndMinutesFromMinutes(undefined);
        expect(r.minutes).toBe(0);
        expect(r.hours).toBe(0);
      });
    });
    describe("when num minutes is 0", () => {
      it("returns 0 time", () => {
        const r = getNumHoursAndMinutesFromMinutes(0);
        expect(r.minutes).toBe(0);
        expect(r.hours).toBe(0);
      });
    });
    describe("when num minutes is negative", () => {
      it("returns 0 time", () => {
        const r = getNumHoursAndMinutesFromMinutes(-10);
        expect(r.minutes).toBe(0);
        expect(r.hours).toBe(0);
      });
    });
    describe("when less than one hour", () => {
      it("works", () => {
        const r = getNumHoursAndMinutesFromMinutes(45);
        expect(r.minutes).toBe(45);
        expect(r.hours).toBe(0);
      });
    });
    describe("when exactly one hour", () => {
      it("works", () => {
        const r = getNumHoursAndMinutesFromMinutes(60);
        expect(r.minutes).toBe(0);
        expect(r.hours).toBe(1);
      });
    });
    describe("when more than one hour", () => {
      it("works", () => {
        const r = getNumHoursAndMinutesFromMinutes(95);
        expect(r.minutes).toBe(35);
        expect(r.hours).toBe(1);
      });
    });
  });
});
