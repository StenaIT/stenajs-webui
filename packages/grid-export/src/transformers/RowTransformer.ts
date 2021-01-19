import { StandardTableConfig } from "@stenajs-webui/grid";
import { flatten } from "lodash";
import { ZipCelXCell, ZipCelXRow } from "zipcelx";
import { StandardTableColumnGroupConfig } from "@stenajs-webui/grid";
import { transformItemToCell } from "./CellTransformer";
import { CustomCellFormatters } from "./ConfigTransformer";

export const transformTableRow = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  item: TItem,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
): ZipCelXRow => {
  return flatten(
    groupConfigs.map((groupConfig) =>
      groupConfig.columnOrder.map<ZipCelXCell>((columnId) =>
        transformCell(item, columnId, config, formatters)
      )
    )
  );
};

export const transformCell = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  item: TItem,
  columnId: TColumnKey,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
): ZipCelXCell => {
  const columnConfig = config.columns[columnId];
  const formatter = formatters?.[columnId];
  const value = columnConfig.itemValueResolver(item);
  const label = columnConfig.itemLabelFormatter?.(value, item);
  return transformItemToCell(value, label, formatter?.(item));
};
