import { SortOrderByIdState } from "./sort-order-by-id-reducer";

interface SortOrderByIdSelectors<TStoreState> {
  getSortOrderByIdState: (state: TStoreState) => SortOrderByIdState;
  getSortOrder: (state: TStoreState) => Array<string> | undefined;
}

type SortOrderByIdStateProvider<TStoreState> = (
  state: TStoreState,
) => SortOrderByIdState;

export const createSortOrderByIdSelectors = <TStoreState>(
  rootStateProvider: SortOrderByIdStateProvider<TStoreState>,
): SortOrderByIdSelectors<TStoreState> => {
  return {
    getSortOrderByIdState: (state) => {
      return rootStateProvider(state);
    },
    getSortOrder: (state) => {
      return rootStateProvider(state).ids;
    },
  };
};
