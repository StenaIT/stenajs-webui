import { Box, Indent, Row, Spacing, StandardText } from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useState } from "react";
import { GridHooksTable } from "../components/GridHooksTable";
import { useGridCell } from "../hooks/UseGridCell";
import {
  createIndexArray,
  createRows,
  FocusedBox
} from "./util/GridHooksExampleUtils";

export const list10 = createIndexArray(10);

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
  } = useGridCell(value, {
    rowIndex,
    colIndex,
    isEditable: true,
    onChange: v => updateCell(rowIndex, colIndex, v)
  });

  return (
    <FocusedBox {...requiredProps}>
      {isEditing ? (
        <StandardTextInput
          onValueChange={setEditorValue}
          value={editorValue}
          onDone={stopEditing}
          onEsc={stopEditingAndRevert}
          focusOnMount
          selectAllOnMount={!lastKeyEvent}
          onMove={stopEditingAndMove}
        />
      ) : (
        <StandardText>{value}</StandardText>
      )}
    </FocusedBox>
  );
};
