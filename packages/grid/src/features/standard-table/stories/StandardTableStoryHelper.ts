import { addDays, format } from "date-fns";
import { useCallback, useState } from "react";
import { createColumnConfig } from "../config/StandardTableColumnConfig";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { createStandardEditableTextCell } from "../helpers/cell-renderers/editable-text-cell/EditableTextCell";

export interface ListItem {
  id: string;
  active: boolean;
  name: string;
  ship: string | null;
  numPassengers?: number;
  departure: Date;
}

export const createItemsMocks = (): Array<ListItem> => [
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
    active: true,
    name: "No ship AB",
    ship: null,
    numPassengers: 534,
    departure: addDays(new Date(), 12),
  },
  {
    id: "130",
    active: true,
    name: "Empty string ship AB",
    ship: "",
    numPassengers: 534,
    departure: addDays(new Date(), 13),
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

export const setListItemFields = (
  items: Array<ListItem>,
  id: string,
  fields: Partial<ListItem>
) => items.map((item) => (item.id === id ? { ...item, ...fields } : item));

export const standardTableConfigForStories: StandardTableConfig<
  ListItem,
  keyof ListItem
> = {
  keyResolver: (item) => item.id,
  showHeaderCheckbox: true,
  showRowCheckbox: true,
  enableGridCell: true,
  columns: {
    id: createColumnConfig((item) => item.id, {
      sortOrderIconVariant: "numeric",
    }),
    active: createColumnConfig((item) => item.active, {
      itemLabelFormatter: (value) => (value ? "Y" : ""),
      infoIconTooltipText: "Active means out on the sea.",
    }),
    name: createColumnConfig((item) => item.name, {
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end",
      infoIconTooltipText: "Ohoh",
      sortOrderIconVariant: "alpha",
    }),
    ship: createColumnConfig((item) => item.ship, {
      sortOrderIconVariant: "alpha",
    }),
    numPassengers: createColumnConfig((item) => item.numPassengers, {
      renderCell: createStandardEditableTextCell(),
      isEditable: true,
      onChange: () => {},
      justifyContentHeader: "flex-end",
      justifyContentCell: "flex-end",
      sortOrderIconVariant: "numeric",
    }),
    departure: createColumnConfig((item) => item.departure, {
      itemLabelFormatter: (value) => format(value, "yyyy-MM-dd"),
      borderLeft: true,
    }),
  },
  columnOrder: ["id", "active", "name", "ship", "numPassengers", "departure"],
};

export const mockedItems = createItemsMocks();

export const useListState = (initialItems: Array<ListItem>) => {
  const [items, setItems] = useState(initialItems);

  const onChangeNumPassengers = useCallback(
    (item: ListItem, numPassengers: string | undefined) => {
      setItems(
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
