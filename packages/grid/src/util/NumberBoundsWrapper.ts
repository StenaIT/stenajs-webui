import { limitRange, wrapBounds } from "./bounds/NumberBoundsWrapper";
import type { CellIndices } from "./DirectionCalculator";

export const clampPos = (
  pos: CellIndices,
  numRows: number,
  numCols: number
): CellIndices => {
  return {
    rowIndex: limitRange(pos.rowIndex, 0, numRows),
    colIndex: limitRange(pos.colIndex, 0, numCols),
  };
};

export const wrapPos = (
  pos: CellIndices,
  numRows: number,
  numCols: number
): CellIndices => {
  const wrapped = wrapBounds(pos.colIndex, pos.rowIndex, numCols, numRows);
  return {
    rowIndex: wrapped.realY,
    colIndex: wrapped.realX,
  };
};
