import { clampPos, wrapPos } from "./NumberBoundsWrapper";

export type MoveDirection = "right" | "left" | "down" | "up";

export interface CellIndices {
  rowIndex: number;
  colIndex: number;
}

export type TableEdgeMoveMode = "clamped" | "wrapped" | "unlimited";

export const getNextPositionWrappedOrClamped = (
  rowIndex: number,
  colIndex: number,
  numRows: number,
  numCols: number,
  direction: MoveDirection,
  edgeMode: TableEdgeMoveMode = "clamped"
): CellIndices => {
  const posNotWrapped = getNextPosition(rowIndex, colIndex, direction);
  if (edgeMode === "clamped") {
    return clampPos(posNotWrapped, numRows - 1, numCols - 1);
  }
  if (edgeMode === "wrapped") {
    return wrapPos(posNotWrapped, numRows - 1, numCols - 1);
  }
  return posNotWrapped;
};

export const getNextPosition = (
  rowIndex: number,
  colIndex: number,
  direction: MoveDirection
): CellIndices => {
  if (direction === "up") {
    return {
      rowIndex: rowIndex - 1,
      colIndex,
    };
  }
  if (direction === "down") {
    return {
      rowIndex: rowIndex + 1,
      colIndex,
    };
  }
  if (direction === "left") {
    return {
      rowIndex,
      colIndex: colIndex - 1,
    };
  }
  if (direction === "right") {
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
