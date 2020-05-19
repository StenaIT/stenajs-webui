import {
  createSelectedIdsActions,
  createSelectedIdsSelectors,
  createSortOrderActions,
  createSortOrderSelectors,
  SelectedIdsActions,
  SelectedIdsSelectors,
  SortOrderActions,
  SortOrderSelectors
} from "@stenajs-webui/redux";
import { StandardTableState } from "./StandardTableReducer";

export interface StandardTableActionsAndSelectors<TStoreState, TColumnKey> {
  actions: {
    sortOrder: SortOrderActions<TColumnKey>;
    selectedIds: SelectedIdsActions;
  };
  selectors: {
    sortOrder: SortOrderSelectors<TStoreState, TColumnKey>;
    selectedIds: SelectedIdsSelectors<TStoreState>;
  };
}

export type StandardTableStateSelector<TStoreState, TColumnKey> = (
  state: TStoreState
) => StandardTableState<TColumnKey>;

export const createStandardTableActionsAndSelectors = <TStoreState, TColumnKey>(
  reducerId: string,
  stateSelector: StandardTableStateSelector<TStoreState, TColumnKey>
): StandardTableActionsAndSelectors<TStoreState, TColumnKey> => ({
  actions: {
    sortOrder: createSortOrderActions<TColumnKey>(reducerId),
    selectedIds: createSelectedIdsActions(reducerId)
  },
  selectors: {
    sortOrder: createSortOrderSelectors<TStoreState, TColumnKey>(
      state => stateSelector(state).sortOrder
    ),
    selectedIds: createSelectedIdsSelectors<TStoreState>(
      state => stateSelector(state).selectedIds
    )
  }
});
