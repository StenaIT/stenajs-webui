import { useMemo } from "react";
import { SortOrderDirection } from "../../../table-ui/components/table/SortOrderIcon";
import {
  useStandardTableActions,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";

interface Result {
  selected: boolean;
  selectedBorder: string | undefined;
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
    const selectedBorder = selected
      ? "2px solid var(--lhds-color-blue-500)"
      : "2px solid transparent";
    return {
      arrow: selected ? (desc ? "up" : "down") : undefined,
      selected,
      selectedBorder,
      desc,
      onClickColumnHead: () => {
        dispatch(actions.sortBy(columnId, selected ? !desc : false));
      },
    };
  }, [sortBy, desc, actions, columnId, dispatch]);
};
