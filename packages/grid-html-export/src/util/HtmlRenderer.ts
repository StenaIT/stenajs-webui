import { StandardTableConfig } from "@stenajs-webui/grid";
import {
  createHtmlConfig,
  CustomCellFormatters,
} from "../transformers/ConfigTransformer";

export const renderHtmlForStandardTable = async <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
) => {
  return createHtmlConfig(config, items, formatters);
};
