import { Indent } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import { styled } from "@storybook/theming";
import * as React from "react";
import { useMemo } from "react";
import {
  tableBackgroundColorExpanded,
  tableBackgroundHoverColorExpanded,
  tableBorderLeft,
  tableBorderLeftExpanded,
} from "../../../config/TableConfig";
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

const TrWithHoverBackground = styled.tr<{
  borderLeft: string | undefined;
  focusBackground: string | undefined;
  hoverBackground: string | undefined;
  background: string | undefined;
}>`
  --focus-within-background: ${({ focusBackground }) => focusBackground};
  border-left: ${({ borderLeft }) => borderLeft};
  background: ${({ background }) => background};
  &:hover {
    background: ${({ hoverBackground }) => hoverBackground};
  }
`;

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

  return (
    <>
      <TrWithHoverBackground
        hoverBackground={hoverBackground}
        background={background}
        focusBackground={focusBackground}
        borderLeft={isExpanded ? tableBorderLeftExpanded : tableBorderLeft}
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
          <td
            style={{
              width: "45px",
              minWidth: "45px",
              background: stickyCheckboxColumn ? "inherit" : undefined,
              position: stickyCheckboxColumn ? "sticky" : undefined,
              left: stickyCheckboxColumn ? "0px" : undefined,
              textAlign: "center",
            }}
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
          <td colSpan={200}>
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
