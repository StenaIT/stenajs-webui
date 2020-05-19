import { Reducer } from "redux";
import { EntityWithId } from "../../common/EntityWithId";
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
  EntityByIdSelectors
} from "../entity-by-id-reducer/entity-by-id-selectors";

export type ModifiedFieldState = EntityByIdState<ModifiedFieldItemState>;

export interface ModifiedFieldItemState extends EntityWithId {
  modified?: boolean;
  originalValue?: string;
  newValue?: string;
}

export type ModifiedFieldsActions = EntityByIdActions<ModifiedFieldItemState>;

export type ModifiedFieldsSelectors<TStoreState> = EntityByIdSelectors<
  TStoreState,
  ModifiedFieldItemState
>;

export type ModifiedStateSelector<TStoreState> = (
  state: TStoreState
) => ModifiedFieldState;

type ModifiedStateReducer = Reducer<
  ModifiedFieldState,
  EntityByIdAction<ModifiedFieldItemState>
>;

export interface ModifiedFieldsRedux<TStoreState> {
  reducer: ModifiedStateReducer;
  selectors: ModifiedFieldsSelectors<TStoreState>;
  actions: ModifiedFieldsActions;
}

export const createModifiedStateRedux = <TStoreState>(
  reducerId: string,
  stateSelector: ModifiedStateSelector<TStoreState>
): ModifiedFieldsRedux<TStoreState> => {
  const reducer = createEntityByIdReducer<ModifiedFieldItemState>(reducerId);

  const selectors: ModifiedFieldsSelectors<TStoreState> = createEntityByIdSelectors<
    TStoreState,
    ModifiedFieldItemState
  >(stateSelector);

  const actions = createEntityByIdActions<ModifiedFieldItemState>(reducerId);

  return {
    reducer,
    selectors,
    actions
  };
};
