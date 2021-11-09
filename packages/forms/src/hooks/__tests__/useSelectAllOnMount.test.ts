import { elementHasSelectionRange } from "../UseSelectAllOnMount";

describe("useSelectAllOnMount", () => {
  describe("elementHasSelectionRange", () => {
    describe("for textarea", () => {
      it("should always allow", () => {
        expect(
          elementHasSelectionRange(document.createElement("textarea"))
        ).toBe(true);
      });
    });
    describe("for input", () => {
      describe("with type=text", () => {
        it("should allow", () => {
          const element = document.createElement("input");
          element.type = "text";
          expect(elementHasSelectionRange(element)).toBe(true);
        });
      });
      describe("with type=password", () => {
        it("should allow", () => {
          const element = document.createElement("input");
          element.type = "password";
          expect(elementHasSelectionRange(element)).toBe(true);
        });
      });
      describe("with type=date", () => {
        it("should block", () => {
          const element = document.createElement("input");
          element.type = "date";
          expect(elementHasSelectionRange(element)).toBe(false);
        });
      });
    });
    describe("for other tags", () => {
      it("should never allow", () => {
        expect(
          elementHasSelectionRange(document.createElement("span") as any)
        ).toBe(false);
      });
    });
  });
});
