import { Row } from "@stenajs-webui/core";
import {
  FlatButton,
  stenaAngleDown,
  stenaAngleRight,
} from "@stenajs-webui/elements";
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
import { TableHeadProps } from "../../table-ui/components/table/TableHeadItem";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
  height?: string;
  numberOfRowsBefore?: number;
  appendTooltipTo?: TableHeadProps["appendTooltipTo"];
  shadow: boolean;
  topBorder: boolean;
  renderHeadItem?: (columnId: string, index: number) => React.ReactNode;
}

const getTopPosition = (
  headerRowOffsetTop: string | undefined,
  columnGroupOrder: Array<string> | undefined,
  height: string,
  stickyHeader: boolean | undefined,
  numberOfRowsBefore: number
): CSSProperties["top"] => {
  // todo: having fixed row heights comes in handy in this case, but we can't rely on them being correct because of line-wrapped column headers.
  if (headerRowOffsetTop && columnGroupOrder !== undefined) {
    return `calc(${headerRowOffsetTop} + ${height} + (${numberOfRowsBefore} * var(--current-row-height)))`;
  } else if (stickyHeader && columnGroupOrder) {
    return `calc((${numberOfRowsBefore} * var(--current-row-height)) + ${height})`;
  } else if (headerRowOffsetTop) {
    return `calc((${numberOfRowsBefore} * var(--current-row-height)) + ${headerRowOffsetTop})`;
  } else if (stickyHeader) {
    return `calc(${numberOfRowsBefore} * var(--current-row-height))`;
  }
  return undefined;
};

export const StandardTableHeadRow = React.memo(function StandardTableHeadRow<
  TItem
>({
  items,
  appendTooltipTo,
  numberOfRowsBefore = 0,
  height = defaultTableRowHeight,
  shadow,
  topBorder,
  renderHeadItem,
}: StandardTableHeaderProps<TItem>) {
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
      stickyHeader,
      numberOfRowsBefore // todo: Mattias: Nowadays we don't have to set position: sticky on the th elements. We can set it on the whole thead element instead. That would remove the need to add offset to each subsequent row.
    ),
    background: stickyHeader || stickyCheckboxColumn ? "white" : undefined,
    // todo: I added a check to only set position to sticky if media matches "screen only" since we don't want them sticky when printing, but then I reverted that because I noticed that users can't really print these tables anyway, since most of the rows are just empty, probably because of virtualization. Is this something we wanna address at some point?
    position: stickyHeader || stickyCheckboxColumn ? "sticky" : undefined,
    boxShadow: shadow
      ? stickyHeader && stickyCheckboxColumn
        ? "var(--swui-sticky-header-shadow-and-right)"
        : stickyCheckboxColumn
        ? "var(--swui-sticky-column-shadow-right)"
        : stickyHeader
        ? "var(--swui-sticky-header-shadow)"
        : undefined
      : undefined,
    borderTop: topBorder ? "1px solid var(--lhds-color-ui-300)" : "none",
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
                leftIcon={
                  allItemsAreExpanded ? stenaAngleDown : stenaAngleRight
                }
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
              return renderHeadItem ? (
                <th style={stickyHeaderStyle}>
                  {renderHeadItem(columnId, index)}
                </th>
              ) : (
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
                  appendTooltipTo={appendTooltipTo}
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
