import { useDomId } from "@stenajs-webui/core";
import { ErrorScreen } from "@stenajs-webui/panels";
import cx from "classnames";
import * as React from "react";
import { CSSProperties, ReactNode, useMemo } from "react";
import { StandardTableConfig } from "../config/StandardTableConfig";
import { GroupConfigsAndIdsForRowsContext } from "../context/GroupConfigsAndIdsForRowsContext";
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
import { StickyPropsPerColumnContext } from "../context/StickyPropsPerColumnContext";
import { TotalNumColumnsContext } from "../context/TotalNumColumnsContext";
import { createGroupConfigAndIdsForRows } from "../features/column-groups/ColumnGroupFactory";
import { ColumnGroupRow } from "../features/column-groups/ColumnGroupRow";
import { calculateColumnIndexPerColumnId } from "../features/column-index-per-column-id/ColumnIndexCalculator";
import { ColumnIndexPerColumnIdContext } from "../features/column-index-per-column-id/ColumnIndexPerColumnIdContext";
import { ensureConfigHasValidSticky } from "../features/sticky-columns/StickyColumnGroupValidator";
import { getStickyPropsPerColumn } from "../features/sticky-columns/StickyPropsPerColumnCalculator";
import { useLocalStateTableContext } from "../hooks/UseLocalStateTableContext";
import { createStandardTableInitialState } from "../redux/StandardTableReducer";
import { StandardTableOnKeyDown } from "../types/StandardTableOnKeyDown";
import { getTotalNumColumns } from "../util/ColumnCounter";
import styles from "./StandardTable.module.css";
import { StandardTableContent } from "./StandardTableContent";
import { StandardTableHeadRow } from "./StandardTableHeadRow";
import { ColGroups } from "./ColGroups";

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
   * Content right in banner shown when there are no items.
   */
  noItemsContentRight?: ReactNode;

  /**
   * Content bottom in banner shown when there are no items.
   */
  noItemsContentBottom?: ReactNode;

  /**
   * Header in banner shown when there are no items.
   */
  noItemsHeader?: string;

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
  const {
    initialSortOrderDesc,
    initialSortOrder,
    enableExpandCollapse,
    stickyCheckboxColumn,
  } = config;

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

  const usingColumnGroups = Boolean(
    columnGroupOrder ?? "columnGroupOrder" in config
  );

  const columnGroupsFromConfig =
    "columnGroups" in config ? config.columnGroups : undefined;
  const columnGroupOrderFromConfig =
    "columnGroupOrder" in config ? config.columnGroupOrder : undefined;
  const columnOrderFromConfig =
    "columnOrder" in config ? config.columnOrder : undefined;

  const groupConfigsForRows = useMemo(
    () =>
      createGroupConfigAndIdsForRows<TItem, TColumnKey, TColumnGroupKey>(
        columnGroupsFromConfig,
        columnGroupOrderFromConfig,
        columnOrderFromConfig
      ),
    [columnGroupsFromConfig, columnGroupOrderFromConfig, columnOrderFromConfig]
  );

  const columnIndexPerColumnId = useMemo(
    () => calculateColumnIndexPerColumnId(config),
    [config]
  );

  const totalNumColumns = useMemo(() => getTotalNumColumns(config), [config]);

  const stickyPropsPerColumnContext = useMemo(
    () => getStickyPropsPerColumn(config),
    [config]
  );

  const validationError = useMemo(() => {
    try {
      ensureConfigHasValidSticky(config);
      return undefined;
    } catch (e) {
      return e;
    }
  }, [config]);

  if (validationError) {
    return <ErrorScreen text={validationError.message} />;
  }

  return (
    <table
      className={cx(styles.standardTable, styles[variant])}
      style={
        {
          width: "100%",
          isolation: "isolate",
          "--current-left-offset":
            enableExpandCollapse && stickyCheckboxColumn
              ? "calc(var(--swui-expand-cell-width) + var(--swui-checkbox-cell-width))"
              : stickyCheckboxColumn
              ? "var(--swui-checkbox-cell-width)"
              : enableExpandCollapse
              ? "var(--swui-expand-cell-width)"
              : "0px",
        } as CSSProperties
      }
    >
      <StickyPropsPerColumnContext.Provider value={stickyPropsPerColumnContext}>
        <TotalNumColumnsContext.Provider value={totalNumColumns}>
          <StandardTableVariantContext.Provider value={variant}>
            <StandardTableTableIdContext.Provider
              value={tableId ?? generatedTableId}
            >
              <StandardTableStateContext.Provider value={state}>
                <StandardTableActionsContext.Provider value={actionsContext}>
                  <StandardTableConfigContext.Provider value={config}>
                    <GroupConfigsAndIdsForRowsContext.Provider
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
                              "columnGroupOrder" in config
                                ? columnGroupOrder ?? config.columnGroupOrder
                                : columnGroupOrder
                            }
                          >
                            <ColGroups />
                            <OnKeyDownContext.Provider value={onKeyDown}>
                              <thead>
                                {(columnGroupOrder ||
                                  "columnGroupOrder" in config) && (
                                  <ColumnGroupRow
                                    height={"var(--current-row-height)"}
                                  />
                                )}
                                <StandardTableHeadRow
                                  items={props.items}
                                  height={"var(--current-row-height)"}
                                />
                              </thead>
                              <StandardTableContent
                                variant={variant}
                                {...props}
                              />
                            </OnKeyDownContext.Provider>
                          </StandardTableColumnGroupOrderContext.Provider>
                        </StandardTableUsingColumnGroupsContext.Provider>
                      </ColumnIndexPerColumnIdContext.Provider>
                    </GroupConfigsAndIdsForRowsContext.Provider>
                  </StandardTableConfigContext.Provider>
                </StandardTableActionsContext.Provider>
              </StandardTableStateContext.Provider>
            </StandardTableTableIdContext.Provider>
          </StandardTableVariantContext.Provider>
        </TotalNumColumnsContext.Provider>
      </StickyPropsPerColumnContext.Provider>
    </table>
  );
};
