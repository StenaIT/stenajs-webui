import { EntityState } from "./entity-reducer";

export interface EntitySelectors<TStoreState, TEntity> {
  getState: EntityStateSelector<TStoreState, TEntity>;
  getEntity: (state: TStoreState) => TEntity;
}

export type EntityStateSelector<TStoreState, TEntity> = (
  state: TStoreState
) => EntityState<TEntity>;

export const createEntitySelectors = <TStoreState, TEntity>(
  stateSelector: EntityStateSelector<TStoreState, TEntity>
): EntitySelectors<TStoreState, TEntity> => ({
  getState: stateSelector,
  getEntity: state => stateSelector(state).entity
});
