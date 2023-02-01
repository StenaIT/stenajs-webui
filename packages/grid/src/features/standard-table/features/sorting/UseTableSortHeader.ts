import { useMemo } from "react";
import { SortOrderDirection } from "../../../table-ui/components/table/SortOrderIcon";
import { useOnSortOrderChangeContext } from "../../context/OnSortOrderChangeContext";
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
  const onSortOrderChange = useOnSortOrderChangeContext();
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
        const d = selected ? !desc : false;
        dispatch(actions.sortBy(columnId, d));
        onSortOrderChange?.(columnId, d);
      },
    };
  }, [columnId, sortBy, desc, dispatch, actions, onSortOrderChange]);
};
