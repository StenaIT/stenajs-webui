import { StandardTable } from "@stenajs-webui/grid";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useMemo, useReducer } from "react";
import {
  createColumnConfig,
  StandardTableConfig
} from "../config/StandardTableConfig";
import {
  StandardTableContext,
  StandardValueContextValue
} from "../context/StandardTableContext";
import { createStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  createStandardTableReducer,
  standardTableInitialState,
  StandardTableReducer
} from "../redux/StandardTableReducer";

interface ListItem {
  id: string;
  active: boolean;
  name: string;
  ship: string;
}

const createConfig = (
  tableId: string
): StandardTableConfig<ListItem, keyof ListItem> => ({
  tableId,
  keyResolver: item => item.id,
  columns: {
    id: createColumnConfig(item => item.id),
    active: createColumnConfig(item => item.active),
    name: createColumnConfig(item => item.name),
    ship: createColumnConfig(item => item.ship)
  },
  columnOrder: ["id", "active", "name", "ship"]
});

interface StandardTableExampleProps {
  tableId: string;
}

const items: Array<ListItem> = [
  { id: "123", active: false, name: "Postnord", ship: "McBoat" },
  { id: "124", active: true, name: "Schenker", ship: "Boatface" },
  { id: "125", active: true, name: "Fedex", ship: "RoboBoat" },
  { id: "126", active: false, name: "UPS", ship: "Boatinator" },
  { id: "127", active: false, name: "DHL", ship: "Airplane" }
];

const StandardTableExample: React.FC<StandardTableExampleProps> = ({
  tableId
}) => {
  const [state, dispatch] = useReducer<StandardTableReducer<keyof ListItem>>(
    createStandardTableReducer(tableId),
    standardTableInitialState
  );

  const actions = useMemo(
    () => createStandardTableActions<keyof ListItem>(tableId),
    [tableId]
  );
  const config = useMemo(() => createConfig(tableId), [tableId]);

  const contextValue = useMemo<
    StandardValueContextValue<ListItem, keyof ListItem>
  >(
    () => ({
      dispatch,
      actions,
      state,
      config
    }),
    [state, actions, dispatch, config]
  );

  return (
    <StandardTableContext.Provider value={contextValue}>
      <StandardTable items={items} />
    </StandardTableContext.Provider>
  );
};

storiesOf("grid/StandardTable", module).add("standard", () => (
  <StandardTableExample tableId={"123"} />
));
