import { useCallback } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";
import { filterItemsOnEnabledCheckboxes } from "../../util/FilterItemsOnEnabledCheckboxes";

export const useTableHeadCheckbox = <TItem>(
  items: Array<TItem> | undefined
) => {
  const { keyResolver, checkboxDisabledResolver } = useStandardTableConfig();
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
        dispatch(
          setSelectedIds(
            items
              .filter(filterItemsOnEnabledCheckboxes(checkboxDisabledResolver))
              .map((item) => keyResolver(item))
          )
        );
      } else {
        dispatch(clearSelection());
      }
    }
  }, [
    items,
    selectionIsEmpty,
    dispatch,
    setSelectedIds,
    checkboxDisabledResolver,
    keyResolver,
    clearSelection,
  ]);

  return {
    selectionIsEmpty,
    allItemsAreSelected,
    onClickCheckbox,
  };
};
