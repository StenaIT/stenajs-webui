import { StandardTableConfig } from "../config/StandardTableConfig";

export const ensureConfigHasValidSticky = <TItem, TColumnKey extends string>(
  config: StandardTableConfig<TItem, TColumnKey>
): void => {
  if (config.columnGroupOrder) {
    ensureNoMoreThanFirstAndLastColumnGroupIsSticky(config);
    ensureNoColumnsAreSticky(config);
    if (firstColumnGroupIsSticky(config)) {
      ensureAllColumnsInFirstGroupHasFixedWidth(config);
    }
  }
};

export const ensureNoColumnsAreSticky = <TItem, TColumnKey extends string>(
  config: StandardTableConfig<TItem, TColumnKey>
): void => {
  const columnIds = Object.keys(config.columns);
  columnIds.forEach((columnId) => {
    const columnConfig = config.columns[columnId];
    if (columnConfig.sticky) {
      throw new Error(
        "Columns can not be sticky when column groups are used. columnId: " +
          columnIds
      );
    }
  });
};

export const ensureNoMoreThanFirstAndLastColumnGroupIsSticky = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey>
): void => {
  if (!config.columnGroupOrder) {
    throw new Error(
      "columnGroupOrder required when validating column group sticky."
    );
  }
  const lastIndex = config.columnGroupOrder.length - 1;
  config.columnGroupOrder?.forEach((columnGroupId, index) => {
    const columnGroupConfig = config.columnGroups?.[columnGroupId];
    if (index > 0 && index < lastIndex && columnGroupConfig?.sticky) {
      throw new Error("Only the first and last column group can be sticky.");
    }
  });
};

export const firstColumnGroupIsSticky = <TItem, TColumnKey extends string>(
  config: StandardTableConfig<TItem, TColumnKey>
): boolean => {
  const columnGroupId = config.columnGroupOrder?.[0];
  const columnGroupConfig = columnGroupId
    ? config.columnGroups?.[columnGroupId]
    : undefined;
  return columnGroupConfig?.sticky ?? false;
};

export const ensureAllColumnsInFirstGroupHasFixedWidth = <
  TItem,
  TColumnKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey>
): void => {
  if (!config.columnGroupOrder || config.columnGroupOrder.length === 0) {
    throw new Error(
      "columnGroupOrder required when validating column group fixed width."
    );
  }

  const columnGroupId = config.columnGroupOrder[0];
  const columnGroupConfig = config.columnGroups?.[columnGroupId];

  if (!columnGroupConfig) {
    throw new Error(
      "Column group does not exist. Column group id = " + columnGroupId
    );
  }

  columnGroupConfig.columnOrder.forEach((columnId) => {
    const columnConfig = config.columns[columnId];
    if (columnConfig.width == null) {
      throw new Error(
        "All columns in sticky column group must have width set."
      );
    }
  });
};
