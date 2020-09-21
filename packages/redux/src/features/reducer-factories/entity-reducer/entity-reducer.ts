import { EntityAction } from "./entity-actions";
import { Reducer } from "redux";

export type EntityState<T> = T;

export const createEntityReducer = <T>(
  initialEntity: T
): Reducer<EntityState<T>, EntityAction<T>> => {
  const INITIAL_STATE = initialEntity;

  return (
    state: EntityState<T> = INITIAL_STATE,
    action: EntityAction<T>
  ): EntityState<T> => {
    switch (action.type) {
      case "ENTITY:SET_ENTITY": {
        const { entity } = action;
        return entity;
      }

      case "ENTITY:SET_ENTITY_FIELDS": {
        const { fields } = action;
        return {
          ...state,
          ...fields,
        };
      }

      default:
        return state;
    }
  };
};
