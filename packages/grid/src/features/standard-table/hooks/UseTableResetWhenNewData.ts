import { useEffect } from "react";
import {
  useStandardTableActions,
  useStandardTableId
} from "./UseStandardTableConfig";
import { getReducerIdFor } from "../redux/ReducerIdFactory";

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
    dispatch({
      reducerId: getReducerIdFor(tableId, "selectedIds"),
      action: clearSelectedIds()
    });
  }, [items, dispatch, clearSelectedIds, tableId]);
};
