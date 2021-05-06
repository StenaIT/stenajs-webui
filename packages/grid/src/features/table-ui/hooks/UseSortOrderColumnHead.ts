import { SortOrderState } from "@stenajs-webui/redux";
import { useMemo } from "react";
import { useStandardTableActions } from "../../standard-table/hooks/UseStandardTableConfig";
import { SortOrderDirection } from "../components/table/SortOrderIcon";
import { StandardTableActions } from "../../standard-table/util/ActionsFactory";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: SortOrderDirection | undefined;
  onClickColumnHead: () => void;
}

export const useSortOrderColumnHead = <TSortBy extends string>(
  state: SortOrderState<TSortBy>,
  actions: StandardTableActions<TSortBy>,
  sortByForColumn: TSortBy
): Result => {
  const { dispatch } = useStandardTableActions<TSortBy>();
  return useMemo(() => {
    const selected = state.sortBy === sortByForColumn;
    return {
      arrow: selected ? (state.desc ? "up" : "down") : undefined,
      selected: selected,
      desc: state.desc,
      onClickColumnHead: () => {
        dispatch(
          actions.sortBy(sortByForColumn, selected ? !state.desc : false)
        );
      },
    };
  }, [state, actions, sortByForColumn, dispatch]);
};
