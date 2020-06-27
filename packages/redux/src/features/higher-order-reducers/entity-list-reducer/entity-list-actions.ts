export type EntityListAction<T, TInnerAction> =
  | EntityListSetListAction<T>
  | EntityListAddAtEndAction<T>
  | EntityListAddAtStartAction<T>
  | EntityListClearListAction
  | EntityListRemoveFirstAction
  | EntityListRemoveLastAction
  | EntityListRemoveAtIndexAction
  | EntityListRemoveByFieldMatchAction<T>
  | EntityListRemoveAction<T>
  | EntityListToggleAction<T>
  | EntityListActionByFieldsMatchAction<T, TInnerAction>
  | EntityListActionByIndexAction<TInnerAction>;

export interface EntityListSetListAction<T> {
  type: "ENTITY_LIST:SET_LIST";
  list: Array<T>;
}

export interface EntityListClearListAction {
  type: "ENTITY_LIST:CLEAR_LIST";
}

export interface EntityListAddAtEndAction<T> {
  type: "ENTITY_LIST:ADD_AT_END";
  entity: T;
}

export interface EntityListAddAtStartAction<T> {
  type: "ENTITY_LIST:ADD_AT_START";
  entity: T;
}

export interface EntityListRemoveFirstAction {
  type: "ENTITY_LIST:REMOVE_FIRST";
}

export interface EntityListRemoveLastAction {
  type: "ENTITY_LIST:REMOVE_LAST";
}

export interface EntityListRemoveAtIndexAction {
  type: "ENTITY_LIST:REMOVE_AT_INDEX";
  index: number;
}

export interface EntityListRemoveByFieldMatchAction<T> {
  type: "ENTITY_LIST:REMOVE_BY_FIELD_MATCH";
  fields: Partial<T>;
}

export interface EntityListRemoveAction<T> {
  type: "ENTITY_LIST:REMOVE";
  entity: T;
}

export interface EntityListToggleAction<T> {
  type: "ENTITY_LIST:TOGGLE";
  entity: T;
}

export interface EntityListActionByFieldsMatchAction<T, TInnerAction> {
  type: "ENTITY_LIST:ACTION_BY_FIELDS_MATCH";
  fields: Partial<T>;
  action: TInnerAction;
}

export interface EntityListActionByIndexAction<TInnerAction> {
  type: "ENTITY_LIST:ACTION_BY_INDEX";
  index: number;
  action: TInnerAction;
}
