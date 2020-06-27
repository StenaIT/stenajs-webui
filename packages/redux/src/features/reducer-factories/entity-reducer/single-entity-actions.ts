export type SingleEntityAction<T> =
  | SingleEntitySetEntityAction<T>
  | SingleEntitySetEntityFieldsAction<T>;

interface SingleEntitySetEntityAction<T> {
  type: "SINGLE_ENTITY:SET_ENTITY";
  entity: T;
}

interface SingleEntitySetEntityFieldsAction<T> {
  type: "SINGLE_ENTITY:SET_ENTITY_FIELDS";
  fields: Partial<T>;
}

export interface SingleEntityActions<T> {
  setEntity: (entity: T) => SingleEntitySetEntityAction<T>;
  setEntityFields: (fields: Partial<T>) => SingleEntitySetEntityFieldsAction<T>;
}

export const createSingleEntityActions = <T>(): SingleEntityActions<T> => ({
  setEntity: entity => ({
    type: "SINGLE_ENTITY:SET_ENTITY",
    entity
  }),
  setEntityFields: fields => ({
    type: "SINGLE_ENTITY:SET_ENTITY_FIELDS",
    fields
  })
});
