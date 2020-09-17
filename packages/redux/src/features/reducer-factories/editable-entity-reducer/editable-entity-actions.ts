export type EditableEntityAction<T> =
  | EditableEntitySetEntityAction<T>
  | EditableEntitySetPersistedEntityAction<T>
  | EditableEntitySetEditableEntityAction<T>
  | EditableEntitySetEntityIdAction
  | EditableEntitySetEditableEntityFieldsAction<T>
  | EditableEntityRevertEditableEntityAction;

export interface EditableEntitySetEntityAction<T> {
  type: "EDITABLE_ENTITY:SET_ENTITY";
  entity: T;
}

export interface EditableEntitySetEntityIdAction {
  type: "EDITABLE_ENTITY:SET_ENTITY_ID";
  id: string | undefined;
}

export interface EditableEntitySetPersistedEntityAction<T> {
  type: "EDITABLE_ENTITY:SET_PERSISTED_ENTITY";
  entity: T;
}

export interface EditableEntitySetEditableEntityAction<T> {
  type: "EDITABLE_ENTITY:SET_EDITABLE_ENTITY";
  entity: T;
}

export interface EditableEntitySetEditableEntityFieldsAction<T> {
  type: "EDITABLE_ENTITY:SET_EDITABLE_ENTITY_FIELDS";
  fields: Partial<T>;
}

export interface EditableEntityRevertEditableEntityAction {
  type: "EDITABLE_ENTITY:REVERT_EDITABLE_ENTITY";
}
