import { transformItemToCell } from "../CellTransformer";

describe("CellTransformer", () => {
  describe("transformItemToCell", () => {
    describe("when there is no itemLabelFormatter", () => {
      describe("and value is string", () => {
        it("returns value and type string", () => {
          expect(
            transformItemToCell({ x: "hej" }, (item) => item.x, undefined),
          ).toStrictEqual({
            value: "hej",
            type: "string",
          });
        });
      });
      describe("and value is number", () => {
        it("returns value and type number", () => {
          expect(
            transformItemToCell({ x: 123 }, (item) => item.x, undefined),
          ).toStrictEqual({
            value: 123,
            type: "number",
          });
        });
      });
      describe("and value is boolean", () => {
        describe("and value is true", () => {
          it("returns Y and type string", () => {
            expect(
              transformItemToCell({ x: true }, (item) => item.x, undefined),
            ).toStrictEqual({
              value: "Y",
              type: "string",
            });
          });
        });
        describe("and value is false", () => {
          it("returns empty and type string", () => {
            expect(
              transformItemToCell({ x: false }, (item) => item.x, undefined),
            ).toStrictEqual({
              value: "",
              type: "string",
            });
          });
        });
      });
      describe("and value is Date", () => {
        it("returns formatted date and type string", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell({ x: date }, (item) => item.x, undefined),
          ).toStrictEqual({
            value: "2020-05-09 12:00",
            type: "string",
          });
        });
      });
    });
    describe("when there is an itemLabelFormatter", () => {
      it("returns label and type string", () => {
        const date = new Date(2020, 4, 9, 12, 0, 0);
        expect(
          transformItemToCell(
            { x: date },
            (item) => item.x,
            () => "hello",
          ),
        ).toStrictEqual({
          value: "hello",
          type: "string",
        });
      });
    });
    describe("with custom format", () => {
      describe("custom format is string", () => {
        it("returns custom format and type string", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell(
              date,
              () => null,
              undefined,
              () => "custom",
            ),
          ).toStrictEqual({
            value: "custom",
            type: "string",
          });
        });
      });
      describe("custom format is number", () => {
        it("returns custom format and type number", () => {
          const date = new Date(2020, 4, 9, 12, 0, 0);
          expect(
            transformItemToCell(
              date,
              () => null,
              undefined,
              () => 3,
            ),
          ).toStrictEqual({
            value: 3,
            type: "number",
          });
        });
      });
    });
  });
});
