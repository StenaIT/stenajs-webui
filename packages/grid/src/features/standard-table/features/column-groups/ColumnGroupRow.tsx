import { Indent, Row } from "@stenajs-webui/core";
import { Property } from "csstype";
import * as React from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../../config/TableConfig";
import { TableHeadItem } from "../../../table-ui/components/table/TableHeadItem";
import { TableHeadRow } from "../../../table-ui/components/table/TableHeadRow";
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
    <TableHeadRow
      height={height}
      borderLeft={tableBorderLeft}
      top={getTopPosition(stickyHeader, headerRowOffsetTop)}
      background={stickyHeader ? "white" : undefined}
      position={stickyHeader ? "sticky" : undefined}
      shadow={stickyHeader ? "var(--swui-sticky-header-shadow)" : undefined}
      zIndex={
        stickyHeader
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
          : zIndex
      }
    >
      {rowIndent && <Indent num={rowIndent} />}
      {enableExpandCollapse && (
        <Row
          alignItems={"center"}
          justifyContent={"center"}
          width={"45px"}
          minWidth={"45px"}
          indent
        />
      )}
      {showHeaderCheckbox && (
        <TableHeadItem
          width={"45px"}
          minWidth={"45px"}
          justifyContent={"center"}
          overflow={"hidden"}
          background={
            showHeaderCheckbox && stickyCheckboxColumn ? "white" : undefined
          }
          position={
            showHeaderCheckbox && stickyCheckboxColumn ? "sticky" : undefined
          }
          left={showHeaderCheckbox && stickyCheckboxColumn ? "0px" : undefined}
          zIndex={
            showHeaderCheckbox && stickyCheckboxColumn
              ? zIndex ??
                ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
              : zIndex
          }
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
    </TableHeadRow>
  );
});
