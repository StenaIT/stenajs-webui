import { EntityWithId } from "../../../common/EntityWithId";
import { EntityByIdState } from "./entity-by-id-reducer";

export interface EntityByIdSelectors<
  TStoreState,
  TEntity extends EntityWithId
> {
  getState: EntityByIdStateSelector<TStoreState, TEntity>;
}

export type EntityByIdStateSelector<
  TStoreState,
  TEntity extends EntityWithId
> = (state: TStoreState) => EntityByIdState<TEntity>;

export const createEntityByIdSelectors = <
  TStoreState,
  TEntity extends EntityWithId
>(
  stateSelector: EntityByIdStateSelector<TStoreState, TEntity>
): EntityByIdSelectors<TStoreState, TEntity> => ({
  getState: stateSelector,
});
