import {
  formatColumnIdToHeaderCellLabel,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { ZipCelXCell, ZipCelXConfig, ZipCelXRow } from "zipcelx";
import { transformItemToCell } from "./CellTransformer";

export type CustomCellFormatters<
  TItem,
  TColumnKey extends string | number | symbol = keyof TItem
> = Partial<Record<TColumnKey, CustomCellFormatter<TItem>>>;

export type CustomCellFormatter<TItem> = (item: TItem) => string | number;

export const createZipcelxConfig = <
  TItem,
  TColumnKey extends string | number | symbol = keyof TItem
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
): ZipCelXConfig => ({
  filename,
  sheet: {
    data: [
      transformTableHeaders(config),
      ...items.map<ZipCelXRow>((item) => {
        return config.columnOrder.map<ZipCelXCell>((columnId) => {
          const columnConfig = config.columns[columnId];
          const formatter = formatters?.[columnId];
          const value = columnConfig.itemValueResolver(item);
          const label = columnConfig.itemLabelFormatter?.(value, item);
          return transformItemToCell(value, label, formatter?.(item));
        });
      }),
    ],
  },
});

export const transformTableHeaders = <
  TItem,
  TColumnKey extends string | number | symbol = keyof TItem
>(
  config: StandardTableConfig<TItem, TColumnKey>
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
