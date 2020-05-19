import { useMemo } from "react";
import { ArrowType } from "../../../components/ui/table/TableHead";
import { useStandardTableContext } from "./UseStandardTableContext";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useTableSortHeader = (columnId: string): Result => {
  const {
    dispatch,
    state: {
      sortOrder: { desc, sortBy }
    },
    actions
  } = useStandardTableContext();

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
