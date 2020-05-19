import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useArraySet } from "@stenajs-webui/core";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useRowCheckbox = <TItem>(item: TItem) => {
  const {
    selectors: {
      selectedIds: { getState }
    },
    config: { keyResolver },
    actions: {
      selectedIds: { setSelectedIds }
    }
  } = useStandardTableContext();

  const { selectedIds } = useSelector(getState);
  const dispatch = useDispatch();

  const itemKey = useMemo(() => keyResolver(item), [keyResolver, item]);

  const isSelected = useMemo(() => selectedIds.indexOf(itemKey) >= 0, [
    selectedIds,
    itemKey
  ]);

  const { toggle } = useArraySet(selectedIds, (ids: Array<string>) =>
    dispatch(setSelectedIds(ids))
  );

  const toggleSelected = useCallback(() => {
    toggle(itemKey);
  }, [toggle, itemKey]);

  return {
    isSelected,
    toggleSelected
  };
};
