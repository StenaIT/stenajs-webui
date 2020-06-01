import { Store, withState } from "@dump247/storybook-state";
import {
  createColumnConfig,
  createEditableTextCellWithStatus,
  createStandardEditableTextCell,
  StandardTable,
  StandardTableCellRenderer,
  StandardTableConfig
} from "@stenajs-webui/grid";
import { storiesOf } from "@storybook/react";
import { addDays, format } from "date-fns";
import * as React from "react";
import { StandardText } from "../../../../../core/src/components/text/variants/StandardText";
import { Box } from "@stenajs-webui/core";

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
    departure: addDays(new Date(), 1)
  },
  {
    id: "124",
    active: true,
    name: "Schenker",
    ship: "Boatface",
    numPassengers: 31,
    departure: addDays(new Date(), 21)
  },
  {
    id: "125",
    active: true,
    name: "Fedex",
    ship: "RoboBoat",
    numPassengers: 534,
    departure: addDays(new Date(), 14)
  },
  {
    id: "126",
    active: false,
    name: "UPS",
    ship: "Boatinator",
    numPassengers: 213,
    departure: addDays(new Date(), 63)
  },
  {
    id: "127",
    active: false,
    name: "DHL",
    ship: "Airplane",
    numPassengers: 821,
    departure: addDays(new Date(), 18)
  }
];

const setListItemFields = (
  items: Array<ListItem>,
  id: string,
  fields: Partial<ListItem>
) => items.map(item => (item.id === id ? { ...item, ...fields } : item));

const createConfig = (
  onChangeNumPassengers?: (
    item: ListItem,
    numPassengersString: string | undefined
  ) => void,
  numPassengersCellRenderer?: StandardTableCellRenderer<
    number | undefined,
    ListItem
  >,
  options?: Partial<StandardTableConfig<ListItem, keyof ListItem>>
): StandardTableConfig<ListItem, keyof ListItem> => ({
  ...options,
  keyResolver: item => item.id,
  showHeaderCheckbox: true,
  showRowCheckbox: true,
  enableGridCell: true,
  columns: {
    id: createColumnConfig(item => item.id),
    active: createColumnConfig(item => item.active, {
      itemLabelFormatter: value => (value ? "Y" : ""),
      infoIconTooltipText: "Active means out on the sea."
    }),
    name: createColumnConfig(item => item.name),
    ship: createColumnConfig(item => item.ship),
    numPassengers: createColumnConfig(item => item.numPassengers, {
      renderCell: numPassengersCellRenderer,
      isEditable: true,
      onChange: onChangeNumPassengers,
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end"
    }),
    departure: createColumnConfig(item => item.departure, {
      itemLabelFormatter: value => format(value, "yyyy-MM-dd"),
      borderLeft: true
    })
  },
  columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"]
});

const config = createConfig(() => {});
const items = createItemsMocks();

const createOnChangeNumPassengers = (
  store: Store<{ items: Array<ListItem> }>
) => (item: ListItem, numPassengers: string | undefined) => {
  const items = setListItemFields(store.state.items, item.id, {
    numPassengers: numPassengers ? parseInt(numPassengers) : undefined
  });
  return store.set({
    items
  });
};

storiesOf("grid/StandardTable", module)
  .add(
    "standard",
    withState({ items })(({ store }) => {
      const config = createConfig(
        createOnChangeNumPassengers(store),
        createStandardEditableTextCell()
      );
      return <StandardTable items={store.state.items} config={config} />;
    })
  )
  .add(
    "with field error",
    withState({ items })(({ store }) => {
      const config = createConfig(
        createOnChangeNumPassengers(store),
        createEditableTextCellWithStatus<number | undefined, ListItem>(
          undefined,
          item => ({
            hasError: true,
            errorMessage: "Something failed.",
            id: item.id
          })
        )
      );
      return <StandardTable items={items} config={config} />;
    })
  )
  .add(
    "with field loading",
    withState({ items })(({ store }) => {
      const config = createConfig(
        createOnChangeNumPassengers(store),
        createEditableTextCellWithStatus<number | undefined, ListItem>(
          undefined,
          item => ({
            id: item.id,
            loading: true
          })
        )
      );
      return <StandardTable items={items} config={config} />;
    })
  )
  .add(
    "with modified fields",
    withState({ items })(({ store }) => {
      const config = createConfig(
        createOnChangeNumPassengers(store),
        createEditableTextCellWithStatus<number | undefined, ListItem>(
          "Passengers cannot be empty.",
          () => undefined,
          item => ({
            id: item.id,
            modified: true,
            newValue: "789"
          })
        )
      );
      return <StandardTable items={items} config={config} />;
    })
  )
  .add(
    "with warning when modified field is empty",
    withState({ items })(({ store }) => {
      const config = createConfig(
        createOnChangeNumPassengers(store),
        createEditableTextCellWithStatus<number | undefined, ListItem>(
          "Passengers cannot be empty.",
          () => undefined,
          item => ({
            id: item.id,
            modified: true,
            newValue: ""
          })
        )
      );
      return <StandardTable items={items} config={config} />;
    })
  )
  .add("missing items", () => <StandardTable items={[]} config={config} />)
  .add("loading", () => <StandardTable items={items} config={config} loading />)
  .add("error", () => (
    <StandardTable
      items={items}
      config={config}
      error={new Error("Could not fetch users")}
    />
  ))
  .add("expandable rows", () => {
    const config = createConfig(undefined, undefined, {
      enableExpandCollapse: true,
      renderRowExpansion: item => (
        <Box spacing indent>
          <StandardText>Name: {item.name}</StandardText>
        </Box>
      )
    });
    return <StandardTable items={items} config={config} />;
  });
