import { Box, Indent, Row, Spacing, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { useGridCell } from "@stenajs-webui/grid";
import * as React from "react";
import { useCallback, useState } from "react";
import { FocusedBox } from "./FocusedBox";
import {
  createCustomValueRows,
  createIndexArray,
  CustomValueCell,
} from "./util/GridHooksExampleUtils";

const list10 = createIndexArray(10);

export const GridExampleCustomValue = () => {
  const [rows, setRows] = useState(createCustomValueRows());

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number, value?: CustomValueCell) => {
      const copy = rows.map((row, iRow) => {
        if (iRow !== rowIndex) {
          return row;
        }
        return row.map((cell, iCol) => {
          if (iCol !== colIndex) {
            return cell;
          }
          return value || { col: 0, row: 0, name: "" };
        });
      });
      setRows(copy);
    },
    [rows, setRows]
  );

  return (
    <Spacing>
      <Indent>
        <div style={{ display: "inline-block" }}>
          <Box background={"#fff"}>
            {rows.map((row, i) => (
              <Row key={i}>
                {row.map((item, j) => (
                  <GridCell
                    key={j}
                    value={item}
                    updateCell={updateCell}
                    rowIndex={i}
                    colIndex={j}
                    numRows={list10.length}
                    numCols={list10.length}
                  />
                ))}
              </Row>
            ))}
          </Box>
        </div>
      </Indent>
    </Spacing>
  );
};

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  numRows: number;
  numCols: number;
  value: CustomValueCell;
  updateCell: (row: number, col: number, value?: CustomValueCell) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  rowIndex,
  colIndex,
  numRows,
  numCols,
  value,
  updateCell,
}) => {
  const {
    requiredProps,
    isEditing,
    lastKeyEvent,
    stopEditing,
    stopEditingAndRevert,
    stopEditingAndMove,
    editorValue,
    setEditorValue,
  } = useGridCell<CustomValueCell>(value, {
    rowIndex,
    colIndex,
    numRows,
    numCols,
    onChange: (v) => updateCell(rowIndex, colIndex, v),
    tableId: "test",
    isEditable: true,
    edgeMode: "wrapped",
    transformEnteredValue: (enteredValue) => ({
      col: colIndex,
      row: rowIndex,
      name: enteredValue || "",
    }),
  });

  const onChange = useCallback(
    (input: string) => {
      setEditorValue({
        ...value,
        name: input,
      });
    },
    [setEditorValue, value]
  );

  return (
    <FocusedBox {...requiredProps}>
      {isEditing ? (
        <TextInput
          onValueChange={onChange}
          value={editorValue.name}
          onDone={stopEditing}
          onEsc={stopEditingAndRevert}
          autoFocus
          selectAllOnMount={!lastKeyEvent}
          onMove={stopEditingAndMove}
        />
      ) : (
        <Text>{`${value.name}, ${value.row}, ${value.col}`}</Text>
      )}
    </FocusedBox>
  );
};
