import {
  transformNumberTimeToString,
  transformTimeStringToNumber
} from "../TimeTransformer";

describe("TimeTransformer", () => {
  describe("transformNumberTimeToString", () => {
    it("should return undefined if number is undefined", () => {
      expect(transformNumberTimeToString(undefined)).toBe(undefined);
    });
    it("should return undefined if number is null", () => {
      expect(transformNumberTimeToString(null)).toBe(undefined);
    });
    it("should transform times with 4 numbers", () => {
      expect(transformNumberTimeToString(1900)).toBe("19:00");
    });
    it("should transform times with 3 numbers", () => {
      expect(transformNumberTimeToString(910)).toBe("9:10");
    });
    it("should transform times with 2 numbers", () => {
      expect(transformNumberTimeToString(10)).toBe("0:10");
    });
    it("should transform times with 1 number", () => {
      expect(transformNumberTimeToString(5)).toBe("0:05");
    });
    it("should transform 0", () => {
      expect(transformNumberTimeToString(0)).toBe("0:00");
    });
    it("should throw if number has more than 4 symbols", () => {
      expect(() => {
        transformNumberTimeToString(50000);
      }).toThrow();
    });
  });

  describe("transformTimeStringToNumber", () => {
    it("should transform 9:00 to 900", () => {
      expect(transformTimeStringToNumber("9:00")).toBe(900);
    });
    it("should throw if time is missing : character", () => {
      expect(() => transformTimeStringToNumber("900")).toThrow("Invalid time.");
    });
    it("should throw if time is too short", () => {
      expect(() => transformTimeStringToNumber("9:0")).toThrow("Invalid time.");
    });
    it("should throw if hours is too short", () => {
      expect(() => transformTimeStringToNumber("129:00")).toThrow(
        "Invalid time."
      );
    });
    it("should throw if time is too long", () => {
      expect(() => transformTimeStringToNumber("9:000")).toThrow(
        "Invalid time."
      );
    });

    it("should throw if invalid hours", () => {
      expect(() => transformTimeStringToNumber("a9:00")).toThrow(
        "Invalid time."
      );
    });

    it("should throw if invalid minutes", () => {
      expect(() => transformTimeStringToNumber("9:aa")).toThrow(
        "Invalid time."
      );
    });

    it("should throw if hours too large", () => {
      expect(() => transformTimeStringToNumber("89:40")).toThrow(
        "Invalid time."
      );
    });

    it("should throw if minutes too large", () => {
      expect(() => transformTimeStringToNumber("9:60")).toThrow(
        "Invalid time."
      );
    });

    it("should throw if empty", () => {
      expect(() => transformTimeStringToNumber("")).toThrow("Time is empty.");
    });

    it("should throw if null", () => {
      expect(() => transformTimeStringToNumber(null)).toThrow(
        "Time is not set."
      );
    });
    it("should throw if undefined", () => {
      expect(() => transformTimeStringToNumber(undefined)).toThrow(
        "Time is not set."
      );
    });
  });
});
