import { Reducer } from "redux";
import {
  createEntityByIdActions,
  EntityByIdAction,
  EntityByIdActions
} from "../entity-by-id-reducer/entity-by-id-actions";
import {
  createEntityByIdReducer,
  EntityByIdState
} from "../entity-by-id-reducer/entity-by-id-reducer";
import {
  createEntityByIdSelectors,
  EntityByIdSelectors,
  EntityByIdStateSelector
} from "../entity-by-id-reducer/entity-by-id-selectors";

export type EntityCrudStatusReducerState = EntityByIdState<EntityCrudStatus>;

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

export interface EntityCrudStatusRedux<TStoreState> {
  reducer: EntityCrudStatusReducer;
  actions: EntityCrudStatusActions;
  selectors: EntityCrudStatusSelectors<TStoreState>;
}

export type EntityCrudStatusReducer = Reducer<
  EntityCrudStatusReducerState,
  EntityByIdAction<EntityCrudStatus>
>;

export const createEntityCrudStatusReducer = (reducerId: string) =>
  createEntityByIdReducer<EntityCrudStatus>(reducerId);

export type EntityCrudStatusActions = EntityByIdActions<EntityCrudStatus>;

export const createEntityCrudStatusActions = (
  reducerId: string
): EntityCrudStatusActions =>
  createEntityByIdActions<EntityCrudStatus>(reducerId);

export type EntityCrudStatusSelectors<TStoreState> = EntityByIdSelectors<
  TStoreState,
  EntityCrudStatus
>;

export const createEntityCrudStatusSelectors = <TStoreState>(
  stateSelector: EntityByIdStateSelector<TStoreState, EntityCrudStatus>
) => createEntityByIdSelectors<TStoreState, EntityCrudStatus>(stateSelector);

export const createEntityCrudStatusRedux = <TStoreState>(
  reducerId: string,
  stateSelector: EntityByIdStateSelector<TStoreState, EntityCrudStatus>
): EntityCrudStatusRedux<TStoreState> => {
  const reducer = createEntityCrudStatusReducer(reducerId);
  const actions = createEntityCrudStatusActions(reducerId);
  const selectors = createEntityCrudStatusSelectors(stateSelector);
  return {
    reducer,
    actions,
    selectors
  };
};
