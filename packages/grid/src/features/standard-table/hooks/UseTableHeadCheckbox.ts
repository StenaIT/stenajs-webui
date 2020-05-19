import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useTableHeadCheckbox = <TItem>(
  items: Array<TItem> | undefined
) => {
  const {
    config: { keyResolver }
  } = useStandardTableContext();
  const {
    selectors: {
      selectedIds: { getState }
    },
    actions: {
      selectedIds: { setSelectedIds, clearSelectedIds }
    }
  } = useStandardTableContext();

  const dispatch = useDispatch();

  const { selectedIds } = useSelector(getState);

  const allItemsAreSelected = useMemo(() => {
    if (!items) {
      return false;
    }
    return items.length > 0 && selectedIds.length === items.length;
  }, [items, selectedIds]);

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
