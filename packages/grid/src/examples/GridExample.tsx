import styled from "@emotion/styled";
import { Box, Indent, Row, Spacing, StandardText } from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import * as React from "react";
import { useCallback, useState } from "react";
import { useGridCell } from "../hooks/UseGridCell";

import { createIndexArray, createRows } from "./util/GridHooksExampleUtils";

const list10 = createIndexArray(10);

const FocusedBox = styled.div<FocusedBoxProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 34px;
    :focus {
      outline: ${({ isEditable }) =>
        isEditable ? "#605988" : "#cbcbcb"} solid 2px;
    }
  })
  `;

interface FocusedBoxProps {
  isEditable?: boolean;
}

export const GridExample = () => {
  const [rows, setRows] = useState(() => createRows());

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
  value: string;
  updateCell: (row: number, col: number, value: string | undefined) => void;
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
  } = useGridCell(value, {
    rowIndex,
    colIndex,
    numRows,
    numCols,
    onChange: v => updateCell(rowIndex, colIndex, v),
    tableId: "test",
    isEditable: true,
    wrap: false
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
