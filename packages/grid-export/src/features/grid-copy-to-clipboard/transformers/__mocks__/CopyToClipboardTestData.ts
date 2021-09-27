import {
  createColumnConfig,
  createGroupConfigAndIdsForRows,
  StandardTableConfig,
} from "@stenajs-webui/grid";

export interface TestItem {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

export const testItems: Array<TestItem> = [
  {
    id: "1",
    firstName: "Johan",
    lastName: "Rocketman",
    age: 21,
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
  {
    id: "5",
    firstName: "Niklas",
    lastName: "Rockstar",
    age: 27,
  },
];

export const testConfig: StandardTableConfig<
  TestItem,
  keyof Omit<TestItem, "id">
> = {
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

export const testGroupConfigs = createGroupConfigAndIdsForRows(
  undefined,
  undefined,
  testConfig.columnOrder
).map((p) => p.groupConfig);

export const testConfigWithGroups: StandardTableConfig<
  TestItem,
  keyof Omit<TestItem, "id">,
  "names" | "info"
> = {
  keyResolver: (item) => item.id,
  rowIndent: 3,
  columns: {
    firstName: createColumnConfig((item) => item.firstName),
    lastName: createColumnConfig((item) => item.lastName, {
      columnLabel: "Surname",
    }),
    age: createColumnConfig((item) => item.age),
  },
  columnGroups: {
    names: {
      label: "Name",
      columnOrder: ["firstName", "lastName"],
    },
    info: {
      label: "Info",
      columnOrder: ["age"],
    },
  },
  columnGroupOrder: ["names", "info"],
};

export const testGroupConfigsWithGroups = createGroupConfigAndIdsForRows(
  testConfigWithGroups.columnGroups,
  testConfigWithGroups.columnGroupOrder,
  undefined
).map((p) => p.groupConfig);
