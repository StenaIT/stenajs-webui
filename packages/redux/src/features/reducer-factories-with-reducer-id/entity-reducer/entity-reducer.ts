import { EntityAction } from "./entity-actions";

export interface EntityState<T> {
  entity: T;
}

export const createEntityReducer = <T>(reducerId: string, initialEntity: T) => {
  const INITIAL_STATE = { entity: initialEntity };

  return (
    state: EntityState<T> = INITIAL_STATE,
    action: EntityAction<T>
  ): EntityState<T> => {
    if (action.reducerId !== reducerId) {
      return state;
    }

    switch (action.type) {
      case "ENTITY:SET_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          entity
        };
      }

      case "ENTITY:SET_ENTITY_FIELDS": {
        const { fields } = action;
        return {
          ...state,
          entity: {
            ...state.entity,
            ...fields
          }
        };
      }

      default:
        return state;
    }
  };
};
