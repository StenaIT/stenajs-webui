import { EntityWithId } from "../../../common/EntityWithId";
import { EntityByIdAction } from "./entity-by-id-actions";

export interface EntityByIdState<T extends EntityWithId> {
  entities: { [key: string]: T };
}

export const entityByIdInitialState = { entities: {} };

export const createEntityByIdReducer = <T extends EntityWithId>(
  reducerId: string
) => {
  return (
    state: EntityByIdState<T> = entityByIdInitialState,
    action: EntityByIdAction<T>
  ): EntityByIdState<T> => {
    if (action.reducerId !== reducerId) {
      return state;
    }

    switch (action.type) {
      case "ENTITY_BY_ID:SET_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          entities: {
            ...state.entities,
            [entity.id]: entity
          }
        };
      }

      case "ENTITY_BY_ID:SET_ENTITY_FIELDS": {
        const { id, fields } = action;
        return {
          ...state,
          entities: {
            ...state.entities,
            [id]: {
              ...state.entities[id],
              ...fields
            }
          }
        };
      }

      case "ENTITY_BY_ID:CLEAR_ALL_ENTITIES": {
        return {
          ...state,
          entities: {}
        };
      }

      case "ENTITY_BY_ID:CLEAR_ENTITY": {
        const { id } = action;
        const entities = {
          ...state.entities
        };
        delete entities[id];
        return {
          ...state,
          entities
        };
      }

      default:
        return state;
    }
  };
};
