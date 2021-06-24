import { Indent, Row } from "@stenajs-webui/core";
import { Property } from "csstype";
import * as React from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../../config/TableConfig";
import { useGroupConfigsForRows } from "../../context/GroupConfigsForRowsContext";
import { useStandardTableConfig } from "../../hooks/UseStandardTableConfig";
import { ColumnGroupItem } from "./ColumnGroupItem";

interface ColumnGroupRowProps {
  height?: string;
}

const getTopPosition = (
  stickyHeader: boolean | undefined,
  headerRowOffsetTop: string | undefined
) => {
  if (stickyHeader && headerRowOffsetTop) {
    return headerRowOffsetTop;
  } else if (headerRowOffsetTop) {
    return headerRowOffsetTop;
  } else if (stickyHeader) {
    return 0;
  }
  return undefined;
};

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

  return (
    <tr
      style={{
        height: height,
        borderLeft: tableBorderLeft,
        top: getTopPosition(stickyHeader, headerRowOffsetTop),
        background: stickyHeader ? "white" : undefined,
        position: stickyHeader ? "sticky" : undefined,
        boxShadow: stickyHeader
          ? "var(--swui-sticky-header-shadow)"
          : undefined,
        zIndex: stickyHeader
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
          : zIndex,
      }}
    >
      {rowIndent && (
        <th>
          <Indent num={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th>
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
            background:
              showHeaderCheckbox && stickyCheckboxColumn ? "white" : undefined,
            position:
              showHeaderCheckbox && stickyCheckboxColumn ? "sticky" : undefined,
            left:
              showHeaderCheckbox && stickyCheckboxColumn ? "0px" : undefined,
            zIndex:
              showHeaderCheckbox && stickyCheckboxColumn
                ? zIndex ??
                  ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
                : zIndex,
            boxShadow:
              !stickyHeader && showHeaderCheckbox && stickyCheckboxColumn
                ? "var(--swui-sticky-column-shadow-right)"
                : undefined,
          }}
        />
      )}
      {groupConfigs.map((groupConfig, groupIndex) => (
        <ColumnGroupItem
          groupConfig={groupConfig}
          key={groupIndex}
          groupIndex={groupIndex}
        />
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </tr>
  );
});
