import { createSortOrderActions } from "../sort-order-actions";
import { createSortOrderReducer } from "../sort-order-reducer";

type TColumns = "username" | "email";

describe("sort-order-reducer", () => {
  const reduce = createSortOrderReducer<TColumns>("test");
  const actions = createSortOrderActions<TColumns>("test");
  describe("sortBy", () => {
    describe("desc is true", () => {
      it("sets sort order with desc true", () => {
        const s = reduce(
          { sortBy: "username", desc: false },
          actions.sortBy("email", true)
        );
        expect(s.sortBy).toBe("email");
        expect(s.desc).toBe(true);
      });
    });
    describe("desc is false", () => {
      it("sets sort order with desc true", () => {
        const s = reduce(
          { sortBy: "username", desc: true },
          actions.sortBy("email", false)
        );
        expect(s.sortBy).toBe("email");
        expect(s.desc).toBe(false);
      });
    });
  });
  describe("clearSortOrder", () => {
    it("clears the sort order", () => {
      const s = reduce(
        { sortBy: "username", desc: true },
        actions.clearSortOrder()
      );
      expect(s.sortBy).toBeUndefined();
      expect(s.desc).toBe(false);
    });
  });
});
