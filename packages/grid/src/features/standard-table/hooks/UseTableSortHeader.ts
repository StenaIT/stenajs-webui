import { useMemo } from "react";
import { ArrowType } from "../../table-ui/components/table/TableHeadItem";
import {
  useStandardTableActions,
  useStandardTableId,
  useStandardTableState
} from "./UseStandardTableConfig";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useTableSortHeader = (columnId: string): Result => {
  const tableId = useStandardTableId();
  const { dispatch, actions } = useStandardTableActions();
  const {
    sortOrder: { desc, sortBy }
  } = useStandardTableState();

  return useMemo(() => {
    const selected = columnId === sortBy;
    return {
      arrow: selected ? (desc ? "up" : "down") : undefined,
      selected,
      desc,
      onClickColumnHead: () => {
        if (selected) {
          dispatch({
            reducerId: tableId,
            action: actions.sortOrder.sortBy(columnId, !desc)
          });
        } else {
          dispatch({
            reducerId: tableId,
            action: actions.sortOrder.sortBy(columnId, false)
          });
        }
      }
    };
  }, [sortBy, desc, actions, columnId, dispatch, tableId]);
};
