import { StandardTableConfig } from "../config/StandardTableConfig";

export type OffsetPerColumn<TColumnKey extends string> = Record<
  TColumnKey,
  string
>;

/**
 * This methods assumes that the config has already been validated to be correct.
 * @param config
 */
export const calculateOffsetForColumnInStickyColumnGroups = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey>
): OffsetPerColumn<TColumnKey> => {
  const firstColumnGroupId = config.columnGroupOrder?.[0];
  const lastColumnGroupId =
    config.columnGroupOrder?.[config.columnGroupOrder?.length - 1];

  const firstColumnConfig = firstColumnGroupId
    ? config.columnGroups?.[firstColumnGroupId]
    : undefined;
  const lastColumnConfig = lastColumnGroupId
    ? config.columnGroups?.[lastColumnGroupId]
    : undefined;

  const left = firstColumnConfig?.sticky
    ? calculateOffsetForColumns(
        getColumnIdsForLeftSideStickyGroup(config),
        config.columns
      )
    : undefined;

  const right = lastColumnConfig?.sticky
    ? calculateOffsetForColumns(
        getColumnIdsForRightSideStickyGroup(config),
        config.columns
      )
    : undefined;

  return {
    ...left,
    ...right,
  } as OffsetPerColumn<TColumnKey>;
};

export const calculateOffsetForColumns = <TItem, TColumnKey extends string>(
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
