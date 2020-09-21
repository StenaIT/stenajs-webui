import { formatTimeString, validUserInput } from "../TimeStringFormatValidator";

describe("TimeStringFormatValidator", () => {
  describe("validUserInput", () => {
    it("undefined should return true", () => {
      expect(validUserInput(undefined)).toBe(true);
    });
    it("only numbers should return true", () => {
      expect(validUserInput("1234")).toBe(true);
    });
    it("letter should return false", () => {
      expect(validUserInput("a")).toBe(false);
    });
    it("letters should return false", () => {
      expect(validUserInput("123ab")).toBe(false);
    });
    it("blank space should return true", () => {
      expect(validUserInput("12 34")).toBe(true);
    });
    it("valid separator : should return true", () => {
      expect(validUserInput("12:34")).toBe(true);
    });
    it("valid separator . should return true", () => {
      expect(validUserInput("12.34")).toBe(true);
    });
    it("valid separator , should return true", () => {
      expect(validUserInput("12,34")).toBe(true);
    });
    it("valid separator ; should return true", () => {
      expect(validUserInput("12;34")).toBe(true);
    });
    it("valid separator / should return true", () => {
      expect(validUserInput("12/34")).toBe(true);
    });
    it("invalid separator / should return false", () => {
      expect(validUserInput("12!34")).toBe(false);
    });
  });

  describe("formatTimeString", () => {
    it("letter input", () => {
      expect(formatTimeString("9a")).toEqual({
        time: "9a",
        success: false,
      });
    });
    it("too many digits", () => {
      expect(formatTimeString("901:01")).toEqual({
        time: "901:01",
        success: false,
      });
    });
    it("1 digit input", () => {
      expect(formatTimeString("9")).toEqual({
        time: "09:00",
        success: true,
      });
    });
    it("2 digit input (hours)", () => {
      expect(formatTimeString("09")).toEqual({
        time: "09:00",
        success: true,
      });
    });
    it("2 digit input (minutes)", () => {
      expect(formatTimeString("30")).toEqual({
        time: "00:30",
        success: true,
      });
    });
    it("2 digit input (invalid)", () => {
      expect(formatTimeString("88")).toEqual({
        time: "88",
        success: false,
      });
    });
    it("3 digit input", () => {
      expect(formatTimeString("915")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("3 digit input (invalid)", () => {
      expect(formatTimeString("981")).toEqual({
        time: "981",
        success: false,
      });
    });
    it("4 digit input", () => {
      expect(formatTimeString("0915")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("4 digit input (invalid hours)", () => {
      expect(formatTimeString("2515")).toEqual({
        time: "2515",
        success: false,
      });
    });
    it("4 digit input (invalid minutes)", () => {
      expect(formatTimeString("0960")).toEqual({
        time: "0960",
        success: false,
      });
    });
    it("Correct : separator", () => {
      expect(formatTimeString("09:15")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("Blank space separator", () => {
      expect(formatTimeString("09 15")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("Dot separator", () => {
      expect(formatTimeString("09.15")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("Hours missing digit", () => {
      expect(formatTimeString("9:15")).toEqual({
        time: "09:15",
        success: true,
      });
    });
    it("Minute missing digit", () => {
      expect(formatTimeString("09:1")).toEqual({
        time: "09:10",
        success: true,
      });
    });
    it("Minutes and hours missing digit", () => {
      expect(formatTimeString("9:1")).toEqual({
        time: "09:10",
        success: true,
      });
    });
    it("Starting with separator", () => {
      expect(formatTimeString(":1")).toEqual({
        time: "00:10",
        success: true,
      });
    });
    it("Ends with separator", () => {
      expect(formatTimeString("1:")).toEqual({
        time: "01:00",
        success: true,
      });
    });
  });
});
