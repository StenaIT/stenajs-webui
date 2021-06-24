import { Box, Text } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
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
  title: "grid/StandardTable/Sticky",
};

export const StickyTableHeader = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    stickyHeader: true,
    zIndex: 500,
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
    <Box style={{ maxHeight: "230px", overflowY: "scroll" }}>
      <StandardTable items={items} config={config} />
    </Box>
  );
};

export const StickyTableHeaderConfiguration = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    stickyHeader: true,
    headerRowOffsetTop: "16px",
    zIndex: 499,
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
    <Box style={{ maxHeight: "220px", overflowY: "scroll" }}>
      <Box
        style={{
          height: 16,
          position: "sticky",
          top: 0,
          zIndex: 500,
          backgroundColor: "white",
        }}
      >
        <Text>This text should remain sticky above header</Text>
      </Box>
      <StandardTable items={items} config={config} />
    </Box>
  );
};

export const StickyColumn = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
        sticky: true,
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
      },
    },
    columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
  };

  return (
    <Box style={{ maxHeight: "200px", maxWidth: "80%", overflow: "scroll" }}>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
    </Box>
  );
};

export const StickyHeaderAndColumn = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    stickyHeader: true,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
        sticky: true,
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
      },
    },
    columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
  };

  return (
    <Box style={{ maxHeight: "200px", maxWidth: "80%", overflow: "scroll" }}>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
    </Box>
  );
};

export const StickyHeaderAndColumnWithBackgrounds = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    stickyHeader: true,
    rowBackgroundResolver: (item) =>
      item.active ? cssColor("--lhds-color-green-100") : undefined,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
        sticky: true,
        backgroundResolver: (item) =>
          item.active ? cssColor("--lhds-color-orange-100") : undefined,
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
      },
    },
    columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
  };

  return (
    <Box style={{ maxHeight: "200px", maxWidth: "80%", overflow: "scroll" }}>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
    </Box>
  );
};

export const StickyHeaderAndRowCheckbox = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: true,
    showRowCheckbox: true,
    stickyHeader: true,
    stickyCheckboxColumn: true,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
      },
    },
    columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
  };

  return (
    <Box style={{ maxHeight: "200px", maxWidth: "80%", overflow: "scroll" }}>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
    </Box>
  );
};
