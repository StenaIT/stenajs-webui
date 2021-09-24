import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";

export const useTableHeadCheckbox = <TItem>(
  items: Array<TItem> | undefined
) => {
  const { keyResolver } = useStandardTableConfig();
  const {
    selectedIds: { selectedIds },
  } = useStandardTableState();
  const {
    actions: { setSelectedIds, clearSelection },
    dispatch,
  } = useStandardTableActions();

  const selectionIsEmpty = selectedIds.length === 0;

  const allItemsAreSelected = !items
    ? false
    : items.length > 0 && selectedIds.length === items.length;

  const onClickCheckbox = useCallback(() => {
    if (items) {
      if (selectionIsEmpty) {
        dispatch(setSelectedIds(items.map((item) => keyResolver(item))));
      } else {
        dispatch(clearSelection());
      }
    }
  }, [
    selectionIsEmpty,
    clearSelection,
    dispatch,
    items,
    keyResolver,
    setSelectedIds,
  ]);

  return {
    selectionIsEmpty,
    allItemsAreSelected,
    onClickCheckbox,
  };
};
