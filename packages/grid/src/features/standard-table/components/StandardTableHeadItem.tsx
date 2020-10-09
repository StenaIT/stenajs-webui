import { lowerCase, upperFirst } from "lodash";
import * as React from "react";
import { tableBorder } from "../../../config/TableConfig";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import { useTableSortHeader } from "../hooks/UseTableSortHeader";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";

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
    } = useColumnFromConfig(columnId);
    const { disableSorting } = useStandardTableConfig();

    const { arrow, onClickColumnHead } = useTableSortHeader(columnId);

    const label =
      typeof columnLabel === "string"
        ? columnLabel
        : upperFirst(lowerCase(columnId));

    return (
      <TableHeadItem
        arrow={!disableSorting && label ? arrow : undefined}
        onClick={!disableSorting ? onClickColumnHead : undefined}
        width={width}
        minWidth={minWidth ?? width}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
        flex={width ? undefined : flex}
        justifyContent={justifyContentHeader}
        label={label}
        infoIconTooltipText={infoIconTooltipText}
      />
    );
  }
);
