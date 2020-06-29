import { sortOrderByIdReducer } from "../sort-order-by-id-reducer";
import { sortOrderByIdActions } from "../sort-order-by-id-action-creators";

describe("sort-order-by-id-reducer", () => {
  describe("setSortOrder", () => {
    describe("when there are sort order ids", () => {
      it("replaces the ids", () => {
        const s = sortOrderByIdReducer(
          { ids: ["1", "2"] },
          sortOrderByIdActions.setSortOrder(["2", "3"])
        );
        expect(s.ids).toStrictEqual(["2", "3"]);
      });
    });
    describe("when there are no sort order ids", () => {
      it("sets the ids", () => {
        const s = sortOrderByIdReducer(
          { ids: undefined },
          sortOrderByIdActions.setSortOrder(["2", "3"])
        );
        expect(s.ids).toStrictEqual(["2", "3"]);
      });
    });
  });
  describe("clearSortOrder", () => {
    it("clears the sort order ids", () => {
      const s = sortOrderByIdReducer(
        { ids: ["1", "2"] },
        sortOrderByIdActions.clearSortOrder()
      );
      expect(s.ids).toBeUndefined();
    });
  });
});
