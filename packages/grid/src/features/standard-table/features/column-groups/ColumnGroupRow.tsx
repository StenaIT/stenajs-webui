import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
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
  const {
    showHeaderCheckbox,
    enableExpandCollapse,
    rowIndent,
    zIndex,
    stickyHeader,
    stickyCheckboxColumn,
    headerRowOffsetTop,
  } = useStandardTableConfig();

  const stickyHeaderProps = createStickyHeaderProps(
    stickyHeader,
    headerRowOffsetTop,
    zIndex
  );

  return (
    <tr
      style={{
        height: height,
        borderLeft: tableBorderLeft,
      }}
    >
      {rowIndent && (
        <th style={stickyHeaderProps}>
          <Indent num={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th style={stickyHeaderProps}>
          <Row
            alignItems={"center"}
            justifyContent={"center"}
            width={"45px"}
            minWidth={"45px"}
            indent
          />
        </th>
      )}
      {showHeaderCheckbox && (
        <th
          style={{
            ...stickyHeaderProps,
            position:
              stickyHeader || stickyCheckboxColumn ? "sticky" : undefined,
            background:
              stickyHeader || stickyCheckboxColumn ? "white" : undefined,
            boxShadow: stickyCheckboxColumn
              ? "var(--swui-sticky-column-shadow-right)"
              : undefined,
            left: stickyCheckboxColumn
              ? enableExpandCollapse
                ? "var(--swui-expand-cell-width)"
                : "0px"
              : undefined,
          }}
        />
      )}
      {groupConfigs.map((groupConfig, groupIndex) => (
        <ColumnInGroup
          groupConfig={groupConfig}
          columnId={groupConfig.columnOrder[0]}
          key={groupConfig.columnOrder[0]}
          colSpan={groupConfig.columnOrder.length}
          isFirstInGroup={true}
          borderFromGroup={getCellBorderFromGroup(
            groupIndex,
            0,
            groupConfig.borderLeft
          )}
        />
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </tr>
  );
});
