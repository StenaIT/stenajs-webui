import { SingleEntityAction } from "./single-entity-actions";

export interface SingleEntityState<T> {
  entity: T;
}

export const createSingleEntityReducer = <T>(initialEntity: T) => {
  const INITIAL_STATE = { entity: initialEntity };

  return (
    state: SingleEntityState<T> = INITIAL_STATE,
    action: SingleEntityAction<T>
  ): SingleEntityState<T> => {
    switch (action.type) {
      case "SINGLE_ENTITY:SET_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          entity
        };
      }

      case "SINGLE_ENTITY:SET_ENTITY_FIELDS": {
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
