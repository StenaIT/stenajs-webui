import { EntityWithId } from "../../../common/EntityWithId";
import {
  EntityByIdClearAllEntitiesAction,
  EntityByIdClearEntityAction,
  EntityByIdSetEntityAction,
  EntityByIdSetEntityFieldsAction,
} from "./entity-by-id-actions";

export interface EntityByIdActions<T extends EntityWithId> {
  setEntity: (entity: T) => EntityByIdSetEntityAction<T>;
  setEntityFields: (
    id: string,
    fields: Partial<T>
  ) => EntityByIdSetEntityFieldsAction<T>;
  clearEntity: (id: string) => EntityByIdClearEntityAction;
  clearAllEntities: () => EntityByIdClearAllEntitiesAction;
}

export const createEntityByIdActions = <
  T extends EntityWithId
>(): EntityByIdActions<T> => ({
  setEntity: (entity) => ({
    type: "ENTITY_BY_ID:SET_ENTITY",
    entity,
  }),
  setEntityFields: (id, fields) => ({
    type: "ENTITY_BY_ID:SET_ENTITY_FIELDS",
    id,
    fields,
  }),
  clearEntity: (id) => ({
    type: "ENTITY_BY_ID:CLEAR_ENTITY",
    id,
  }),
  clearAllEntities: () => ({
    type: "ENTITY_BY_ID:CLEAR_ALL_ENTITIES",
  }),
});
