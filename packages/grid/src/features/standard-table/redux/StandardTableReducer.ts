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
import { InternalStandardTableAction } from "./StandardTableActionsAndSelectors";
import { combineReducers, Reducer } from "redux";

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
  const fields = reducerIdGate(
    getReducerIdFor(reducerId, "fields"),
    createEntityReducer<StandardTableStateFields>({})
  );

  return combineReducers({
    sortOrder,
    selectedIds,
    expandedRows,
    fields,
  });
};
