import { Indent, Row } from "@stenajs-webui/core";
import { Checkbox } from "@stenajs-webui/forms";
import * as React from "react";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { TableHeadRow } from "../../table-ui/components/table/TableHeadRow";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { useTableHeadCheckbox } from "../hooks/UseTableHeadCheckbox";
import { useTableResetWhenNewData } from "../hooks/UseTableResetWhenNewData";
import { StandardTableHeadItem } from "./StandardTableHeadItem";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
}

export const StandardTableHeadRow = React.memo(function StandardTableHeader<
  TItem
>({ items }: StandardTableHeaderProps<TItem>) {
  const {
    showHeaderCheckbox,
    enableExpandCollapse,
    columnOrder,
    rowIndent
  } = useStandardTableConfig();
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty
  } = useTableHeadCheckbox(items);

  useTableResetWhenNewData(items);

  const checkboxDisabled = !items || items.length === 0;

  return (
    <TableHeadRow>
      {rowIndent && <Indent num={rowIndent} />}
      {enableExpandCollapse && (
        <TableHeadItem
          width={"45px"}
          minWidth={"45px"}
          justifyContent={"center"}
        />
      )}
      {showHeaderCheckbox && (
        <TableHeadItem
          width={"45px"}
          minWidth={"45px"}
          justifyContent={"center"}
          overflow={"hidden"}
        >
          <Row alignItems={"center"}>
            <Checkbox
              size={"small"}
              disabled={checkboxDisabled}
              value={allItemsAreSelected}
              indeterminate={!selectionIsEmpty && !allItemsAreSelected}
              onValueChange={onClickCheckbox}
            />
          </Row>
        </TableHeadItem>
      )}
      {columnOrder.map(columnId => (
        <StandardTableHeadItem columnId={columnId} key={columnId} />
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </TableHeadRow>
  );
});
