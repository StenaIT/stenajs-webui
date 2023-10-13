import {
  Box,
  Column,
  Heading,
  Indent,
  Spacing,
  Text,
  Txt,
} from "@stenajs-webui/core";
import { Checkbox, TextInput } from "@stenajs-webui/forms";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { useMemo, useState } from "react";
import {
  StandardTable,
  StandardTableVariant,
} from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { createStandardTableInitialState } from "../redux/StandardTableReducer";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";
import { sortBy, sumBy } from "lodash";
import { Tag } from "@stenajs-webui/elements";
import { createColumnConfig } from "../config/StandardTableColumnConfig";

export default {
  title: "grid/StandardTable",
};

export const Overview = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    checkboxDisabledResolver: (item) => item.id === "125",
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

export const DefaultTextSize = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    defaultTextSize: "smaller",
    checkboxDisabledResolver: (item) => item.id === "125",
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

export const DefaultCellRenderer = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    defaultCellRenderer: ({ label }) => (
      <Indent>
        <Tag label={label} variant={"success"} />
      </Indent>
    ),
    checkboxDisabledResolver: (item) => item.id === "125",
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

export const WithoutCheckboxInHeader = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    checkboxDisabledResolver: (item) => item.id === "125",
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

export const ExternalSorting = () => {
  const { items } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    enableExternalSorting: true,
  };

  const { tableContext } = useLocalStateTableContext<keyof ListItem>(
    "test",
    createStandardTableInitialState("id")
  );

  const { sortOrder } = tableContext.state;

  const sortedItems = useMemo(() => {
    let listItems = sortBy(items, sortOrder.sortBy ?? "id");
    if (sortOrder.desc) {
      listItems.reverse();
    }
    return listItems;
  }, [items, sortOrder.desc, sortOrder.sortBy]);

  return (
    <Column>
      <Txt>See story source to see how this works.</Txt>
      <Spacing />
      <StandardTable
        items={sortedItems}
        config={config}
        tableContext={tableContext}
      />
    </Column>
  );
};

export const CellOnKeyDown = () => {
  const { items, onChangeActive, onChangeNumPassengers } =
    useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      active: createColumnConfig((item) => item.active, {
        onKeyDown: ({ key }, { item }) => {
          if (key === " ") {
            onChangeActive(item, !item.active);
          }
        },
        renderCell: ({ item }) => (
          <Indent>
            <Checkbox
              value={item.active}
              onValueChange={(value) => onChangeActive(item, value)}
            />
          </Indent>
        ),
      }),
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onKeyDown: (ev, { item }) => {
          if (ev.key === "Delete") {
            onChangeNumPassengers(item, undefined);
          }
        },
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

export const SummaryRow = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        summaryText: () => "Total",
      },
      name: {
        ...standardTableConfigForStories.columns.name,
        summaryText: () => "This is a very long text.",
        summaryCellColSpan: 2,
      },
      active: {
        ...standardTableConfigForStories.columns.active,
        summaryText: ({ items }) =>
          `${sumBy(items, (item) => (item.active ? 1 : 0))} active`,
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        onChange: onChangeNumPassengers,
        summaryText: ({ items }) =>
          String(sumBy(items, (item) => item.numPassengers ?? 0)),
      },
      departure: {
        ...standardTableConfigForStories.columns.departure,
        renderSummaryCell: () => (
          <Indent>
            <Tag label={"Jedi knights"} />
          </Indent>
        ),
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};
