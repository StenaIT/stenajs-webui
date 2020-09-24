import {
  addDayStateHighlights,
  buildDayStateForDateRange,
} from "../StateModifier";

describe("StateModifier", () => {
  describe("addDayStateHighlights", () => {
    it("should work with dec 30 2018", () => {
      const date = new Date(2018, 11, 30);
      const state = addDayStateHighlights({}, date, ["selected"]);
      expect(state["2018-12"][52][30].highlights![0]).toBe("selected");
    });
  });
  describe("buildDayStateForDateRange", () => {
    it("works across new year", () => {
      const start = new Date(2018, 11, 29);
      const end = new Date(2019, 0, 2);
      const state = buildDayStateForDateRange({}, start, end);
      expect(state!["2018-12"]).toBeDefined();
      expect(state!["2018-12"][52]).toBeDefined();
      expect(state!["2018-12"][52][29].highlights).toEqual([
        "selected",
        "selectedStart",
        "range",
      ]);
      expect(state!["2018-12"][52][30].highlights).toEqual(["range"]);
      expect(state!["2018-12"][1][31].highlights).toEqual(["range"]);
      expect(state!["2019-01"][1][1].highlights).toEqual(["range"]);
      expect(state!["2019-01"][1][2].highlights).toEqual([
        "selected",
        "selectedEnd",
        "range",
      ]);
    });
  });
});
