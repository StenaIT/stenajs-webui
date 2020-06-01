import {
  createSelectedIdsReducer,
  createSortOrderReducer,
  selectedIdsReducerInitialState,
  SelectedIdsState,
  sortOrderReducerInitialState,
  SortOrderState
} from "@stenajs-webui/redux";
import { combineReducers, Reducer } from "redux";
import { StandardTableAction } from "./StandardTableActionsAndSelectors";
import { getReducerIdFor } from "./ReducerIdFactory";

export interface StandardTableState<TColumnKey> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
  expandedRows: SelectedIdsState;
}

export const standardTableInitialState = {
  sortOrder: sortOrderReducerInitialState,
  selectedIds: selectedIdsReducerInitialState,
  expandedRows: selectedIdsReducerInitialState
};

export type StandardTableReducer<TColumnKey> = Reducer<
  StandardTableState<TColumnKey>,
  StandardTableAction<TColumnKey>
>;

export const createStandardTableReducer = <TColumnKey>(
  reducerId: string
): StandardTableReducer<TColumnKey> => {
  const sortOrder = createSortOrderReducer<TColumnKey>(
    getReducerIdFor(reducerId, "sortOrder")
  );
  const selectedIds = createSelectedIdsReducer(
    getReducerIdFor(reducerId, "selectedIds")
  );
  const expandedRows = createSelectedIdsReducer(
    getReducerIdFor(reducerId, "expandedRows")
  );

  return combineReducers({
    sortOrder,
    selectedIds,
    expandedRows
  });
};
