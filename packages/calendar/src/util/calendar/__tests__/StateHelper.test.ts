import { DayState } from "../../../types/CalendarTypes";
import { dayHighlightSelect } from "../StateHelper";

describe("StateHelper", () => {
  describe("dayHighlightSelect", () => {
    it("returns value if boolean is true", () => {
      const dayState: DayState = {};
      const selected = dayHighlightSelect(
        dayState,
        undefined,
        [true],
        ["transparent"]
      );
      expect(selected).toBe("transparent");
    });
    it("returns fallback if boolean is false", () => {
      const dayState: DayState = {};
      const selected = dayHighlightSelect(
        dayState,
        undefined,
        [false],
        ["transparent"]
      );
      expect(selected).toBe(undefined);
    });
    it("returns value if highlight is set", () => {
      const dayState: DayState = {
        highlights: ["disabled"]
      };
      const selected = dayHighlightSelect(
        dayState,
        undefined,
        ["disabled"],
        ["transparent"]
      );
      expect(selected).toBe("transparent");
    });
    it("returns value if defaultHighlight is set", () => {
      const dayState: DayState = {
        highlights: ["disabled"]
      };
      const selected = dayHighlightSelect(
        dayState,
        ["enabled"],
        ["enabled"],
        ["transparent"]
      );
      expect(selected).toBe("transparent");
    });
  });
  it("returns fallback if there is no match", () => {
    const dayState: DayState = {
      highlights: ["selected"]
    };
    const selected = dayHighlightSelect(
      dayState,
      undefined,
      [false, false, "disabled"],
      ["a", "b", "c"],
      "fallback"
    );
    expect(selected).toBe("fallback");
  });
  it("returns fallback if list is empty", () => {
    const dayState: DayState = {};
    const selected = dayHighlightSelect<string>(
      dayState,
      undefined,
      [],
      [],
      "fallback"
    );
    expect(selected).toBe("fallback");
  });
  it("returns value if true even when dayState is undefined", () => {
    const dayState = undefined;
    const selected = dayHighlightSelect(
      dayState,
      undefined,
      [true, "selected", "disabled"],
      ["transparent", "white", "grey"]
    );

    expect(selected).toBe("transparent");
  });
});
