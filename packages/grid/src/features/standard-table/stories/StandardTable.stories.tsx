import {
  createColumnConfig,
  createEditableTextCellWithStatus,
  createStandardEditableTextCell,
  StandardTable,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { addDays, format } from "date-fns";
import * as React from "react";
import { useCallback, useState } from "react";
import { Box, Column, Spacing, StandardText } from "@stenajs-webui/core";

interface ListItem {
  id: string;
  active: boolean;
  name: string;
  ship: string;
  numPassengers?: number;
  departure: Date;
}

const createItemsMocks = (): Array<ListItem> => [
  {
    id: "123",
    active: false,
    name: "Postnord",
    ship: "McBoat",
    numPassengers: 1241,
    departure: addDays(new Date(), 1),
  },
  {
    id: "124",
    active: true,
    name: "Schenker",
    ship: "Boatface",
    numPassengers: 31,
    departure: addDays(new Date(), 21),
  },
  {
    id: "125",
    active: true,
    name: "Fedex",
    ship: "RoboBoat",
    numPassengers: 534,
    departure: addDays(new Date(), 14),
  },
  {
    id: "126",
    active: false,
    name: "UPS",
    ship: "Boatinator",
    numPassengers: 213,
    departure: addDays(new Date(), 63),
  },
  {
    id: "127",
    active: false,
    name: "DHL",
    ship: "Airplane",
    numPassengers: 821,
    departure: addDays(new Date(), 18),
  },
  {
    id: "128",
    active: true,
    name: "Fedex",
    ship: "RoboBoat",
    numPassengers: 534,
    departure: addDays(new Date(), 14),
  },
  {
    id: "A really long id, or could be a very long title",
    active: false,
    name: "Schenker",
    ship: "MS Britannica",
    numPassengers: 655,
    departure: addDays(new Date(), 5),
  },
];

const setListItemFields = (
  items: Array<ListItem>,
  id: string,
  fields: Partial<ListItem>
) => items.map((item) => (item.id === id ? { ...item, ...fields } : item));

const standardTableConfigForStories: StandardTableConfig<ListItem> = {
  keyResolver: (item) => item.id,
  showHeaderCheckbox: true,
  showRowCheckbox: true,
  enableGridCell: true,
  columns: {
    id: createColumnConfig((item) => item.id, {
      width: "100px",
    }),
    active: createColumnConfig((item) => item.active, {
      itemLabelFormatter: (value) => (value ? "Y" : ""),
      infoIconTooltipText: "Active means out on the sea.",
      width: "150px",
    }),
    name: createColumnConfig((item) => item.name, {
      width: "200px",
    }),
    ship: createColumnConfig((item) => item.ship, {
      width: "150px",
    }),
    numPassengers: createColumnConfig((item) => item.numPassengers, {
      renderCell: createStandardEditableTextCell(),
      isEditable: true,
      onChange: () => {},
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end",
      width: "200px",
    }),
    departure: createColumnConfig((item) => item.departure, {
      itemLabelFormatter: (value) => format(value, "yyyy-MM-dd"),
      borderLeft: true,
      width: "100px",
    }),
  },
  columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
};

const mockedItems = createItemsMocks();

export default {
  title: "grid/StandardTable",
};

const useListState = (initialItems: Array<ListItem>) => {
  const [items, setItems] = useState(initialItems);

  const onChangeNumPassengers = useCallback(
    (item: ListItem, numPassengers: string | undefined) => {
      return setItems(
        setListItemFields(items, item.id, {
          numPassengers: numPassengers ? parseInt(numPassengers) : undefined,
        })
      );
    },
    [items, setItems]
  );

  return {
    onChangeNumPassengers,
    items,
  };
};

export const Standard = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
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

export const WithSortingDisabled = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    disableSorting: true,
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

export const WithSortingDisabledAndSortByName = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    disableSorting: true,
    initialSortOrder: "name",
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

export const WithSortingEnabledAndSortByNameDesc = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    initialSortOrder: "name",
    initialSortOrderDesc: true,
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

export const WithFieldError = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(undefined, (item) => ({
          hasError: true,
          errorMessage: "Something failed.",
          id: item.id,
        })),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const WithFieldLoading = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(undefined, (item) => ({
          id: item.id,
          loading: true,
        })),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const WithModifiedFields = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(
          "Passengers cannot be empty",
          () => undefined,
          (item) => ({
            id: item.id,
            modified: true,
            newValue: "789",
          })
        ),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const WithWarningWhenModifiedFieldIsEmpty = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    ...standardTableConfigForStories,
    columns: {
      ...standardTableConfigForStories.columns,
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        renderCell: createEditableTextCellWithStatus<
          number | undefined,
          ListItem
        >(
          "Passengers cannot be empty",
          () => undefined,
          (item) => ({
            id: item.id,
            modified: true,
            newValue: "",
          })
        ),
        onChange: onChangeNumPassengers,
      },
    },
  };

  return <StandardTable items={items} config={config} />;
};

export const MissingItems = () => (
  <StandardTable items={[]} config={standardTableConfigForStories} />
);

export const NavigationBetweenTables = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
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

export const Loading = () => (
  <StandardTable
    items={mockedItems}
    config={standardTableConfigForStories}
    loading
  />
);

export const _Error = () => (
  <StandardTable
    items={mockedItems}
    config={standardTableConfigForStories}
    error={new Error("Could not fetch users")}
  />
);

export const ExpandableRows = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    enableExpandCollapse: true,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <StandardText>Name: {item.name}</StandardText>
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

  const config: StandardTableConfig<ListItem> = {
    enableExpandCollapse: true,
    expandCollapseDisableResolver: (item) =>
      item.numPassengers != null && item.numPassengers > 500,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <StandardText>Name: {item.name}</StandardText>
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

export const WithStickyTableHeader = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    headerRowSticky: true,
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
      <StandardTable items={items} config={config} />
    </Box>
  );
};

export const WithStickyTableHeaderConfiguration = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    headerRowSticky: true,
    headerRowOffsetTop: 16,
    headerRowZ: 499,
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
        <StandardText>
          Other upper sticky content that should stick above header
        </StandardText>
      </Box>
      <StandardTable items={items} config={config} />
    </Box>
  );
};

export const WithStickyFirstColumn = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem> = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    headerRowSticky: true,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
        background: "white",
        sticky: true,
        offsetLeft: "0",
        shadowBorder: true,
        zIndex: 444,
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
