import { reducerIdGate, reducerIdGateAction } from "../reducer-id-gate";
import { combineReducers } from "redux";
import { renderHook } from "@testing-library/react-hooks";
import { useReducer } from "react";
import {
  createEntityReducer,
  EntityState
} from "../../../reducer-factories/entity-reducer/entity-reducer";
import { createSortOrderReducer } from "../../../reducer-factories/sort-order-reducer/sort-order-reducer";
import { createSelectedIdsReducer } from "../../../reducer-factories/selected-ids-reducer/selected-ids-reducer";

interface User {
  id?: string;
  email?: string;
}

describe("reducer-id-gate", () => {
  describe("reducerIdGate", () => {
    describe("if id matches", () => {
      it("runs the specified reducer", () => {
        const innerReducer = () => "hello";
        const reducer = reducerIdGate("test", innerReducer);
        const r = reducer("", reducerIdGateAction("test", { type: "" }));
        expect(r).toBe("hello");
      });
    });
    describe("if id does not match", () => {
      it("does not run the specified reducer", () => {
        const innerReducer = () => "hello";
        const reducer = reducerIdGate("test", innerReducer);
        const r = reducer("", reducerIdGateAction("notTest", { type: "" }));
        expect(r).not.toBe("hello");
      });
    });
    describe("with combineReducers", () => {
      it("works", () => {
        const x = combineReducers<{
          you: EntityState<User>;
          me: EntityState<User>;
        }>({
          you: reducerIdGate("you", createEntityReducer<User>({})),
          me: reducerIdGate("me", createEntityReducer<User>({}))
        });

        const sortOrder = reducerIdGate(
          "sortOrder",
          createSortOrderReducer<"a">()
        );
        const selectedIds = reducerIdGate(
          "selectedIds",
          createSelectedIdsReducer()
        );
        const expandedRows = reducerIdGate(
          "expandedRows",
          createSelectedIdsReducer()
        );

        const y = combineReducers({
          sortOrder,
          selectedIds,
          expandedRows
        });

        expect(x).toBeDefined();
        expect(y).toBeDefined();
      });
    });
    describe("with useReducer", () => {
      it("works", () => {
        const reducer = () => "hello";
        const x = renderHook(() => useReducer(reducer, "hai"));
        expect(x).toBeDefined();
      });
    });
  });
});
