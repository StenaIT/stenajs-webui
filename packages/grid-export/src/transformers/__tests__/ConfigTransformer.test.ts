import { transformItemToCell } from "../ConfigTransformer";

describe("ConfigTransformer", () => {
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
  });
});
