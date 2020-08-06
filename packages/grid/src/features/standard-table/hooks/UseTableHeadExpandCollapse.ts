import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableId,
  useStandardTableState
} from "./UseStandardTableConfig";
import { getReducerIdFor } from "../redux/ReducerIdFactory";

export const useTableHeadExpandCollapse = <TItem>(
  items: Array<TItem> | undefined
) => {
  const tableId = useStandardTableId();
  const { keyResolver } = useStandardTableConfig();
  const {
    expandedRows: { selectedIds }
  } = useStandardTableState();
  const {
    actions: {
      expandedRows: { setSelectedIds, clearSelectedIds }
    },
    dispatch
  } = useStandardTableActions();

  const allItemsAreExpanded = !items
    ? false
    : items.length > 0 && selectedIds.length === items.length;

  const toggleExpanded = useCallback(() => {
    if (items) {
      if (allItemsAreExpanded) {
        dispatch({
          reducerId: getReducerIdFor(tableId, "expandedRows"),
          action: clearSelectedIds()
        });
      } else {
        dispatch({
          reducerId: getReducerIdFor(tableId, "expandedRows"),
          action: setSelectedIds(items.map(item => keyResolver(item)))
        });
      }
    }
  }, [
    tableId,
    allItemsAreExpanded,
    clearSelectedIds,
    dispatch,
    items,
    keyResolver,
    setSelectedIds
  ]);

  return {
    allItemsAreExpanded,
    toggleExpanded: toggleExpanded
  };
};
