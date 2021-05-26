import { Box, Column, Heading, Spacing, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { useState } from "react";
import {
  StandardTable,
  StandardTableVariant,
} from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable",
};

export const Overview = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const Variants = () => {
  const { items } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: undefined,
        isEditable: false,
      },
    },
  };

  const variants: Array<StandardTableVariant> = [
    "relaxed",
    "standard",
    "condensed",
    "compact",
  ];

  return (
    <>
      {variants.map((variant) => (
        <>
          <Heading>{variant}</Heading>
          <Spacing />
          <StandardTable items={items} config={config} variant={variant} />
          <Spacing num={2} />
        </>
      ))}
    </>
  );
};

export const BackgroundResolver = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    rowBackgroundResolver: (item) =>
      item.id === "124"
        ? {
            background: cssColor("--lhds-color-green-200"),
            hoverBackground: cssColor("--lhds-color-green-300"),
          }
        : undefined,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };
  return <StandardTable items={items} config={config} />;
};

export const NavigationBetweenTables = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    gridCellOptions: {
      edgeMode: "unlimited",
    },
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
  };

  return (
    <Column>
      <StandardTable items={items} config={config} tableId={"table123"} />
      <Spacing />
      <StandardTable
        items={items}
        config={config}
        tableId={"table123"}
        rowIndexOffset={mockedItems.length}
      />
      7
    </Column>
  );
};

export const OnKeyDown = () => {
  const [text, setText] = useState("");

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    disableSorting: true,
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: undefined,
        isEditable: false,
      },
    },
  };

  return (
    <Column>
      <Text>Focus on cell and press space.</Text>
      <Spacing />
      <StandardTable
        items={mockedItems}
        config={config}
        onKeyDown={(ev, { columnId, item }) => {
          if (ev.key === " ") {
            setText(`${columnId}:${item.id}`);
            ev.preventDefault();
            ev.stopPropagation();
          }
        }}
      />
      <Spacing />
      <Box width={"200px"}>
        <TextInput value={text} disabled />
      </Box>
    </Column>
  );
};
