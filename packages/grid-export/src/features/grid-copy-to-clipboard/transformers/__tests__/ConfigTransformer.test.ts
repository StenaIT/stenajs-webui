import {
  testConfig,
  testConfigWithGroups,
  testItems,
} from "../__mocks__/CopyToClipboardTestData";
import { createHtmlConfig } from "../ConfigTransformer";

const fullTable =
  '<table><thead><tr><th colspan="2">Name</th><th colspan="1">Info</th></tr><tr><th>First name</th><th>Surname</th><th>Age</th></tr></thead><tbody><tr><td>Johan</td><td>Rocketman</td><td>21</td></tr><tr><td>Mattias</td><td>Heyman</td><td>31</td></tr><tr><td>Kalle</td><td>Anka</td><td>48</td></tr><tr><td>Joakim</td><td>Anka</td><td>63</td></tr><tr><td>Niklas</td><td>Rockstar</td><td>27</td></tr></tbody></table>';

const fullTableNoColumnGroups =
  "<table><thead><tr><th>First name</th><th>Surname</th><th>Age</th></tr></thead><tbody><tr><td>Johan</td><td>Rocketman</td><td>21</td></tr><tr><td>Mattias</td><td>Heyman</td><td>31</td></tr><tr><td>Kalle</td><td>Anka</td><td>48</td></tr><tr><td>Joakim</td><td>Anka</td><td>63</td></tr><tr><td>Niklas</td><td>Rockstar</td><td>27</td></tr></tbody></table>";

describe("ConfigTransformer", () => {
  describe("createHtmlConfig", () => {
    describe("when table has no column groups", () => {
      it("includes all rows and header", () => {
        expect(createHtmlConfig(testConfig, testItems)).toBe(
          fullTableNoColumnGroups
        );
      });
    });
    describe("when table has column groups", () => {
      it("includes all rows and header and groups", () => {
        expect(createHtmlConfig(testConfigWithGroups, testItems)).toBe(
          fullTable
        );
      });
    });
  });
});
