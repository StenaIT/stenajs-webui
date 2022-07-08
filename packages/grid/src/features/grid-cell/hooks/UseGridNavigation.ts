import { KeyboardEvent, useMemo } from "react";
import {
  CellIndices,
  getNextPositionWrappedOrClamped,
  MoveDirection,
  TableEdgeMoveMode,
} from "../../../util/DirectionCalculator";
import { ensureDomIdIsCorrect } from "../../../util/DomIdValidator";
import { useGridNavigationOptionsFromContext } from "./UseGridNavigationOptionsFromContext";

export interface UseGridNavigationOptions {
  /**
   * The row index for current cell.
   */
  rowIndex: number;
  /**
   * The column index for current cell.
   */
  colIndex: number;
  /**
   * Total number of rows in table. Must be set in cell hook or in GridHooksTable prop.
   */
  numRows?: number;
  /**
   * Total number of columns in table. Must be set in cell hook or in GridHooksTable prop.
   */
  numCols?: number;
  /**
   * An ID for the table, must be unique for every table in page. Must be set in cell hook or in GridHooksTable prop.
   */
  tableId?: string;
  /**
   * Edge mode. Defines how to behave when user tries to navigate outside of the table.
   * Can be 'wrapped', 'clamped' or 'unlimited'.
   * wrapped = focuses on other side of table.
   * clamped = focus stays on same cell
   * unlimited = focus is not controlled, it will try to focus on next item.
   */
  edgeMode?: TableEdgeMoveMode;
  /**
   * Callback that is invoked when user navigates to new cell by keyboard.
   */
  onCellMove?: CellMoveHandler;
  /**
   * Callback that is invoked when user navigates but don't move to new cell by keyboard.
   */
  onCellNavigation?: CellNavigationHandler;
}

export interface ValidatedUseGridNavigationOptions {
  rowIndex: number;
  colIndex: number;
  numRows: number;
  numCols: number;
  tableId: string;
  edgeMode?: TableEdgeMoveMode;
  onCellMove?: CellMoveHandler;
  onCellNavigation?: CellNavigationHandler;
}

export interface UseGridNavigationResult {
  requiredProps: GridNavigationRequiredProps;
  moveHandler: MoveHandler;
  focusOnCell: FocusOnCellFunc;
}

/**
 * Props that must be passed to element with focus.
 */
export interface GridNavigationRequiredProps {
  tabIndex: number;
  onKeyDown: (e: KeyboardEvent) => boolean;
  id: string;
}

export type CellMoveHandler = (event: OnCellMoveEvent) => void;
export type CellNavigationHandler = (event: OnCellNavigationEvent) => void;

export interface OnCellMoveEvent {
  direction: MoveDirection;
  fromRowIndex: number;
  fromColIndex: number;
  rowDidChange: boolean;
  colDidChange: boolean;
  rowIndex: number;
  colIndex: number;
}

export interface OnCellNavigationEvent extends OnCellMoveEvent {
  cellDidChange: boolean;
}

export const useGridNavigation = (
  options: UseGridNavigationOptions
): UseGridNavigationResult => {
  const {
    rowIndex,
    colIndex,
    numRows,
    numCols,
    tableId,
    edgeMode,
    onCellMove,
    onCellNavigation,
  } = useGridNavigationOptionsFromContext(options);

  const moveHandler = useMemo(
    () =>
      createMoveHandler(
        tableId,
        rowIndex,
        colIndex,
        numRows,
        numCols,
        edgeMode,
        onCellMove,
        onCellNavigation
      ),
    [
      tableId,
      rowIndex,
      colIndex,
      numRows,
      numCols,
      edgeMode,
      onCellMove,
      onCellNavigation,
    ]
  );

  const onKeyDown = useMemo(
    () => createKeyDownHandler(moveHandler),
    [moveHandler]
  );

  const id = useMemo(
    () => createCellId(tableId, rowIndex, colIndex),
    [tableId, rowIndex, colIndex]
  );

  const requiredProps = useMemo(
    () => ({
      tabIndex: 0,
      onKeyDown,
      id,
    }),
    [onKeyDown, id]
  );

  return {
    focusOnCell,
    moveHandler,
    requiredProps,
  };
};

type MoveHandler = (direction: MoveDirection) => void;

const createMoveHandler =
  (
    tableId: string,
    rowIndex: number,
    colIndex: number,
    numRows: number,
    numCols: number,
    edgeMode?: TableEdgeMoveMode,
    onCellMove?: CellMoveHandler,
    onCellNavigation?: CellNavigationHandler
  ): MoveHandler =>
  (direction) => {
    const pos = getNextPositionWrappedOrClamped(
      rowIndex,
      colIndex,
      numRows,
      numCols,
      direction,
      edgeMode
    );

    const colDidChange = colIndex !== pos.colIndex;
    const rowDidChange = rowIndex !== pos.rowIndex;

    if (colDidChange || rowDidChange) {
      if (onCellMove) {
        onCellMove({
          direction,
          fromRowIndex: rowIndex,
          fromColIndex: colIndex,
          rowIndex: pos.rowIndex,
          colIndex: pos.colIndex,
          colDidChange,
          rowDidChange,
        });
      }
      focusOnCell(tableId, pos);
    }

    if (onCellNavigation) {
      onCellNavigation({
        direction,
        fromRowIndex: rowIndex,
        fromColIndex: colIndex,
        rowIndex: pos.rowIndex,
        colIndex: pos.colIndex,
        colDidChange,
        rowDidChange,
        cellDidChange: colDidChange || rowDidChange,
      });
    }
  };

const createCellId = (
  tableId: string,
  rowIndex: number,
  colIndex: number
): string => ensureDomIdIsCorrect(`table-${tableId}-${rowIndex}-${colIndex}`);

const createKeyDownHandler =
  (moveHandler: MoveHandler) =>
  (e: KeyboardEvent): boolean => {
    if (e.key === "ArrowLeft") {
      moveHandler("left");
      e.preventDefault();
      e.stopPropagation();
      return true;
    } else if (e.key === "ArrowUp") {
      moveHandler("up");
      e.preventDefault();
      e.stopPropagation();
      return true;
    } else if (e.key === "ArrowRight") {
      moveHandler("right");
      e.preventDefault();
      e.stopPropagation();
      return true;
    } else if (e.key === "ArrowDown") {
      moveHandler("down");
      e.preventDefault();
      e.stopPropagation();
      return true;
    } else {
      return false;
    }
  };

type FocusOnCellFunc = (tableId: string, pos: CellIndices) => void;

export const focusOnCell: FocusOnCellFunc = (tableId, pos) => {
  const el = (document.querySelector(
    `#${createCellId(tableId, pos.rowIndex, pos.colIndex)}`
  ) ||
    document.querySelector(
      `#${createCellId(tableId, pos.rowIndex, pos.colIndex)}`
    )) as HTMLElement;
  if (el) {
    el.focus();
  }
};
