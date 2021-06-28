import {
  ensureAllColumnsInFirstGroupHasFixedWidth,
  ensureNoColumnsAreSticky,
  ensureNoMoreThanFirstAndLastColumnGroupIsSticky,
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
  describe("ensureNoMoreThanFirstColumnGroupIsSticky", () => {
    describe("if no groups are specified", () => {
      it("throws", () => {
        expect(() =>
          ensureNoMoreThanFirstAndLastColumnGroupIsSticky({
            columnGroups: {
              first: { sticky: false },
              second: { sticky: false },
              third: { sticky: false },
            },
          } as any)
        ).toThrow();
      });
    });
    describe("if no groups are sticky", () => {
      it("does not throw", () => {
        expect(() =>
          ensureNoMoreThanFirstAndLastColumnGroupIsSticky({
            columnGroupOrder: ["first", "second", "third"],
            columnGroups: {
              first: { sticky: false },
              second: { sticky: false },
              third: { sticky: false },
            },
          } as any)
        ).not.toThrow();
      });
    });
    describe("if first group is sticky", () => {
      it("does not throw", () => {
        expect(() =>
          ensureNoMoreThanFirstAndLastColumnGroupIsSticky({
            columnGroupOrder: ["first", "second", "third"],
            columnGroups: {
              first: { sticky: true },
              second: { sticky: false },
              third: { sticky: false },
            },
          } as any)
        ).not.toThrow();
      });
    });
    describe("if middle group is sticky", () => {
      it("throws", () => {
        expect(() =>
          ensureNoMoreThanFirstAndLastColumnGroupIsSticky({
            columnGroupOrder: ["first", "second", "third"],
            columnGroups: {
              first: { sticky: false },
              second: { sticky: true },
              third: { sticky: false },
            },
          } as any)
        ).toThrow();
      });
    });
    describe("if last group is sticky", () => {
      it("throws", () => {
        expect(() =>
          ensureNoMoreThanFirstAndLastColumnGroupIsSticky({
            columnGroupOrder: ["first", "second", "third"],
            columnGroups: {
              first: { sticky: false },
              second: { sticky: false },
              third: { sticky: true },
            },
          } as any)
        ).not.toThrow();
      });
    });
  });
  describe("ensureAllColumnsInFirstGroupHasFixedWidth", () => {
    describe("columnGroupOrder is missing", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInFirstGroupHasFixedWidth({} as any)
        ).toThrow();
      });
    });
    describe("columnGroupOrder is empty", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInFirstGroupHasFixedWidth({
            columnGroupOrder: [],
          } as any)
        ).toThrow();
      });
    });
    describe("columnGroup does not exist", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInFirstGroupHasFixedWidth({
            columnGroupOrder: ["first"],
          } as any)
        ).toThrow();
      });
    });
    describe("some columns does not have fixed width", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInFirstGroupHasFixedWidth({
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
          } as any)
        ).toThrow();
      });
    });
    describe("all columns have fixed width", () => {
      it("throws", () => {
        expect(() =>
          ensureAllColumnsInFirstGroupHasFixedWidth({
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
          } as any)
        ).not.toThrow();
      });
    });
  });
});
