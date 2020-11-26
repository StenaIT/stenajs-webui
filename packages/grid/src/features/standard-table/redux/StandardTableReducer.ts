import {
  createSelectedIdsReducer,
  createSelectedIdsReducerInitialState,
  createSortOrderReducer,
  createSortOrderReducerInitialState,
  reducerIdGate,
  SelectedIdsState,
  SortOrderState,
} from "@stenajs-webui/redux";
import { getReducerIdFor } from "./ReducerIdFactory";
import type { InternalStandardTableAction } from "./StandardTableActionsAndSelectors";
import { combineReducers, Reducer } from "redux";

export interface StandardTableState<TColumnKey extends string> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
  expandedRows: SelectedIdsState;
}

export const createStandardTableInitialState = <TColumnKey extends string>(
  sortBy: TColumnKey | undefined = undefined,
  desc: boolean = false,
  selectedIds: string[] = [],
  expandedRows: string[] = []
): StandardTableState<TColumnKey> => ({
  sortOrder: createSortOrderReducerInitialState(sortBy, desc),
  selectedIds: createSelectedIdsReducerInitialState(selectedIds),
  expandedRows: createSelectedIdsReducerInitialState(expandedRows),
});

export type StandardTableReducer<TColumnKey extends string> = Reducer<
  StandardTableState<TColumnKey>,
  InternalStandardTableAction<TColumnKey>
>;

export const createStandardTableReducer = <TColumnKey extends string>(
  reducerId: string
): StandardTableReducer<TColumnKey> => {
  const sortOrder = reducerIdGate(
    getReducerIdFor(reducerId, "sortOrder"),
    createSortOrderReducer<TColumnKey>()
  );
  const selectedIds = reducerIdGate(
    getReducerIdFor(reducerId, "selectedIds"),
    createSelectedIdsReducer()
  );
  const expandedRows = reducerIdGate(
    getReducerIdFor(reducerId, "expandedRows"),
    createSelectedIdsReducer()
  );

  return combineReducers({
    sortOrder,
    selectedIds,
    expandedRows,
  });
};
