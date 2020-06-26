export type EntityListAction<T> =
  | EntityListSetListAction<T>
  | EntityListAddAtEndAction<T>
  | EntityListAddAtStartAction<T>
  | EntityListClearListAction
  | EntityListRemoveFirstAction
  | EntityListRemoveLastAction
  | EntityListRemoveAtIndexAction
  | EntityListRemoveByFieldMatchAction<T>
  | EntityListRemoveAction<T>
  | EntityListToggleAction<T>;

export interface EntityListSetListAction<T> {
  type: "ENTITY_LIST:SET_LIST";
  reducerId: string;
  list: Array<T>;
}

export interface EntityListClearListAction {
  type: "ENTITY_LIST:CLEAR_LIST";
  reducerId: string;
}

export interface EntityListAddAtEndAction<T> {
  type: "ENTITY_LIST:ADD_AT_END";
  reducerId: string;
  entity: T;
}

export interface EntityListAddAtStartAction<T> {
  type: "ENTITY_LIST:ADD_AT_START";
  reducerId: string;
  entity: T;
}

export interface EntityListRemoveFirstAction {
  type: "ENTITY_LIST:REMOVE_FIRST";
  reducerId: string;
}

export interface EntityListRemoveLastAction {
  type: "ENTITY_LIST:REMOVE_LAST";
  reducerId: string;
}

export interface EntityListRemoveAtIndexAction {
  type: "ENTITY_LIST:REMOVE_AT_INDEX";
  reducerId: string;
  index: number;
}

export interface EntityListRemoveByFieldMatchAction<T> {
  type: "ENTITY_LIST:REMOVE_BY_FIELD_MATCH";
  reducerId: string;
  fields: Partial<T>;
}

export interface EntityListRemoveAction<T> {
  type: "ENTITY_LIST:REMOVE";
  reducerId: string;
  entity: T;
}

export interface EntityListToggleAction<T> {
  type: "ENTITY_LIST:TOGGLE";
  reducerId: string;
  entity: T;
}
