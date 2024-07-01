import { moveDown, moveLeft, moveRight, moveUp } from "../Position";

describe("MonthPickerKeyboardNavigation", () => {
  describe("moveRight", () => {
    describe("in the middle", () => {
      it("adds column", () => {
        expect(moveRight({ column: 2, row: 2 }, 4)).toEqual({
          column: 3,
          row: 2,
        });
      });
    });
    describe("when passing right side", () => {
      it("moves to first column on next row", () => {
        expect(moveRight({ column: 3, row: 2 }, 4)).toEqual({
          column: 0,
          row: 3,
        });
      });
    });
  });
  describe("moveLeft", () => {
    describe("in the middle", () => {
      it("goes up a column", () => {
        expect(moveLeft({ column: 2, row: 2 }, 4)).toEqual({
          column: 1,
          row: 2,
        });
      });
    });
    describe("when passing right side", () => {
      it("moves to first column on next row", () => {
        expect(moveLeft({ column: 0, row: 2 }, 4)).toEqual({
          column: 3,
          row: 1,
        });
      });
    });
    describe("when in top left corner", () => {
      it("stays in same position", () => {
        expect(moveLeft({ column: 0, row: 0 }, 4)).toEqual({
          column: 0,
          row: 0,
        });
      });
    });
  });
  describe("moveUp", () => {
    describe("in the middle", () => {
      it("goes up a row", () => {
        expect(moveUp({ column: 2, row: 2 })).toEqual({
          column: 2,
          row: 1,
        });
      });
    });
    describe("when in first row", () => {
      it("it stays in same position", () => {
        expect(moveUp({ column: 2, row: 0 })).toEqual({
          column: 2,
          row: 0,
        });
      });
    });
  });
  describe("moveDown", () => {
    describe("in the middle", () => {
      it("goes up a row", () => {
        expect(moveDown({ column: 2, row: 2 })).toEqual({
          column: 2,
          row: 3,
        });
      });
    });
  });
});
