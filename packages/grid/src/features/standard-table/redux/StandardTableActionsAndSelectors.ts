import {
  createEntityActions,
  createSelectedIdsActions,
  createSortOrderActions,
  EntityActions,
  EntitySelectors,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderActions,
  SortOrderSelectors,
} from "@stenajs-webui/redux";
import { StandardTableStateFields } from "./StandardTableReducer";

export interface InternalStandardTableActions<TColumnKey extends string> {
  sortOrder: SortOrderActions<TColumnKey>;
  selectedIds: SelectedIdsActions;
  expandedRows: SelectedIdsActions;
  fields: EntityActions<StandardTableStateFields>;
}

export interface StandardTableSelectors<
  TStoreState,
  TColumnKey extends string
> {
  sortOrder: SortOrderSelectors<TStoreState, TColumnKey>;
  selectedIds: SelectedIdsSelectors<TStoreState>;
  expandedRows: SelectedIdsSelectors<TStoreState>;
  fields: EntitySelectors<TStoreState, StandardTableStateFields>;
}

export interface StandardTableActionsAndSelectors<
  TStoreState,
  TColumnKey extends string
> {
  actions: InternalStandardTableActions<TColumnKey>;
  selectors: StandardTableSelectors<TStoreState, TColumnKey>;
}

export const createInternalStandardTableActions = <
  TColumnKey extends string
>(): InternalStandardTableActions<TColumnKey> => ({
  sortOrder: createSortOrderActions<TColumnKey>(),
  selectedIds: createSelectedIdsActions(),
  expandedRows: createSelectedIdsActions(),
  fields: createEntityActions<StandardTableStateFields>(),
});
