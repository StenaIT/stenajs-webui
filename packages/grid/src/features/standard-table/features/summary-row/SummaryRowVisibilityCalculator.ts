import { StandardTableColumnOptions } from "../../config/StandardTableColumnConfig";

export const isSummaryRowVisible = <TColumnKey extends string>(
  columns: Record<
    TColumnKey,
    StandardTableColumnOptions<unknown, unknown, TColumnKey>
  >
): boolean =>
  (Object.values(columns) as Array<
    StandardTableColumnOptions<unknown, unknown, TColumnKey>
  >).some((columnConfig) => columnHasSummaryCell(columnConfig));

export const columnHasSummaryCell = <TColumnKey extends string>(
  columnConfig: StandardTableColumnOptions<unknown, unknown, TColumnKey>
): boolean =>
  Boolean(columnConfig.renderSummaryCell || columnConfig.summaryText);
