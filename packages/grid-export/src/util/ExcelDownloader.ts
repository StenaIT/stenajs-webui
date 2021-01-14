import { StandardTableConfig } from "@stenajs-webui/grid";
import { createZipcelxConfig } from "../transformers/ConfigTransformer";
import zipcelx from "zipcelx";

export const downloadExcelForStandardTable = async <
  TItem,
  TColumnKeys extends string | number | symbol = keyof TItem
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKeys>,
  items: Array<TItem>
) => {
  const excelConfig = createZipcelxConfig(filename, config, items);
  await zipcelx(excelConfig);
};
