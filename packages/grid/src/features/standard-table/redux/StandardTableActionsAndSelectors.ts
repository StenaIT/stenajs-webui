import {
  createSelectedIdsActions,
  createSortOrderActions,
  SelectedIdsAction,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderAction,
  SortOrderActions,
  SortOrderSelectors
} from "@stenajs-webui/redux";
import { StandardTableState } from "./StandardTableReducer";

export interface StandardTableActions<TColumnKey extends string> {
  sortOrder: SortOrderActions<TColumnKey>;
  selectedIds: SelectedIdsActions;
  expandedRows: SelectedIdsActions;
}

export interface StandardTableSelectors<
  TStoreState,
  TColumnKey extends string
> {
  sortOrder: SortOrderSelectors<TStoreState, TColumnKey>;
  selectedIds: SelectedIdsSelectors<TStoreState>;
  expandedRows: SelectedIdsSelectors<TStoreState>;
}

export interface StandardTableActionsAndSelectors<
  TStoreState,
  TColumnKey extends string
> {
  actions: StandardTableActions<TColumnKey>;
  selectors: StandardTableSelectors<TStoreState, TColumnKey>;
}

export type StandardTableAction<TColumnKey extends string> =
  | SortOrderAction<TColumnKey>
  | SelectedIdsAction;

export type StandardTableStateSelector<
  TStoreState,
  TColumnKey extends string
> = (state: TStoreState) => StandardTableState<TColumnKey>;

export const createStandardTableActions = <
  TColumnKey extends string
>(): StandardTableActions<TColumnKey> => ({
  sortOrder: createSortOrderActions<TColumnKey>(),
  selectedIds: createSelectedIdsActions(),
  expandedRows: createSelectedIdsActions()
});
