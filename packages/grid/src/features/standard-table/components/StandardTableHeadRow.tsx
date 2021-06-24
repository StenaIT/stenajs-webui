import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Indent } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import * as React from "react";
import { CSSProperties } from "react";
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
): CSSProperties["top"] => {
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

  const stickyHeaderStyle: CSSProperties = {
    zIndex: (stickyHeader
      ? zIndex ?? "var(--swui-sticky-header-z-index)"
      : zIndex) as CSSProperties["zIndex"],
    top: getTopPosition(
      headerRowOffsetTop,
      columnGroupOrder,
      height,
      stickyHeader
    ),
    background: stickyHeader ? "white" : undefined,
    position: stickyHeader ? "sticky" : undefined,
    boxShadow: stickyHeader ? "var(--swui-sticky-header-shadow)" : undefined,
  };

  return (
    <tr
      style={{
        height,
        borderLeft: tableBorderLeft,
      }}
    >
      {rowIndent && (
        <th style={stickyHeaderStyle}>
          <Indent num={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th style={{ width: "45px", textAlign: "left", ...stickyHeaderStyle }}>
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
            zIndex: (stickyHeader
              ? "var(--swui-sticky-header-z-index)"
              : stickyCheckboxColumn
              ? "var(--swui-sticky-column-z-index)"
              : undefined) as CSSProperties["zIndex"],
            background:
              stickyCheckboxColumn || stickyHeader ? "white" : undefined,
            position:
              stickyCheckboxColumn || stickyHeader ? "sticky" : undefined,
            left: stickyCheckboxColumn ? "0px" : undefined,
            top: stickyHeaderStyle.top,
            boxShadow: stickyHeader
              ? "var(--swui-sticky-header-shadow)"
              : stickyCheckboxColumn
              ? "var(--swui-sticky-column-shadow-right)"
              : undefined,
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
                  stickyHeader={stickyHeader}
                  top={stickyHeaderStyle.top}
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
