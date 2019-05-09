import { clampPos, wrapPos } from './NumberBoundsWrapper';

export type MoveDirection = 'right' | 'left' | 'down' | 'up';

export interface CellIndices {
  rowIndex: number;
  colIndex: number;
}

export const getNextPositionWrappedOrClamped = (
  rowIndex: number,
  colIndex: number,
  numRows: number,
  numCols: number,
  direction: MoveDirection,
  wrap: boolean,
): CellIndices => {
  const posNotWrapped = getNextPosition(rowIndex, colIndex, direction);
  return wrap
    ? wrapPos(posNotWrapped, numRows - 1, numCols - 1)
    : clampPos(posNotWrapped, numRows - 1, numCols - 1);
};

export const getNextPosition = (
  rowIndex: number,
  colIndex: number,
  direction: MoveDirection,
): CellIndices => {
  if (direction === 'up') {
    return {
      rowIndex: rowIndex - 1,
      colIndex,
    };
  }
  if (direction === 'down') {
    return {
      rowIndex: rowIndex + 1,
      colIndex,
    };
  }
  if (direction === 'left') {
    return {
      rowIndex,
      colIndex: colIndex - 1,
    };
  }
  if (direction === 'right') {
    return {
      rowIndex,
      colIndex: colIndex + 1,
    };
  }
  return {
    rowIndex,
    colIndex,
  };
};
