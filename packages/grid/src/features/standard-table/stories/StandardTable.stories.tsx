import { Indent, StandardText } from "@stenajs-webui/core";
import {
  createColumnConfig,
  StandardTable,
  StandardTableConfig
} from "@stenajs-webui/grid";
import { storiesOf } from "@storybook/react";
import { addDays, format } from "date-fns";
import * as React from "react";

interface ListItem {
  id: string;
  active: boolean;
  name: string;
  ship: string;
  numPassengers: number;
  departure: Date;
}

const createConfig = (
  tableId: string
): StandardTableConfig<ListItem, keyof ListItem> => ({
  tableId,
  keyResolver: item => item.id,
  showHeaderCheckbox: true,
  showRowCheckbox: true,
  enableGridCell: true,
  columns: {
    id: createColumnConfig(item => item.id, {
      renderCell: value => (
        <Indent>
          <StandardText color={"var(--swui-primary-action-color)"}>
            {value}
          </StandardText>
        </Indent>
      )
    }),
    active: createColumnConfig(item => item.active, {
      infoIconTooltipText: "Active means out on the sea."
    }),
    name: createColumnConfig(item => item.name),
    ship: createColumnConfig(item => item.ship),
    numPassengers: createColumnConfig(item => item.numPassengers, {
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

const items: Array<ListItem> = [
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

const config = createConfig("123");

storiesOf("grid/StandardTable", module)
  .add("standard", () => <StandardTable items={items} config={config} />)
  .add("missing items", () => <StandardTable items={[]} config={config} />)
  .add("loading", () => <StandardTable items={items} config={config} loading />)
  .add("error", () => (
    <StandardTable
      items={items}
      config={config}
      error={new Error("Could not fetch users")}
    />
  ));
