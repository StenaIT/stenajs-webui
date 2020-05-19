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

export interface StandardTableState<TColumnKey> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
}

export const standardTableInitialState = {
  sortOrder: sortOrderReducerInitialState,
  selectedIds: selectedIdsReducerInitialState
};

export type StandardTableReducer<TColumnKey> = Reducer<
  StandardTableState<TColumnKey>,
  StandardTableAction<TColumnKey>
>;

export const createStandardTableReducer = <TColumnKey>(
  reducerId: string
): StandardTableReducer<TColumnKey> => {
  const sortOrder = createSortOrderReducer<TColumnKey>(reducerId);
  const selectedIds = createSelectedIdsReducer(reducerId);
  return combineReducers({
    sortOrder,
    selectedIds
  });
};
