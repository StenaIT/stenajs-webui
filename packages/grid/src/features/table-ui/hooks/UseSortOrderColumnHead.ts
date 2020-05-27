import { SortOrderActions, SortOrderState } from "@stenajs-webui/redux";
import { useMemo } from "react";
import { useStandardTableActions } from "../../standard-table/hooks/UseStandardTableConfig";
import { ArrowType } from "../components/table/TableHeadItem";

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
  const { dispatch } = useStandardTableActions<TSortBy>();
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
