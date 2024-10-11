export interface Position {
  row: number;
  column: number;
}

export const moveLeft = (
  position: Position,
  numColumnsPerRow: number,
): Position => {
  if (position.column === 0 && position.row === 0) {
    return position;
  }
  return {
    column:
      position.column - 1 < 0 ? numColumnsPerRow - 1 : position.column - 1,
    row: position.column - 1 < 0 ? position.row - 1 : position.row,
  };
};

export const moveRight = (
  position: Position,
  numColumnsPerRow: number,
): Position => ({
  column: (position.column + 1) % numColumnsPerRow,
  row:
    (position.column + 1) / numColumnsPerRow === 1
      ? position.row + 1
      : position.row,
});

export const moveUp = (position: Position): Position => {
  if (position.row === 0) {
    return position;
  }
  return {
    column: position.column,
    row: position.row - 1,
  };
};

export const moveDown = (position: Position): Position => {
  return {
    column: position.column,

    row: position.row + 1,
  };
};
