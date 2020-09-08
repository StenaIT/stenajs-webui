import { EntityListAction } from "./entity-list-actions";
import { fieldsMatch } from "../../../common/util/field-matcher";
import { Action, AnyAction, Reducer } from "redux";

export type EntityListState<TListItem> = Array<TListItem>;

export const createEntityListReducer = <
  TListItem,
  TListItemAction extends Action = AnyAction
>(
  reducer?: Reducer<TListItem, TListItemAction>
) => (
  state: EntityListState<TListItem> = [],
  action: EntityListAction<TListItem, TListItemAction>
): EntityListState<TListItem> => {
  switch (action.type) {
    case "ENTITY_LIST:SET_LIST": {
      const { list } = action;
      return list;
    }
    case "ENTITY_LIST:CLEAR_LIST": {
      return [];
    }
    case "ENTITY_LIST:ADD_AT_END": {
      const { entity } = action;
      return [...state, entity];
    }
    case "ENTITY_LIST:ADD_AT_START": {
      const { entity } = action;
      return [entity, ...state];
    }
    case "ENTITY_LIST:REMOVE_FIRST": {
      if (state.length === 0) {
        throw new Error("Cannot remove, list is empty.");
      }
      const [, ...list] = state;
      return list;
    }

    case "ENTITY_LIST:REMOVE_LAST": {
      if (state.length === 0) {
        throw new Error("Cannot remove, list is empty.");
      }
      const list = [...state];
      list.pop();
      return list;
    }

    case "ENTITY_LIST:REMOVE_AT_INDEX": {
      const { index } = action;
      if (index < 0) {
        throw new Error("Index is lower than 0.");
      }
      if (index >= state.length) {
        throw new Error("Index is outside of list bounds.");
      }
      const list = [...state];
      list.splice(index, 1);
      return list;
    }

    case "ENTITY_LIST:REMOVE_BY_FIELD_MATCH": {
      const { fields } = action;
      return state.filter(item => !fieldsMatch(item, fields));
    }

    case "ENTITY_LIST:REMOVE": {
      const { entity } = action;
      return state.filter(item => item !== entity);
    }

    case "ENTITY_LIST:TOGGLE": {
      const { entity } = action;
      const index = state.findIndex(
        item => item === entity || fieldsMatch(item, entity)
      );

      if (index >= 0) {
        const list = [...state];
        list.splice(index, index);

        return list;
      } else {
        return [...state, entity];
      }
    }

    case "ENTITY_LIST:ACTION_BY_FIELDS_MATCH": {
      const { fields, action: innerAction } = action;
      if (!reducer) {
        throw new Error(
          "No reducer specified, unable to handle 'actionByFieldsMatch'."
        );
      }
      return state.map(item =>
        fieldsMatch(item, fields) ? reducer(item, innerAction) : item
      );
    }

    case "ENTITY_LIST:ACTION_BY_INDEX": {
      const { index, action: innerAction } = action;
      if (!reducer) {
        throw new Error(
          "No reducer specified, unable to handle 'actionByIndex'."
        );
      }
      return state.map((item, i) =>
        index === i ? reducer(item, innerAction) : item
      );
    }

    case "ENTITY_LIST:ACTION_ON_ALL": {
      const { action: innerAction } = action;
      if (!reducer) {
        throw new Error(
          "No reducer specified, unable to handle 'actionByIndex'."
        );
      }
      return state.map(item => reducer(item, innerAction));
    }

    default:
      return state;
  }
};
