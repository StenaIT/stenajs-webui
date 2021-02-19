import {
  StandardTableColumnGroupConfig,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { flatten } from "lodash";
import { ZipCelXCell, ZipCelXRow } from "zipcelx";
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
  return transformItemToCell(
    item,
    columnConfig.itemValueResolver,
    columnConfig.itemLabelFormatter,
    formatter
  );
};
