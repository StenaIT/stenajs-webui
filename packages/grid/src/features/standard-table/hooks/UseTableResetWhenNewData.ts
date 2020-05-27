import { useEffect } from "react";
import { useStandardTableActions } from "./UseStandardTableConfig";

export const useTableResetWhenNewData = <TItem>(
  items: Array<TItem> | undefined
) => {
  const {
    actions: {
      selectedIds: { clearSelectedIds }
    },
    dispatch
  } = useStandardTableActions();

  useEffect(() => {
    dispatch(clearSelectedIds());
  }, [items, dispatch, clearSelectedIds]);
};
