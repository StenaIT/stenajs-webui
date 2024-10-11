import {
  StandardTableConfig,
  StandardTableConfigWithGroups,
} from "../../config/StandardTableConfig";

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
  TColumnKey extends string,
>(
  config: StandardTableConfigWithGroups<TItem, TColumnKey>,
): OffsetPerColumn<TColumnKey> => {
  const left =
    config.stickyColumnGroups === "first" ||
    config.stickyColumnGroups === "both"
      ? calculateOffsetForColumns(
          getColumnIdsForLeftSideStickyGroup(config),
          config.columns,
          true,
        )
      : undefined;

  const right =
    config.stickyColumnGroups === "last" || config.stickyColumnGroups === "both"
      ? calculateOffsetForColumns(
          getColumnIdsForRightSideStickyGroup(config),
          config.columns,
          false,
        )
      : undefined;

  return {
    ...left,
    ...right,
  } as OffsetPerColumn<TColumnKey>;
};

export const calculateOffsetForColumns = <TItem, TColumnKey extends string>(
  columnIds: Array<TColumnKey>,
  columns: StandardTableConfig<TItem, TColumnKey>["columns"],
  includeOffsetForCheckboxAndExpand: boolean,
): OffsetPerColumn<TColumnKey> => {
  const r = {} as OffsetPerColumn<TColumnKey>;
  const widths: Array<string> = [
    includeOffsetForCheckboxAndExpand ? "var(--current-left-offset)" : "0px",
  ];
  for (let i = 0; i < columnIds.length; i++) {
    const columnId = columnIds[i];
    const columnConfig = columns?.[columnId];
    r[columnId] = getCalcForWidths(widths);
    widths.push(columnConfig?.width ?? "0px");
  }
  return r;
};

const getCalcForWidths = (widths: Array<string>): string => {
  if (widths.length === 0) {
    return "0px";
  }
  if (widths.length === 1) {
    return widths[0];
  }
  return "calc(" + widths.join(" + ") + ")";
};

export const getColumnIdsForLeftSideStickyGroup = <
  TItem,
  TColumnKey extends string,
>(
  config: StandardTableConfigWithGroups<TItem, TColumnKey>,
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
  TColumnKey extends string,
>(
  config: StandardTableConfigWithGroups<TItem, TColumnKey>,
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
