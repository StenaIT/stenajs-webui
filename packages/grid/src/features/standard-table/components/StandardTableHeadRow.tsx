import { Row } from "@stenajs-webui/core";
import {
  FlatButton,
  stenaAngleDown,
  stenaAngleRight,
} from "@stenajs-webui/elements";
import { Checkbox } from "@stenajs-webui/forms";
import * as React from "react";
import {
  defaultTableRowHeight,
  tableBorderLeft,
} from "../../../config/TableConfig";
import { useGroupConfigsAndIdsForRows } from "../context/GroupConfigsAndIdsForRowsContext";
import { useTableHeadCheckbox } from "../features/checkboxes/UseTableHeadCheckbox";
import { useTableHeadExpandCollapse } from "../features/expand-collapse/UseTableHeadExpandCollapse";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorderFromGroup } from "../util/CellBorderCalculator";
import { StandardTableHeadItem } from "./StandardTableHeadItem";
import { TrWithHoverBackground } from "./TrWithHoverBackground";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
  height?: string;
  topBorder: boolean;
  renderHeadItem?: (columnId: string, index: number) => React.ReactNode;
}

export const StandardTableHeadRow = React.memo(function StandardTableHeadRow<
  TItem
>({
  items,
  height = defaultTableRowHeight,
  renderHeadItem,
  topBorder,
}: StandardTableHeaderProps<TItem>) {
  const groupConfigsAndIds = useGroupConfigsAndIdsForRows();

  const {
    showHeaderCheckbox,
    showHeaderExpandCollapse,
    enableExpandCollapse,
    rowIndent,
    stickyHeader,
    stickyCheckboxColumn,
    showRowCheckbox,
  } = useStandardTableConfig();

  const { allItemsAreExpanded, toggleExpanded } =
    useTableHeadExpandCollapse(items);
  const { allItemsAreSelected, onClickCheckbox, selectionIsEmpty } =
    useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  const commonStyle: React.CSSProperties = {
    borderTop: topBorder ? "1px solid var(--lhds-color-ui-300)" : "none",
  };

  return (
    <TrWithHoverBackground height={height} borderLeft={tableBorderLeft}>
      {rowIndent && (
        <th style={commonStyle}>
          <Row indent={rowIndent} />
        </th>
      )}
      {enableExpandCollapse && (
        <th
          style={{
            ...commonStyle,
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
            ...commonStyle,
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
                <th key={columnId} style={commonStyle}>
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
                  topBorder={topBorder}
                />
              );
            })}
          </React.Fragment>
        );
      })}
      {rowIndent && (
        <th style={commonStyle}>
          <Row indent={rowIndent} />
        </th>
      )}
      <th style={commonStyle} />
    </TrWithHoverBackground>
  );
});
