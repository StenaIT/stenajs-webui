import {
  createSelectedIdsReducer,
  createSelectedIdsReducerInitialState,
  createSortOrderReducer,
  createSortOrderReducerInitialState,
  SelectedIdsState,
  SortOrderState
} from "@stenajs-webui/redux";
import { combineReducers, Reducer } from "redux";
import { StandardTableAction } from "./StandardTableActionsAndSelectors";
import { getReducerIdFor } from "./ReducerIdFactory";

export interface StandardTableState<TColumnKey extends string> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
  expandedRows: SelectedIdsState;
}

export const createStandardTableInitialState = <TColumnKey extends string>(
  sortBy: TColumnKey | undefined = undefined,
  desc: boolean = false
): StandardTableState<TColumnKey> => ({
  sortOrder: createSortOrderReducerInitialState(sortBy, desc),
  selectedIds: createSelectedIdsReducerInitialState(),
  expandedRows: createSelectedIdsReducerInitialState()
});

export type StandardTableReducer<TColumnKey extends string> = Reducer<
  StandardTableState<TColumnKey>,
  StandardTableAction<TColumnKey>
>;

export const createStandardTableReducer = <TColumnKey extends string>(
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
