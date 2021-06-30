import * as React from "react";
import { CSSProperties } from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../../config/TableConfig";
import { useGroupConfigsForRows } from "../../context/GroupConfigsForRowsContext";
import { useStandardTableConfig } from "../../hooks/UseStandardTableConfig";
import { getCellBorderFromGroup } from "../../util/CellBorderCalculator";
import { ColumnInGroup } from "./ColumnInGroup";
import { createStickyHeaderProps } from "./StickyHeaderPropsFactory";

interface ColumnGroupRowProps {
  height?: string;
}

export const ColumnGroupRow = React.memo(function ColumnGroupRow({
  height = defaultTableRowHeight,
}: ColumnGroupRowProps) {
  const groupConfigs = useGroupConfigsForRows();
  const config = useStandardTableConfig();

  const {
    showHeaderCheckbox,
    enableExpandCollapse,
    rowIndent,
    zIndex,
    stickyHeader,
    stickyCheckboxColumn,
    headerRowOffsetTop,
  } = config;

  const stickyHeaderProps = createStickyHeaderProps(
    stickyHeader,
    stickyCheckboxColumn,
    headerRowOffsetTop,
    zIndex
  );

  const zIndexForCells = (stickyHeader
    ? "var(--swui-sticky-column-group-label-z-index)"
    : "var(--swui-sticky-group-group-z-index)") as CSSProperties["zIndex"];

  return (
    <tr
      style={{
        height: height,
        borderLeft: tableBorderLeft,
      }}
    >
      {rowIndent && <th style={stickyHeaderProps} />}
      {enableExpandCollapse && (
        <th
          style={{
            ...stickyHeaderProps,
            width: "var(--swui-expand-cell-width)",
            left: stickyCheckboxColumn ? "0px" : undefined,
            zIndex: zIndexForCells,
          }}
        />
      )}
      {showHeaderCheckbox && (
        <th
          style={{
            ...stickyHeaderProps,
            left:
              stickyCheckboxColumn && enableExpandCollapse
                ? "var(--swui-expand-cell-width)"
                : stickyCheckboxColumn
                ? "0px"
                : undefined,
            zIndex: zIndexForCells,
          }}
        />
      )}
      {groupConfigs.map((groupConfig, groupIndex) => (
        <ColumnInGroup
          isFirstGroup={groupIndex === 0}
          isLastGroup={groupIndex === groupConfigs.length - 1}
          groupConfig={groupConfig}
          columnId={groupConfig.columnOrder[0]}
          key={groupConfig.columnOrder[0]}
          colSpan={groupConfig.columnOrder.length}
          borderFromGroup={getCellBorderFromGroup(
            groupIndex,
            0,
            groupConfig.borderLeft
          )}
        />
      ))}
      {rowIndent && <th style={stickyHeaderProps} />}
    </tr>
  );
});
