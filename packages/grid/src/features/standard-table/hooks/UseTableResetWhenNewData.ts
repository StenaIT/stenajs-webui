import { useEffect } from "react";
import {
  useStandardTableActions,
  useStandardTableId
} from "./UseStandardTableConfig";

export const useTableResetWhenNewData = <TItem>(
  items: Array<TItem> | undefined
) => {
  const tableId = useStandardTableId();
  const {
    actions: {
      selectedIds: { clearSelectedIds }
    },
    dispatch
  } = useStandardTableActions();

  useEffect(() => {
    dispatch({ reducerId: tableId, action: clearSelectedIds() });
  }, [items, dispatch, clearSelectedIds, tableId]);
};
