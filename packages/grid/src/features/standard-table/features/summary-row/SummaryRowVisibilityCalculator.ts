import { StandardTableColumnOptions } from "../../config/StandardTableColumnConfig";

export const isSummaryRowVisible = <TColumnKey extends string>(
  columns: Record<TColumnKey, StandardTableColumnOptions<unknown, unknown>>
): boolean =>
  (Object.values(columns) as Array<
    StandardTableColumnOptions<unknown, unknown>
  >).some((columnConfig) => columnHasSummaryCell(columnConfig));

export const columnHasSummaryCell = (
  columnConfig: StandardTableColumnOptions<unknown, unknown>
): boolean =>
  Boolean(columnConfig.renderSummaryCell || columnConfig.summaryText);
