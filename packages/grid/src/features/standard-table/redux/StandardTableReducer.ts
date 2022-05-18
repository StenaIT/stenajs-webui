import {
  createEntityReducer,
  createSelectedIdsReducer,
  createSelectedIdsReducerInitialState,
  createSortOrderReducer,
  createSortOrderReducerInitialState,
  EntityState,
  reducerIdGate,
  SelectedIdsState,
  SortOrderState,
} from "@stenajs-webui/redux";
import { getReducerIdFor } from "./ReducerIdFactory";
import { combineReducers, Reducer } from "redux";
import { StandardTableAction } from "../util/ActionsFactory";

export interface StandardTableState<TColumnKey extends string> {
  sortOrder: SortOrderState<TColumnKey>;
  selectedIds: SelectedIdsState;
  expandedRows: SelectedIdsState;
  fields: EntityState<StandardTableStateFields>;
}

export interface StandardTableStateFields {
  lastSelectedId?: string;
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
  fields: { lastSelectedId: undefined },
});

export type StandardTableReducer<TColumnKey extends string> = Reducer<
  StandardTableState<TColumnKey>,
  StandardTableAction<TColumnKey>
>;

export const createStandardTableReducer = <TColumnKey extends string>(
  reducerId: string,
  initialState?: Partial<StandardTableState<TColumnKey>>
): StandardTableReducer<TColumnKey> => {
  const sortOrder = reducerIdGate(
    getReducerIdFor(reducerId, "sortOrder"),
    createSortOrderReducer<TColumnKey>(initialState?.sortOrder)
  );
  const selectedIds = reducerIdGate(
    getReducerIdFor(reducerId, "selectedIds"),
    createSelectedIdsReducer(initialState?.selectedIds)
  );
  const expandedRows = reducerIdGate(
    getReducerIdFor(reducerId, "expandedRows"),
    createSelectedIdsReducer(initialState?.expandedRows)
  );
  const fields = reducerIdGate(
    getReducerIdFor(reducerId, "fields"),
    createEntityReducer<StandardTableStateFields>(initialState?.fields ?? {})
  );

  return combineReducers({
    sortOrder,
    selectedIds,
    expandedRows,
    fields,
  });
};
