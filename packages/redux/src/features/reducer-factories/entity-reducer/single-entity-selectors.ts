import { SingleEntityState } from "./single-entity-reducer";

export interface SingleEntitySelectors<TStoreState, TEntity> {
  getState: SingleEntityStateSelector<TStoreState, TEntity>;
  getEntity: (state: TStoreState) => TEntity;
}

export type SingleEntityStateSelector<TStoreState, TEntity> = (
  state: TStoreState
) => SingleEntityState<TEntity>;

export const createSingleEntitySelectors = <TStoreState, TEntity>(
  stateSelector: SingleEntityStateSelector<TStoreState, TEntity>
): SingleEntitySelectors<TStoreState, TEntity> => ({
  getState: stateSelector,
  getEntity: state => stateSelector(state).entity
});
