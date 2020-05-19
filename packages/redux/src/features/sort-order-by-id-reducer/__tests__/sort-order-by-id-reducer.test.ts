import { createSortOrderByIdActions } from "../sort-order-by-id-actions";
import { createSortOrderByIdReducer } from "../sort-order-by-id-reducer";

describe("sort-order-by-id-reducer", () => {
  const reduce = createSortOrderByIdReducer("test");
  const actions = createSortOrderByIdActions("test");

  describe("setSortOrder", () => {
    describe("when there are sort order ids", () => {
      it("replaces the ids", () => {
        const s = reduce({ ids: ["1", "2"] }, actions.setSortOrder(["2", "3"]));
        expect(s.ids).toStrictEqual(["2", "3"]);
      });
    });
    describe("when there are no sort order ids", () => {
      it("sets the ids", () => {
        const s = reduce({ ids: undefined }, actions.setSortOrder(["2", "3"]));
        expect(s.ids).toStrictEqual(["2", "3"]);
      });
    });
  });
  describe("clearSortOrder", () => {
    it("clears the sort order ids", () => {
      const s = reduce({ ids: ["1", "2"] }, actions.clearSortOrder());
      expect(s.ids).toBeUndefined();
    });
  });
});
