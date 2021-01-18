import { Box, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { tableBorder, tableBorderExpanded } from "../../../config/TableConfig";
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
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";

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
          <Row
            background={"inherit"}
            borderLeft={
              groupIndex === 0
                ? undefined
                : groupConfig.borderLeft === true
                ? tableBorder
                : groupConfig.borderLeft || undefined
            }
          >
            {groupConfig.columnOrder.map((columnId, index) => {
              // TODO Get correct index when using groups.
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
                  disableBorderLeft={
                    (groupIndex === 0 || Boolean(groupConfig.borderLeft)) &&
                    index === 0
                  }
                />
              );
            })}
          </Row>
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
