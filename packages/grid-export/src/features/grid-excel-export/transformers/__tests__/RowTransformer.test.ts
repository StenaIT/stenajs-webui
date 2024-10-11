import {
  testConfig,
  testGroupConfigs,
  TestItem,
  testItems,
} from "../__mocks__/ExcelExportTestData";
import { transformTableRow } from "../RowTransformer";

describe("RowTransformer", () => {
  describe("transformTableRow", () => {
    describe("with no custom formatter", () => {
      const r = transformTableRow(testItems[0], testConfig, testGroupConfigs);
      it("includes renders string as type string", () => {
        expect(r[0].type).toBe("string");
        expect(r[1].type).toBe("string");
      });
      it("includes renders number as type number", () => {
        expect(r[2].type).toBe("number");
      });
    });
    describe("with custom formatter", () => {
      describe("custom format is string", () => {
        const formatters = {
          age: (item: TestItem) => String(item.age) + " years",
        };
        const r = transformTableRow(
          testItems[0],
          testConfig,
          testGroupConfigs,
          formatters,
        );

        it("uses the custom formatter", () => {
          expect(r[2].type).toBe("string");
          expect(r[2].value).toBe("21 years");
        });
      });
      describe("custom format is number", () => {
        const formatters = {
          age: (item: TestItem) => item.age + 100,
        };
        const r = transformTableRow(
          testItems[0],
          testConfig,
          testGroupConfigs,
          formatters,
        );
        it("uses the custom formatter", () => {
          expect(r[2].type).toBe("number");
          expect(r[2].value).toBe(121);
        });
      });
    });
  });
});
