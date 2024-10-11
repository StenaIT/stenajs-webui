import { EntityListState } from "./entity-list-reducer";

export interface EntityListSelectors<TStoreState, TEntity> {
  getList: (store: TStoreState) => Array<TEntity>;
}

export type EntityListSelector<TStoreState, TEntity> = (
  state: TStoreState,
) => EntityListState<TEntity>;

export const createEntityListSelectors = <TStoreState, TEntity>(
  stateSelector: EntityListSelector<TStoreState, TEntity>,
): EntityListSelectors<TStoreState, TEntity> => ({
  getList: (store) => stateSelector(store),
});
