import {
  createGroupConfigAndIdsForRows,
  StandardTableConfig,
} from "@stenajs-webui/grid";
import { ZipCelXConfig, ZipCelXRow } from "zipcelx";
import {
  transformGroupHeaders,
  transformTableHeaders,
} from "./HeaderTransformer";
import { transformTableRow } from "./RowTransformer";
import { CustomCellFormatters } from "../../../common/CellFormatters";

export const createZipcelxConfig = <
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string,
>(
  filename: string,
  config: StandardTableConfig<TItem, TColumnKey, TColumnGroupKey>,
  items: Array<TItem>,
  formatters?: CustomCellFormatters<TItem, TColumnKey>,
): ZipCelXConfig => {
  const groupConfigsAndIds = createGroupConfigAndIdsForRows(
    "columnGroups" in config ? config.columnGroups : undefined,
    "columnGroupOrder" in config ? config.columnGroupOrder : undefined,
    "columnOrder" in config ? config.columnOrder : undefined,
  );

  const headerRows: Array<ZipCelXRow> = [];
  const groupConfigs = groupConfigsAndIds.map((p) => p.groupConfig);

  if ("columnGroups" in config) {
    headerRows.push(transformGroupHeaders(groupConfigs));
  }
  headerRows.push(transformTableHeaders(config, groupConfigs));

  return {
    filename,
    sheet: {
      data: [
        ...headerRows,
        ...items.map<ZipCelXRow>((item) =>
          transformTableRow(item, config, groupConfigs, formatters),
        ),
      ],
    },
  };
};
