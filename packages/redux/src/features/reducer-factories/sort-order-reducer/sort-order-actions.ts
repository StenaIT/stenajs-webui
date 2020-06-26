export type SortOrderAction<TSortBy> =
  | SortOrderSetSortByAction<TSortBy>
  | SortOrderClearSortOrderAction;

export interface SortOrderSetSortByAction<TSortBy> {
  type: "SORT_ORDER:SET_SORT_BY";
  reducerId: string;
  sortBy: TSortBy | undefined;
  desc: boolean;
}

export interface SortOrderClearSortOrderAction {
  type: "SORT_ORDER:CLEAR_SORT_ORDER";
  reducerId: string;
}

export interface SortOrderActions<TSortBy> {
  sortBy: (sortBy: TSortBy, desc: boolean) => SortOrderSetSortByAction<TSortBy>;
  clearSortOrder: () => SortOrderClearSortOrderAction;
}

export const createSortOrderActions = <TSortBy>(
  reducerId: string
): SortOrderActions<TSortBy> => ({
  sortBy: (sortBy, desc) => ({
    desc,
    sortBy,
    type: "SORT_ORDER:SET_SORT_BY",
    reducerId
  }),
  clearSortOrder: () => ({
    reducerId,
    type: "SORT_ORDER:CLEAR_SORT_ORDER"
  })
});
