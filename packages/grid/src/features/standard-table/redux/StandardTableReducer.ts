import {
  createEntityByIdReducer,
  createSelectedIdsReducer,
  createSortOrderReducer,
  entityByIdInitialState,
  EntityByIdState,
  selectedIdsReducerInitialState,
  SelectedIdsState,
  sortOrderReducerInitialState,
  SortOrderState
} from "@stenajs-webui/redux";
import { combineReducers, Reducer } from "redux";
import { StandardTableAction } from "./StandardTableActionsAndSelectors";

export interface ExpandedRowsStateItem {
  id: string;
  expanded: boolean;
}

export interface StandardTableState<TColumnKey> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
  expandedRows: EntityByIdState<ExpandedRowsStateItem>;
}

export const standardTableInitialState = {
  sortOrder: sortOrderReducerInitialState,
  selectedIds: selectedIdsReducerInitialState,
  expandedRows: entityByIdInitialState
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
  const expandedRows = createEntityByIdReducer<ExpandedRowsStateItem>(
    reducerId
  );
  return combineReducers({
    sortOrder,
    selectedIds,
    expandedRows
  });
};
