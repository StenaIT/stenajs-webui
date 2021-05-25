import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import {
  Box,
  Column,
  Heading,
  Space,
  Spacing,
  Text,
} from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { CheckboxWithLabel, TextInput } from "@stenajs-webui/forms";
import { cssColor } from "@stenajs-webui/theme";
import { addDays, format } from "date-fns";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  StandardTable,
  StandardTableVariant,
} from "../components/StandardTable";
import { createColumnConfig } from "../config/StandardTableColumnConfig";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { createStandardEditableTextCell } from "../helpers/cell-renderers/editable-text-cell/EditableTextCell";
import { createEditableTextCellWithStatus } from "../helpers/cell-renderers/editable-text-cell/EditableTextCellWithStatus";

export default {
  title: "grid/StandardTable",
};

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

const standardTableConfigForStories: StandardTableConfig<
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

const mockedItems = createItemsMocks();

const useListState = (initialItems: Array<ListItem>) => {
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

export const SortingDisabled = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const SortingDisabledAndSortByName = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const SortingEnabledAndSortByNameDesc = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const FieldError = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const FieldLoading = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const ModifiedFields = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const WarningWhenModifiedFieldIsEmpty = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<ListItem, keyof ListItem> = {
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

export const MissingItemsCustomBanner = () => (
  <StandardTable
    items={[]}
    config={standardTableConfigForStories}
    noItemsHeader={"There are no users."}
    noItemsLabel={"Change filter settings to widen the search."}
    noItemsContentRight={<FlatButton label={"Open filter"} />}
  />
);

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
    <Box style={{ maxHeight: "220px", overflowY: "scroll" }}>
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

export const GroupedColumns = () => {
  const [showId, setShowId] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showShip, setShowShip] = useState(true);
  const [showNumPassengers, setShowNumPassengers] = useState(true);
  const [showDeparture, setShowDeparture] = useState(true);

  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const infoColumnOrder: Array<keyof ListItem> = [];
  if (showId) {
    infoColumnOrder.push("id");
  }
  if (showActive) {
    infoColumnOrder.push("active");
  }
  if (showName) {
    infoColumnOrder.push("name");
  }

  const passengersColumnOrder: Array<keyof ListItem> = [];
  if (showShip) {
    passengersColumnOrder.push("ship");
  }
  if (showNumPassengers) {
    passengersColumnOrder.push("numPassengers");
  }
  if (showDeparture) {
    passengersColumnOrder.push("departure");
  }

  const config: StandardTableConfig<
    ListItem,
    keyof ListItem,
    "info" | "passengers"
  > = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: true,
    showRowCheckbox: true,
    enableExpandCollapse: true,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        isEditable: false,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
      },
    },
    columnGroups: {
      info: {
        borderLeft: true,
        label: "Information",
        columnOrder: infoColumnOrder,
        contentLeft: <FlatButton size={"small"} leftIcon={faAngleLeft} />,
        contentRight: <FlatButton size={"small"} leftIcon={faAngleRight} />,
        loading: true,
      },
      passengers: {
        borderLeft: true,
        label: "Passengers",
        columnOrder: passengersColumnOrder,
        loading: true,
      },
    },
    columnOrder: undefined,
    columnGroupOrder: ["info", "passengers"],
  };

  return (
    <Column>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
      <Spacing />
      <CheckboxWithLabel
        value={showId}
        onValueChange={setShowId}
        label={"Include id"}
      />
      <Space />
      <CheckboxWithLabel
        value={showActive}
        onValueChange={setShowActive}
        label={"Include active"}
      />
      <Space />
      <CheckboxWithLabel
        value={showName}
        onValueChange={setShowName}
        label={"Include name"}
      />
      <Spacing />
      <CheckboxWithLabel
        value={showShip}
        onValueChange={setShowShip}
        label={"Include ship"}
      />
      <Space />
      <CheckboxWithLabel
        value={showNumPassengers}
        onValueChange={setShowNumPassengers}
        label={"Include num passengers"}
      />
      <Space />
      <CheckboxWithLabel
        value={showDeparture}
        onValueChange={setShowDeparture}
        label={"Include departure"}
      />
    </Column>
  );
};

export const GroupedColumnsAndSticky = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<
    ListItem,
    keyof ListItem,
    "info" | "passengers"
  > = {
    ...standardTableConfigForStories,
    showHeaderCheckbox: false,
    showRowCheckbox: false,
    stickyHeader: true,
    headerRowOffsetTop: "40px",
    rowBackgroundResolver: (item) =>
      item.active ? cssColor("--lhds-color-green-100") : undefined,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
        sticky: true,
        left: "0",
        backgroundResolver: (item) =>
          item.active ? cssColor("--lhds-color-orange-100") : undefined,
      },
      numPassengers: {
        ...standardTableConfigForStories.columns.numPassengers,
        isEditable: false,
        renderCell: undefined,
        onChange: onChangeNumPassengers,
      },
    },
    columnGroups: {
      info: {
        label: "Information",
        columnOrder: ["id", "active", "name"],
      },
      passengers: {
        borderLeft: true,
        label: "Passengers",
        columnOrder: ["ship", "numPassengers", "departure"],
      },
    },
    columnOrder: undefined,
    columnGroupOrder: ["info", "passengers"],
  };

  return (
    <Box style={{ maxHeight: "200px", maxWidth: "80%", overflow: "scroll" }}>
      <Box style={{ width: "100vw" }}>
        <StandardTable items={items} config={config} />
      </Box>
    </Box>
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
