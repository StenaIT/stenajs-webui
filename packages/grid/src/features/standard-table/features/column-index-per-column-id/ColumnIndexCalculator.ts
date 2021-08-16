import { StandardTableColumnConfig } from "../../config/StandardTableColumnConfig";
import { StandardTableConfig } from "../../config/StandardTableConfig";
import { createColumnConfigsForRows } from "../column-groups/ColumnGroupFactory";

export type ColumnIndexPerColumnId<TColumnKey extends string> = Record<
  TColumnKey,
  number
>;

export interface ColumnIndexPerColumnIdCalculationResult<
  TColumnKey extends string
> {
  columnIndexPerColumnId: ColumnIndexPerColumnId<TColumnKey>;
  numNavigableColumns: number;
}

export const calculateColumnIndexPerColumnId = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>
): ColumnIndexPerColumnIdCalculationResult<TColumnKey> => {
  const groupConfigs = createColumnConfigsForRows(
    "columnGroups" in config ? config.columnGroups : undefined,
    "columnGroupOrder" in config ? config.columnGroupOrder : undefined,
    "columnOrder" in config ? config.columnOrder : undefined
  );
  let columnIndexPerColumnId = {} as ColumnIndexPerColumnId<TColumnKey>;
  let currentIndex = 0;
  if (config.showRowCheckbox) {
    currentIndex++;
  }
  if (config.enableExpandCollapse) {
    currentIndex++;
  }
  groupConfigs.forEach((conf) => {
    conf.columnOrder.forEach((columnId) => {
      if (isColumnNavigable(config.columns[columnId])) {
        columnIndexPerColumnId[columnId] = currentIndex++;
      }
    });
  });
  return {
    columnIndexPerColumnId,
    numNavigableColumns: currentIndex,
  };
};

const isColumnNavigable = <TItem, TColumnKey extends string>(
  columnConfig: StandardTableColumnConfig<TItem, TColumnKey>
): boolean => !columnConfig.disableGridCell;
