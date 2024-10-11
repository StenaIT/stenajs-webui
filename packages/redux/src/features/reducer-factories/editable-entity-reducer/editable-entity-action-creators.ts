import {
  EditableEntityCommitEditableEntityToPersistedAction,
  EditableEntityRevertEditableEntityAction,
  EditableEntitySetEditableEntityAction,
  EditableEntitySetEditableEntityFieldsAction,
  EditableEntitySetEntityAction,
  EditableEntitySetEntityIdAction,
  EditableEntitySetPersistedEntityAction,
} from "./editable-entity-actions";

export interface EditableEntityActions<T> {
  setEntityId: (
    entityId: string | undefined,
  ) => EditableEntitySetEntityIdAction;
  setEntity: (entity: T) => EditableEntitySetEntityAction<T>;
  setPersistedEntity: (entity: T) => EditableEntitySetPersistedEntityAction<T>;
  setEditableEntity: (entity: T) => EditableEntitySetEditableEntityAction<T>;
  setEditableEntityFields: (
    fields: Partial<T>,
  ) => EditableEntitySetEditableEntityFieldsAction<T>;
  revertEditableEntity: () => EditableEntityRevertEditableEntityAction;
  commitEditableEntityToPersisted: () => EditableEntityCommitEditableEntityToPersistedAction;
}

export const createEditableEntityActions = <T>(): EditableEntityActions<T> => ({
  setEntityId: (id: string | undefined) => ({
    type: "EDITABLE_ENTITY:SET_ENTITY_ID",
    id,
  }),
  setEntity: (entity) => ({ type: "EDITABLE_ENTITY:SET_ENTITY", entity }),
  setPersistedEntity: (entity) => ({
    type: "EDITABLE_ENTITY:SET_PERSISTED_ENTITY",
    entity,
  }),
  setEditableEntity: (entity) => ({
    type: "EDITABLE_ENTITY:SET_EDITABLE_ENTITY",
    entity,
  }),
  setEditableEntityFields: (fields) => ({
    type: "EDITABLE_ENTITY:SET_EDITABLE_ENTITY_FIELDS",
    fields,
  }),
  revertEditableEntity: () => ({
    type: "EDITABLE_ENTITY:REVERT_EDITABLE_ENTITY",
  }),
  commitEditableEntityToPersisted: () => ({
    type: "EDITABLE_ENTITY:COMMIT_EDITABLE_ENTITY_TO_PERSISTED",
  }),
});
