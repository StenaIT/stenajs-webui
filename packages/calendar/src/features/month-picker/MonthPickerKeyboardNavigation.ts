export const getDomIdForMonth = (
  row: number,
  column: number,
  monthPickerId: string
): string => {
  return `${row}-${column}-${monthPickerId}`;
};

export const getDomIdForKeyboardKey = (
  key: string,
  currentRow: number,
  currentColumn: number,
  monthPickerId: string
): string | undefined => {
  const next = getRowAndColumnToFocusOn(currentRow, currentColumn, key);
  if (next == null) {
    return undefined;
  }
  return getDomIdForMonth(next.row, next.column, monthPickerId);
};

export const getRowAndColumnToFocusOn = (
  currentRow: number,
  currentColumn: number,
  key: string
): { row: number; column: number } | undefined => {
  let row = currentRow;
  let column = currentColumn;
  if (key === "ArrowLeft") {
    column--;
  } else if (key === "ArrowUp") {
    row--;
  } else if (key === "ArrowRight") {
    column++;
  } else if (key === "ArrowDown") {
    row++;
  } else {
    return undefined;
  }

  if (column < 0) {
    column += 4;
    row--;
  }
  if (column > 4) {
    column -= 4;
    row++;
  }

  return {
    column,
    row,
  };
};
