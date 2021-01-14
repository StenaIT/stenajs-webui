import {
  StandardTableConfig,
  formatColumnIdToHeaderCellLabel,
} from "@stenajs-webui/grid";
import { ZipCelXCell, ZipCelXConfig, ZipCelXRow } from "zipcelx";
import { format } from "date-fns";

export const createZipcelxConfig = <
  TItem,
  TColumnKeys extends string | number | symbol = keyof TItem
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKeys>,
  items: Array<TItem>
): ZipCelXConfig => {
  const columnConfigs = config.columnOrder.map(
    (columnId) => config.columns[columnId]
  );

  return {
    filename,
    sheet: {
      data: [
        transformTableHeaders(config),
        ...items.map<ZipCelXRow>((item) => {
          return columnConfigs.map<ZipCelXCell>((columnConfig) => {
            const value = columnConfig.itemValueResolver(item);
            const label = columnConfig.itemLabelFormatter?.(value, item);
            return transformItemToCell(value, label);
          });
        }),
      ],
    },
  };
};

export const transformTableHeaders = <
  TItem,
  TColumnKeys extends string | number | symbol = keyof TItem
>(
  config: StandardTableConfig<TItem, TColumnKeys>
): ZipCelXRow => {
  return config.columnOrder.map((columnId) => {
    const columnConfig = config.columns[columnId];
    return {
      type: "string",
      value:
        columnConfig.columnLabel ??
        formatColumnIdToHeaderCellLabel(String(columnId)),
    };
  });
};

export const transformItemToCell = <TValue>(
  value: TValue,
  label: string | undefined
): ZipCelXCell => {
  if (label) {
    return {
      type: "string",
      value: label,
    };
  }

  if (typeof value === "number") {
    return {
      type: "number",
      value: value,
    };
  }

  if (value instanceof Date) {
    return {
      type: "string",
      value: format(value, "yyyy-MM-dd HH:mm"),
    };
  }

  return {
    type: "string",
    value: String(value),
  };
};
