import { Box, Column, Heading, Text } from "@stenajs-webui/core";
import {
  createColumnConfig,
  StandardTable,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import * as React from "react";
import { useRef } from "react";
import { StandardTableHtmlCopyToClipboardButton } from "../components/StandardTableHtmlCopyToClipboardButton";

export default {
  title: "grid-export/StandardTableHtmlExportButton",
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
    <StandardTableHtmlCopyToClipboardButton config={config} items={items} />
    <StandardTable config={config} items={items} />
  </Column>
);

export const WithRenderContent = () => {
  const additionalComponent = useRef<HTMLDivElement>(null);

  const renderCopy = (html: string): string | null => {
    const additionalDomComponent = additionalComponent.current;

    if (additionalDomComponent) {
      const additionalHtml = additionalDomComponent.innerHTML;
      return `${additionalHtml}${html}`;
    }
    return null;
  };

  const SomeArbitraryComponents = () => (
    <Box ref={additionalComponent} spacing={2}>
      <Heading>This a heading</Heading>
      <Text>And some text that we want to copy as well</Text>
    </Box>
  );
  return (
    <Column>
      <StandardTableHtmlCopyToClipboardButton
        config={config}
        items={items}
        renderContent={renderCopy}
      />
      <SomeArbitraryComponents />
      <StandardTable config={config} items={items} />
    </Column>
  );
};

export const WithNoItems = () => (
  <Column>
    <StandardTableHtmlCopyToClipboardButton config={config} items={[]} />
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
      <StandardTableHtmlCopyToClipboardButton
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
    <StandardTableHtmlCopyToClipboardButton
      config={configWithGroups}
      items={items}
    />
    <StandardTable config={configWithGroups} items={items} />
  </Column>
);
