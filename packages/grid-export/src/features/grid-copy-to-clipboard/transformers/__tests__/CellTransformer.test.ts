import { transformItemToCell } from "../CellTransformer";

describe("CellTransformer", () => {
  describe("transformItemToCell", () => {
    describe("when there is no itemLabelFormatter", () => {
      describe("and value is string", () => {
        it("returns value", () => {
          expect(
            transformItemToCell(
              { x: "hej" },
              (item) => item.x,
              undefined,
              undefined
            )
          ).toStrictEqual("<td>hej</td>");
        });
      });
      describe("and value is number", () => {
        it("returns value", () => {
          expect(
            transformItemToCell(
              { x: 123 },
              (item) => item.x,
              undefined,
              undefined
            )
          ).toStrictEqual("<td>123</td>");
        });
      });
      describe("and value is boolean", () => {
        describe("and value is true", () => {
          it("returns Y ", () => {
            expect(
              transformItemToCell(
                { x: true },
                (item) => item.x,
                undefined,
                undefined
              )
            ).toStrictEqual("<td>Y</td>");
          });
        });
        describe("and value is false", () => {
          it("returns empty", () => {
            expect(
              transformItemToCell(
                { x: false },
                (item) => item.x,
                undefined,
                undefined
              )
            ).toStrictEqual("<td></td>");
          });
        });
      });
      describe("and value is Date", () => {
        it("returns formatted date", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell(
              { x: date },
              (item) => item.x,
              undefined,
              undefined
            )
          ).toStrictEqual("<td>2020-05-09 12:00</td>");
        });
      });
    });
    describe("when there is an itemLabelFormatter", () => {
      it("returns label", () => {
        const date = new Date(2020, 4, 9, 12, 0, 0);
        expect(
          transformItemToCell(
            { x: date },
            (item) => item.x,
            undefined,
            () => "hello"
          )
        ).toStrictEqual("<td>hello</td>");
      });
    });
    describe("with custom format", () => {
      describe("custom format is string", () => {
        it("returns custom format", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell(
              date,
              () => null,
              undefined,
              undefined,
              () => "custom"
            )
          ).toStrictEqual("<td>custom</td>");
        });
      });
      describe("custom format is number", () => {
        it("returns custom format", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell(
              date,
              () => null,
              undefined,
              undefined,
              () => 3
            )
          ).toStrictEqual("<td>3</td>");
        });
      });
    });
  });
});
