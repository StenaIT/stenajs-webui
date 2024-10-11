import {
  StandardTableConfig,
  StandardTableConfigWithGroups,
} from "../../config/StandardTableConfig";

export const ensureConfigHasValidSticky = <
  TItem extends object,
  TColumnKey extends string,
>(
  config: StandardTableConfig<TItem, TColumnKey>,
): void => {
  if ("columnGroupOrder" in config) {
    ensureNoColumnsAreSticky(config);
    if (
      config.stickyColumnGroups === "first" ||
      config.stickyColumnGroups === "both"
    ) {
      ensureAllColumnsInGroupHasFixedWidth(config, 0);
    }
    if (
      config.stickyColumnGroups === "last" ||
      config.stickyColumnGroups === "both"
    ) {
      ensureAllColumnsInGroupHasFixedWidth(
        config,
        config.columnGroupOrder.length - 1,
      );
    }
  }
};

export const ensureNoColumnsAreSticky = <
  TItem extends object,
  TColumnKey extends string,
>(
  config: StandardTableConfig<TItem, TColumnKey>,
): void => {
  const columnIds = Object.keys(config.columns) as Array<TColumnKey>;
  columnIds.forEach((columnId) => {
    const columnConfig = config.columns[columnId];
    if ("sticky" in columnConfig && columnConfig.sticky) {
      throw new Error(
        "Columns can not be sticky when column groups are used. columnId: " +
          columnId,
      );
    }
  });
};

export const ensureAllColumnsInGroupHasFixedWidth = <
  TItem,
  TColumnKey extends string,
>(
  config: StandardTableConfigWithGroups<TItem, TColumnKey>,
  columnGroupIndex: number,
): void => {
  if (!config.columnGroupOrder || config.columnGroupOrder.length === 0) {
    throw new Error(
      "columnGroupOrder required when validating column group fixed width.",
    );
  }

  const columnGroupId = config.columnGroupOrder[columnGroupIndex];
  const columnGroupConfig = config.columnGroups?.[columnGroupId];

  if (!columnGroupConfig) {
    throw new Error(
      "Column group does not exist. Column group id = " + columnGroupId,
    );
  }

  columnGroupConfig.columnOrder.forEach((columnId) => {
    const columnConfig = config.columns[columnId];
    if (columnConfig.width == null) {
      throw new Error(
        "All columns in sticky column group must have width set.",
      );
    }
  });
};
