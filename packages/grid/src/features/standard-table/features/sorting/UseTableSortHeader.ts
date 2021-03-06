import { useMemo } from "react";
import { SortOrderDirection } from "../../../table-ui/components/table/SortOrderIcon";
import {
  useStandardTableActions,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: SortOrderDirection | undefined;
  onClickColumnHead: () => void;
}

export const useTableSortHeader = (columnId: string): Result => {
  const { dispatch, actions } = useStandardTableActions();
  const {
    sortOrder: { desc, sortBy },
  } = useStandardTableState();

  return useMemo(() => {
    const selected = columnId === sortBy;
    return {
      arrow: selected ? (desc ? "up" : "down") : undefined,
      selected,
      desc,
      onClickColumnHead: () => {
        dispatch(actions.sortBy(columnId, selected ? !desc : false));
      },
    };
  }, [sortBy, desc, actions, columnId, dispatch]);
};
