import { Box, useDomId } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import {
  StandardTableActionsContext,
  StandardTableConfigContext,
  StandardTableInternalActionsContext,
  StandardTableStateContext,
  StandardTableTableIdContext,
  TableContext,
} from "../context/StandardTableStateContext";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeadRow } from "./StandardTableHeadRow";
import { createStandardTableInitialState } from "../redux/StandardTableReducer";
import styles from "./StandardTable.module.css";
import cx from "classnames";
import { StandardTableVariantContext } from "../context/StandardTableVariantContext";
import {
  StandardTableColumnGroupOrderContext,
  StandardTableUsingColumnGroupsContext,
} from "../context/StandardTableColumnOrderContext";
import { ColumnGroupRow } from "./column-groups/ColumnGroupRow";
import { createColumnConfigsForRows } from "../util/ColumnGroupFactory";
import { GroupConfigsForRowsContext } from "../context/GroupConfigsForRowsContext";

export interface StandardTableProps<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
> {
  /**
   * Variant of table
   */
  variant?: StandardTableVariant;

  /**
   * The tableId, which is passed to useGridCell.
   * Optional, defaults to generated id.
   */
  tableId?: string;

  /**
   * Number that is added to rowIndex in useGridCell.
   * This makes it possible to navigate between two tables, when used in combination
   * with tableId.
   */
  rowIndexOffset?: number;

  /**
   * Number that is added to colIndex in useGridCell.
   * This makes it possible to navigate between two tables, when used in combination
   * with tableId.
   */
  colIndexOffset?: number;

  /**
   * Config for the table. Required.
   */
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>;

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

  /**
   * The order of columns. If set, it overrides the order set in the config.
   */
  columnOrder?: Array<TColumnKey>;

  /**
   * The order of column groups. If set, it overrides the order set in the config.
   */
  columnGroupOrder?: Array<TColumnGroupKey>;
}

export type StandardTableVariant =
  | "relaxed"
  | "standard"
  | "condensed"
  | "compact";

export const StandardTable = function StandardTable<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  tableContext,
  config,
  columnOrder,
  columnGroupOrder,
  tableId,
  variant = "standard",
  ...props
}: StandardTableProps<TItem, TColumnKey, TColumnGroupKey>) {
  const generatedTableId = useDomId();
  const { initialSortOrderDesc, initialSortOrder } = config;

  const { tableContext: localTableContext } = useLocalStateTableContext(
    tableId ?? generatedTableId,
    createStandardTableInitialState(initialSortOrder, initialSortOrderDesc)
  );

  const currentTableContext = tableContext || localTableContext;

  const { state, actions, dispatch } = currentTableContext;

  const actionsContext = useMemo<
    StandardTableInternalActionsContext<TColumnKey>
  >(() => {
    return {
      actions,
      dispatch,
    };
  }, [actions, dispatch]);

  const usingColumnGroups = !!(columnGroupOrder ?? config.columnGroupOrder);

  const groupConfigsForRows = useMemo(
    () =>
      createColumnConfigsForRows<TItem, TColumnKey, TColumnGroupKey>(
        config.columnGroups,
        config.columnGroupOrder,
        config.columnOrder
      ),
    [config.columnGroups, config.columnGroupOrder, config.columnOrder]
  );

  return (
    <Box className={cx(styles.standardTable, styles[variant])}>
      <StandardTableVariantContext.Provider value={variant}>
        <StandardTableTableIdContext.Provider
          value={tableId ?? generatedTableId}
        >
          <StandardTableStateContext.Provider value={state}>
            <StandardTableActionsContext.Provider value={actionsContext}>
              <StandardTableConfigContext.Provider value={config}>
                <GroupConfigsForRowsContext.Provider
                  value={groupConfigsForRows}
                >
                  <StandardTableUsingColumnGroupsContext.Provider
                    value={usingColumnGroups}
                  >
                    <StandardTableColumnGroupOrderContext.Provider
                      value={columnGroupOrder ?? config.columnGroupOrder ?? []}
                    >
                      {(columnGroupOrder || config.columnGroupOrder) && (
                        <ColumnGroupRow height={"var(--current-row-height)"} />
                      )}
                      <StandardTableHeadRow
                        items={props.items}
                        height={"var(--current-row-height)"}
                      />
                      <StandardTableContent variant={variant} {...props} />
                    </StandardTableColumnGroupOrderContext.Provider>
                  </StandardTableUsingColumnGroupsContext.Provider>
                </GroupConfigsForRowsContext.Provider>
              </StandardTableConfigContext.Provider>
            </StandardTableActionsContext.Provider>
          </StandardTableStateContext.Provider>
        </StandardTableTableIdContext.Provider>
      </StandardTableVariantContext.Provider>
    </Box>
  );
};
