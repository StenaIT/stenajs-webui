import { Indent, Row } from "@stenajs-webui/core";
import { Checkbox } from "@stenajs-webui/forms";
import * as React from "react";
import { TableHeadItem } from "../../table-ui/components/table/TableHeadItem";
import { TableHeadRow } from "../../table-ui/components/table/TableHeadRow";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";
import { useTableHeadCheckbox } from "../hooks/UseTableHeadCheckbox";
import { StandardTableHeadItem } from "./StandardTableHeadItem";
import { useTableHeadExpandCollapse } from "../hooks/UseTableHeadExpandCollapse";
import { FlatButton } from "@stenajs-webui/elements";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import styles from "./StandardTableHeadRow.module.css";
import cx from "classnames";

interface StandardTableHeaderProps<TItem> {
  items?: Array<TItem>;
}

export const StandardTableHeadRow = React.memo(function StandardTableHeader<
  TItem
>({ items }: StandardTableHeaderProps<TItem>) {
  const {
    showHeaderCheckbox,
    showHeaderExpandCollapse,
    enableExpandCollapse,
    columnOrder,
    rowIndent,
    headerOptions,
  } = useStandardTableConfig();
  const { allItemsAreExpanded, toggleExpanded } = useTableHeadExpandCollapse(
    items
  );
  const {
    allItemsAreSelected,
    onClickCheckbox,
    selectionIsEmpty,
  } = useTableHeadCheckbox(items);

  const checkboxDisabled = !items || items.length === 0;

  return (
    <TableHeadRow
      style={{
        top: headerOptions?.top ? headerOptions.top : 0,
        zIndex: headerOptions?.zIndex ? headerOptions.zIndex : 1000,
        width: "100%",
      }}
      className={cx({ [styles.stickyHeader]: headerOptions?.isSticky })}
    >
      {rowIndent && <Indent num={rowIndent} />}
      {enableExpandCollapse && (
        <Row
          alignItems={"center"}
          justifyContent={"center"}
          width={"45px"}
          minWidth={"45px"}
          indent
        >
          {showHeaderExpandCollapse && (
            <FlatButton
              size={"small"}
              leftIcon={allItemsAreExpanded ? faChevronDown : faChevronRight}
              onClick={toggleExpanded}
            />
          )}
        </Row>
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
      {columnOrder.map((columnId) => (
        <StandardTableHeadItem columnId={columnId} key={columnId} />
      ))}
      {rowIndent && <Indent num={rowIndent} />}
    </TableHeadRow>
  );
});
