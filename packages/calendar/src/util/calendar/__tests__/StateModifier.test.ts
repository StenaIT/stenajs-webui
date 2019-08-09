import { addDayStateHighlights } from '../StateModifier';

describe("StateModifier", () => {
  describe("addDayStateHighlights", () => {
    it("should work with dec 30 2018", () => {
      const date = new Date(2018, 11, 30);
      const state = addDayStateHighlights({}, date, ["selected"]);
      expect(state["2018-12"][52][30].highlights![0]).toBe("selected");
    });
  });
});
