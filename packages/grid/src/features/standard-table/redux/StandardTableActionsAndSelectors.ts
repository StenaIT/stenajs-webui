import {
  createEntityByIdActions,
  createEntityByIdSelectors,
  createSelectedIdsActions,
  createSelectedIdsSelectors,
  createSortOrderActions,
  createSortOrderSelectors,
  EntityByIdAction,
  EntityByIdActions,
  EntityByIdSelectors,
  SelectedIdsAction,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderAction,
  SortOrderActions,
  SortOrderSelectors
} from "@stenajs-webui/redux";
import {
  ExpandedRowsStateItem,
  StandardTableState
} from "./StandardTableReducer";

export interface StandardTableActions<TColumnKey> {
  sortOrder: SortOrderActions<TColumnKey>;
  selectedIds: SelectedIdsActions;
  expandedRows: EntityByIdActions<ExpandedRowsStateItem>;
}

export interface StandardTableSelectors<TStoreState, TColumnKey> {
  sortOrder: SortOrderSelectors<TStoreState, TColumnKey>;
  selectedIds: SelectedIdsSelectors<TStoreState>;
  expandedRows: EntityByIdSelectors<TStoreState, ExpandedRowsStateItem>;
}

export interface StandardTableActionsAndSelectors<TStoreState, TColumnKey> {
  actions: StandardTableActions<TColumnKey>;
  selectors: StandardTableSelectors<TStoreState, TColumnKey>;
}

export type StandardTableAction<TColumnKey> =
  | SortOrderAction<TColumnKey>
  | SelectedIdsAction
  | EntityByIdAction<ExpandedRowsStateItem>;

export type StandardTableStateSelector<TStoreState, TColumnKey> = (
  state: TStoreState
) => StandardTableState<TColumnKey>;

export const createStandardTableActions = <TColumnKey>(
  reducerId: string
): StandardTableActions<TColumnKey> => ({
  sortOrder: createSortOrderActions<TColumnKey>(reducerId),
  selectedIds: createSelectedIdsActions(reducerId),
  expandedRows: createEntityByIdActions<ExpandedRowsStateItem>(reducerId)
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
  expandedRows: createEntityByIdSelectors<TStoreState, ExpandedRowsStateItem>(
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
