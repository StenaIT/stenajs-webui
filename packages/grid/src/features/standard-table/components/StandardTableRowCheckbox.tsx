import { Row } from "@stenajs-webui/core";
import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { useGridCellMemo } from "../hooks/UseGridCellMemo";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";

interface Props extends Pick<CheckboxProps, "value" | "onValueChange"> {
  colIndex: number;
  rowIndex: number;
  numRows: number;
  disabled?: boolean;
}

export const StandardTableRowCheckbox: React.FC<Props> = React.memo(
  function StandardTableRowCheckbox({
    value,
    onValueChange,
    colIndex,
    rowIndex,
    numRows,
    disabled
  }) {
    const { tableId, columnOrder } = useStandardTableConfig();
    const gridCell = useGridCellMemo<boolean>(!!value, {
      colIndex,
      numCols: columnOrder.length,
      numRows,
      rowIndex,
      tableId
    });
    const { requiredProps } = gridCell;

    return (
      <Row
        alignItems={"center"}
        justifyContent={"center"}
        width={"90px"}
        minWidth={"90px"}
        indent
      >
        <Checkbox
          size={"small"}
          disabled={disabled}
          value={value}
          onValueChange={onValueChange}
          {...requiredProps}
        />
      </Row>
    );
  }
);
