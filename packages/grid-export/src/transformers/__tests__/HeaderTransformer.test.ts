import { testConfig, testItems } from "../__mocks__/TestData";
import { createZipcelxConfig } from "../ConfigTransformer";

describe("HeaderTransformer", () => {
  describe("transformTableHeaders", () => {
    const r = createZipcelxConfig("test", testConfig, testItems);
    describe("when column has label", () => {
      it("uses columnLabel", () => {
        expect(r.sheet.data[0][1].type).toBe("string");
        expect(r.sheet.data[0][1].value).toBe("Surname");
      });
    });
    describe("when columnLabel is missing", () => {
      it("formats the header", () => {
        expect(r.sheet.data[0][0].type).toBe("string");
        expect(r.sheet.data[0][0].value).toBe("First name");
      });
    });
  });
  describe("transformGroupHeaders", () => {});
});
