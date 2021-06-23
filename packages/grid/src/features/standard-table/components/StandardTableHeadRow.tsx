import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Indent, Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import { Property } from "csstype";
import * as React from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../config/TableConfig";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useGroupConfigsForRows } from "../context/GroupConfigsForRowsContext";
import { useColumnGroupOrderContext } from "../context/StandardTableColumnOrderContext";
import { useTableHeadCheckbox } from "../features/checkboxes/UseTableHeadCheckbox";
import { useTableHeadExpandCollapse } from "../features/expand-collapse/UseTableHeadExpandCollapse";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorderFromGroup } from "../util/CellBorderCalculator";
import { StandardTableHeadItem } from "./StandardTableHeadItem";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
  height?: string;
}

const getTopPosition = (
  headerRowOffsetTop: string | undefined,
  columnGroupOrder: Array<string> | undefined,
  height: string,
  stickyHeader: boolean | undefined
) => {
  if (headerRowOffsetTop && columnGroupOrder !== undefined) {
    return `calc(${headerRowOffsetTop} + ${height})`;
  } else if (stickyHeader && columnGroupOrder) {
    return `calc(0px + ${height})`;
  } else if (headerRowOffsetTop) {
    return headerRowOffsetTop;
  } else if (stickyHeader) {
    return 0;
  }
  return undefined;
};

export const StandardTableHeadRow = React.memo(function StandardTableHeadRow<
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
    stickyCheckboxColumn,
  } = useStandardTableConfig();

  const columnGroupOrder = useColumnGroupOrderContext();

  const { allItemsAreExpanded, toggleExpanded } = useTableHeadExpandCollapse(
    items
  );
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty,
  } = useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  return (
    <tr
      style={{
        zIndex: stickyHeader
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
          : zIndex,
        top: getTopPosition(
          headerRowOffsetTop,
          columnGroupOrder,
          height,
          stickyHeader
        ),
        height,
        borderLeft: tableBorderLeft,
        background: stickyHeader ? "white" : undefined,
        position: stickyHeader ? "sticky" : undefined,
        boxShadow: stickyHeader
          ? "var(--swui-sticky-header-shadow)"
          : undefined,
      }}
    >
      {rowIndent && (
        <th>
          <Indent num={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th style={{ width: "45px", textAlign: "left" }}>
          {showHeaderExpandCollapse && (
            <FlatButton
              size={"small"}
              leftIcon={allItemsAreExpanded ? faChevronDown : faChevronRight}
              onClick={toggleExpanded}
            />
          )}
        </th>
      )}
      {showHeaderCheckbox && (
        <th
          style={{
            width: "45px",
            minWidth: "45px",
            overflow: "hidden",
            background: stickyCheckboxColumn ? "white" : undefined,
            position: stickyCheckboxColumn ? "sticky" : undefined,
            left: stickyCheckboxColumn ? "0px" : undefined,
            zIndex: zIndex,
          }}
        >
          <TableHeadItem justifyContent="center">
            <Checkbox
              size={"small"}
              disabled={checkboxDisabled}
              value={allItemsAreSelected}
              indeterminate={!selectionIsEmpty && !allItemsAreSelected}
              onValueChange={onClickCheckbox}
            />
          </TableHeadItem>
        </th>
      )}
      {groupConfigs.map((groupConfig, groupIndex) => {
        return (
          <React.Fragment key={groupIndex}>
            {groupConfig.columnOrder.map((columnId, index) => {
              return (
                <StandardTableHeadItem
                  columnId={columnId}
                  key={columnId}
                  borderFromGroup={getCellBorderFromGroup(
                    groupIndex,
                    index,
                    groupConfig.borderLeft
                  )}
                  disableBorderLeft={groupIndex === 0 && index === 0}
                />
              );
            })}
          </React.Fragment>
        );
      })}
      {rowIndent && <Indent num={rowIndent} />}
    </tr>
  );
});
