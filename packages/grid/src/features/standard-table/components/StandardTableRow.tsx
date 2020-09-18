import { Box, Indent } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import {
  tableBorder,
  tableBorderExpanded,
  tableRowHeight,
} from "../../../config/TableConfig";
import { TableRow } from "../../table-ui/components/table/TableRow";
import { useCellBackgroundByColumnConfig } from "../hooks/UseCellBackground";
import {
  useFirstColumnFromConfig,
  useLastColumnFromConfig,
} from "../hooks/UseColumnFromConfig";
import { useRowCheckbox } from "../hooks/UseRowCheckbox";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { StandardTableCell } from "./StandardTableCell";
import { StandardTableRowCheckbox } from "./StandardTableRowCheckbox";
import { useExpandCollapseActions } from "../hooks/UseExpandCollapseActions";
import { StandardTableRowExpandButton } from "./StandardTableRowExpandButton";

interface StandardTableItemProps<TItem> {
  item: TItem;
  rowIndex: number;
  numRows: number;
  colIndexOffset: number;
}

export const StandardTableRow = React.memo(function StandardTableRow<TItem>({
  item,
  rowIndex,
  numRows,
  colIndexOffset,
}: StandardTableItemProps<TItem>) {
  const {
    columnOrder,
    showRowCheckbox,
    rowBackgroundResolver,
    checkboxDisabledResolver,
    enableGridCell,
    rowIndent,
    renderRowExpansion,
    enableExpandCollapse,
  } = useStandardTableConfig();

  const { isExpanded, toggleRowExpanded } = useExpandCollapseActions(item);
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
    <Box borderBottom={rowIndex === numRows - 1 ? tableBorder : undefined}>
      <TableRow
        height={tableRowHeight}
        width={"100%"}
        borderTop={isExpanded ? tableBorderExpanded : tableBorder}
        background={background}
        hoverBackground={"var(--lhds-color-ui-100)"}
      >
        {rowIndent && (
          <Indent num={rowIndent} background={firstColumnBackground} />
        )}
        {enableExpandCollapse && (
          <StandardTableRowExpandButton
            colIndex={colIndexOffset}
            rowIndex={enableGridCell ? rowIndex : 0}
            numRows={enableGridCell ? numRows : 0}
            item={item}
          />
        )}
        {showRowCheckbox && (
          <StandardTableRowCheckbox
            disabled={disabled}
            value={isSelected}
            onValueChange={toggleSelected}
            colIndex={colIndexOffset + (enableExpandCollapse ? 1 : 0)}
            rowIndex={rowIndex}
            numRows={numRows}
          />
        )}
        {columnOrder.map((columnId, index) => {
          const localColIndexOffset =
            colIndexOffset +
            (showRowCheckbox ? 1 : 0) +
            (enableExpandCollapse ? 1 : 0);
          return (
            <StandardTableCell
              key={columnId}
              columnId={columnId}
              item={item}
              colIndex={localColIndexOffset + index}
              rowIndex={rowIndex}
              numRows={numRows}
            />
          );
        })}
        {rowIndent && (
          <Indent num={rowIndent} background={lastColumnBackground} />
        )}
      </TableRow>
      {enableExpandCollapse && renderRowExpansion && isExpanded && (
        <Box borderTop={tableBorder}>
          {renderRowExpansion(item, { onRequestCollapse: toggleRowExpanded })}
        </Box>
      )}
    </Box>
  );
});
