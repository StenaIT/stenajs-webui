export type SortOrderByIdAction =
  | SortOrderByIdSetSortOrderAction
  | SortOrderByIdClearSortOrderAction;

interface SortOrderByIdSetSortOrderAction {
  type: "SORT_ORDER_BY_ID:SET_SORT_ORDER";
  reducerId: string;
  ids: Array<string>;
}

interface SortOrderByIdClearSortOrderAction {
  type: "SORT_ORDER_BY_ID:CLEAR_SORT_ORDER";
  reducerId: string;
}

export interface SortOrderByIdActions {
  setSortOrder: (ids: Array<string>) => SortOrderByIdSetSortOrderAction;
  clearSortOrder: () => SortOrderByIdClearSortOrderAction;
}

export const createSortOrderByIdActions = (
  reducerId: string
): SortOrderByIdActions => {
  return {
    setSortOrder: ids => ({
      ids,
      type: "SORT_ORDER_BY_ID:SET_SORT_ORDER",
      reducerId
    }),
    clearSortOrder: () => ({
      reducerId,
      type: "SORT_ORDER_BY_ID:CLEAR_SORT_ORDER"
    })
  };
};
