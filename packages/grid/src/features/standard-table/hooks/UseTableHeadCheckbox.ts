import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState
} from "./UseStandardTableConfig";

export const useTableHeadCheckbox = <TItem>(
  items: Array<TItem> | undefined
) => {
  const { keyResolver } = useStandardTableConfig();
  const {
    selectedIds: { selectedIds }
  } = useStandardTableState();
  const {
    actions: {
      selectedIds: { setSelectedIds, clearSelectedIds }
    },
    dispatch
  } = useStandardTableActions();

  const allItemsAreSelected = !items
    ? false
    : items.length > 0 && selectedIds.length === items.length;

  const onClickCheckbox = useCallback(() => {
    if (items) {
      if (allItemsAreSelected) {
        dispatch(clearSelectedIds());
      } else {
        dispatch(setSelectedIds(items.map(item => keyResolver(item))));
      }
    }
  }, [
    allItemsAreSelected,
    clearSelectedIds,
    dispatch,
    items,
    keyResolver,
    setSelectedIds
  ]);

  return {
    selectionIsEmpty: selectedIds.length === 0,
    allItemsAreSelected,
    onClickCheckbox
  };
};
