import { useMemo } from "react";
import {
  useGridCell,
  UseGridCellOptions,
  UseGridCellResult
} from "../../../hooks/UseGridCell";

export const useGridCellMemo = <TValue>(
  value: TValue,
  options: UseGridCellOptions<TValue>
): UseGridCellResult<TValue> => {
  const {
    isEditing,
    requiredProps,
    stopEditingAndMove,
    stopEditing,
    lastKeyEvent,
    stopEditingAndRevert,
    setEditorValue,
    editorValue,
    move,
    revertEditorValue,
    startEditing
  } = useGridCell(value, options);

  return useMemo(
    () => ({
      isEditing,
      requiredProps,
      stopEditingAndMove,
      stopEditing,
      lastKeyEvent,
      stopEditingAndRevert,
      setEditorValue,
      editorValue,
      move,
      revertEditorValue,
      startEditing
    }),
    [
      isEditing,
      requiredProps,
      stopEditingAndMove,
      stopEditing,
      lastKeyEvent,
      stopEditingAndRevert,
      setEditorValue,
      editorValue,
      move,
      revertEditorValue,
      startEditing
    ]
  );
};
