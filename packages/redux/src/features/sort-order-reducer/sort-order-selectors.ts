import { SortOrderState } from "./sort-order-reducer";

export interface SortOrderSelectors<TStoreState, TSortBy> {
  getState: SortOrderStateSelector<TStoreState, TSortBy>;
}

export type SortOrderStateSelector<TStoreState, TSortBy> = (
  state: TStoreState
) => SortOrderState<TSortBy>;

export const createSortOrderSelectors = <TStoreState, TSortBy>(
  stateProvider: SortOrderStateSelector<TStoreState, TSortBy>
): SortOrderSelectors<TStoreState, TSortBy> => ({
  getState: stateProvider
});
