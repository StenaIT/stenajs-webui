import { Reducer } from "redux";
import { EditableEntityAction } from "./editable-entity-actions";

export interface EditableEntityState<T> {
  id?: string;
  persisted: T;
  editable: T;
}

export const createEditableEntityReducer = <T>(
  initialEntity: T,
  initialId?: string,
): Reducer<EditableEntityState<T>, EditableEntityAction<T>> => {
  const initialState: EditableEntityState<T> = {
    id: initialId,
    editable: initialEntity,
    persisted: initialEntity,
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case "EDITABLE_ENTITY:SET_ENTITY_ID": {
        const { id } = action;
        return {
          ...state,
          id,
        };
      }

      case "EDITABLE_ENTITY:SET_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          persisted: entity,
          editable: entity,
        };
      }

      case "EDITABLE_ENTITY:SET_PERSISTED_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          persisted: entity,
        };
      }

      case "EDITABLE_ENTITY:SET_EDITABLE_ENTITY": {
        const { entity } = action;
        return {
          ...state,
          editable: entity,
        };
      }

      case "EDITABLE_ENTITY:SET_EDITABLE_ENTITY_FIELDS": {
        const { fields } = action;
        return {
          ...state,
          editable: {
            ...state.editable,
            ...fields,
          },
        };
      }

      case "EDITABLE_ENTITY:REVERT_EDITABLE_ENTITY": {
        return {
          ...state,
          editable: state.persisted,
        };
      }

      case "EDITABLE_ENTITY:COMMIT_EDITABLE_ENTITY_TO_PERSISTED": {
        return {
          ...state,
          persisted: state.editable,
        };
      }

      default:
        return state;
    }
  };
};
