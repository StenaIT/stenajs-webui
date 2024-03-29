import { Box, Column, Space, Spacing, Text } from "@stenajs-webui/core";
import {
  FlatButton,
  stenaAngleLeft,
  stenaAngleRight,
} from "@stenajs-webui/elements";
import { CheckboxWithLabel } from "@stenajs-webui/forms";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { useState } from "react";
import { StandardTable } from "../components/StandardTable";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  ListItem,
  mockedItems,
  standardTableConfigForStories,
  useListState,
} from "./StandardTableStoryHelper";

export default {
  title: "grid/StandardTable/GroupedColumns",
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
        contentLeft: <FlatButton size={"small"} leftIcon={stenaAngleLeft} />,
        contentRight: <FlatButton size={"small"} leftIcon={stenaAngleRight} />,
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

export const GroupedColumnsAndStickyHeader = () => {
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
    rowBackgroundResolver: (item) =>
      item.active ? cssColor("--lhds-color-green-100") : undefined,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
        width: "245px",
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

export const GroupedColumnsAndStickyConfiguration = () => {
  const { items, onChangeNumPassengers } = useListState(mockedItems);

  const config: StandardTableConfig<
    ListItem,
    keyof ListItem,
    "info" | "passengers"
  > = {
    ...standardTableConfigForStories,
    stickyHeader: true,
    headerRowOffsetTop: "20px",
    rowBackgroundResolver: (item) =>
      item.active ? cssColor("--lhds-color-green-100") : undefined,
    columns: {
      ...standardTableConfigForStories.columns,
      id: {
        ...standardTableConfigForStories.columns.id,
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
    <Box style={{ maxHeight: "220px", overflowY: "scroll" }}>
      <Box
        style={{
          height: 20,
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
