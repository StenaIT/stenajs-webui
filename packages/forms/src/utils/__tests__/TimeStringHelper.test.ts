import {
  formatDurationToString,
  formatHoursAndMinutesToString,
  getHoursAndMinutesFromString,
  stripAllButNumbers
} from "../TimeStringHelper";

describe("TimeStringHelper", () => {
  describe("getHoursAndMinutesFromString", () => {
    describe("when string is undefined", () => {
      it("returns undefined", () => {
        expect(getHoursAndMinutesFromString(undefined!)).toBe(undefined);
      });
    });
    describe("when string is empty", () => {
      it("returns undefined", () => {
        expect(getHoursAndMinutesFromString("")).toBe(undefined);
      });
    });
    describe("when string contains only left side", () => {
      it("returns minutes", () => {
        const r = getHoursAndMinutesFromString("12");
        expect(r!.minutes).toBe(12);
        expect(r!.hours).toBe(0);
      });
    });
    describe("when string is missing right side", () => {
      it("returns hours", () => {
        const r = getHoursAndMinutesFromString("12:");
        expect(r!.minutes).toBe(0);
        expect(r!.hours).toBe(12);
      });
    });
    describe("when string is missing left side", () => {
      it("returns minutes", () => {
        const r = getHoursAndMinutesFromString(":12");
        expect(r!.minutes).toBe(12);
        expect(r!.hours).toBe(0);
      });
    });
    describe("when string is missing left side", () => {
      it("returns minutes", () => {
        const r = getHoursAndMinutesFromString(":12");
        expect(r!.minutes).toBe(12);
        expect(r!.hours).toBe(0);
      });
    });
    describe("when minutes is negative", () => {
      it("returns positive minutes", () => {
        const r = getHoursAndMinutesFromString("12:-13");
        expect(r!.minutes).toBe(13);
      });
    });
    describe("when minutes is too high", () => {
      it("returns minutes limited to 59", () => {
        const r = getHoursAndMinutesFromString("12:83");
        expect(r!.minutes).toBe(59);
      });
    });
    describe("when hours is over 23", () => {
      it("allows hours over 23", () => {
        const r = getHoursAndMinutesFromString("26:00");
        expect(r!.hours).toBe(26);
      });
    });
  });
  describe("formatHoursAndMinutesToString", () => {
    describe("when normal time", () => {
      describe("and default separator", () => {
        it("formats correctly", () => {
          expect(
            formatHoursAndMinutesToString({ hours: 12, minutes: 15 })
          ).toBe("12:15");
        });
      });
      describe("and custom separator", () => {
        it("formats correctly", () => {
          expect(
            formatHoursAndMinutesToString({ hours: 12, minutes: 15 }, ".")
          ).toBe("12.15");
        });
      });
    });
  });
  describe("formatDurationToString", () => {
    describe("when normal time", () => {
      it("formats correctly", () => {
        expect(formatDurationToString({ hours: 12, minutes: 15 })).toBe(
          "12h 15min"
        );
      });
    });
    describe("when minutes, but no hours", () => {
      it("formats correctly", () => {
        expect(formatDurationToString({ hours: 0, minutes: 15 })).toBe("15min");
      });
    });
    describe("when hours, but no minutes", () => {
      it("formats correctly", () => {
        expect(formatDurationToString({ hours: 2, minutes: 0 })).toBe(
          "2h 0min"
        );
      });
    });
  });
  describe("stripAllButNumbers", () => {
    it("keeps only numbers", () => {
      expect(stripAllButNumbers("abcdefgzaåäö,.1234-_567890+*#!?")).toBe(
        "1234567890"
      );
    });
  });
});
