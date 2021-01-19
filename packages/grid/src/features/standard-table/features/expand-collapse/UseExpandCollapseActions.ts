import {
  useStandardTableActions,
  useStandardTableConfig,
  useStandardTableState,
} from "../../hooks/UseStandardTableConfig";
import { useCallback, useMemo } from "react";
import { useArraySet } from "@stenajs-webui/core";

export const useExpandCollapseActions = <TItem>(item: TItem) => {
  const { keyResolver } = useStandardTableConfig();
  const {
    expandedRows: { selectedIds },
  } = useStandardTableState();
  const {
    actions: { expandByIds },
    dispatch,
  } = useStandardTableActions();

  const itemKey = useMemo(() => keyResolver(item), [keyResolver, item]);

  const isExpanded = useMemo(() => selectedIds.includes(itemKey), [
    selectedIds,
    itemKey,
  ]);

  const { toggle } = useArraySet(selectedIds, (ids: Array<string>) =>
    dispatch(expandByIds(ids))
  );

  const toggleRowExpanded = useCallback(() => {
    toggle(itemKey);
  }, [toggle, itemKey]);

  return {
    toggleRowExpanded,
    isExpanded,
  };
};
