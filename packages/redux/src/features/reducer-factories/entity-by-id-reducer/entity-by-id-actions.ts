import { EntityWithId } from "../../../common/EntityWithId";

export type EntityByIdAction<T extends EntityWithId> =
  | EntityByIdSetEntityAction<T>
  | EntityByIdSetEntityFieldsAction<T>
  | EntityByIdClearEntityAction
  | EntityByIdClearAllEntitiesAction;

interface EntityByIdSetEntityAction<T extends EntityWithId> {
  type: "ENTITY_BY_ID:SET_ENTITY";
  reducerId: string;
  entity: T;
}

interface EntityByIdSetEntityFieldsAction<T extends EntityWithId> {
  type: "ENTITY_BY_ID:SET_ENTITY_FIELDS";
  reducerId: string;
  id: string;
  fields: Partial<T>;
}

interface EntityByIdClearEntityAction {
  type: "ENTITY_BY_ID:CLEAR_ENTITY";
  reducerId: string;
  id: string;
}

interface EntityByIdClearAllEntitiesAction {
  type: "ENTITY_BY_ID:CLEAR_ALL_ENTITIES";
  reducerId: string;
}

export interface EntityByIdActions<T extends EntityWithId> {
  setEntity: (entity: T) => EntityByIdSetEntityAction<T>;
  setEntityFields: (
    id: string,
    fields: Partial<T>
  ) => EntityByIdSetEntityFieldsAction<T>;
  clearEntity: (id: string) => EntityByIdClearEntityAction;
  clearAllEntities: () => EntityByIdClearAllEntitiesAction;
}

export const createEntityByIdActions = <T extends EntityWithId>(
  reducerId: string
): EntityByIdActions<T> => ({
  setEntity: entity => ({
    type: "ENTITY_BY_ID:SET_ENTITY",
    entity,
    reducerId
  }),
  setEntityFields: (id, fields) => ({
    type: "ENTITY_BY_ID:SET_ENTITY_FIELDS",
    reducerId,
    id,
    fields
  }),
  clearEntity: id => ({
    type: "ENTITY_BY_ID:CLEAR_ENTITY",
    reducerId,
    id
  }),
  clearAllEntities: () => ({
    type: "ENTITY_BY_ID:CLEAR_ALL_ENTITIES",
    reducerId
  })
});
