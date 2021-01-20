import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";

export const useTableHeadExpandCollapse = <TItem>(
  items: Array<TItem> | undefined
) => {
  const { keyResolver } = useStandardTableConfig();
  const {
    expandedRows: { selectedIds },
  } = useStandardTableState();
  const {
    actions: { collapseAll, expandByIds },
    dispatch,
  } = useStandardTableActions();

  const allItemsAreExpanded = !items
    ? false
    : items.length > 0 && selectedIds.length === items.length;

  const toggleExpanded = useCallback(() => {
    if (items) {
      if (allItemsAreExpanded) {
        dispatch(collapseAll());
      } else {
        dispatch(expandByIds(items.map((item) => keyResolver(item))));
      }
    }
  }, [
    allItemsAreExpanded,
    collapseAll,
    dispatch,
    items,
    keyResolver,
    expandByIds,
  ]);

  return {
    allItemsAreExpanded,
    toggleExpanded: toggleExpanded,
  };
};
