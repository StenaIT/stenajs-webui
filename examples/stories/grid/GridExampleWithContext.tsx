import { Box, Indent, Row, Spacing, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { GridHooksTable, useGridCell } from "@stenajs-webui/grid";
import * as React from "react";
import { useCallback, useState } from "react";
import { FocusedBox } from "./FocusedBox";
import { createIndexArray, createRows } from "./util/GridHooksExampleUtils";

const list10 = createIndexArray(10);

export const GridExampleWithContext = () => {
  const [rows, setRows] = useState(createRows());

  const updateCell = useCallback(
    (rowIndex: number, colIndex: number, value: string | undefined) => {
      const copy = rows.map((row, iRow) => {
        if (iRow !== rowIndex) {
          return row;
        }
        return row.map((cell, iCol) => {
          if (iCol !== colIndex) {
            return cell;
          }
          return value || "";
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
            <GridHooksTable
              tableId={"sumthing"}
              numRows={list10.length}
              numCols={list10.length}
            >
              {rows.map((row, i) => (
                <Row key={i}>
                  {row.map((item, j) => (
                    <GridCell
                      key={j}
                      value={item}
                      rowIndex={i}
                      colIndex={j}
                      updateCell={updateCell}
                    />
                  ))}
                </Row>
              ))}
            </GridHooksTable>
          </Box>
        </div>
      </Indent>
    </Spacing>
  );
};

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  value: string;
  updateCell: (row: number, col: number, value: string | undefined) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  rowIndex,
  colIndex,
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
  } = useGridCell(value, {
    rowIndex,
    colIndex,
    isEditable: true,
    onChange: (v) => updateCell(rowIndex, colIndex, v),
  });

  return (
    <FocusedBox {...requiredProps}>
      {isEditing ? (
        <TextInput
          onValueChange={setEditorValue}
          value={editorValue}
          onDone={stopEditing}
          onEsc={stopEditingAndRevert}
          autoFocus
          selectAllOnMount={!lastKeyEvent}
          onMove={stopEditingAndMove}
        />
      ) : (
        <Text>{value}</Text>
      )}
    </FocusedBox>
  );
};
