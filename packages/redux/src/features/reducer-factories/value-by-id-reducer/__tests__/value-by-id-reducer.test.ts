import { createValueByIdActions } from "../value-by-id-action-creators";
import { createValueByIdReducer } from "../value-by-id-reducer";

describe("value-by-id-reducer", () => {
  const reduce = createValueByIdReducer<boolean>();
  const actions = createValueByIdActions<boolean>();

  describe("setValue", () => {
    describe("when value does not exist", () => {
      it("adds the value", () => {
        const s = reduce({ values: {} }, actions.setValue("1", true));
        expect(s.values["1"]).toBe(true);
      });
    });
    describe("when value already exists", () => {
      it("overwrites the value", () => {
        const s = reduce(
          {
            values: {
              "1": true,
            },
          },
          actions.setValue("1", false),
        );
        expect(s.values["1"]).toBe(false);
      });
    });
  });
  describe("clearAllValues", () => {
    describe("when value does not exist", () => {
      it("does nothing", () => {
        const state = { values: {} };
        const s = reduce(state, actions.clearAllValues());
        expect(s).toStrictEqual(state);
      });
    });
    describe("when there are values", () => {
      it("it deletes all values", () => {
        const s = reduce(
          {
            values: {
              "1": true,
            },
          },
          actions.clearAllValues(),
        );
        expect(Object.keys(s.values).length).toBe(0);
      });
    });
  });

  describe("clearValue", () => {
    describe("when value does not exist", () => {
      it("does nothing", () => {
        const s = reduce(
          {
            values: {
              "1": true,
            },
          },
          actions.clearValue("2"),
        );
        expect(Object.keys(s.values).length).toBe(1);
      });
    });
    describe("when value exists", () => {
      it("it deletes the value", () => {
        const s = reduce(
          {
            values: {
              "1": true,
            },
          },
          actions.clearValue("1"),
        );
        expect(s.values["1"]).toBeUndefined();
      });
    });
  });
});
