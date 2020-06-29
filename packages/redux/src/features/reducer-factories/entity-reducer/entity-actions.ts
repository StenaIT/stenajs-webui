export type EntityAction<T> =
  | EntitySetEntityAction<T>
  | EntitySetEntityFieldsAction<T>;

export interface EntitySetEntityAction<T> {
  type: "ENTITY:SET_ENTITY";
  entity: T;
}

export interface EntitySetEntityFieldsAction<T> {
  type: "ENTITY:SET_ENTITY_FIELDS";
  fields: Partial<T>;
}
