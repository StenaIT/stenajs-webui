import { selectedIdsActions } from "../selected-ids-action-creators";
import { selectedIdsReducer } from "../selected-ids-reducer";

describe("selected-ids-reducer", () => {
  describe("setSelectedIds", () => {
    describe("there are no selected ids", () => {
      it("sets the selected ids", () => {
        const s = selectedIdsReducer(
          { selectedIds: [] },
          selectedIdsActions.setSelectedIds(["1", "2"])
        );
        expect(s.selectedIds).toStrictEqual(["1", "2"]);
      });
    });
    describe("there are selected ids", () => {
      it("replaces the old selection with the new", () => {
        const s = selectedIdsReducer(
          { selectedIds: ["3", "4"] },
          selectedIdsActions.setSelectedIds(["1", "2"])
        );
        expect(s.selectedIds).toStrictEqual(["1", "2"]);
      });
    });
  });
  describe("clearSelectedIds", () => {
    it("clears the selected ids", () => {
      const s = selectedIdsReducer(
        { selectedIds: ["1", "2"] },
        selectedIdsActions.clearSelectedIds()
      );
      expect(s.selectedIds).toStrictEqual([]);
    });
  });
});
