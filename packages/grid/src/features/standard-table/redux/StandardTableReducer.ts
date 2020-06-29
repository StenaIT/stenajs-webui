import {
  createSelectedIdsReducer,
  createSelectedIdsReducerInitialState,
  createSortOrderReducer,
  createSortOrderReducerInitialState,
  reducerIdGate,
  ReducerIdGateReducer,
  SelectedIdsState,
  SortOrderState
} from "@stenajs-webui/redux";
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

export type StandardTableReducer<
  TColumnKey extends string
> = ReducerIdGateReducer<
  StandardTableState<TColumnKey>,
  StandardTableAction<TColumnKey>
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

  return (state, action) => {
    return {
      ...state,
      sortOrder: sortOrder(state.sortOrder, action as any),
      selectedIds: selectedIds(state.selectedIds, action as any),
      expandedRows: expandedRows(state.expandedRows, action as any)
    };
  };
};
