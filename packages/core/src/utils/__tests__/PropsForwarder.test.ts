import { getDataProps } from "../PropsForwarder";

describe("PropsForwarder", () => {
  describe("with data-*", () => {
    const p = {
      id: 4,
      name: "ma",
      "data-testid": "te",
    };

    it("works", () => {
      const r = getDataProps(p);
      expect(r).toEqual({ "data-testid": "te" });
    });
  });

  describe("with aria-*", () => {
    const p = {
      id: 4,
      name: "ma",
      "aria-label": "le",
    };

    it("works", () => {
      const r = getDataProps(p);
      expect(r).toEqual({ "aria-label": "le" });
    });
  });
});
