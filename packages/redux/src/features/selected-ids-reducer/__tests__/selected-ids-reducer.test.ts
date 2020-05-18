import { createSelectedIdsActions } from "../selected-ids-actions";
import { createSelectedIdsReducer } from "../selected-ids-reducer";

describe("selected-ids-reducer", () => {
  const reduce = createSelectedIdsReducer("test");
  const actions = createSelectedIdsActions("test");

  describe("setSelectedIds", () => {
    describe("there are no selected ids", () => {
      it("sets the selected ids", () => {
        const s = reduce(
          { selectedIds: [] },
          actions.setSelectedIds(["1", "2"])
        );
        expect(s.selectedIds).toStrictEqual(["1", "2"]);
      });
    });
    describe("there are selected ids", () => {
      it("replaces the old selection with the new", () => {
        const s = reduce(
          { selectedIds: ["3", "4"] },
          actions.setSelectedIds(["1", "2"])
        );
        expect(s.selectedIds).toStrictEqual(["1", "2"]);
      });
    });
  });
  describe("clearSelectedIds", () => {
    it("clears the selected ids", () => {
      const s = reduce({ selectedIds: ["1", "2"] }, actions.clearSelectedIds());
      expect(s.selectedIds).toStrictEqual([]);
    });
  });
});
