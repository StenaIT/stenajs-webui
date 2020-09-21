import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "./UseStandardTableConfig";

export const useTableHeadCheckbox = <TItem>(
  items: Array<TItem> | undefined
) => {
  const { keyResolver } = useStandardTableConfig();
  const {
    selectedIds: { selectedIds },
  } = useStandardTableState();
  const {
    actions: { selectByIds, clearSelection },
    dispatch,
  } = useStandardTableActions();

  const allItemsAreSelected = !items
    ? false
    : items.length > 0 && selectedIds.length === items.length;

  const onClickCheckbox = useCallback(() => {
    if (items) {
      if (allItemsAreSelected) {
        dispatch(clearSelection());
      } else {
        dispatch(selectByIds(items.map((item) => keyResolver(item))));
      }
    }
  }, [
    allItemsAreSelected,
    clearSelection,
    dispatch,
    items,
    keyResolver,
    selectByIds,
  ]);

  return {
    selectionIsEmpty: selectedIds.length === 0,
    allItemsAreSelected,
    onClickCheckbox,
  };
};
