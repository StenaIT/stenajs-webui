import { EntityListAction } from "./entity-list-actions";
import { fieldsMatch } from "./field-matcher";

export interface EntityListState<T> {
  list: Array<T>;
}

const INITIAL_STATE = {
  list: []
};

export const createEntityListReducer = <T>() => (
  state: EntityListState<T> = INITIAL_STATE,
  action: EntityListAction<T>
): EntityListState<T> => {
  switch (action.type) {
    case "ENTITY_LIST:SET_LIST": {
      const { list } = action;
      return {
        ...state,
        list
      };
    }
    case "ENTITY_LIST:CLEAR_LIST": {
      return {
        ...state,
        list: []
      };
    }
    case "ENTITY_LIST:ADD_AT_END": {
      const { entity } = action;
      return {
        ...state,
        list: [...state.list, entity]
      };
    }
    case "ENTITY_LIST:ADD_AT_START": {
      const { entity } = action;
      return {
        ...state,
        list: [entity, ...state.list]
      };
    }
    case "ENTITY_LIST:REMOVE_FIRST": {
      if (state.list.length === 0) {
        throw new Error("Cannot remove, list is empty.");
      }
      const [, ...list] = state.list;
      return {
        ...state,
        list
      };
    }

    case "ENTITY_LIST:REMOVE_LAST": {
      if (state.list.length === 0) {
        throw new Error("Cannot remove, list is empty.");
      }
      const list = [...state.list];
      list.pop();
      return {
        ...state,
        list
      };
    }

    case "ENTITY_LIST:REMOVE_AT_INDEX": {
      const { index } = action;
      if (index < 0) {
        throw new Error("Index is lower than 0.");
      }
      if (index >= state.list.length) {
        throw new Error("Index is outside of list bounds.");
      }
      const list = [...state.list];
      list.splice(index, 1);
      return {
        ...state,
        list
      };
    }

    case "ENTITY_LIST:REMOVE_BY_FIELD_MATCH": {
      const { fields } = action;
      return {
        ...state,
        list: state.list.filter(item => !fieldsMatch(item, fields))
      };
    }

    case "ENTITY_LIST:REMOVE": {
      const { entity } = action;
      return {
        ...state,
        list: state.list.filter(item => item !== entity)
      };
    }

    case "ENTITY_LIST:TOGGLE": {
      const { entity } = action;
      const index = state.list.findIndex(
        item => item === entity || fieldsMatch(item, entity)
      );

      if (index >= 0) {
        const list = [...state.list];
        list.splice(index, index);

        return {
          ...state,
          list
        };
      } else {
        return {
          ...state,
          list: [...state.list, entity]
        };
      }
    }

    default:
      return state;
  }
};
