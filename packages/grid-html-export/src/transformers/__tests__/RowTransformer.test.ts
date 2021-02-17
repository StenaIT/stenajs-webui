import { transformTableRow } from "../RowTransformer";
import {
  testConfig,
  testGroupConfigs,
  TestItem,
  testItems,
} from "../__mocks__/TestData";

describe("RowTransformer", () => {
  describe("transformTableRow", () => {
    describe("with no custom formatter", () => {
      const row = transformTableRow(testItems[0], testConfig, testGroupConfigs);
      it("includes renders string as type string", () => {
        expect(row).toBe("<td>Johan</td><td>Rocketman</td><td>21</td>");
      });
    });
    describe("with custom formatter", () => {
      describe("custom format is string", () => {
        const formatters = {
          age: (item: TestItem) => String(item.age) + " years",
        };
        const transformCustomFormatterRow = transformTableRow(
          testItems[0],
          testConfig,
          testGroupConfigs,
          formatters
        );

        it("uses the custom formatter", () => {
          expect(transformCustomFormatterRow).toBe(
            "<td>Johan</td><td>Rocketman</td><td>21 years</td>"
          );
        });
      });
      describe("custom format is number", () => {
        const formatters = {
          age: (item: TestItem) => item.age + 100,
        };
        const transformCustomFormatterNumberRow = transformTableRow(
          testItems[0],
          testConfig,
          testGroupConfigs,
          formatters
        );
        it("uses the custom formatter", () => {
          expect(transformCustomFormatterNumberRow).toBe(
            "<td>Johan</td><td>Rocketman</td><td>121</td>"
          );
        });
      });
    });
  });
});
