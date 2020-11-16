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
      background,
      sticky,
      zIndex,
      shadowBorder,
      offsetLeft,
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
        background={background}
        borderLeft={borderLeft === true ? tableBorder : borderLeft || undefined}
        flex={width ? undefined : flex}
        justifyContent={justifyContentHeader}
        label={label}
        infoIconTooltipText={infoIconTooltipText}
        style={{
          position: sticky ? "sticky" : "static",
          left: offsetLeft ?? (sticky ? "0px" : "auto"),
          zIndex: zIndex,
          boxShadow: shadowBorder
            ? "2px 0px 2px 0px rgba(12, 25, 37, 0.08)"
            : "",
        }}
      />
    );
  }
);
