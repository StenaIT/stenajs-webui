import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ArrowType } from "../../../../features/table/components/TableHead";
import { SortOrderActions } from "../sort-order-actions";
import { SortOrderState } from "../sort-order-reducer";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useSortOrderColumnHead = <TSortBy>(
  state: SortOrderState<TSortBy>,
  actions: SortOrderActions<TSortBy>,
  sortByForColumn: TSortBy
): Result => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const selected = state.sortBy === sortByForColumn;
    const desc = !!state.desc;
    return {
      arrow: selected ? (desc ? "up" : "down") : undefined,
      selected: selected,
      desc: desc,
      onClickColumnHead: () => {
        if (selected) {
          dispatch(actions.sortBy(sortByForColumn, !state.desc));
        } else {
          dispatch(actions.sortBy(sortByForColumn, false));
        }
      }
    };
  }, [state, actions, sortByForColumn, dispatch]);
};
