import {
  testConfig,
  testConfigWithGroups,
  testItems,
} from "../__mocks__/ExcelExportTestData";
import { createZipcelxConfig } from "../ConfigTransformer";

describe("ConfigTransformer", () => {
  describe("createZipcelxConfig", () => {
    it("uses correct filename", () => {
      const r = createZipcelxConfig("test", testConfig, testItems);
      expect(r.filename).toBe("test");
    });
    describe("when table has no column groups", () => {
      it("includes all rows and header", () => {
        const r = createZipcelxConfig("test", testConfig, testItems);
        expect(r.sheet.data.length).toBe(6);
      });
    });
    describe("when table has column groups", () => {
      it("includes all rows and header and groups", () => {
        const r = createZipcelxConfig("test", testConfigWithGroups, testItems);
        expect(r.sheet.data.length).toBe(7);
      });
    });
  });
});
