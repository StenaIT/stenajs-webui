import {
  createSelectedIdsActions,
  createSelectedIdsSelectors,
  createSortOrderActions,
  createSortOrderSelectors,
  SelectedIdsAction,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderAction,
  SortOrderActions,
  SortOrderSelectors
} from "@stenajs-webui/redux";
import { StandardTableState } from "./StandardTableReducer";
import { getReducerIdFor } from "./ReducerIdFactory";

export interface StandardTableActions<TColumnKey> {
  sortOrder: SortOrderActions<TColumnKey>;
  selectedIds: SelectedIdsActions;
  expandedRows: SelectedIdsActions;
}

export interface StandardTableSelectors<TStoreState, TColumnKey> {
  sortOrder: SortOrderSelectors<TStoreState, TColumnKey>;
  selectedIds: SelectedIdsSelectors<TStoreState>;
  expandedRows: SelectedIdsSelectors<TStoreState>;
}

export interface StandardTableActionsAndSelectors<TStoreState, TColumnKey> {
  actions: StandardTableActions<TColumnKey>;
  selectors: StandardTableSelectors<TStoreState, TColumnKey>;
}

export type StandardTableAction<TColumnKey> =
  | SortOrderAction<TColumnKey>
  | SelectedIdsAction;

export type StandardTableStateSelector<TStoreState, TColumnKey> = (
  state: TStoreState
) => StandardTableState<TColumnKey>;

export const createStandardTableActions = <TColumnKey>(
  reducerId: string
): StandardTableActions<TColumnKey> => ({
  sortOrder: createSortOrderActions<TColumnKey>(
    getReducerIdFor(reducerId, "sortOrder")
  ),
  selectedIds: createSelectedIdsActions(
    getReducerIdFor(reducerId, "selectedIds")
  ),
  expandedRows: createSelectedIdsActions(
    getReducerIdFor(reducerId, "expandedRows")
  )
});

const createStandardTableSelectors = <TStoreState, TColumnKey>(
  stateSelector: StandardTableStateSelector<TStoreState, TColumnKey>
) => ({
  sortOrder: createSortOrderSelectors<TStoreState, TColumnKey>(
    state => stateSelector(state).sortOrder
  ),
  selectedIds: createSelectedIdsSelectors<TStoreState>(
    state => stateSelector(state).selectedIds
  ),
  expandedRows: createSelectedIdsSelectors<TStoreState>(
    state => stateSelector(state).expandedRows
  )
});

export const createStandardTableActionsAndSelectors = <TStoreState, TColumnKey>(
  reducerId: string,
  stateSelector: StandardTableStateSelector<TStoreState, TColumnKey>
): StandardTableActionsAndSelectors<TStoreState, TColumnKey> => ({
  actions: createStandardTableActions(reducerId),
  selectors: createStandardTableSelectors<TStoreState, TColumnKey>(
    stateSelector
  )
});
