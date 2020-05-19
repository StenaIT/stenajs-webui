import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableContext,
  TableContext
} from "../context/StandardTableContext";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeader } from "./StandardTableHeader";

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

  const contextValue = useMemo(() => {
    const { actions, dispatch, state } = tableContext || localTableContext;
    return {
      actions,
      dispatch,
      state,
      config
    };
  }, [tableContext, localTableContext, config]);

  return (
    <Box>
      <StandardTableContext.Provider value={contextValue}>
        <StandardTableHeader items={props.items} />
        <StandardTableContent {...props} />
      </StandardTableContext.Provider>
    </Box>
  );
};
