import { Checkbox } from "@stenajs-webui/forms";
import { Indent, Row } from "@stenajs-webui/core";
import { lowerCase, upperFirst } from "lodash";
import * as React from "react";
import { tableBorder, tableHeadRowHeight } from "../../../config/TableConfig";
import { TableHead } from "../../table-ui/components/TableHead";
import { useColumnFromConfig } from "../hooks/UseColumnFromConfig";
import { useStandardTableContext } from "../hooks/UseStandardTableContext";
import { useTableHeadCheckbox } from "../hooks/UseTableHeadCheckbox";
import { useTableResetWhenNewData } from "../hooks/UseTableResetWhenNewData";
import { useTableSortHeader } from "../hooks/UseTableSortHeader";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
}

export const StandardTableHeader = React.memo(function StandardTableHeader<
  TItem
>({ items }: StandardTableHeaderProps<TItem>) {
  const {
    config: { showHeaderCheckbox, columnOrder, rowIndent }
  } = useStandardTableContext();
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty
  } = useTableHeadCheckbox(items);

  useTableResetWhenNewData(items);

  const checkboxDisabled = !items || items.length === 0;

  return (
    <Row height={tableHeadRowHeight} width={"100%"} borderBottom={tableBorder}>
      {rowIndent && <Indent num={rowIndent} />}
      {showHeaderCheckbox && (
        <TableHead width={"90px"} minWidth={"90px"} justifyContent={"center"}>
          <Row alignItems={"center"}>
            <Checkbox
              size={"small"}
              disabled={checkboxDisabled}
              value={allItemsAreSelected}
              indeterminate={!selectionIsEmpty && !allItemsAreSelected}
              onValueChange={onClickCheckbox}
            />
          </Row>
        </TableHead>
      )}
      {columnOrder.map(columnId => (
        <StandardTableHeaderItem columnId={columnId} key={columnId} />
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </Row>
  );
});

interface StandardTableHeaderItemProps {
  columnId: string;
}

const StandardTableHeaderItem = React.memo(function({
  columnId
}: StandardTableHeaderItemProps) {
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
});
