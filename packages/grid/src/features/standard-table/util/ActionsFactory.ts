import { InternalStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  ReducerIdGateAction,
  SelectedIdsAction,
  SortOrderAction
} from "@stenajs-webui/redux";
import { getReducerIdFor } from "../redux/ReducerIdFactory";

export type StandardTableAction<TColumnKey> =
  | ReducerIdGateAction<SelectedIdsAction>
  | ReducerIdGateAction<SortOrderAction<TColumnKey>>;

export interface StandardTableActions<TColumnKey> {
  selectByIds: (ids: Array<string>) => StandardTableAction<TColumnKey>;
  clearSelection: () => StandardTableAction<TColumnKey>;
  expandByIds: (ids: Array<string>) => StandardTableAction<TColumnKey>;
  collapseAll: () => StandardTableAction<TColumnKey>;
  sortBy: (
    columnId: TColumnKey,
    desc?: boolean
  ) => StandardTableAction<TColumnKey>;
  clearSortOrder: () => StandardTableAction<TColumnKey>;
}

export const createStandardTableActions = <TColumnKey extends string>(
  tableId: string,
  actions: InternalStandardTableActions<TColumnKey>
): StandardTableActions<TColumnKey> => {
  return {
    selectByIds: ids => ({
      reducerId: getReducerIdFor(tableId, "selectedIds"),
      action: actions.selectedIds.setSelectedIds(ids)
    }),
    clearSelection: () => ({
      reducerId: getReducerIdFor(tableId, "selectedIds"),
      action: actions.selectedIds.clearSelectedIds()
    }),
    expandByIds: ids => ({
      reducerId: getReducerIdFor(tableId, "expandedRows"),
      action: actions.expandedRows.setSelectedIds(ids)
    }),
    collapseAll: () => ({
      reducerId: getReducerIdFor(tableId, "expandedRows"),
      action: actions.expandedRows.clearSelectedIds()
    }),
    sortBy: (columnId: TColumnKey, desc?: boolean) => ({
      reducerId: getReducerIdFor(tableId, "sortOrder"),
      action: actions.sortOrder.sortBy(columnId, desc ?? false)
    }),
    clearSortOrder: () => ({
      reducerId: getReducerIdFor(tableId, "sortOrder"),
      action: actions.sortOrder.clearSortOrder()
    })
  };
};
