import { Position } from "./Position";

export const getDomIdForMonth = (
  position: Position,
  monthPickerId: string,
): string => {
  return `${position.row}-${position.column}-${monthPickerId}`;
};

export const getDomIdForKeyboardKey = (
  key: string,
  currentPosition: Position,
  monthPickerId: string,
  numColumnsPerRow: number,
): string | undefined => {
  let next = currentPosition;
  for (let i = 0; i < numColumnsPerRow; i++) {
    next = movePositionByKey(next, key, numColumnsPerRow);
    const id = getDomIdForMonth(next, monthPickerId);
    if (document.getElementById(id)) {
      return id;
    }
  }
  return undefined;
};

export const movePositionByKey = (
  currentPosition: Position,
  key: string,
  numColumnsPerRow: number,
): Position => {
  let row = currentPosition.row;
  let column = currentPosition.column;
  if (key === "ArrowLeft") {
    column--;
  } else if (key === "ArrowUp") {
    row--;
  } else if (key === "ArrowRight") {
    column++;
  } else if (key === "ArrowDown") {
    row++;
  }

  if (column < 0) {
    column = numColumnsPerRow - 1;
    row--;
  }
  if (column > numColumnsPerRow - 1) {
    column = 0;
    row++;
  }

  return {
    column,
    row,
  };
};
