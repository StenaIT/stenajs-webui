import * as React from "react";
import { useCallback } from "react";
import { downloadExcelForStandardTable } from "../util/ExcelDownloader";
import { StandardTableProps } from "@stenajs-webui/grid";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons/faFileDownload";
import { CustomCellFormatters } from "../transformers/ConfigTransformer";

interface StandardTableExcelExportButtonProps<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
> extends Pick<
      StandardTableProps<TItem, TColumnKey, TColumnGroupKey>,
      "config" | "items"
    >,
    Pick<FlatButtonProps, "size"> {
  filename?: string;
  formatters?: CustomCellFormatters<TItem, TColumnKey>;
}

export const StandardTableExcelExportButton = function StandardTableExcelExportButton<
  TItem,
  TColumnKey extends string,
  TColumnGroupKey extends string
>({
  config,
  size,
  items,
  filename = "exported-spreadsheet",
  formatters,
}: StandardTableExcelExportButtonProps<TItem, TColumnKey, TColumnGroupKey>) {
  const onClickExportExcel = useCallback(async () => {
    if (items && items.length) {
      await downloadExcelForStandardTable(filename, config, items, formatters);
    }
  }, [config, items, filename, formatters]);

  return (
    <FlatButton
      size={size}
      leftIcon={faFileDownload}
      onClick={onClickExportExcel}
      disabled={!items || !items.length}
    />
  );
};
