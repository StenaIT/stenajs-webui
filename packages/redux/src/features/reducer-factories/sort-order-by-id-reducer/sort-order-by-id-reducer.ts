import { SortOrderByIdAction } from "./sort-order-by-id-actions";

export interface SortOrderByIdState {
  ids: Array<string> | undefined;
}

const INITIAL_STATE: SortOrderByIdState = {
  ids: undefined,
};

export const createSortOrderByIdReducer =
  () =>
  (
    state: SortOrderByIdState = INITIAL_STATE,
    action: SortOrderByIdAction
  ): SortOrderByIdState => {
    switch (action.type) {
      case "SORT_ORDER_BY_ID:SET_SORT_ORDER":
        return {
          ...state,
          ids: action.ids,
        };

      case "SORT_ORDER_BY_ID:CLEAR_SORT_ORDER":
        return {
          ...state,
          ids: undefined,
        };

      default:
        return state;
    }
  };

export const sortOrderByIdReducer = createSortOrderByIdReducer();
