import { StandardTableConfig } from "@stenajs-webui/grid";
import {
  createZipcelxConfig,
  CustomCellFormatters,
} from "../transformers/ConfigTransformer";
import zipcelx from "zipcelx";

export const downloadExcelForStandardTable = async <
  TItem,
  TColumnKey extends string | number | symbol = keyof TItem
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
) => {
  const excelConfig = createZipcelxConfig(filename, config, items, formatters);
  await zipcelx(excelConfig);
};
