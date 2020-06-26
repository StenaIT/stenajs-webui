export type EntityAction<T> =
  | EntitySetEntityAction<T>
  | EntitySetEntityFieldsAction<T>;

interface EntitySetEntityAction<T> {
  type: "ENTITY:SET_ENTITY";
  reducerId: string;
  entity: T;
}

interface EntitySetEntityFieldsAction<T> {
  type: "ENTITY:SET_ENTITY_FIELDS";
  reducerId: string;
  fields: Partial<T>;
}

export interface EntityActions<T> {
  setEntity: (entity: T) => EntitySetEntityAction<T>;
  setEntityFields: (fields: Partial<T>) => EntitySetEntityFieldsAction<T>;
}

export const createEntityActions = <T>(
  reducerId: string
): EntityActions<T> => ({
  setEntity: entity => ({
    type: "ENTITY:SET_ENTITY",
    entity,
    reducerId
  }),
  setEntityFields: fields => ({
    type: "ENTITY:SET_ENTITY_FIELDS",
    reducerId,
    fields
  })
});
