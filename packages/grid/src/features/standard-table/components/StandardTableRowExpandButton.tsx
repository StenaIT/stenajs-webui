import * as React from "react";
import { useMemo } from "react";
import { Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import {
  useStandardTableConfig,
  useStandardTableId
} from "../hooks/UseStandardTableConfig";
import { useExpandCollapseActions } from "../hooks/UseExpandCollapseActions";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { useGridCell } from "../../grid-cell/hooks/UseGridCell";

interface Props<TItem> {
  item: TItem;
  colIndex: number;
  rowIndex: number;
  numRows: number;
}

export const StandardTableRowExpandButton = function<TItem>({
  item,
  colIndex,
  numRows,
  rowIndex
}: Props<TItem>) {
  const { columnOrder, keyResolver } = useStandardTableConfig();
  const tableId = useStandardTableId();
  const gridCell = useGridCell<boolean>(true, {
    colIndex,
    numCols: columnOrder.length,
    numRows,
    rowIndex,
    tableId
  });
  const { requiredProps } = gridCell;

  const { expandCollapseDisableResolver } = useStandardTableConfig();
  const { toggleRowExpanded, isExpanded } = useExpandCollapseActions(
    keyResolver(item)
  );

  const buttonDisabled = useMemo(() => {
    if (!expandCollapseDisableResolver) {
      return false;
    }
    return expandCollapseDisableResolver(item);
  }, [expandCollapseDisableResolver, item]);
  return (
    <Row
      alignItems={"center"}
      justifyContent={"center"}
      width={"45px"}
      minWidth={"45px"}
      indent
    >
      {!buttonDisabled && (
        <FlatButton
          size={"small"}
          leftIcon={isExpanded ? faCaretDown : faCaretUp}
          onClick={toggleRowExpanded}
          {...requiredProps}
        />
      )}
    </Row>
  );
};
