import { getColumnsLimitedWithColSpan } from "../SummaryCellColSpanCalculator";

describe("SummaryCellColSpanCalculator", () => {
  describe("getColumnsLimitedWithColSpan", () => {
    describe("when column has colSpan=2", () => {
      it("skips one column after", () => {
        expect(
          getColumnsLimitedWithColSpan(["a", "b", "c", "d"], {
            a: {},
            b: { summaryCellColSpan: 2 },
            c: {},
            d: {},
          }),
        ).toEqual([
          { columnId: "a", colSpan: 1 },
          { columnId: "b", colSpan: 2 },
          { columnId: "d", colSpan: 1 },
        ]);
      });
    });
    describe("when column has colSpan=3", () => {
      it("skips two column after", () => {
        expect(
          getColumnsLimitedWithColSpan(["a", "b", "c", "d"], {
            a: { summaryCellColSpan: 3 },
            b: {},
            c: {},
            d: {},
          }),
        ).toEqual([
          { columnId: "a", colSpan: 3 },
          { columnId: "d", colSpan: 1 },
        ]);
      });
    });
    describe("when colSpan goes out of bounds", () => {
      it("it limits the colSpan", () => {
        expect(
          getColumnsLimitedWithColSpan(["a", "b", "c", "d"], {
            a: {},
            b: {},
            c: { summaryCellColSpan: 3 },
            d: {},
          }),
        ).toEqual([
          { columnId: "a", colSpan: 1 },
          { columnId: "b", colSpan: 1 },
          { columnId: "c", colSpan: 2 },
        ]);
        expect(
          getColumnsLimitedWithColSpan(["a", "b", "c", "d", "e"], {
            a: {},
            b: {},
            c: { summaryCellColSpan: 8 },
            d: {},
            e: {},
          }),
        ).toEqual([
          { columnId: "a", colSpan: 1 },
          { columnId: "b", colSpan: 1 },
          { columnId: "c", colSpan: 3 },
        ]);
      });
    });
  });
});
