import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import { StandardTable } from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable/ExpandableRows",
};

export const ExpandableRows = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    enableExpandCollapse: true,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <Text>Name: {item.name}</Text>
      </Box>
    ),
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

export const SomeExpandableRows = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    enableExpandCollapse: true,
    expandCollapseDisableResolver: (item) =>
      item.numPassengers != null && item.numPassengers > 500,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <Text>Name: {item.name}</Text>
      </Box>
    ),
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
