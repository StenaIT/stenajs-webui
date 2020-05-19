import {
  createSelectedIdsReducer,
  createSortOrderReducer,
  SelectedIdsState,
  SortOrderState
} from "@stenajs-webui/redux";
import { combineReducers, Reducer } from "redux";
import { selectedIdsReducerInitialState } from "../../../../../redux/src/features/selected-ids-reducer/selected-ids-reducer";
import { sortOrderReducerInitialState } from "../../../../../redux/src/features/sort-order-reducer/sort-order-reducer";
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
