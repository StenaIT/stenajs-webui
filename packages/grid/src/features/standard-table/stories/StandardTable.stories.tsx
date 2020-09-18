import { Store, withState } from "@dump247/storybook-state";
import {
  createColumnConfig,
  createEditableTextCellWithStatus,
  createStandardEditableTextCell,
  StandardTable,
  StandardTableCellRenderer,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { addDays, format } from "date-fns";
import * as React from "react";
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
];

const setListItemFields = (
  items: Array<ListItem>,
  id: string,
  fields: Partial<ListItem>
) => items.map((item) => (item.id === id ? { ...item, ...fields } : item));

const createConfig = (
  onChangeNumPassengers?: (
    item: ListItem,
    numPassengersString: string | undefined
  ) => void,
  numPassengersCellRenderer?: StandardTableCellRenderer<
    number | undefined,
    ListItem
  >,
  options?: Partial<StandardTableConfig<ListItem>>
): StandardTableConfig<ListItem> => ({
  ...options,
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
      renderCell: numPassengersCellRenderer,
      isEditable: true,
      onChange: onChangeNumPassengers,
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end",
    }),
    departure: createColumnConfig((item) => item.departure, {
      itemLabelFormatter: (value) => format(value, "yyyy-MM-dd"),
      borderLeft: true,
    }),
  },
  columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
});

const config = createConfig(() => {});
const items = createItemsMocks();

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

export const Standard = withState({ items })(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createStandardEditableTextCell()
  );
  return <StandardTable items={store.state.items} config={config} />;
});

Standard.storyName = "standard";

export const WithSortingDisabled = withState({ items })(({ store }) => {
  const config = createConfig(
    createOnChangeNumPassengers(store),
    createStandardEditableTextCell(),
    { disableSorting: true }
  );
  return <StandardTable items={store.state.items} config={config} />;
});

WithSortingDisabled.storyName = "with sorting disabled";

export const WithSortingDisabledAndSortByName = withState({ items })(
  ({ store }) => {
    const config = createConfig(
      createOnChangeNumPassengers(store),
      createStandardEditableTextCell(),
      { disableSorting: true, initialSortOrder: "name" }
    );
    return <StandardTable items={store.state.items} config={config} />;
  }
);

WithSortingDisabledAndSortByName.storyName =
  "with sorting disabled and sort by name";

export const WithSortingEnabledAndSortByNameDesc = withState({ items })(
  ({ store }) => {
    const config = createConfig(
      createOnChangeNumPassengers(store),
      createStandardEditableTextCell(),
      {
        initialSortOrder: "name",
        initialSortOrderDesc: true,
      }
    );
    return <StandardTable items={store.state.items} config={config} />;
  }
);

WithSortingEnabledAndSortByNameDesc.storyName =
  "with sorting enabled and sort by name desc";

export const WithFieldError = withState({ items })(({ store }) => {
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
  return <StandardTable items={items} config={config} />;
});

WithFieldError.storyName = "with field error";

export const WithFieldLoading = withState({ items })(({ store }) => {
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
  return <StandardTable items={items} config={config} />;
});

WithFieldLoading.storyName = "with field loading";

export const WithModifiedFields = withState({ items })(({ store }) => {
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
  return <StandardTable items={items} config={config} />;
});

WithModifiedFields.storyName = "with modified fields";

export const WithWarningWhenModifiedFieldIsEmpty = withState({ items })(
  ({ store }) => {
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
    return <StandardTable items={items} config={config} />;
  }
);

WithWarningWhenModifiedFieldIsEmpty.storyName =
  "with warning when modified field is empty";

export const MissingItems = () => <StandardTable items={[]} config={config} />;

MissingItems.storyName = "missing items";

export const NavigationBetweenTables = () => {
  const config = createConfig(undefined, undefined, {
    gridCellOptions: {
      edgeMode: "unlimited",
    },
  });

  return (
    <Column>
      <StandardTable items={items} config={config} tableId={"table123"} />
      <Spacing />
      <StandardTable
        items={items}
        config={config}
        tableId={"table123"}
        rowIndexOffset={items.length}
      />
      7
    </Column>
  );
};

NavigationBetweenTables.storyName = "navigation between tables";

export const Loading = () => (
  <StandardTable items={items} config={config} loading />
);

Loading.storyName = "loading";

export const _Error = () => (
  <StandardTable
    items={items}
    config={config}
    error={new Error("Could not fetch users")}
  />
);

_Error.storyName = "error";

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
  return <StandardTable items={items} config={config} />;
};

ExpandableRows.storyName = "expandable rows";

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
  return <StandardTable items={items} config={config} />;
};

SomeExpandableRows.storyName = "some expandable rows";
