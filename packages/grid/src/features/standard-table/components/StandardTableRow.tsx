import { Box, Indent } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { tableBorder, tableBorderExpanded } from "../../../config/TableConfig";
import { TableRow } from "../../table-ui/components/table/TableRow";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { StandardTableRowCheckbox } from "../features/checkboxes/StandardTableRowCheckbox";
import { useRowCheckbox } from "../features/checkboxes/UseRowCheckbox";
import { useColumnIndexPerColumnIdContext } from "../features/column-index-per-column-id/ColumnIndexPerColumnIdContext";
import { StandardTableRowExpandButton } from "../features/expand-collapse/StandardTableRowExpandButton";
import { useExpandCollapseActions } from "../features/expand-collapse/UseExpandCollapseActions";
import { useCellBackgroundByColumnConfig } from "../hooks/UseCellBackground";
import {
  useFirstColumnConfig,
  useLastColumnConfig,
} from "../hooks/UseColumnConfigById";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorderFromGroup } from "../util/CellBorderCalculator";
import { StandardTableCell } from "./StandardTableCell";

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
  const groupConfigs = useGroupConfigsForRows();
  const { columnIndexPerColumnId } = useColumnIndexPerColumnIdContext();
  const {
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

  const firstColumn = useFirstColumnConfig();
  const firstColumnBackground = useCellBackgroundByColumnConfig(
    firstColumn,
    item
  );
  const lastColumn = useLastColumnConfig();
  const lastColumnBackground = useCellBackgroundByColumnConfig(
    lastColumn,
    item
  );

  return (
    <Box borderBottom={rowIndex === numRows - 1 ? tableBorder : undefined}>
      <TableRow
        height={"var(--current-row-height)"}
        width={"100%"}
        borderTop={isExpanded ? tableBorderExpanded : tableBorder}
        background={background ?? "white"}
        hoverBackground={background ? undefined : "var(--lhds-color-ui-100)"}
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
        {groupConfigs.map((groupConfig, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupConfig.columnOrder.map((columnId, index) => (
              <StandardTableCell
                key={columnId}
                columnId={columnId}
                item={item}
                colIndex={colIndexOffset + columnIndexPerColumnId[columnId]}
                rowIndex={rowIndex}
                numRows={numRows}
                borderFromGroup={getCellBorderFromGroup(
                  groupIndex,
                  index,
                  groupConfig.borderLeft
                )}
                disableBorderLeft={groupIndex === 0 && index === 0}
              />
            ))}
          </React.Fragment>
        ))}
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
