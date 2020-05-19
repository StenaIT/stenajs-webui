import { SortOrderActions, SortOrderState } from "@stenajs-webui/redux";
import { useMemo } from "react";
import { useStandardTableContext } from "../../standard-table/hooks/UseStandardTableContext";
import { ArrowType } from "../components/TableHead";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useSortOrderColumnHead = <TSortBy extends string>(
  state: SortOrderState<TSortBy>,
  actions: SortOrderActions<TSortBy>,
  sortByForColumn: TSortBy
): Result => {
  const { dispatch } = useStandardTableContext<unknown, TSortBy>();
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
