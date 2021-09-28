export interface ColumnIdAndColSpan<TColumnKey extends string> {
  columnId: TColumnKey;
  colSpan: number;
}

export const getColumnsLimitedWithColSpan = <TColumnKey extends string>(
  columnOrder: Array<TColumnKey>,
  columns: Record<TColumnKey, { summaryCellColSpan?: number }>
): Array<ColumnIdAndColSpan<TColumnKey>> => {
  const list: Array<ColumnIdAndColSpan<TColumnKey>> = [];
  for (let i = 0; i < columnOrder.length; i++) {
    const { summaryCellColSpan } = columns[columnOrder[i]];
    const realColSpan = Math.min(
      summaryCellColSpan ?? 1,
      columnOrder.length - i
    );
    list.push({ columnId: columnOrder[i], colSpan: realColSpan });
    const colSpan = summaryCellColSpan ?? 1;
    if (colSpan > 1) {
      i += colSpan - 1;
    }
  }
  return list;
};
