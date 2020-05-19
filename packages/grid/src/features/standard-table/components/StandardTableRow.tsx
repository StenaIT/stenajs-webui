import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { tableBorder, tableRowHeight } from "../../../config/TableConfig";
import { useCellBackgroundByColumnConfig } from "../hooks/UseCellBackground";
import {
  useFirstColumnFromConfig,
  useLastColumnFromConfig
} from "../hooks/UseColumnFromConfig";
import { useRowCheckbox } from "../hooks/UseRowCheckbox";
import { useStandardTableContext } from "../hooks/UseStandardTableContext";
import { StandardTableCell } from "./StandardTableCell";
import { StandardTableRowCheckbox } from "./StandardTableRowCheckbox";

interface StandardTableItemProps<TItem> {
  item: TItem;
  rowIndex: number;
  numRows: number;
}

export const StandardTableRow = React.memo(function StandardTableRow<TItem>({
  item,
  rowIndex,
  numRows
}: StandardTableItemProps<TItem>) {
  const {
    config: {
      columnOrder,
      showRowCheckbox,
      rowBackgroundResolver,
      checkboxDisabledResolver,
      enableGridCell,
      rowIndent
    }
  } = useStandardTableContext();

  const { isSelected, toggleSelected } = useRowCheckbox(item);

  const background = useMemo(
    () => (rowBackgroundResolver ? rowBackgroundResolver(item) : undefined),
    [item, rowBackgroundResolver]
  );

  const disabled = useMemo(
    () =>
      checkboxDisabledResolver ? checkboxDisabledResolver(item) : undefined,
    [item, checkboxDisabledResolver]
  );

  const firstColumn = useFirstColumnFromConfig();
  const firstColumnBackground = useCellBackgroundByColumnConfig(
    firstColumn,
    item
  );
  const lastColumn = useLastColumnFromConfig();
  const lastColumnBackground = useCellBackgroundByColumnConfig(
    lastColumn,
    item
  );

  return (
    <Row
      height={tableRowHeight}
      width={"100%"}
      borderBottom={tableBorder}
      background={background}
      hoverBackground={"var(--ui7)"}
    >
      {rowIndent && (
        <Indent num={rowIndent} background={firstColumnBackground} />
      )}
      {showRowCheckbox && (
        <StandardTableRowCheckbox
          disabled={disabled}
          value={isSelected}
          onValueChange={toggleSelected}
          colIndex={0}
          rowIndex={enableGridCell ? rowIndex : 0}
          numRows={enableGridCell ? numRows : 0}
        />
      )}
      {columnOrder.map((columnId, index) => (
        <StandardTableCell
          key={columnId}
          columnId={columnId}
          item={item}
          colIndex={enableGridCell ? (showRowCheckbox ? 1 : 0) + index : 0}
          rowIndex={enableGridCell ? rowIndex : 0}
          numRows={numRows}
        />
      ))}
      {rowIndent && (
        <Indent num={rowIndent} background={lastColumnBackground} />
      )}
    </Row>
  );
});
