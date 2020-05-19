import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowType } from "../../../components/ui/table/TableHead";
import { useStandardTableContext } from "./UseStandardTableContext";

interface Result {
  selected: boolean;
  desc: boolean;
  arrow: ArrowType | undefined;
  onClickColumnHead: () => void;
}

export const useTableSortHeader = (columnId: string): Result => {
  const { selectors, actions } = useStandardTableContext();
  const { sortBy, desc } = useSelector(selectors.sortOrder.getState);
  const dispatch = useDispatch();

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
