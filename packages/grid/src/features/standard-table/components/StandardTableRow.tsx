import { Indent } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { CSSProperties, useMemo } from "react";
import {
  tableBackgroundColorExpanded,
  tableBackgroundHoverColorExpanded,
  tableBorderLeft,
  tableBorderLeftExpanded,
} from "../../../config/TableConfig";
import { RowBackgroundResolverColorCombination } from "../config/StandardTableConfig";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { useTotalNumColumns } from "../context/TotalNumColumnsContext";
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
import { TrWithHoverBackground } from "./TrWithHoverBackground";

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
  const { stickyCheckboxColumn } = useStandardTableConfig();
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

  const focusBackground = getFocusBackgroundColor(
    resolvedBackgroundResult,
    isSelected,
    hoverBackground
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

  const totalNumColumns = useTotalNumColumns();

  return (
    <>
      <TrWithHoverBackground
        hoverBackground={hoverBackground}
        background={background}
        focusBackground={focusBackground}
        borderLeft={isExpanded ? tableBorderLeftExpanded : tableBorderLeft}
      >
        {rowIndent && (
          <td>
            <Indent num={rowIndent} background={firstColumnBackground} />
          </td>
        )}
        {enableExpandCollapse && (
          <td
            style={{
              width: "var(--swui-expand-cell-width)",
            }}
          >
            <StandardTableRowExpandButton
              colIndex={colIndexOffset}
              rowIndex={enableGridCell ? rowIndex : 0}
              numRows={enableGridCell ? numRows : 0}
              item={item}
            />
          </td>
        )}
        {showRowCheckbox && (
          <td
            style={
              {
                width: "var(--swui-checkbox-cell-width)",
                minWidth: "var(--swui-checkbox-cell-width)",
                background: stickyCheckboxColumn ? "inherit" : undefined,
                position: stickyCheckboxColumn ? "sticky" : undefined,
                left:
                  enableExpandCollapse && stickyCheckboxColumn
                    ? "var(--swui-expand-cell-width)"
                    : stickyCheckboxColumn
                    ? "0px"
                    : undefined,
                textAlign: "center",
                boxShadow: stickyCheckboxColumn
                  ? "var(--swui-sticky-column-shadow-right)"
                  : undefined,
                zIndex: stickyCheckboxColumn
                  ? "var(--swui-sticky-column-z-index)"
                  : undefined,
              } as CSSProperties
            }
          >
            <StandardTableRowCheckbox
              disabled={disabled}
              value={isSelected}
              onValueChange={toggleSelected}
              colIndex={colIndexOffset + (enableExpandCollapse ? 1 : 0)}
              rowIndex={rowIndex}
              numRows={numRows}
            />
          </td>
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
                stickyColumnGroupLeft={groupConfig.sticky && groupIndex === 0}
                stickyColumnGroupRight={
                  groupConfig.sticky && groupIndex === groupConfigs.length - 1
                }
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
      </TrWithHoverBackground>
      {enableExpandCollapse && renderRowExpansion && isExpanded && (
        <tr
          style={{
            borderLeft: tableBorderLeftExpanded,
            background: tableBackgroundColorExpanded,
          }}
        >
          <td colSpan={totalNumColumns}>
            {renderRowExpansion(item, { onRequestCollapse: toggleRowExpanded })}
          </td>
        </tr>
      )}
    </>
  );
});

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
    return cssColor("--lhds-color-blue-100");
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

const getFocusBackgroundColor = (
  resolvedBackground:
    | string
    | undefined
    | RowBackgroundResolverColorCombination,
  isSelected: boolean,
  hoverBackground: string | undefined
): string | undefined => {
  if (isSelected) {
    return cssColor("--lhds-color-blue-100");
  }
  if (resolvedBackground) {
    return hoverBackground;
  }
  return undefined;
};
