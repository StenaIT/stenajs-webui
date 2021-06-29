import * as React from "react";
import { CSSProperties } from "react";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useStickyPropsPerColumnContext } from "../context/StickyPropsPerColumnContext";
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
      justifyContentHeader,
      columnLabel,
      borderLeft,
      infoIconTooltipText,
      background,
      zIndex,
      sortOrderIconVariant,
    } = useColumnConfigById(columnId);
    const {
      disableSorting,
      sortOrderIconVariant: defaultSortOrderIconVariant,
    } = useStandardTableConfig();
    const stickyPropsPerColumnContext = useStickyPropsPerColumnContext();

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

    const stickyProps = stickyPropsPerColumnContext[columnId];

    return (
      <th
        style={{
          background: background ?? "white",
          borderLeft: activeBorderLeft,
          position: stickyHeader || stickyProps.sticky ? "sticky" : undefined,
          left: stickyProps.left,
          right: stickyProps.right,
          top: top,
          boxShadow:
            stickyHeader && stickyProps.sticky
              ? "var(--swui-sticky-header-shadow-and-right)"
              : stickyHeader
              ? "var(--swui-sticky-header-shadow)"
              : stickyProps.sticky
              ? "var(--swui-sticky-column-shadow-right)"
              : undefined,
          zIndex: (stickyHeader && stickyProps.sticky
            ? "var(--swui-sticky-header-in-sticky-column-z-index)"
            : stickyHeader
            ? "var(--swui-sticky-header-z-index)"
            : stickyProps.sticky
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
