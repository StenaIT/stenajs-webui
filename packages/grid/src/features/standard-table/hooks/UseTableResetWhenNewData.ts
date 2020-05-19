import { useEffect } from "react";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useTableResetWhenNewData = <TItem>(
  items: Array<TItem> | undefined
) => {
  const {
    actions: {
      selectedIds: { clearSelectedIds }
    },
    dispatch
  } = useStandardTableContext();

  useEffect(() => {
    dispatch(clearSelectedIds());
  }, [items, dispatch, clearSelectedIds]);
};
