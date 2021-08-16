import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useMemo } from "react";
import { useGridCell } from "../../../grid-cell/hooks/UseGridCell";
import { useTotalNumColumnsForRows } from "../../context/GroupConfigsForRowsContext";
import { useExpandCollapseActions } from "./UseExpandCollapseActions";
import {
  useStandardTableConfig,
  useStandardTableId,
} from "../../hooks/UseStandardTableConfig";
import { Row } from "@stenajs-webui/core";

interface Props<TItem> {
  item: TItem;
  colIndex: number;
  rowIndex: number;
  numRows: number;
}

export const StandardTableRowExpandButton = function <TItem>({
  item,
  colIndex,
  numRows,
  rowIndex,
}: Props<TItem>) {
  const totalNumColumns = useTotalNumColumnsForRows();
  const tableId = useStandardTableId();
  const gridCell = useGridCell<boolean>(true, {
    colIndex,
    numCols: totalNumColumns,
    numRows,
    rowIndex,
    tableId,
  });
  const { requiredProps } = gridCell;

  const { expandCollapseDisableResolver } = useStandardTableConfig();
  const { toggleRowExpanded, isExpanded } = useExpandCollapseActions(item);

  const buttonDisabled = useMemo(() => {
    if (!expandCollapseDisableResolver) {
      return false;
    }
    return expandCollapseDisableResolver(item);
  }, [expandCollapseDisableResolver, item]);
  return (
    <Row alignItems={"center"} justifyContent={"center"} indent>
      {!buttonDisabled && (
        <FlatButton
          size={"small"}
          leftIcon={isExpanded ? faChevronDown : faChevronRight}
          onClick={toggleRowExpanded}
          {...requiredProps}
        />
      )}
    </Row>
  );
};
