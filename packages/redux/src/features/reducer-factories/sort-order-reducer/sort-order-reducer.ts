import { Reducer } from "redux";
import { SortOrderAction } from "./sort-order-actions";

export interface SortOrderState<TSortBy> {
  sortBy: TSortBy | undefined;
  desc: boolean;
}

export const createSortOrderReducerInitialState = <TSortBy>(
  sortBy: TSortBy | undefined = undefined,
  desc: boolean = false
): SortOrderState<TSortBy> => ({
  sortBy,
  desc,
});

const INITIAL_STATE = {
  sortBy: undefined,
  desc: false,
};

export type SortOrderReducer<TSortBy> = Reducer<
  SortOrderState<TSortBy>,
  SortOrderAction<TSortBy>
>;

export const createSortOrderReducer = <
  TSortBy
>(): SortOrderReducer<TSortBy> => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SORT_ORDER:SET_SORT_BY": {
      const { sortBy, desc } = action;
      return {
        ...state,
        sortBy,
        desc,
      };
    }

    case "SORT_ORDER:CLEAR_SORT_ORDER": {
      return {
        ...state,
        sortBy: undefined,
        desc: false,
      };
    }

    default:
      return state;
  }
};
