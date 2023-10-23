import {
  testConfig,
  testGroupConfigs,
  testGroupConfigsWithGroups,
} from "../__mocks__/ExcelExportTestData";
import {
  transformGroupHeaders,
  transformTableHeaders,
} from "../HeaderTransformer";

describe("HeaderTransformer", () => {
  describe("transformTableHeaders", () => {
    const r = transformTableHeaders(testConfig, testGroupConfigs);
    describe("when column has label", () => {
      it("uses columnLabel", () => {
        expect(r[1].type).toBe("string");
        expect(r[1].value).toBe("Surname");
      });
    });
    describe("when columnLabel is missing", () => {
      it("formats the header", () => {
        expect(r[0].type).toBe("string");
        expect(r[0].value).toBe("First name");
      });
    });
  });
  it("transformGroupHeaders", () => {
    const r = transformGroupHeaders(testGroupConfigsWithGroups);
    expect(r[0].type).toBe("string");
    expect(r[0].value).toBe("Name");
    expect(r[1].type).toBe("string");
    expect(r[1].value).toBe("");
    expect(r[2].type).toBe("string");
    expect(r[2].value).toBe("Info");
  });
});
