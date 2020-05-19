import { combineReducers } from "redux";
import {
  createSelectedIdsReducer,
  SelectedIdsState
} from "@stenajs-webui/redux";
import { createSortOrderReducer, SortOrderState } from "@stenajs-webui/redux";

export interface StandardTableState<TColumnKey> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
}

export const createStandardTableReducer = <TColumnKey>(reducerId: string) => {
  const sortOrder = createSortOrderReducer<TColumnKey>(reducerId);
  const selectedIds = createSelectedIdsReducer(reducerId);
  return combineReducers({
    sortOrder,
    selectedIds
  });
};
