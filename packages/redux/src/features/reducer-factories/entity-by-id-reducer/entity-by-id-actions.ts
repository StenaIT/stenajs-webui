import { EntityWithId } from "../../../common/EntityWithId";

export type EntityByIdAction<T extends EntityWithId> =
  | EntityByIdSetEntityAction<T>
  | EntityByIdSetEntityFieldsAction<T>
  | EntityByIdClearEntityAction
  | EntityByIdClearAllEntitiesAction;

export interface EntityByIdSetEntityAction<T extends EntityWithId> {
  type: "ENTITY_BY_ID:SET_ENTITY";
  entity: T;
}

export interface EntityByIdSetEntityFieldsAction<T extends EntityWithId> {
  type: "ENTITY_BY_ID:SET_ENTITY_FIELDS";
  id: string;
  fields: Partial<T>;
}

export interface EntityByIdClearEntityAction {
  type: "ENTITY_BY_ID:CLEAR_ENTITY";
  id: string;
}

export interface EntityByIdClearAllEntitiesAction {
  type: "ENTITY_BY_ID:CLEAR_ALL_ENTITIES";
}
