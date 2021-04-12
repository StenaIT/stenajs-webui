import {
  formatColumnIdToHeaderCellLabel,
  StandardTableColumnGroupConfig,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { flatten } from "lodash";

export const transformTableHeaders = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>
): string[] => {
  return flatten(
    groupConfigs.map((groupConfig) =>
      groupConfig.columnOrder.map((columnId) => {
        const columnConfig = config.columns[columnId];
        return `<th style="text-align: left">${
          columnConfig.columnLabel ??
          formatColumnIdToHeaderCellLabel(String(columnId))
        }</th>`;
      })
    )
  );
};

export const transformGroupHeaders = <TColumnKey extends string>(
  groupConfigs: Array<StandardTableColumnGroupConfig<TColumnKey>>
): string[] => {
  return flatten(
    groupConfigs.map((groupConfig) => {
      return `<th style="text-align: left" colspan="${
        groupConfig.columnOrder.length
      }">${groupConfig.label ?? ""}</th>`;
    })
  );
};
