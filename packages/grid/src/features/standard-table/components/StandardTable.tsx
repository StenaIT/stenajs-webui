import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableActionsContext,
  StandardTableConfigContext,
  StandardTableStateContext,
  TableContext
} from "../context/StandardTableStateContext";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeadRow } from "./StandardTableHeadRow";

export interface StandardTableProps<TItem, TColumnKey extends string> {
  /**
   * Config for the table. Required.
   */
  config: StandardTableConfig<TItem, TColumnKey>;
  /**
   * Items to list in the table.
   */
  items?: Array<TItem>;
  error?: Error;
  loading?: boolean;
  /**
   * Message displayed when there are no items to display, and it is not loading or has error.
   */
  noItemsLabel?: string;
  /**
   * Message displayed when there is an error.
   */
  errorLabel?: string;
  /**
   * TableContext, containing state, actions and dispatch. Makes it possible to connect Redux.
   * This is optional and falls back to internal useReducer if omitted.
   */
  tableContext?: TableContext<TColumnKey>;
}

export const StandardTable = function StandardTable<
  TItem,
  TColumnKey extends string
>({ tableContext, config, ...props }: StandardTableProps<TItem, TColumnKey>) {
  const { tableContext: localTableContext } = useLocalStateTableContext();

  const currentTableContext = tableContext || localTableContext;

  const { state, actions, dispatch } = currentTableContext;

  const actionsContext = useMemo(() => {
    return {
      actions,
      dispatch
    };
  }, [actions, dispatch]);

  return (
    <Box>
      <StandardTableStateContext.Provider value={state}>
        <StandardTableActionsContext.Provider value={actionsContext}>
          <StandardTableConfigContext.Provider value={config}>
            <StandardTableHeadRow items={props.items} />
            <StandardTableContent {...props} />
          </StandardTableConfigContext.Provider>
        </StandardTableActionsContext.Provider>
      </StandardTableStateContext.Provider>
    </Box>
  );
};
