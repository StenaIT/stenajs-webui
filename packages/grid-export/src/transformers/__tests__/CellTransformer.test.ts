import { transformItemToCell } from "../CellTransformer";

describe("CellTransformer", () => {
  describe("transformItemToCell", () => {
    describe("when label is undefined", () => {
      describe("and value is string", () => {
        it("returns value and type string", () => {
          expect(transformItemToCell("hej", undefined)).toStrictEqual({
            value: "hej",
            type: "string",
          });
        });
      });
      describe("and value is number", () => {
        it("returns value and type number", () => {
          expect(transformItemToCell(123, undefined)).toStrictEqual({
            value: 123,
            type: "number",
          });
        });
      });
      describe("and value is Date", () => {
        it("returns formatted date and type string", () => {
          let date = new Date(2020, 4, 9, 12, 0, 0);
          expect(transformItemToCell(date, undefined)).toStrictEqual({
            value: "2020-05-09 12:00",
            type: "string",
          });
        });
      });
    });
    describe("when label is defined", () => {
      it("returns label and type string", () => {
        let date = new Date(2020, 4, 9, 12, 0, 0);
        expect(transformItemToCell(date, "hello")).toStrictEqual({
          value: "hello",
          type: "string",
        });
      });
    });
    describe("with custom format", () => {
      describe("custom format is string", () => {
        it("returns custom format and type string", () => {
          let date = new Date(2020, 4, 9, 12, 0, 0);
          expect(transformItemToCell(date, "hello", "custom")).toStrictEqual({
            value: "custom",
            type: "string",
          });
        });
      });
      describe("custom format is number", () => {
        it("returns custom format and type number", () => {
          let date = new Date(2020, 4, 9, 12, 0, 0);
          expect(transformItemToCell(date, "hello", 3)).toStrictEqual({
            value: 3,
            type: "number",
          });
        });
      });
    });
  });
});
