import { EntityListState } from "./entity-list-reducer";

export interface EntityListSelectors<TStoreState, TEntity> {
  getState: (store: TStoreState) => EntityListState<TEntity>;
  getList: (store: TStoreState) => Array<TEntity>;
}

export type EntityListSelector<TStoreState, TEntity> = (
  state: TStoreState
) => EntityListState<TEntity>;

export const createEntityListSelectors = <TStoreState, TEntity>(
  stateSelector: EntityListSelector<TStoreState, TEntity>
): EntityListSelectors<TStoreState, TEntity> => ({
  getState: stateSelector,
  getList: store => stateSelector(store).list
});
