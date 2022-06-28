import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import * as React from "react";
import { CSSProperties } from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../config/TableConfig";
import { useGroupConfigsAndIdsForRows } from "../context/GroupConfigsAndIdsForRowsContext";
import { useColumnGroupOrderContext } from "../context/StandardTableColumnOrderContext";
import { useTableHeadCheckbox } from "../features/checkboxes/UseTableHeadCheckbox";
import { useTableHeadExpandCollapse } from "../features/expand-collapse/UseTableHeadExpandCollapse";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorderFromGroup } from "../util/CellBorderCalculator";
import { StandardTableHeadItem } from "./StandardTableHeadItem";
import { TrWithHoverBackground } from "./TrWithHoverBackground";

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
  const groupConfigsAndIds = useGroupConfigsAndIdsForRows();

  const {
    showHeaderCheckbox,
    showHeaderExpandCollapse,
    enableExpandCollapse,
    rowIndent,
    headerRowOffsetTop,
    zIndex,
    stickyHeader,
    stickyCheckboxColumn,
    showRowCheckbox,
  } = useStandardTableConfig();

  const columnGroupOrder = useColumnGroupOrderContext();

  const { allItemsAreExpanded, toggleExpanded } =
    useTableHeadExpandCollapse(items);
  const { allItemsAreSelected, onClickCheckbox, selectionIsEmpty } =
    useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  const stickyHeaderStyle: CSSProperties = {
    zIndex: (stickyHeader && stickyCheckboxColumn
      ? "var(--swui-sticky-header-in-sticky-column-z-index)"
      : stickyCheckboxColumn
      ? "var(--swui-sticky-group-header-z-index)"
      : stickyHeader
      ? "var(--swui-sticky-header-z-index)"
      : zIndex) as CSSProperties["zIndex"],
    top: getTopPosition(
      headerRowOffsetTop,
      columnGroupOrder,
      height,
      stickyHeader
    ),
    background: stickyHeader || stickyCheckboxColumn ? "white" : undefined,
    position: stickyHeader || stickyCheckboxColumn ? "sticky" : undefined,
    boxShadow:
      stickyHeader && stickyCheckboxColumn
        ? "var(--swui-sticky-header-shadow-and-right)"
        : stickyCheckboxColumn
        ? "var(--swui-sticky-column-shadow-right)"
        : stickyHeader
        ? "var(--swui-sticky-header-shadow)"
        : undefined,
  };

  return (
    <TrWithHoverBackground height={height} borderLeft={tableBorderLeft}>
      {rowIndent && (
        <th style={stickyHeaderStyle}>
          <Row indent={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th
          style={{
            ...stickyHeaderStyle,
            left: "0px",
            textAlign: "left",
          }}
        >
          <Row
            width={"var(--swui-expand-cell-width)"}
            minWidth={"var(--swui-expand-cell-width)"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {showHeaderExpandCollapse && (
              <FlatButton
                size={"small"}
                leftIcon={allItemsAreExpanded ? faChevronDown : faChevronRight}
                onClick={toggleExpanded}
              />
            )}
          </Row>
        </th>
      )}
      {(showRowCheckbox || showHeaderCheckbox) && (
        <th
          style={{
            ...stickyHeaderStyle,
            overflow: "hidden",
            left:
              stickyCheckboxColumn && enableExpandCollapse
                ? "var(--swui-expand-cell-width)"
                : stickyCheckboxColumn
                ? "0px"
                : undefined,
          }}
        >
          <Row
            width={"var(--swui-checkbox-cell-width)"}
            minWidth={"var(--swui-checkbox-cell-width)"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {showHeaderCheckbox && (
              <Checkbox
                size={"small"}
                disabled={checkboxDisabled}
                value={allItemsAreSelected}
                indeterminate={!selectionIsEmpty && !allItemsAreSelected}
                onValueChange={onClickCheckbox}
              />
            )}
          </Row>
        </th>
      )}
      {groupConfigsAndIds.map(({ groupConfig, groupId }, groupIndex) => {
        return (
          <React.Fragment key={groupId}>
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
      {rowIndent && (
        <th style={stickyHeaderStyle}>
          <Row indent={rowIndent} />
        </th>
      )}
      <th style={stickyHeaderStyle} />
    </TrWithHoverBackground>
  );
});
