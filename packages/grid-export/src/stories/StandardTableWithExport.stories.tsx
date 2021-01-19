import { Column } from "@stenajs-webui/core";
import {
  createColumnConfig,
  StandardTable,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import * as React from "react";
import { StandardTableExcelExportButton } from "../components/StandardTableExcelExportButton";

export default {
  title: "grid-export/StandardTableExcelExportButton",
};

interface Item {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

const config: StandardTableConfig<Item, keyof Omit<Item, "id">> = {
  keyResolver: (item) => item.id,
  rowIndent: 3,
  columns: {
    firstName: createColumnConfig((item) => item.firstName),
    lastName: createColumnConfig((item) => item.lastName),
    age: createColumnConfig((item) => item.age),
  },
  columnOrder: ["firstName", "lastName", "age"],
};

const configWithGroups: StandardTableConfig<
  Item,
  keyof Omit<Item, "id">,
  "names" | "info"
> = {
  keyResolver: (item) => item.id,
  rowIndent: 3,
  columns: {
    firstName: createColumnConfig((item) => item.firstName),
    lastName: createColumnConfig((item) => item.lastName),
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

const items: Array<Item> = [
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

export const Demo = () => (
  <Column>
    <StandardTableExcelExportButton config={config} items={items} />
    <StandardTable config={config} items={items} />
  </Column>
);

export const WithNoItems = () => (
  <Column>
    <StandardTableExcelExportButton config={config} items={[]} />
    <StandardTable config={config} items={[]} />
  </Column>
);

export const WithCustomFormatters = () => {
  const formatters = {
    lastName: (item: Item) => item.firstName + "sson",
    age: (item: Item) => item.age + 100,
  };

  return (
    <Column>
      <StandardTableExcelExportButton
        config={config}
        items={items}
        formatters={formatters}
      />
      <StandardTable config={config} items={items} />
    </Column>
  );
};

export const WithColumnGroups = () => (
  <Column>
    <StandardTableExcelExportButton config={configWithGroups} items={items} />
    <StandardTable config={configWithGroups} items={items} />
  </Column>
);
