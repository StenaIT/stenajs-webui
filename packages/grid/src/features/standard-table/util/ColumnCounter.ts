import { StandardTableConfig } from "../config/StandardTableConfig";

export const getTotalNumColumns = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string = string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>
): number =>
  (config.rowIndent ? 2 : 0) +
  (config.enableExpandCollapse ? 1 : 0) +
  (config.showRowCheckbox ? 1 : 0) +
  getNumUserColumns(config);

const getNumUserColumns = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string = string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>
): number => {
  if ("columnGroupOrder" in config) {
    return config.columnGroupOrder.reduce<number>((sum, groupId) => {
      const group = config.columnGroups?.[groupId];
      return sum + (group?.columnOrder?.length ?? 0);
    }, 0);
  }

  return config.columnOrder?.length ?? 0;
};
