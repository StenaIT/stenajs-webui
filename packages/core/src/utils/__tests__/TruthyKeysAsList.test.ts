import { truthyKeysAsList } from "../TruthyKeysAsList";

describe("TrueKeysAsList", () => {
  describe("truthyKeysAsList", () => {
    it("includes all keys with truthy values", () => {
      const r = truthyKeysAsList({
        a: false,
        b: true,
        c: 1,
        d: "",
        e: "a",
      } as any);
      expect(r).toEqual(["b", "c", "e"]);
    });
  });
});
