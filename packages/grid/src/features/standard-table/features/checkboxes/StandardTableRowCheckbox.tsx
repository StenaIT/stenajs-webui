import { Row } from "@stenajs-webui/core";
import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { useGridCell } from "../../../grid-cell/hooks/UseGridCell";
import { useTotalNumColumnsForRows } from "../../context/GroupConfigsForRowsContext";
import {
  useStandardTableConfig,
  useStandardTableId,
} from "../../hooks/UseStandardTableConfig";

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
    disabled,
  }) {
    const totalNumColumns = useTotalNumColumnsForRows();

    const tableId = useStandardTableId();
    const { stickyCheckboxColumn } = useStandardTableConfig();
    const gridCell = useGridCell<boolean>(Boolean(value), {
      colIndex,
      numCols: totalNumColumns,
      numRows,
      rowIndex,
      tableId,
    });
    const { requiredProps } = gridCell;

    return (
      <Row
        alignItems={"center"}
        justifyContent={"center"}
        width={"45px"}
        minWidth={"45px"}
        indent
        background={stickyCheckboxColumn ? "inherit" : undefined}
        position={stickyCheckboxColumn ? "sticky" : undefined}
        left={stickyCheckboxColumn ? "0px" : undefined}
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
