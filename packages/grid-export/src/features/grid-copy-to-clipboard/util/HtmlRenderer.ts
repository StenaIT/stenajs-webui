import { StandardTableConfig } from "@stenajs-webui/grid";
import { CustomCellFormatters } from "../../../common/CellFormatters";
import { createHtmlConfig } from "../transformers/ConfigTransformer";

export const renderHtmlForStandardTable = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string,
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>,
) => {
  return createHtmlConfig(config, items, formatters);
};
