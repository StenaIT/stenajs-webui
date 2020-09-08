import {
  EntityListActionByFieldsMatchAction,
  EntityListActionByIndexAction,
  EntityListActionOnAllAction,
  EntityListAddAtEndAction,
  EntityListAddAtStartAction,
  EntityListClearListAction,
  EntityListRemoveAction,
  EntityListRemoveAtIndexAction,
  EntityListRemoveByFieldMatchAction,
  EntityListRemoveFirstAction,
  EntityListRemoveLastAction,
  EntityListSetListAction,
  EntityListToggleAction
} from "./entity-list-actions";

export interface EntityListActions<T, TInnerAction> {
  addAtEnd: (entity: T) => EntityListAddAtEndAction<T>;
  addAtStart: (entity: T) => EntityListAddAtStartAction<T>;
  clearList: () => EntityListClearListAction;
  removeFirst: () => EntityListRemoveFirstAction;
  removeLast: () => EntityListRemoveLastAction;
  removeAtIndex: (index: number) => EntityListRemoveAtIndexAction;
  removeByFieldMatch: (
    fields: Partial<T>
  ) => EntityListRemoveByFieldMatchAction<T>;
  remove: (entity: T) => EntityListRemoveAction<T>;
  setList: (list: Array<T>) => EntityListSetListAction<T>;
  toggle: (entity: T) => EntityListToggleAction<T>;
  actionByFieldsMatch: (
    fields: Partial<T>,
    action: TInnerAction
  ) => EntityListActionByFieldsMatchAction<T, TInnerAction>;
  actionByIndex: (
    index: number,
    action: TInnerAction
  ) => EntityListActionByIndexAction<TInnerAction>;
  actionOnAll: (
    action: TInnerAction
  ) => EntityListActionOnAllAction<TInnerAction>;
}

export const createEntityListActions = <
  T,
  TInnerAction = unknown
>(): EntityListActions<T, TInnerAction> => {
  return {
    addAtEnd: entity => ({ type: "ENTITY_LIST:ADD_AT_END", entity }),
    addAtStart: entity => ({
      entity,
      type: "ENTITY_LIST:ADD_AT_START"
    }),
    clearList: () => ({ type: "ENTITY_LIST:CLEAR_LIST" }),
    removeFirst: () => ({ type: "ENTITY_LIST:REMOVE_FIRST" }),
    removeLast: () => ({ type: "ENTITY_LIST:REMOVE_LAST" }),
    removeAtIndex: index => ({
      type: "ENTITY_LIST:REMOVE_AT_INDEX",
      index
    }),
    removeByFieldMatch: fields => ({
      type: "ENTITY_LIST:REMOVE_BY_FIELD_MATCH",
      fields
    }),
    remove: entity => ({ type: "ENTITY_LIST:REMOVE", entity }),
    setList: list => ({ type: "ENTITY_LIST:SET_LIST", list }),
    toggle: entity => ({ type: "ENTITY_LIST:TOGGLE", entity }),
    actionByFieldsMatch: (fields, action) => ({
      type: "ENTITY_LIST:ACTION_BY_FIELDS_MATCH",
      fields,
      action
    }),
    actionByIndex: (index, action) => ({
      type: "ENTITY_LIST:ACTION_BY_INDEX",
      index,
      action
    }),
    actionOnAll: action => ({
      type: "ENTITY_LIST:ACTION_ON_ALL",
      action
    })
  };
};
