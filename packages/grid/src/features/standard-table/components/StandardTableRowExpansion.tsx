import * as React from "react";
import {
  tableBackgroundColorExpanded,
  tableBorderLeftExpanded,
} from "../../../config/TableConfig";
import { useTotalNumColumns } from "../context/TotalNumColumnsContext";
import { useExpandCollapseActions } from "../features/expand-collapse/UseExpandCollapseActions";
import { useStandardTableConfig } from "../hooks/UseStandardTableConfig";

interface Props<TItem> {
  item: TItem;
}

export const StandardTableRowExpansion = function StandardTableRowExpansion<
  TItem
>({ item }: Props<TItem>) {
  const { renderRowExpansion, enableExpandCollapse } = useStandardTableConfig();
  const { isExpanded, toggleRowExpanded } = useExpandCollapseActions(item);

  const totalNumColumns = useTotalNumColumns();

  return (
    <>
      {enableExpandCollapse && renderRowExpansion && isExpanded && (
        <tr
          style={{
            borderLeft: tableBorderLeftExpanded,
            background: tableBackgroundColorExpanded,
          }}
        >
          <td colSpan={totalNumColumns}>
            {renderRowExpansion(item, { onRequestCollapse: toggleRowExpanded })}
          </td>
        </tr>
      )}
    </>
  );
};
