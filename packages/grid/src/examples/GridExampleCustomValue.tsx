import { Box, Indent, Row, Spacing, StandardText } from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useState } from "react";
import { useGridCell } from "../hooks/UseGridCell";
import {
  createCustomValueRows,
  createIndexArray,
  CustomValueCell,
  FocusedBox
} from "./util/GridHooksExampleUtils";

export const list10 = createIndexArray(10);

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
  updateCell
}) => {
  const {
    requiredProps,
    isEditing,
    lastKeyEvent,
    stopEditing,
    stopEditingAndRevert,
    stopEditingAndMove,
    editorValue,
    setEditorValue
  } = useGridCell<CustomValueCell>(value, {
    rowIndex,
    colIndex,
    numRows,
    numCols,
    onChange: v => updateCell(rowIndex, colIndex, v),
    tableId: "test",
    isEditable: true,
    wrap: false,
    transformEnteredValue: enteredValue => ({
      col: colIndex,
      row: rowIndex,
      name: enteredValue || ""
    })
  });

  const onChange = useCallback(
    (input: string) => {
      setEditorValue({
        ...value,
        name: input
      });
    },
    [setEditorValue, value]
  );

  return (
    <FocusedBox {...requiredProps}>
      {isEditing ? (
        <StandardTextInput
          onChange={onChange}
          value={editorValue.name}
          onDone={stopEditing}
          onEsc={stopEditingAndRevert}
          focusOnMount
          selectAllOnMount={!lastKeyEvent}
          onMove={stopEditingAndMove}
        />
      ) : (
        <StandardText>{`${value.name}, ${value.row}, ${
          value.col
        }`}</StandardText>
      )}
    </FocusedBox>
  );
};
