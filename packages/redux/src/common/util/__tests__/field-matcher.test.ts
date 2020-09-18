import { fieldsMatch } from "../field-matcher";

interface User {
  a: string;
  b: string;
}

const u = (a: string, b: string): User => ({
  a,
  b,
});

describe("field-matcher", () => {
  describe("fieldsMatch", () => {
    describe("when entity is string", () => {
      it("returns true when values are equal", () => {
        expect(fieldsMatch("123", "123")).toBe(true);
      });
    });
    describe("when entity has fields", () => {
      it("returns true when all fields match", () => {
        expect(fieldsMatch(u("123", "ma"), { a: "123", b: "ma" })).toBe(true);
      });
      it("returns false when some fields match", () => {
        expect(fieldsMatch(u("123", "ma"), { a: "123", b: "matt" })).toBe(
          false
        );
      });
      it("returns false when no fields match", () => {
        expect(fieldsMatch(u("123", "ma"), { a: "1234", b: "matt" })).toBe(
          false
        );
      });
      it("returns false when no fields are provided", () => {
        expect(fieldsMatch(u("123", "ma"), {})).toBe(false);
      });
    });
    describe("when entity has no fields", () => {
      it("returns false when no fields are provided", () => {
        expect(fieldsMatch({}, {})).toBe(false);
      });
    });
  });
});
