export type SortOrderAction<TSortBy> =
  | SortOrderSetSortByAction<TSortBy>
  | SortOrderClearSortOrderAction;

export interface SortOrderSetSortByAction<TSortBy> {
  type: "SORT_ORDER:SET_SORT_BY";
  sortBy: TSortBy | undefined;
  desc: boolean;
}

export interface SortOrderClearSortOrderAction {
  type: "SORT_ORDER:CLEAR_SORT_ORDER";
}
