import {
  StandardTableColumnGroupConfig,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { flatten } from "lodash-es";
import { transformItemToCell } from "./CellTransformer";
import { CustomCellFormatters } from "../../../common/CellFormatters";

export const transformTableRow = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  item: TItem,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
): string => {
  return flatten(
    groupConfigs.map((groupConfig) =>
      groupConfig.columnOrder.map<string>((columnId) =>
        transformCell(item, columnId, config, formatters)
      )
    )
  ).join("");
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
): string => {
  const columnConfig = config.columns[columnId];
  const formatter = formatters?.[columnId];
  return transformItemToCell(
    item,
    columnConfig.itemValueResolver,
    columnConfig.justifyContentCell,
    columnConfig.itemLabelFormatter,
    formatter
  );
};
