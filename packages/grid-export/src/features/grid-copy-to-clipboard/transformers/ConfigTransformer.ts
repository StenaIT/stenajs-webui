import {
  createGroupConfigAndIdsForRows,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import {
  transformGroupHeaders,
  transformTableHeaders,
} from "./HeaderTransformer";
import { transformTableRow } from "./RowTransformer";
import { CustomCellFormatters } from "../../../common/CellFormatters";

export const createHtmlConfig = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string,
>(
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>,
): string => {
  const groupConfigsAndIds = createGroupConfigAndIdsForRows(
    "columnGroups" in config ? config.columnGroups : undefined,
    "columnGroupOrder" in config ? config.columnGroupOrder : undefined,
    "columnOrder" in config ? config.columnOrder : undefined,
  );

  const headerRows: Array<string> = [];
  const groupConfigs = groupConfigsAndIds.map((p) => p.groupConfig);

  if ("columnGroups" in config) {
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
