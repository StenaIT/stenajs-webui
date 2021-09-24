import { InternalStandardTableActions } from "../redux/StandardTableActionsAndSelectors";
import {
  EntityAction,
  reducerIdGateAction,
  ReducerIdGateAction,
  SelectedIdsAction,
  SortOrderAction,
} from "@stenajs-webui/redux";
import { getReducerIdFor } from "../redux/ReducerIdFactory";
import { StandardTableStateFields } from "../redux/StandardTableReducer";

export type StandardTableAction<TColumnKey> =
  | ReducerIdGateAction<SelectedIdsAction>
  | ReducerIdGateAction<SortOrderAction<TColumnKey>>
  | ReducerIdGateAction<EntityAction<StandardTableStateFields>>;

export interface StandardTableActions<TColumnKey> {
  setSelectedIds: (ids: Array<string>) => StandardTableAction<TColumnKey>;
  clearSelection: () => StandardTableAction<TColumnKey>;
  expandByIds: (ids: Array<string>) => StandardTableAction<TColumnKey>;
  collapseAll: () => StandardTableAction<TColumnKey>;
  sortBy: (
    columnId: TColumnKey,
    desc?: boolean
  ) => StandardTableAction<TColumnKey>;
  clearSortOrder: () => StandardTableAction<TColumnKey>;
  setLastSelectedId: (
    lastSelectedId: string
  ) => StandardTableAction<TColumnKey>;
}

export const createStandardTableActions = <TColumnKey extends string>(
  tableId: string,
  actions: InternalStandardTableActions<TColumnKey>
): StandardTableActions<TColumnKey> => {
  return {
    setSelectedIds: (ids) =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "selectedIds"),
        actions.selectedIds.setSelectedIds(ids)
      ),
    clearSelection: () =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "selectedIds"),
        actions.selectedIds.clearSelectedIds()
      ),
    expandByIds: (ids) =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "expandedRows"),
        actions.expandedRows.setSelectedIds(ids)
      ),
    collapseAll: () =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "expandedRows"),
        actions.expandedRows.clearSelectedIds()
      ),
    sortBy: (columnId: TColumnKey, desc?: boolean) =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "sortOrder"),
        actions.sortOrder.sortBy(columnId, desc ?? false)
      ),
    clearSortOrder: () =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "sortOrder"),
        actions.sortOrder.clearSortOrder()
      ),
    setLastSelectedId: (lastSelectedId: string) =>
      reducerIdGateAction(
        getReducerIdFor(tableId, "fields"),
        actions.fields.setEntityFields({ lastSelectedId })
      ),
  };
};
