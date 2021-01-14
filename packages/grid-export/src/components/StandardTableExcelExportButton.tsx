import * as React from "react";
import { useCallback } from "react";
import { downloadExcelForStandardTable } from "../util/ExcelDownloader";
import { StandardTableProps } from "@stenajs-webui/grid";
import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons/faFileDownload";

interface StandardTableExcelExportButtonProps<TItem, TColumnKey extends string>
  extends Pick<StandardTableProps<TItem, TColumnKey>, "config" | "items">,
    Pick<FlatButtonProps, "size"> {
  filename?: string;
}

export const StandardTableExcelExportButton = function StandardTableExcelExportButton<
  TItem,
  TColumnKey extends string
>({
  config,
  size,
  items,
  filename = "exported-spreadsheet",
}: StandardTableExcelExportButtonProps<TItem, TColumnKey>) {
  const onClickExportExcel = useCallback(async () => {
    if (items && items.length) {
      await downloadExcelForStandardTable(filename, config, items);
    }
  }, [config, items, filename]);

  return (
    <FlatButton
      size={size}
      leftIcon={faFileDownload}
      onClick={onClickExportExcel}
      disabled={!items || !items.length}
    />
  );
};
