import {
  ensureAllColumnsInGroupHasFixedWidth,
  ensureNoColumnsAreSticky,
} from "../StickyColumnGroupValidator";

describe("StickyColumnGroupValidator", () => {
  describe("ensureNoColumnsAreSticky", () => {
    describe("if no columns are sticky", () => {
      it("does not throw", () => {
        expect(() =>
          ensureNoColumnsAreSticky({
            columns: { test: { sticky: false } },
          } as any)
        ).not.toThrow();
      });
    });
    describe("if any columns are sticky", () => {
      it("does not throw", () => {
        expect(() =>
          ensureNoColumnsAreSticky({
            columns: { test: { sticky: true } },
          } as any)
        ).toThrow();
      });
    });
  });
  describe("ensureAllColumnsInFirstGroupHasFixedWidth", () => {
    describe("columnGroupOrder is missing", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInGroupHasFixedWidth({} as any, 0)
        ).toThrow();
      });
    });
    describe("columnGroupOrder is empty", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInGroupHasFixedWidth(
            {
              columnGroupOrder: [],
            } as any,
            0
          )
        ).toThrow();
      });
    });
    describe("columnGroup does not exist", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInGroupHasFixedWidth(
            {
              columnGroupOrder: ["first"],
            } as any,
            0
          )
        ).toThrow();
      });
    });
    describe("some columns does not have fixed width", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInGroupHasFixedWidth(
            {
              columns: {
                one: {},
                two: {},
              },
              columnGroups: {
                first: {
                  columnOrder: ["one", "two"],
                },
              },
              columnGroupOrder: ["first"],
            } as any,
            0
          )
        ).toThrow();
      });
    });
    describe("all columns have fixed width", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInGroupHasFixedWidth(
            {
              columns: {
                one: {
                  width: "100px",
                },
                two: { width: "100px" },
              },
              columnGroups: {
                first: {
                  columnOrder: ["one", "two"],
                },
              },
              columnGroupOrder: ["first"],
            } as any,
            0
          )
        ).not.toThrow();
      });
    });
  });
});
