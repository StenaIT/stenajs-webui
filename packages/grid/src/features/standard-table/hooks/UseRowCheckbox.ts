import { useArraySet } from "@stenajs-webui/core";
import { useCallback, useMemo } from "react";
import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableId,
  useStandardTableState
} from "./UseStandardTableConfig";

export const useRowCheckbox = <TItem>(item: TItem) => {
  const { keyResolver } = useStandardTableConfig();
  const tableId = useStandardTableId();
  const {
    selectedIds: { selectedIds }
  } = useStandardTableState();
  const {
    actions: {
      selectedIds: { setSelectedIds }
    },
    dispatch
  } = useStandardTableActions();

  const itemKey = useMemo(() => keyResolver(item), [keyResolver, item]);

  const isSelected = useMemo(() => selectedIds.includes(itemKey), [
    selectedIds,
    itemKey
  ]);

  const { toggle } = useArraySet(selectedIds, (ids: Array<string>) =>
    dispatch({ reducerId: tableId, action: setSelectedIds(ids) })
  );

  const toggleSelected = useCallback(() => {
    toggle(itemKey);
  }, [toggle, itemKey]);

  return {
    isSelected,
    toggleSelected
  };
};
