import { Reducer } from "redux";
import { EntityWithId } from "../../../common/EntityWithId";
import { EntityByIdAction } from "../entity-by-id-reducer/entity-by-id-actions";
import {
  createEntityByIdActions,
  EntityByIdActions,
} from "../entity-by-id-reducer/entity-by-id-action-creators";
import {
  createEntityByIdReducer,
  EntityByIdState,
} from "../entity-by-id-reducer/entity-by-id-reducer";
import {
  createEntityByIdSelectors,
  EntityByIdSelectors,
} from "../entity-by-id-reducer/entity-by-id-selectors";

export interface ModifiedFieldItemState extends EntityWithId {
  modified?: boolean;
  originalValue?: string;
  newValue?: string;
}

export type ModifiedFieldState = EntityByIdState<ModifiedFieldItemState>;
export type ModifiedFieldAction = EntityByIdAction<ModifiedFieldItemState>;
export type ModifiedFieldActions = EntityByIdActions<ModifiedFieldItemState>;

export type ModifiedFieldsSelectors<TStoreState> = EntityByIdSelectors<
  TStoreState,
  ModifiedFieldItemState
>;

export type ModifiedFieldStateSelector<TStoreState> = (
  state: TStoreState
) => ModifiedFieldState;

export type ModifiedStateReducer = Reducer<
  ModifiedFieldState,
  ModifiedFieldAction
>;

export interface ModifiedFieldRedux<TStoreState> {
  reducer: ModifiedStateReducer;
  selectors: ModifiedFieldsSelectors<TStoreState>;
  actions: ModifiedFieldActions;
}

export const createModifiedFieldRedux = <TStoreState>(
  stateSelector: ModifiedFieldStateSelector<TStoreState>
): ModifiedFieldRedux<TStoreState> => {
  const reducer = createEntityByIdReducer<ModifiedFieldItemState>();

  const selectors: ModifiedFieldsSelectors<TStoreState> =
    createEntityByIdSelectors<TStoreState, ModifiedFieldItemState>(
      stateSelector
    );

  const actions = createEntityByIdActions<ModifiedFieldItemState>();

  return {
    reducer,
    selectors,
    actions,
  };
};
