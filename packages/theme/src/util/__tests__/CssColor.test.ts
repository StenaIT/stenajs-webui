import { cssColor } from "../CssColor";

describe("CssColor", () => {
  describe("cssColor", () => {
    it("returns CSS var expression", () => {
      expect(cssColor("--black").startsWith("var(")).toBe(true);
    });
  });
});
