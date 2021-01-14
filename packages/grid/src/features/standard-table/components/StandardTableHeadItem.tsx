import * as React from "react";
import { tableBorder } from "../../../config/TableConfig";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import { useTableSortHeader } from "../hooks/UseTableSortHeader";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { formatColumnIdToHeaderCellLabel } from "../util/LabelFormatter";

export interface StandardTableHeaderItemProps {
  columnId: string;
}

export const StandardTableHeadItem = React.memo(
  function StandardTableHeaderItem({ columnId }: StandardTableHeaderItemProps) {
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
    } = useColumnFromConfig(columnId);
    const { disableSorting } = useStandardTableConfig();

    const { arrow, onClickColumnHead } = useTableSortHeader(columnId);

    const label =
      typeof columnLabel === "string"
        ? columnLabel
        : formatColumnIdToHeaderCellLabel(columnId);

    return (
      <TableHeadItem
        arrow={!disableSorting && label ? arrow : undefined}
        onClick={!disableSorting ? onClickColumnHead : undefined}
        width={width}
        minWidth={minWidth ?? width}
        background={background ?? "white"}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
        flex={width ? undefined : flex}
        justifyContent={justifyContentHeader}
        label={label}
        infoIconTooltipText={infoIconTooltipText}
        position={sticky ? "sticky" : undefined}
        left={sticky && left == null ? "0px" : left}
        shadow={sticky ? "var(--swui-sticky-column-shadow-right)" : undefined}
        zIndex={zIndex}
      />
    );
  }
);
