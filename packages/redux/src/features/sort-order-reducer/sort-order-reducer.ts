import { SortOrderAction } from "./sort-order-actions";

export interface SortOrderState<TSortBy> {
  sortBy: TSortBy | undefined;
  desc: boolean;
}

const INITIAL_STATE = {
  sortBy: undefined,
  desc: false
};

export const createSortOrderReducer = <TSortBy>(reducerId: string) => (
  state: SortOrderState<TSortBy> = INITIAL_STATE,
  action: SortOrderAction<TSortBy>
): SortOrderState<TSortBy> => {
  if (action.reducerId !== reducerId) {
    return state;
  }

  switch (action.type) {
    case "SORT_ORDER:SET_SORT_BY": {
      const { sortBy, desc } = action;
      return {
        ...state,
        sortBy,
        desc
      };
    }

    case "SORT_ORDER:CLEAR_SORT_ORDER": {
      return {
        ...state,
        sortBy: undefined,
        desc: false
      };
    }

    default:
      return state;
  }
};
