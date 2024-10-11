import { EntityState } from "./entity-reducer";

export interface EntitySelectors<TStoreState, TEntity> {
  getEntity: (state: TStoreState) => TEntity;
}

export type EntityStateSelector<TStoreState, TEntity> = (
  state: TStoreState,
) => EntityState<TEntity>;

export const createEntitySelectors = <TStoreState, TEntity>(
  stateSelector: EntityStateSelector<TStoreState, TEntity>,
): EntitySelectors<TStoreState, TEntity> => ({
  getEntity: (state) => stateSelector(state),
});
