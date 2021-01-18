import { StandardTableColumnConfig } from "../config/StandardTableConfig";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { useStandardTableConfig } from "./UseStandardTableConfig";
import { StandardTableColumnGroupConfig } from "../config/StandardTableColumnGroupConfig";

export const useColumnGroupFromConfig = <TColumnGroupKey extends string>(
  groupId: string
): StandardTableColumnGroupConfig<TColumnGroupKey> => {
  const { columnGroups } = useStandardTableConfig<
    unknown,
    "",
    TColumnGroupKey
  >();
  if (columnGroups == null) {
    throw new Error("Column groups is not set.");
  }
  const columnGroup = columnGroups[groupId];
  if (!columnGroup) {
    throw new Error("No config for column group with id=" + groupId);
  }
  return columnGroup;
};

export const useColumnFromConfig = <TItem, TItemValue = any>(
  columnId: string
): StandardTableColumnConfig<TItem, TItemValue> => {
  const { columns } = useStandardTableConfig();
  const column = columns[columnId];
  if (!column) {
    throw new Error("No config for column with id=" + columnId);
  }
  return column;
};

export const useFirstColumnFromConfig = () => {
  const config = useStandardTableConfig();
  const columnId = useGroupConfigsForRows()[0].columnOrder[0];
  return config.columns[columnId];
};

export const useLastColumnFromConfig = () => {
  const config = useStandardTableConfig();
  const groupConfigs = useGroupConfigsForRows();
  const groupConfig = groupConfigs[groupConfigs.length - 1];
  const columnId = groupConfig.columnOrder[groupConfig.columnOrder.length - 1];
  return config.columns[columnId];
};
