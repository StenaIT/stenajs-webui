import {
  StandardTableConfig,
  StandardTableConfigWithGroups,
  StandardTableConfigWithNoGroups,
} from "../../config/StandardTableConfig";
import { calculateOffsetForColumnInStickyColumnGroups } from "./StickyColumnGroupOffsetCalculator";
import { StickyPropsPerColumn } from "./types";

export const getStickyPropsPerColumn = <TItem, TColumnKey extends string>(
  config: StandardTableConfig<TItem, TColumnKey>
): StickyPropsPerColumn<TColumnKey> => {
  if ("columnGroups" in config) {
    return getStickyPropsPerColumnWithGroups(config);
  } else {
    return getStickyPropsPerColumnWithNoGroups(config);
  }
};

export const getStickyPropsPerColumnWithNoGroups = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfigWithNoGroups<TItem, TColumnKey>
): StickyPropsPerColumn<TColumnKey> => {
  const columnIds = Object.keys(config.columns) as Array<TColumnKey>;

  return columnIds.reduce<StickyPropsPerColumn<TColumnKey>>((sum, columnId) => {
    const columnConfig = config.columns[columnId];
    const sticky = Boolean(columnConfig.sticky);
    sum[columnId] = {
      sticky,
      left: sticky
        ? `calc(var(--current-left-offset) + ${columnConfig.left ?? "0px"})`
        : undefined,
      right: sticky ? columnConfig.right : undefined,
      type: "column",
      isFirstColumnInLastGroup: false,
      isLastColumnInFirstGroup: false,
    };
    return sum;
  }, {} as StickyPropsPerColumn<TColumnKey>);
};

export const getStickyPropsPerColumnWithGroups = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfigWithGroups<TItem, TColumnKey>
): StickyPropsPerColumn<TColumnKey> => {
  const r = {} as StickyPropsPerColumn<TColumnKey>;
  const columnGroupIds = config.columnGroupOrder;

  const stickyGroupOffsets =
    calculateOffsetForColumnInStickyColumnGroups(config);

  const firstGroupIsSticky =
    config.stickyColumnGroups === "first" ||
    config.stickyColumnGroups === "both";

  const lastGroupIsSticky =
    config.stickyColumnGroups === "last" ||
    config.stickyColumnGroups === "both";

  columnGroupIds.forEach((columnGroupId, columnGroupIndex) => {
    const columnGroup = config.columnGroups[columnGroupId];
    const columnIds = columnGroup.columnOrder;

    columnIds.forEach((columnId, columnIndex) => {
      const isFirstGroup = columnGroupIndex === 0;
      const isLastGroup = columnGroupIndex === columnGroupIds.length - 1;
      const isStickyFirst = isFirstGroup && firstGroupIsSticky;
      const isStickyLast = isLastGroup && lastGroupIsSticky;
      const isFirstColumnInLastGroup = columnIndex === 0 && isLastGroup;
      const isLastColumnInFirstGroup =
        columnIndex === columnIds.length - 1 && isFirstGroup;

      r[columnId] = {
        sticky: isStickyFirst || isStickyLast,
        left: isStickyFirst ? stickyGroupOffsets[columnId] : undefined,
        right: isStickyLast ? stickyGroupOffsets[columnId] : undefined,
        type: isStickyFirst
          ? "first-group"
          : isStickyLast
          ? "last-group"
          : undefined,
        isFirstColumnInLastGroup,
        isLastColumnInFirstGroup,
      };
    });
  });

  return r;
};
