import { useArraySet } from "@stenajs-webui/core";
import { useCallback, useMemo } from "react";
import { useStandardTableContext } from "./UseStandardTableContext";

export const useRowCheckbox = <TItem>(item: TItem) => {
  const {
    config: { keyResolver },
    state: {
      selectedIds: { selectedIds }
    },
    actions: {
      selectedIds: { setSelectedIds }
    },
    dispatch
  } = useStandardTableContext();

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
