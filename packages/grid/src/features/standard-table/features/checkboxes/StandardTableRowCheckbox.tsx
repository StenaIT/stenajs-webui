import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useGridCell } from "../../../grid-cell/hooks/UseGridCell";
import { useTotalNumColumnsForRows } from "../../context/GroupConfigsAndIdsForRowsContext";
import { useStandardTableId } from "../../hooks/UseStandardTableConfig";

interface Props extends Pick<CheckboxProps, "value" | "onValueChange"> {
  colIndex: number;
  rowIndex: number;
  numRows: number;
  disabled?: boolean;
  onValueChangeAndShift: CheckboxProps["onValueChange"];
}

export const StandardTableRowCheckbox: React.FC<Props> = React.memo(
  function StandardTableRowCheckbox({
    value,
    onValueChange,
    colIndex,
    rowIndex,
    numRows,
    disabled,
    onValueChangeAndShift,
  }) {
    const shiftPressedRef = useRef(false);

    const totalNumColumns = useTotalNumColumnsForRows();

    const tableId = useStandardTableId();
    const gridCell = useGridCell<boolean>(Boolean(value), {
      colIndex,
      numCols: totalNumColumns,
      numRows,
      rowIndex,
      tableId,
    });
    const { requiredProps } = gridCell;

    const keyUp = useCallback((ev: KeyboardEvent) => {
      if (ev.key === "Shift") {
        shiftPressedRef.current = false;
      }
    }, []);

    const keyDown = useCallback((ev: KeyboardEvent) => {
      if (ev.key === "Shift") {
        shiftPressedRef.current = true;
      }
    }, []);

    useEffect(() => {
      document.addEventListener("keyup", keyUp);
      document.addEventListener("keydown", keyDown);
      return () => {
        document.removeEventListener("keyup", keyUp);
        document.removeEventListener("keydown", keyDown);
      };
    }, [keyDown, keyUp]);

    const internalOnValueChange = useCallback(
      (value: boolean) => {
        if (shiftPressedRef.current) {
          onValueChangeAndShift?.(value);
        } else {
          onValueChange?.(value);
        }
      },
      [onValueChange, onValueChangeAndShift]
    );

    return (
      <Checkbox
        size={"small"}
        disabled={disabled}
        value={value}
        onValueChange={internalOnValueChange}
        {...requiredProps}
      />
    );
  }
);
