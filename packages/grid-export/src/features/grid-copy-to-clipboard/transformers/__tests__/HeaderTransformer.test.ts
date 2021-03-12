import {
  testConfig,
  testGroupConfigs,
  testGroupConfigsWithGroups,
} from "../__mocks__/CopyToClipboardTestData";
import {
  transformGroupHeaders,
  transformTableHeaders,
} from "../HeaderTransformer";

const withColumnLabel = [
  "<th>First name</th>",
  "<th>Surname</th>",
  "<th>Age</th>",
];

describe("HeaderTransformer", () => {
  describe("transformTableHeaders", () => {
    const tableHeaders = transformTableHeaders(
      testConfig,
      testGroupConfigs
    ).join("");
    describe("when column has label", () => {
      it("uses columnLabel", () => {
        expect(withColumnLabel.join("")).toBe(tableHeaders);
      });
    });
  });
  describe("transformGroupHeaders", () => {
    const r = transformGroupHeaders(testGroupConfigsWithGroups);
    expect(r[0]).toBe('<th colspan="2">Name</th>');
    expect(r[1]).toBe('<th colspan="1">Info</th>');
  });
});
