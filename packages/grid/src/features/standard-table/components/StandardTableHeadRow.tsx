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
import { TableHeadRow } from "../../table-ui/components/table/TableHeadRow";
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

export const StandardTableHeadRow = React.memo(function StandardTableHeadRow<
  TItem
>({ items, height = defaultTableRowHeight }: StandardTableHeaderProps<TItem>) {
  const groupConfigs = useGroupConfigsForRows();

  const {
    showHeaderCheckbox,
    showHeaderExpandCollapse,
    enableExpandCollapse,
    rowIndent,
    headerRowOffsetTop = 0,
    zIndex,
    stickyHeader,
    stickyCheckboxColumn,
  } = useStandardTableConfig();

  const columnGroup = useColumnGroupOrderContext();

  const { allItemsAreExpanded, toggleExpanded } = useTableHeadExpandCollapse(
    items
  );
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty,
  } = useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  const topPosition = () => {
    if (headerRowOffsetTop && columnGroup !== undefined) {
      return `calc(${headerRowOffsetTop} + ${height})`;
    } else if (headerRowOffsetTop) {
      return headerRowOffsetTop;
    } else if (stickyHeader) {
      return 0;
    }
    return undefined;
  };

  return (
    <TableHeadRow
      top={topPosition()}
      height={height}
      borderLeft={tableBorderLeft}
      background={stickyHeader ? "white" : undefined}
      position={stickyHeader ? "sticky" : undefined}
      shadow={stickyHeader ? "var(--swui-sticky-header-shadow)" : undefined}
      style={{
        zIndex: stickyHeader
          ? zIndex ?? ("var(--swui-sticky-header-z-index)" as Property.ZIndex)
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
          background={stickyCheckboxColumn ? "white" : undefined}
          position={stickyCheckboxColumn ? "sticky" : undefined}
          left={stickyCheckboxColumn ? "0px" : undefined}
          zIndex={zIndex}
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
    </TableHeadRow>
  );
});
