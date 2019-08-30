import { buildDayState } from "../DayStateFactory";

describe("DayStateFactory", () => {
  describe("buildDayState", () => {
    it("works across new year", () => {
      const start = new Date(2018, 11, 29);
      const end = new Date(2019, 0, 2);
      const state = buildDayState({}, start, end);
      expect(state!["2018-12"]).toBeDefined();
      expect(state!["2018-12"][52]).toBeDefined();
      expect(state!["2018-12"][52][29].highlights).toEqual([
        "selected",
        "selectedStart",
        "range"
      ]);
      expect(state!["2018-12"][52][30].highlights).toEqual(["range"]);
      expect(state!["2018-12"][1][31].highlights).toEqual(["range"]);
      expect(state!["2019-01"][1][1].highlights).toEqual(["range"]);
      expect(state!["2019-01"][1][2].highlights).toEqual([
        "selected",
        "selectedEnd",
        "range"
      ]);
    });
  });
});
