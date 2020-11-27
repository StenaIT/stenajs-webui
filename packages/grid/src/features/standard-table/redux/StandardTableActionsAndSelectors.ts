import {
  createSelectedIdsActions,
  createSortOrderActions,
  ReducerIdGateAction,
  SelectedIdsAction,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderAction,
  SortOrderActions,
  SortOrderSelectors,
} from "@stenajs-webui/redux";
import { StandardTableState } from "./StandardTableReducer";

export interface InternalStandardTableActions<TColumnKey extends string> {
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
  actions: InternalStandardTableActions<TColumnKey>;
  selectors: StandardTableSelectors<TStoreState, TColumnKey>;
}

export type InternalStandardTableAction<TColumnKey extends string> =
  | ReducerIdGateAction<SortOrderAction<TColumnKey>>
  | ReducerIdGateAction<SelectedIdsAction>;

export type StandardTableStateSelector<
  TStoreState,
  TColumnKey extends string
> = (state: TStoreState) => StandardTableState<TColumnKey>;

export const createInternalStandardTableActions = <
  TColumnKey extends string
>(): InternalStandardTableActions<TColumnKey> => ({
  sortOrder: createSortOrderActions<TColumnKey>(),
  selectedIds: createSelectedIdsActions(),
  expandedRows: createSelectedIdsActions(),
});
