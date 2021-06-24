import { CSSProperties } from "react";
import * as React from "react";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useTableSortHeader } from "../features/sorting/UseTableSortHeader";
import { useColumnConfigById } from "../hooks/UseColumnConfigById";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorder } from "../util/CellBorderCalculator";
import { formatColumnIdToHeaderCellLabel } from "../util/LabelFormatter";

export interface StandardTableHeaderItemProps {
  columnId: string;
  disableBorderLeft?: boolean;
  borderFromGroup?: boolean | string;
  stickyHeader?: boolean;
  top?: string | number;
}

export const StandardTableHeadItem = React.memo(
  function StandardTableHeaderItem({
    columnId,
    borderFromGroup,
    disableBorderLeft,
    stickyHeader,
    top,
  }: StandardTableHeaderItemProps) {
    const {
      width,
      minWidth,
      flex = 1,
      justifyContentHeader,
      columnLabel,
      borderLeft,
      infoIconTooltipText,
      background,
      sticky: stickyColumn,
      zIndex,
      left,
      sortOrderIconVariant,
    } = useColumnConfigById(columnId);
    const {
      disableSorting,
      sortOrderIconVariant: defaultSortOrderIconVariant,
    } = useStandardTableConfig();

    const { arrow, onClickColumnHead } = useTableSortHeader(columnId);

    const label =
      typeof columnLabel === "string"
        ? columnLabel
        : formatColumnIdToHeaderCellLabel(columnId);

    const activeBorderLeft = getCellBorder(
      borderFromGroup,
      disableBorderLeft,
      borderLeft
    );

    return (
      <th
        style={{
          width: width,
          minWidth: minWidth ?? width ?? "20px",
          background: background ?? "white",
          borderLeft: activeBorderLeft,
          flex: width ? undefined : flex,
          justifyContent: justifyContentHeader,
          position: stickyColumn || stickyHeader ? "sticky" : undefined,
          left: stickyColumn
            ? `calc(var(--current-left-offset) + ${left ?? "0px"})`
            : undefined,
          top: top,
          boxShadow: stickyHeader
            ? "var(--swui-sticky-header-shadow)"
            : stickyColumn
            ? "var(--swui-sticky-column-shadow-right)"
            : undefined,
          zIndex: (stickyHeader && stickyColumn
            ? "var(--swui-sticky-header-in-sticky-column-z-index)"
            : stickyHeader
            ? "var(--swui-sticky-header-z-index)"
            : stickyColumn
            ? "var(--swui-sticky-column-z-index)"
            : zIndex) as CSSProperties["zIndex"],
        }}
      >
        <TableHeadItem
          arrow={!disableSorting && label ? arrow : undefined}
          onClick={!disableSorting ? onClickColumnHead : undefined}
          label={label}
          infoIconTooltipText={infoIconTooltipText}
          alignRight={justifyContentHeader === "flex-end"}
          sortOrderIconVariant={
            sortOrderIconVariant ?? defaultSortOrderIconVariant
          }
        />
      </th>
    );
  }
);
