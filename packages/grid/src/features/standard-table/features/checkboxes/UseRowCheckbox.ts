import { useArraySet } from "@stenajs-webui/core";
import { useCallback, useMemo } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";
import { getIdsBetweenSelected } from "../../util/IdListPartial";

export const useRowCheckbox = <TItem>(
  item: TItem,
  itemIdList: Array<string>
) => {
  const { keyResolver } = useStandardTableConfig();

  const {
    selectedIds: { selectedIds },
    fields: { lastSelectedId },
  } = useStandardTableState();
  const {
    actions: { setSelectedIds, setLastSelectedId },
    dispatch,
  } = useStandardTableActions();

  const itemKey = useMemo(() => keyResolver(item), [keyResolver, item]);

  const isSelected = useMemo(() => selectedIds.includes(itemKey), [
    selectedIds,
    itemKey,
  ]);

  const { toggle, addMultiple, removeMultiple } = useArraySet(
    selectedIds,
    (ids: Array<string>) => dispatch(setSelectedIds(ids))
  );

  const shiftAndToggleSelected = useCallback(() => {
    if (itemIdList && lastSelectedId) {
      const idList = getIdsBetweenSelected(itemIdList, lastSelectedId, itemKey);
      if (idList?.length) {
        if (isSelected) {
          removeMultiple(idList);
        } else {
          addMultiple(idList);
        }
      } else {
        toggle(itemKey);
      }
    } else {
      toggle(itemKey);
    }
    dispatch(setLastSelectedId(itemKey));
  }, [
    itemIdList,
    lastSelectedId,
    dispatch,
    setLastSelectedId,
    itemKey,
    isSelected,
    removeMultiple,
    addMultiple,
    toggle,
  ]);

  const toggleSelected = useCallback(() => {
    toggle(itemKey);
    dispatch(setLastSelectedId(itemKey));
  }, [toggle, itemKey, dispatch, setLastSelectedId]);

  return {
    isSelected,
    toggleSelected,
    shiftAndToggleSelected,
  };
};
