import {
  formatColumnIdToHeaderCellLabel,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { flatten } from "lodash";
import { ZipCelXRow } from "zipcelx";
import { StandardTableColumnGroupConfig } from "@stenajs-webui/grid";

export const transformTableHeaders = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>
): ZipCelXRow => {
  return flatten(
    groupConfigs.map((groupConfig) =>
      groupConfig.columnOrder.map((columnId) => {
        const columnConfig = config.columns[columnId];
        return {
          type: "string",
          value:
            columnConfig.columnLabel ??
            formatColumnIdToHeaderCellLabel(String(columnId)),
        };
      })
    )
  );
};

export const transformGroupHeaders = <TColumnKey extends string>(
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>
): ZipCelXRow => {
  return flatten(
    groupConfigs.map((groupConfig) =>
      groupConfig.columnOrder.map((_, index) => {
        return {
          type: "string",
          value: index === 0 ? groupConfig.label ?? "" : "",
        };
      })
    )
  );
};
