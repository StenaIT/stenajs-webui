import { StandardTableColumnConfig } from "../config/StandardTableColumnConfig";
import { useGroupConfigsAndIdsForRows } from "../context/GroupConfigsAndIdsForRowsContext";
import { useStandardTableConfig } from "./UseStandardTableConfig";

export const useColumnConfigById = <TItem, TItemValue>(
  columnId: string
): StandardTableColumnConfig<TItem, TItemValue> => {
  const { columns } = useStandardTableConfig();
  const column = columns[columnId];
  if (!column) {
    throw new Error("No config for column with id=" + columnId);
  }
  return column;
};

export const useFirstColumnConfig = <TItem, TItemValue>():
  | StandardTableColumnConfig<TItem, TItemValue>
  | undefined => {
  const config = useStandardTableConfig();
  const columnId = useGroupConfigsAndIdsForRows()?.[0]?.groupConfig
    .columnOrder?.[0];
  return columnId ? config.columns[columnId] : undefined;
};

export const useLastColumnConfig = <TItem, TItemValue>():
  | StandardTableColumnConfig<TItem, TItemValue>
  | undefined => {
  const config = useStandardTableConfig();
  const groupConfigsAndIds = useGroupConfigsAndIdsForRows();
  const groupConfigAndId = groupConfigsAndIds[groupConfigsAndIds.length - 1];
  const columnId =
    groupConfigAndId?.groupConfig.columnOrder[
      groupConfigAndId.groupConfig.columnOrder.length - 1
    ] ?? undefined;
  return columnId ? config.columns[columnId] : undefined;
};
