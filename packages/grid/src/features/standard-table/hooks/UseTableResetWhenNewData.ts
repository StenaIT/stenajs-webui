import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useTableResetWhenNewData = <TItem>(
  items: Array<TItem> | undefined
) => {
  const dispatch = useDispatch();
  const {
    actions: {
      selectedIds: { clearSelectedIds }
    }
  } = useStandardTableContext();

  useEffect(() => {
    dispatch(clearSelectedIds());
  }, [items, dispatch, clearSelectedIds]);
};
