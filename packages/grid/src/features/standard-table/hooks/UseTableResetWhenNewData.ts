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
    actions: { clearSelection },
    dispatch
  } = useStandardTableActions();

  useEffect(() => {
    dispatch(clearSelection());
  }, [items, dispatch, clearSelection, tableId]);
};
