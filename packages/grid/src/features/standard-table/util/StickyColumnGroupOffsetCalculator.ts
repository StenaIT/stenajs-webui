import { StandardTableConfig } from "../config/StandardTableConfig";

export type OffsetPerColumn<TColumnKey extends string> = Record<
  TColumnKey,
  string
>;

/**
 * This methods assumes that the config has already been validated to be correct.
 * @param columnIds
 * @param columns
 */
export const calculateOffsetForColumnInStickyColumnGroup = <
  TItem,
  TColumnKey extends string
>(
  columnIds: Array<TColumnKey>,
  columns: StandardTableConfig<TItem, TColumnKey>["columns"]
): OffsetPerColumn<TColumnKey> => {
  const r = {} as OffsetPerColumn<TColumnKey>;
  const widths: Array<string> = ["0px"];
  for (let i = 0; i < columnIds.length; i++) {
    const columnId = columnIds[i];
    const columnConfig = columns?.[columnId];
    r[columnId] = "calc(" + widths.join(" + ") + ")";
    widths.push(columnConfig?.width ?? "0px");
  }
  return r;
};

export const getColumnIdsForLeftSideStickyGroup = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey>
): Array<TColumnKey> => {
  const columnGroupId = config.columnGroupOrder?.[0];
  if (!columnGroupId) {
    return [];
  }
  const columnGroupConfig = config.columnGroups?.[columnGroupId];
  return columnGroupConfig?.columnOrder ?? [];
};

export const getColumnIdsForRightSideStickyGroup = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey>
): Array<TColumnKey> => {
  const columnGroupId =
    config.columnGroupOrder?.[config.columnGroupOrder?.length - 1];
  if (!columnGroupId) {
    return [];
  }
  const columnGroupConfig = config.columnGroups?.[columnGroupId];

  if (!columnGroupConfig) {
    return [];
  }

  const r = [...columnGroupConfig.columnOrder];
  r.reverse();
  return r;
};
