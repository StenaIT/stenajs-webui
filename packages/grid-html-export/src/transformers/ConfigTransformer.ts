import {
  createColumnConfigsForRows,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import {
  transformGroupHeaders,
  transformTableHeaders,
} from "./HeaderTransformer";
import { transformTableRow } from "./RowTransformer";

export type CustomCellFormatters<TItem, TColumnKey extends string> = Partial<
  Record<TColumnKey, CustomCellFormatter<TItem>>
>;

export type CustomCellFormatter<TItem> = (item: TItem) => string | number;

export const createHtmlConfig = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>
): string => {
  const groupConfigs = createColumnConfigsForRows(
    config.columnGroups,
    config.columnGroupOrder,
    config.columnOrder
  );

  const headerRows: Array<string> = [];
  if (config.columnGroups) {
    headerRows.push(transformGroupHeaders(groupConfigs).join(""));
  }
  headerRows.push(transformTableHeaders(config, groupConfigs).join(""));
  const header = `<thead>${headerRows
    .map((headerRow) => `<tr>${headerRow}</tr>`)
    .join("")}</thead>`;

  const tbodyRows = items
    .map((item) => transformTableRow(item, config, groupConfigs, formatters))
    .map((row) => `<tr>${row}</tr>`);

  const body = `<tbody>${tbodyRows.join("")}</tbody>`;
  return `<table>${header}${body}</table>`;
};
