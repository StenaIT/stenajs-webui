import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { RefObject, useCallback } from "react";
import { useGridCell } from "../../../grid-cell/hooks/UseGridCell";
import { useTotalNumColumnsForRows } from "../../context/GroupConfigsAndIdsForRowsContext";
import { useStandardTableId } from "../../hooks/UseStandardTableConfig";

interface Props extends Pick<CheckboxProps, "value" | "onValueChange"> {
  colIndex: number;
  rowIndex: number;
  numRows: number;
  disabled?: boolean;
  onValueChangeAndShift: CheckboxProps["onValueChange"];
  shiftPressedRef: RefObject<boolean>;
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
    shiftPressedRef,
  }) {
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

    const internalOnValueChange = useCallback(
      (value: boolean) => {
        if (shiftPressedRef.current) {
          onValueChangeAndShift?.(value);
        } else {
          onValueChange?.(value);
        }
      },
      [onValueChange, onValueChangeAndShift, shiftPressedRef],
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
  },
);
