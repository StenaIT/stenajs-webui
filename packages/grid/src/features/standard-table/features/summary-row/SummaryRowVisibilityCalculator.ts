import { StandardTableConfig } from "../../config/StandardTableConfig";
import { StandardTableColumnOptions } from "../../config/StandardTableColumnConfig";

export const isSummaryRowVisible = <TColumnKey extends string>(
  columns: StandardTableConfig<unknown, TColumnKey>["columns"]
): boolean =>
  Object.keys(columns).some((columnId) =>
    columnHasSummaryCell(columns[columnId])
  );

export const columnHasSummaryCell = (
  columnConfig: StandardTableColumnOptions<unknown, unknown>
): boolean =>
  Boolean(columnConfig.renderSummaryCell || columnConfig.summaryText);
