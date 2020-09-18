import {
  SortOrderByIdClearSortOrderAction,
  SortOrderByIdSetSortOrderAction,
} from "./sort-order-by-id-actions";

export interface SortOrderByIdActions {
  setSortOrder: (ids: Array<string>) => SortOrderByIdSetSortOrderAction;
  clearSortOrder: () => SortOrderByIdClearSortOrderAction;
}

export const createSortOrderByIdActions = (): SortOrderByIdActions => {
  return {
    setSortOrder: (ids) => ({
      ids,
      type: "SORT_ORDER_BY_ID:SET_SORT_ORDER",
    }),
    clearSortOrder: () => ({
      type: "SORT_ORDER_BY_ID:CLEAR_SORT_ORDER",
    }),
  };
};

export const sortOrderByIdActions = createSortOrderByIdActions();
