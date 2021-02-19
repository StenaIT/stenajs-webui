import {
  SortOrderClearSortOrderAction,
  SortOrderSetSortByAction,
} from "./sort-order-actions";

export interface SortOrderActions<TSortBy> {
  sortBy: (sortBy: TSortBy, desc: boolean) => SortOrderSetSortByAction<TSortBy>;
  clearSortOrder: () => SortOrderClearSortOrderAction;
}

export const createSortOrderActions = <
  TSortBy
>(): SortOrderActions<TSortBy> => ({
  sortBy: (sortBy, desc) => ({
    desc,
    sortBy,
    type: "SORT_ORDER:SET_SORT_BY",
  }),
  clearSortOrder: () => ({
    type: "SORT_ORDER:CLEAR_SORT_ORDER",
  }),
});
