import { Box, useDomId } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { useMemo } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { GroupConfigsForRowsContext } from "../context/GroupConfigsForRowsContext";
import { OnKeyDownContext } from "../context/OnKeyDownContext";
import {
  StandardTableColumnGroupOrderContext,
  StandardTableUsingColumnGroupsContext,
} from "../context/StandardTableColumnOrderContext";
import {
  StandardTableActionsContext,
  StandardTableConfigContext,
  StandardTableInternalActionsContext,
  StandardTableStateContext,
  StandardTableTableIdContext,
  TableContext,
} from "../context/StandardTableStateContext";
import { StandardTableVariantContext } from "../context/StandardTableVariantContext";
import { createColumnConfigsForRows } from "../features/column-groups/ColumnGroupFactory";
import { ColumnGroupRow } from "../features/column-groups/ColumnGroupRow";
import { calculateColumnIndexPerColumnId } from "../features/column-index-per-column-id/ColumnIndexCalculator";
import { ColumnIndexPerColumnIdContext } from "../features/column-index-per-column-id/ColumnIndexPerColumnIdContext";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { createStandardTableInitialState } from "../redux/StandardTableReducer";
import { StandardTableOnKeyDown } from "../types/StandardTableOnKeyDown";
import styles from "./StandardTable.module.css";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeadRow } from "./StandardTableHeadRow";

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

  /**
   * onKeyDown for the table. First argument is the event, second argument is
   * an object that contains columnId and item for the focused cell.
   */
  onKeyDown?: StandardTableOnKeyDown<TItem, TColumnKey>;
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
  onKeyDown,
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

  const columnIndexPerColumnId = useMemo(
    () => calculateColumnIndexPerColumnId(config),
    [groupConfigsForRows]
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
                  <ColumnIndexPerColumnIdContext.Provider
                    value={columnIndexPerColumnId}
                  >
                    <StandardTableUsingColumnGroupsContext.Provider
                      value={usingColumnGroups}
                    >
                      <StandardTableColumnGroupOrderContext.Provider
                        value={
                          columnGroupOrder ?? config.columnGroupOrder ?? []
                        }
                      >
                        <OnKeyDownContext.Provider value={onKeyDown}>
                          {(columnGroupOrder || config.columnGroupOrder) && (
                            <ColumnGroupRow
                              height={"var(--current-row-height)"}
                            />
                          )}
                          <StandardTableHeadRow
                            items={props.items}
                            height={"var(--current-row-height)"}
                          />
                          <StandardTableContent variant={variant} {...props} />
                        </OnKeyDownContext.Provider>
                      </StandardTableColumnGroupOrderContext.Provider>
                    </StandardTableUsingColumnGroupsContext.Provider>
                  </ColumnIndexPerColumnIdContext.Provider>
                </GroupConfigsForRowsContext.Provider>
              </StandardTableConfigContext.Provider>
            </StandardTableActionsContext.Provider>
          </StandardTableStateContext.Provider>
        </StandardTableTableIdContext.Provider>
      </StandardTableVariantContext.Provider>
    </Box>
  );
};
