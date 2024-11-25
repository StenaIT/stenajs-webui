import * as React from "react";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useStickyPropsPerColumnContext } from "../context/StickyPropsPerColumnContext";
import { useTableSortHeader } from "../features/sorting/UseTableSortHeader";
import { useColumnConfigById } from "../hooks/UseColumnConfigById";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { getCellBorder } from "../util/CellBorderCalculator";
import { formatColumnIdToHeaderCellLabel } from "../util/LabelFormatter";
import styles from "./StandardTableHeadItem.module.css";
import { CSSProperties } from "react";

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
      justifyContentHeader,
      columnLabel,
      borderLeft,
      infoIconTooltipText,
      background,
      sortOrderIconVariant,
      width,
      minWidth,
    } = useColumnConfigById(columnId);
    const {
      disableSorting,
      infoIconTooltipZIndex,
      sortOrderIconVariant: defaultSortOrderIconVariant,
    } = useStandardTableConfig();
    const stickyPropsPerColumnContext = useStickyPropsPerColumnContext();

    const { arrow, selected, onClickColumnHead } = useTableSortHeader(columnId);

    const label =
      typeof columnLabel === "string"
        ? columnLabel
        : formatColumnIdToHeaderCellLabel(columnId);

    const activeBorderLeft = getCellBorder(
      borderFromGroup,
      disableBorderLeft,
      borderLeft,
    );

    const stickyProps = stickyPropsPerColumnContext[columnId];

    return (
      <th
        className={styles.standardTableHeadTh}
        style={{
          background: background ?? "white",
          borderLeft: activeBorderLeft,
          position: stickyProps.sticky ? "sticky" : undefined,
          left: stickyProps.left,
          right: stickyProps.right,
          boxShadow:
            stickyProps.sticky &&
            stickyProps.isFirstColumnInLastGroup &&
            stickyProps.sticky &&
            stickyProps.isFirstColumnInLastGroup
              ? "var(--swui-sticky-column-shadow-left)"
              : stickyProps.sticky
                ? "var(--swui-sticky-column-shadow-right)"
                : undefined,
          zIndex: (stickyProps.sticky
            ? "var(--swui-sticky-group-header-z-index)"
            : undefined) as CSSProperties["zIndex"],
          width,
          minWidth,
        }}
      >
        <TableHeadItem
          width={"inherit"}
          minWidth={"inherit"}
          arrow={!disableSorting && label ? arrow : undefined}
          onClick={!disableSorting ? onClickColumnHead : undefined}
          label={label}
          infoIconTooltipText={infoIconTooltipText}
          infoIconTooltipZIndex={infoIconTooltipZIndex}
          alignRight={justifyContentHeader === "flex-end"}
          sortOrderIconVariant={
            sortOrderIconVariant ?? defaultSortOrderIconVariant
          }
          selected={selected}
          height={"100%"}
        />
      </th>
    );
  },
);
