import { lowerCase, upperFirst } from "lodash";
import * as React from "react";
import { tableBorder } from "../../../config/TableConfig";
import { TableHead } from "../../table-ui/components/TableHead";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import { useTableSortHeader } from "../hooks/UseTableSortHeader";

export interface StandardTableHeaderItemProps {
  columnId: string;
}

export const StandardTableHeaderItem = React.memo(
  function StandardTableHeaderItem({ columnId }: StandardTableHeaderItemProps) {
    const {
      width,
      flex = 1,
      justifyContentHeader,
      columnLabel,
      borderLeft,
      infoIconTooltipText
    } = useColumnFromConfig(columnId);
    const { arrow, onClickColumnHead } = useTableSortHeader(columnId);

    const label =
      typeof columnLabel === "string"
        ? columnLabel
        : upperFirst(lowerCase(columnId));

    return (
      <TableHead
        arrow={label ? arrow : undefined}
        onClick={onClickColumnHead}
        width={width}
        minWidth={width}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
        flex={width ? undefined : flex}
        justifyContent={justifyContentHeader}
        label={label}
        infoIconTooltipText={infoIconTooltipText}
      />
    );
  }
);
