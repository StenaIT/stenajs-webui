import { createZipcelxConfig } from "../ConfigTransformer";
import { createColumnConfig, StandardTableConfig } from "@stenajs-webui/grid";

interface Item {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

const items: Array<Item> = [
  {
    id: "1",
    firstName: "Johan",
    lastName: "Rocketman",
    age: 19,
  },
  {
    id: "2",
    firstName: "Mattias",
    lastName: "Heyman",
    age: 31,
  },
  {
    id: "3",
    firstName: "Kalle",
    lastName: "Anka",
    age: 48,
  },
  {
    id: "4",
    firstName: "Joakim",
    lastName: "Anka",
    age: 63,
  },
];

const config: StandardTableConfig<Item, keyof Omit<Item, "id">> = {
  keyResolver: (item) => item.id,
  rowIndent: 3,
  columns: {
    firstName: createColumnConfig((item) => item.firstName),
    lastName: createColumnConfig((item) => item.lastName, {
      columnLabel: "Surname",
    }),
    age: createColumnConfig((item) => item.age),
  },
  columnOrder: ["firstName", "lastName", "age"],
};

describe("ConfigTransformer", () => {
  describe("createZipcelxConfig", () => {
    describe("filename config", () => {
      it("uses correct filename", () => {
        const r = createZipcelxConfig("test", config, items);
        expect(r.filename).toBe("test");
      });
    });
    describe("headers", () => {
      const r = createZipcelxConfig("test", config, items);
      it("uses columnLabel", () => {
        expect(r.sheet.data[0][1].type).toBe("string");
        expect(r.sheet.data[0][1].value).toBe("Surname");
      });
      it("uses formats the header when columnLabel is missing", () => {
        expect(r.sheet.data[0][0].type).toBe("string");
        expect(r.sheet.data[0][0].value).toBe("First name");
      });
    });
    describe("rows", () => {
      describe("with no custom formatter", () => {
        const r = createZipcelxConfig("test", config, items);
        it("includes all rows and header", () => {
          expect(r.sheet.data.length).toBe(5);
        });
        it("includes renders string as type string", () => {
          expect(r.sheet.data[1][0].type).toBe("string");
        });
        it("includes renders number as type number", () => {
          expect(r.sheet.data[1][2].type).toBe("number");
        });
      });
      describe("with custom formatter", () => {
        describe("custom format is string", () => {
          const formatters = {
            age: (item: Item) => String(item.age) + " years",
          };
          const r = createZipcelxConfig("test", config, items, formatters);
          it("uses the custom formatter", () => {
            expect(r.sheet.data[1][2].type).toBe("string");
            expect(r.sheet.data[1][2].value).toBe("19 years");
          });
        });
        describe("custom format is number", () => {
          const formatters = {
            age: (item: Item) => item.age + 100,
          };
          const r = createZipcelxConfig("test", config, items, formatters);
          it("uses the custom formatter", () => {
            expect(r.sheet.data[1][2].type).toBe("number");
            expect(r.sheet.data[1][2].value).toBe(119);
          });
        });
      });
    });
  });
});
