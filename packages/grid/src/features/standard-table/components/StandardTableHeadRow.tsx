import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Indent, Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import { ZIndexProperty } from "csstype";
import * as React from "react";
import {
  defaultTableRowHeight,
  tableBorder,
} from "../../../config/TableConfig";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { TableHeadRow } from "../../table-ui/components/table/TableHeadRow";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { useTableHeadCheckbox } from "../hooks/UseTableHeadCheckbox";
import { useTableHeadExpandCollapse } from "../hooks/UseTableHeadExpandCollapse";
import { StandardTableHeadItem } from "./StandardTableHeadItem";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
  height?: string;
}

export const StandardTableHeadRow = React.memo(function StandardTableHeader<
  TItem
>({ items, height = defaultTableRowHeight }: StandardTableHeaderProps<TItem>) {
  const groupConfigs = useGroupConfigsForRows();

  const {
    showHeaderCheckbox,
    showHeaderExpandCollapse,
    enableExpandCollapse,
    rowIndent,
    headerRowOffsetTop,
    zIndex,
    stickyHeader,
  } = useStandardTableConfig();
  const { allItemsAreExpanded, toggleExpanded } = useTableHeadExpandCollapse(
    items
  );
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty,
  } = useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  console.log("groupConfigs", groupConfigs);

  return (
    <TableHeadRow
      top={headerRowOffsetTop ?? 0}
      height={height}
      background={stickyHeader ? "white" : undefined}
      position={stickyHeader ? "sticky" : undefined}
      shadow={stickyHeader ? "var(--swui-sticky-header-shadow)" : undefined}
      style={{
        zIndex: stickyHeader
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as ZIndexProperty)
          : zIndex,
      }}
    >
      {rowIndent && <Indent num={rowIndent} />}
      {enableExpandCollapse && (
        <Row
          alignItems={"center"}
          justifyContent={"center"}
          width={"45px"}
          minWidth={"45px"}
          indent
        >
          {showHeaderExpandCollapse && (
            <FlatButton
              size={"small"}
              leftIcon={allItemsAreExpanded ? faChevronDown : faChevronRight}
              onClick={toggleExpanded}
            />
          )}
        </Row>
      )}
      {showHeaderCheckbox && (
        <TableHeadItem
          width={"45px"}
          minWidth={"45px"}
          justifyContent={"center"}
          overflow={"hidden"}
        >
          <Row alignItems={"center"}>
            <Checkbox
              size={"small"}
              disabled={checkboxDisabled}
              value={allItemsAreSelected}
              indeterminate={!selectionIsEmpty && !allItemsAreSelected}
              onValueChange={onClickCheckbox}
            />
          </Row>
        </TableHeadItem>
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
          {groupConfig.columnOrder.map((columnId, index) => (
            <StandardTableHeadItem
              columnId={columnId}
              key={columnId}
              disableBorderLeft={
                (groupIndex === 0 || Boolean(groupConfig.borderLeft)) &&
                index === 0
              }
            />
          ))}
        </Row>
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </TableHeadRow>
  );
});
