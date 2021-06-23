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
}

export const StandardTableHeadItem = React.memo(
  function StandardTableHeaderItem({
    columnId,
    borderFromGroup,
    disableBorderLeft,
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
      sticky,
      zIndex,
      left,
      sortOrderIconVariant,
    } = useColumnConfigById(columnId);
    const {
      disableSorting,
      sortOrderIconVariant: defaultSortOrderIconVariant,
    } = useStandardTableConfig();
    const { stickyCheckboxColumn } = useStandardTableConfig();

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
          position: sticky ? "sticky" : undefined,
          left:
            sticky && stickyCheckboxColumn && left == null
              ? "45px"
              : sticky && !stickyCheckboxColumn && left == null
              ? "0px"
              : left,
          boxShadow: sticky
            ? "var(--swui-sticky-column-shadow-right)"
            : undefined,
          zIndex: zIndex,
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
