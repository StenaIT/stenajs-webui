import { Store, withState } from "@dump247/storybook-state";
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
import { Box, Column, Row, Spacing, StandardText } from "@stenajs-webui/core";

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
    id: "129",
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
    id: createColumnConfig((item) => item.id),
    active: createColumnConfig((item) => item.active, {
      itemLabelFormatter: (value) => (value ? "Y" : ""),
      infoIconTooltipText: "Active means out on the sea.",
    }),
    name: createColumnConfig((item) => item.name),
    ship: createColumnConfig((item) => item.ship),
    numPassengers: createColumnConfig((item) => item.numPassengers, {
      renderCell: createStandardEditableTextCell(),
      isEditable: true,
      onChange: () => {},
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end",
    }),
    departure: createColumnConfig((item) => item.departure, {
      itemLabelFormatter: (value) => format(value, "yyyy-MM-dd"),
      borderLeft: true,
    }),
  },
  columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
};

const mockedItems = createItemsMocks();

const createOnChangeNumPassengers = (
  store: Store<{ items: Array<ListItem> }>
) => (item: ListItem, numPassengers: string | undefined) => {
  const items = setListItemFields(store.state.items, item.id, {
    numPassengers: numPassengers ? parseInt(numPassengers) : undefined,
  });
  return store.set({
    items,
  });
};

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

export const WithSortingDisabled = withState({ items: mockedItems })(
  ({ store }) => {
    const config = createConfig(
      createOnChangeNumPassengers(store),
      createStandardEditableTextCell(),
      { disableSorting: true }
    );
    return <StandardTable items={store.state.items} config={config} />;
  }
);

export const WithSortingDisabledAndSortByName = withState({
  items: mockedItems,
})(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createStandardEditableTextCell(),
    { disableSorting: true, initialSortOrder: "name" }
  );
  return <StandardTable items={store.state.items} config={config} />;
});

export const WithSortingEnabledAndSortByNameDesc = withState({
  items: mockedItems,
})(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createStandardEditableTextCell(),
    {
      initialSortOrder: "name",
      initialSortOrderDesc: true,
    }
  );
  return <StandardTable items={store.state.items} config={config} />;
});

export const WithFieldError = withState({ items: mockedItems })(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createEditableTextCellWithStatus<number | undefined, ListItem>(
      undefined,
      (item) => ({
        hasError: true,
        errorMessage: "Something failed.",
        id: item.id,
      })
    )
  );
  return <StandardTable items={mockedItems} config={config} />;
});

export const WithFieldLoading = withState({ items: mockedItems })(
  ({ store }) => {
    const config = createConfig(
      createOnChangeNumPassengers(store),
      createEditableTextCellWithStatus<number | undefined, ListItem>(
        undefined,
        (item) => ({
          id: item.id,
          loading: true,
        })
      )
    );
    return <StandardTable items={mockedItems} config={config} />;
  }
);

export const WithModifiedFields = withState({ items: mockedItems })(
  ({ store }) => {
    const config = createConfig(
      createOnChangeNumPassengers(store),
      createEditableTextCellWithStatus<number | undefined, ListItem>(
        "Passengers cannot be empty.",
        () => undefined,
        (item) => ({
          id: item.id,
          modified: true,
          newValue: "789",
        })
      )
    );
    return <StandardTable items={mockedItems} config={config} />;
  }
);

export const WithWarningWhenModifiedFieldIsEmpty = withState({
  items: mockedItems,
})(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createEditableTextCellWithStatus<number | undefined, ListItem>(
      "Passengers cannot be empty.",
      () => undefined,
      (item) => ({
        id: item.id,
        modified: true,
        newValue: "",
      })
    )
  );
  return <StandardTable items={mockedItems} config={config} />;
});

export const MissingItems = () => <StandardTable items={[]} config={config} />;

export const NavigationBetweenTables = () => {
  const config = createConfig(undefined, undefined, {
    gridCellOptions: {
      edgeMode: "unlimited",
    },
  });

  return (
    <Column>
      <StandardTable items={mockedItems} config={config} tableId={"table123"} />
      <Spacing />
      <StandardTable
        items={mockedItems}
        config={config}
        tableId={"table123"}
        rowIndexOffset={mockedItems.length}
      />
      7
    </Column>
  );
};

export const Loading = () => (
  <StandardTable items={mockedItems} config={config} loading />
);

export const _Error = () => (
  <StandardTable
    items={mockedItems}
    config={config}
    error={new Error("Could not fetch users")}
  />
);

export const ExpandableRows = () => {
  const config = createConfig(undefined, undefined, {
    enableExpandCollapse: true,
    showHeaderExpandCollapse: true,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <StandardText>Name: {item.name}</StandardText>
      </Box>
    ),
  });
  return <StandardTable items={mockedItems} config={config} />;
};

export const SomeExpandableRows = () => {
  const config = createConfig(undefined, undefined, {
    enableExpandCollapse: true,
    expandCollapseDisableResolver: (item) =>
      item.numPassengers != null && item.numPassengers > 500,
    renderRowExpansion: (item) => (
      <Box spacing indent>
        <StandardText>Name: {item.name}</StandardText>
      </Box>
    ),
  });
  return <StandardTable items={mockedItems} config={config} />;
};

export const WithStickyTableHeader = () => {
  const config = createConfig(undefined, undefined, {
    stickyHeader: true,
  });
  return (
    <Box style={{ maxHeight: "220px", overflowY: "scroll" }}>
      <StandardTable items={mockedItems} config={config} />
    </Box>
  );
};

export const MultipleTablesWithStickyTableHeader = () => {
  const config = createConfig(undefined, undefined, {
    stickyHeader: true,
  });
  return (
    <Row
      style={{
        maxHeight: "220px",
        overflowY: "scroll",
      }}
    >
      <Box flex={1}>
        <StandardTable items={mockedItems} config={config} />
      </Box>
      <Box flex={1}>
        <StandardTable items={mockedItems} config={config} />
      </Box>
    </Row>
  );
};
