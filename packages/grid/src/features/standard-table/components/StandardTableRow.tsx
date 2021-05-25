import { Box, Indent } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { useMemo } from "react";
import {
  tableBackgroundColorExpanded,
  tableBackgroundHoverColorExpanded,
  tableBorder,
  tableBorderLeft,
  tableBorderLeftExpanded,
} from "../../../config/TableConfig";
import { TableRow } from "../../table-ui/components/table/TableRow";
import { RowBackgroundResolverColorCombination } from "../config/StandardTableConfig";
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

const getBackgroundColor = (
  resolvedBackground:
    | string
    | undefined
    | RowBackgroundResolverColorCombination,
  isSelected: boolean,
  isExpanded: boolean
): string => {
  if (resolvedBackground) {
    return typeof resolvedBackground === "string"
      ? resolvedBackground
      : resolvedBackground?.background;
  }
  if (isSelected) {
    return cssColor("--lhds-color-blue-50");
  }
  if (isExpanded) {
    return tableBackgroundColorExpanded;
  }
  return "white";
};

const getHoverBackgroundColor = (
  resolvedBackground:
    | string
    | undefined
    | RowBackgroundResolverColorCombination,
  isSelected: boolean,
  isExpanded: boolean
): string | undefined => {
  if (resolvedBackground) {
    return typeof resolvedBackground === "string"
      ? resolvedBackground
      : resolvedBackground?.hoverBackground;
  }
  if (isSelected) {
    return cssColor("--lhds-color-blue-100");
  }
  if (isExpanded) {
    return tableBackgroundHoverColorExpanded;
  }
  return cssColor("--lhds-color-ui-100");
};

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

  const resolvedBackgroundResult = useMemo(
    () => rowBackgroundResolver?.(item, isSelected),
    [isSelected, item, rowBackgroundResolver]
  );

  const background = getBackgroundColor(
    resolvedBackgroundResult,
    isSelected,
    isExpanded
  );

  const hoverBackground = getHoverBackgroundColor(
    resolvedBackgroundResult,
    isSelected,
    isExpanded
  );

  const disabled = useMemo(() => checkboxDisabledResolver?.(item), [
    item,
    checkboxDisabledResolver,
  ]);

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
        borderTop={tableBorder}
        borderLeft={isExpanded ? tableBorderLeftExpanded : tableBorderLeft}
        background={background}
        hoverBackground={hoverBackground}
        style={
          resolvedBackgroundResult
            ? {
                ["--focus-within-background" as string]: hoverBackground,
              }
            : undefined
        }
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
        <Box
          borderLeft={tableBorderLeftExpanded}
          background={tableBackgroundColorExpanded}
        >
          {renderRowExpansion(item, { onRequestCollapse: toggleRowExpanded })}
        </Box>
      )}
    </Box>
  );
});
