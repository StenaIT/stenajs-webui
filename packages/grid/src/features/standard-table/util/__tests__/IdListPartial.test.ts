import { getIdsBetweenSelected } from "../IdListPartial";

describe("IdListPartial", () => {
  describe("getIdsBetweenSelected", () => {
    const list = ["a", "b", "c", "d", "e", "f"];
    describe("when list is complete", () => {
      describe("when ids are correct order", () => {
        it("returns the sublist", () => {
          expect(getIdsBetweenSelected(list, "b", "e")).toEqual([
            "b",
            "c",
            "d",
            "e",
          ]);
        });
      });
      describe("when ids are inverted order", () => {
        it("returns the sublist", () => {
          expect(getIdsBetweenSelected(list, "e", "b")).toEqual([
            "b",
            "c",
            "d",
            "e",
          ]);
        });
      });
      describe("when ids are undefined", () => {
        it("returns undefined", () => {
          expect(getIdsBetweenSelected(list, "e", undefined)).toBeUndefined();
          expect(getIdsBetweenSelected(list, undefined, "e")).toBeUndefined();
        });
      });
    });
    describe("when list is empty", () => {
      it("returns undefined", () => {
        expect(getIdsBetweenSelected([], "b", "e")).toBeUndefined();
      });
    });
    describe("when list is undefined", () => {
      it("returns undefined", () => {
        expect(getIdsBetweenSelected(undefined, "b", "e")).toBeUndefined();
      });
    });
    describe("when list is incomplete", () => {
      it("returns undefined", () => {
        expect(
          getIdsBetweenSelected(["a", "c", "d"], "b", "e"),
        ).toBeUndefined();
      });
    });
  });
});
