import {
  EntitySetEntityAction,
  EntitySetEntityFieldsAction
} from "./entity-actions";

export interface EntityActions<T> {
  setEntity: (entity: T) => EntitySetEntityAction<T>;
  setEntityFields: (fields: Partial<T>) => EntitySetEntityFieldsAction<T>;
}

export const createEntityActions = <T>(): EntityActions<T> => ({
  setEntity: entity => ({
    type: "ENTITY:SET_ENTITY",
    entity
  }),
  setEntityFields: fields => ({
    type: "ENTITY:SET_ENTITY_FIELDS",
    fields
  })
});
