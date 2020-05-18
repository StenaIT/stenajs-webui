import { createSortOrderActions } from "../sort-order-actions";
import { createSortOrderReducer } from "../sort-order-reducer";

type TColumns = "username" | "email";

describe("sort-order-reducer", () => {
  const reduce = createSortOrderReducer<TColumns>("test");
  const actions = createSortOrderActions<TColumns>("test");
  describe("sortBy", () => {
    describe("desc is true", () => {
      const s = reduce({}, actions.sortBy());
    });
    describe("desc is false", () => {});
  });
  describe("clearSortOrder", () => {});
});
