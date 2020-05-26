import { KeyboardEventHandler, useCallback, useMemo } from "react";
import { MoveDirection } from "../../../util/DirectionCalculator";
import {
  KeyDownEvent,
  useEditableCell,
  UseEditableCellOptions
} from "./UseEditableCell";
import {
  GridNavigationRequiredProps,
  useGridNavigation,
  UseGridNavigationOptions
} from "./UseGridNavigation";
import { useGridNavigationOptionsFromContext } from "./UseGridNavigationOptionsFromContext";

export type UseGridCellOptions<TValue> = UseGridNavigationOptions &
  UseEditableCellOptions<TValue>;

export interface UseGridCellResult<TValue> {
  /**
   * The current value in the editor. Pass this as value to form field components.
   */
  editorValue: TValue;
  /**
   * The setter for current value in the editor. Pass this as onChange to form field components.
   * @param editorValue
   */
  setEditorValue: (editorValue: TValue) => void;
  /**
   * Reverts the value of form field to the value before user started editing. This is invoked by stopEditingAndRevert.
   */
  revertEditorValue: () => void;
  /**
   * Props that must be passed to the cell DOM element which can be focused.
   */
  requiredProps: GridCellRequiredProps;
  /**
   * Moves focus to a new cell in the specified direction.
   * @param direction
   */
  move: (direction: MoveDirection) => void;
  /**
   * Opens the editor. invokes onStartEdit if provided.
   */
  startEditing: () => void;
  /**
   * Closes the editor and invokes onChange with the editor value entered by user.
   */
  stopEditing: () => void;
  /**
   * Closes the editor and reverts editor value to the previous value. Does not invoke onChange.
   */
  stopEditingAndRevert: () => void;
  /**
   * Closes the editor and moves focus to a new cell in the specified direction. Invokes onChange with editor value.
   * @param direction
   */
  stopEditingAndMove: (direction: MoveDirection) => void;
  /**
   * True if cell is currently in editing mode.
   */
  isEditing: boolean;
  /**
   * Contains last key event if editor was started by any key other than Enter.
   */
  lastKeyEvent: KeyDownEvent | undefined;
}

export interface GridCellRequiredProps
  extends Pick<GridNavigationRequiredProps, "tabIndex" | "id"> {
  onKeyDown: KeyboardEventHandler;
  onDoubleClick: () => void;
}

// tslint:disable:no-any
/**
 * Hook for cell in a grid. Combines navigation and editable cell.
 * @param value The value of the current cell.
 * @param options Options for hook.
 */
export const useGridCell = <TValue>(
  value: TValue,
  options: UseGridCellOptions<TValue>
): UseGridCellResult<TValue> => {
  const { tableId } = useGridNavigationOptionsFromContext(options);
  const nav = useGridNavigation(options);
  const edit = useEditableCell(value, options);

  const cellCoordinates = useMemo(
    () => ({
      rowIndex: options.rowIndex,
      colIndex: options.colIndex
    }),
    [options.rowIndex, options.colIndex]
  );

  const startEditing = useCallback(() => {
    edit.startEditing();
    nav.focusOnCell(tableId, cellCoordinates);
  }, [edit, nav, tableId, cellCoordinates]);

  const stopEditing = useCallback(() => {
    edit.stopEditing();
    nav.focusOnCell(tableId, cellCoordinates);
  }, [edit, nav, tableId, cellCoordinates]);

  const stopEditingAndRevert = useCallback(() => {
    edit.stopEditingAndRevert();
    nav.focusOnCell(tableId, cellCoordinates);
  }, [edit, nav, tableId, cellCoordinates]);

  const stopEditingAndMove = useCallback(
    (direction: MoveDirection) => {
      edit.stopEditing();
      nav.moveHandler(direction);
    },
    [edit, nav]
  );

  const move = useCallback(
    (direction: MoveDirection) => {
      nav.moveHandler(direction);
    },
    [nav]
  );

  const onKeyDown = useCallback<KeyboardEventHandler>(
    e => {
      if (!edit.isEditing) {
        const consumed = nav.requiredProps.onKeyDown(e);
        if (!consumed) {
          edit.onKeyDown(e);
        }
      }
    },
    [edit, nav.requiredProps]
  );

  const requiredProps = useMemo(
    () => ({
      ...nav.requiredProps,
      onKeyDown,
      onDoubleClick: edit.onDoubleClick
    }),
    [onKeyDown, edit.onDoubleClick, nav.requiredProps]
  );

  return {
    isEditing: edit.isEditing,
    lastKeyEvent: edit.lastKeyEvent,
    editorValue: edit.revertableValue.value,
    setEditorValue: edit.revertableValue.setValue,
    revertEditorValue: edit.revertableValue.revert,
    requiredProps,
    move,
    startEditing,
    stopEditing,
    stopEditingAndRevert,
    stopEditingAndMove
  };
};
