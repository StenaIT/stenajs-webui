import { Reducer } from "redux";
import { EntityByIdAction } from "../entity-by-id-reducer/entity-by-id-actions";
import {
  createEntityByIdReducer,
  EntityByIdState,
} from "../entity-by-id-reducer/entity-by-id-reducer";
import {
  createEntityByIdSelectors,
  EntityByIdSelectors,
  EntityByIdStateSelector,
} from "../entity-by-id-reducer/entity-by-id-selectors";
import {
  createEntityByIdActions,
  EntityByIdActions,
} from "../entity-by-id-reducer/entity-by-id-action-creators";

export interface EntityCrudStatus extends CrudStatus {
  id: string;
}

export interface CrudStatus {
  loading?: boolean;
  creating?: boolean;
  updating?: boolean;
  modified?: boolean;
  deleting?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

export type EntityCrudStatusState = EntityByIdState<EntityCrudStatus>;
export type EntityCrudStatusAction = EntityByIdAction<EntityCrudStatus>;
export type EntityCrudStatusActions = EntityByIdActions<EntityCrudStatus>;

export interface EntityCrudStatusRedux<TStoreState> {
  reducer: EntityCrudStatusReducer;
  actions: EntityCrudStatusActions;
  selectors: EntityCrudStatusSelectors<TStoreState>;
}

export type EntityCrudStatusReducer = Reducer<
  EntityCrudStatusState,
  EntityByIdAction<EntityCrudStatus>
>;

export const createEntityCrudStatusReducer = () =>
  createEntityByIdReducer<EntityCrudStatus>();

export const createEntityCrudStatusActions = (): EntityCrudStatusActions =>
  createEntityByIdActions<EntityCrudStatus>();

export type EntityCrudStatusSelectors<TStoreState> = EntityByIdSelectors<
  TStoreState,
  EntityCrudStatus
>;

export const createEntityCrudStatusSelectors = <TStoreState>(
  stateSelector: EntityByIdStateSelector<TStoreState, EntityCrudStatus>
) => createEntityByIdSelectors<TStoreState, EntityCrudStatus>(stateSelector);

export const createEntityCrudStatusRedux = <TStoreState>(
  stateSelector: EntityByIdStateSelector<TStoreState, EntityCrudStatus>
): EntityCrudStatusRedux<TStoreState> => {
  const reducer = createEntityCrudStatusReducer();
  const actions = createEntityCrudStatusActions();
  const selectors = createEntityCrudStatusSelectors(stateSelector);
  return {
    reducer,
    actions,
    selectors,
  };
};
