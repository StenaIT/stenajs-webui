export type SortOrderByIdAction =
  | SortOrderByIdSetSortOrderAction
  | SortOrderByIdClearSortOrderAction;

export interface SortOrderByIdSetSortOrderAction {
  type: "SORT_ORDER_BY_ID:SET_SORT_ORDER";
  ids: Array<string>;
}

export interface SortOrderByIdClearSortOrderAction {
  type: "SORT_ORDER_BY_ID:CLEAR_SORT_ORDER";
}
