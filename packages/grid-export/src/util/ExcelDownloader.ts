import { StandardTableConfig } from "@stenajs-webui/grid";
import {
  createZipcelxConfig,
  CustomCellFormatters,
} from "../transformers/ConfigTransformer";
import zipcelx from "zipcelx";

export const downloadExcelForStandardTable = async <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
) => {
  const excelConfig = createZipcelxConfig(filename, config, items, formatters);
  await zipcelx(excelConfig);
};
