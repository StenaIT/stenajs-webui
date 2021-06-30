import { Indent, Row } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { CSSProperties, useMemo, useRef } from "react";
import { useOnScreen } from "../../../../../core/src/hooks/UseOnScreen";
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
import { StandardTableRowExpansion } from "./StandardTableRowExpansion";
import { TrWithHoverBackground } from "./TrWithHoverBackground";

export interface StandardTableRowProps<TItem> {
  item: TItem;
  rowIndex: number;
  numRows: number;
  colIndexOffset: number;
  alwaysVisible?: boolean;
}

export const StandardTableRow = React.memo(function StandardTableRow<TItem>({
  item,
  rowIndex,
  numRows,
  colIndexOffset,
  alwaysVisible,
}: StandardTableRowProps<TItem>) {
  const trRef = useRef(null);
  const totalNumColumns = useTotalNumColumns();
  const { stickyCheckboxColumn } = useStandardTableConfig();
  const groupConfigs = useGroupConfigsForRows();
  const { columnIndexPerColumnId } = useColumnIndexPerColumnIdContext();
  const {
    showRowCheckbox,
    rowBackgroundResolver,
    checkboxDisabledResolver,
    enableGridCell,
    rowIndent,
    enableExpandCollapse,
  } = useStandardTableConfig();

  const { isExpanded } = useExpandCollapseActions(item);
  const { isSelected, toggleSelected } = useRowCheckbox(item);

  const visible = useOnScreen(trRef);

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

  return (
    <>
      <TrWithHoverBackground
        hoverBackground={hoverBackground}
        background={background}
        focusBackground={focusBackground}
        borderLeft={isExpanded ? tableBorderLeftExpanded : tableBorderLeft}
        ref={trRef}
      >
        {visible || alwaysVisible ? (
          <>
            {rowIndent && (
              <td
                style={{
                  background: firstColumnBackground,
                }}
              >
                <Indent num={rowIndent} />
              </td>
            )}
            {enableExpandCollapse && (
              <td
                style={
                  {
                    background: stickyCheckboxColumn ? "inherit" : undefined,
                    position: stickyCheckboxColumn ? "sticky" : undefined,
                    left: stickyCheckboxColumn ? "0px" : undefined,
                    boxShadow: stickyCheckboxColumn
                      ? "var(--swui-sticky-column-shadow-right)"
                      : undefined,
                    zIndex: stickyCheckboxColumn
                      ? "var(--swui-sticky-column-z-index)"
                      : undefined,
                  } as CSSProperties
                }
              >
                <Row
                  width={"var(--swui-expand-cell-width)"}
                  minWidth={"var(--swui-expand-cell-width)"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <StandardTableRowExpandButton
                    colIndex={colIndexOffset}
                    rowIndex={enableGridCell ? rowIndex : 0}
                    numRows={enableGridCell ? numRows : 0}
                    item={item}
                  />
                </Row>
              </td>
            )}
            {showRowCheckbox && (
              <td
                style={
                  {
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
                <Row
                  width={"var(--swui-checkbox-cell-width)"}
                  minWidth={"var(--swui-checkbox-cell-width)"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <StandardTableRowCheckbox
                    disabled={disabled}
                    value={isSelected}
                    onValueChange={toggleSelected}
                    colIndex={colIndexOffset + (enableExpandCollapse ? 1 : 0)}
                    rowIndex={rowIndex}
                    numRows={numRows}
                  />
                </Row>
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
              <td
                style={{
                  background: lastColumnBackground,
                }}
              >
                <Indent num={rowIndent} />
              </td>
            )}
          </>
        ) : (
          <td
            colSpan={totalNumColumns}
            style={{ height: "var(--current-row-height)" }}
          />
        )}
      </TrWithHoverBackground>
      <StandardTableRowExpansion item={item} />
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
