import { useMemo } from "react";
import { ArrowType } from "../../table-ui/components/table/TableHeadItem";
import {
  useStandardTableActions,
  useStandardTableState
} from "./UseStandardTableConfig";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useTableSortHeader = (columnId: string): Result => {
  const { dispatch, actions } = useStandardTableActions();
  const {
    sortOrder: { desc, sortBy }
  } = useStandardTableState();

  return useMemo(() => {
    const selected = columnId === sortBy;
    return {
      arrow: selected ? (desc ? "up" : "down") : undefined,
      selected: selected,
      desc: !!desc,
      onClickColumnHead: () => {
        if (selected) {
          dispatch(actions.sortOrder.sortBy(columnId, !desc));
        } else {
          dispatch(actions.sortOrder.sortBy(columnId, false));
        }
      }
    };
  }, [sortBy, desc, actions, columnId, dispatch]);
};
