import * as React from "react";
import { useGroupConfigsAndIdsForRows } from "../../../context/GroupConfigsAndIdsForRowsContext";
import { useStandardTableConfig } from "../../../hooks/UseStandardTableConfig";
import styles from "./StandardTableSummaryRow.module.css";
import { getCellBorderFromGroup } from "../../../util/CellBorderCalculator";
import { SummaryCell } from "./SummaryCell";
import { getColumnsLimitedWithColSpan } from "../SummaryCellColSpanCalculator";
import { Indent } from "@stenajs-webui/core";

interface StandardTableSummaryRowProps<TItem> {
  items: Array<TItem>;
}

export const StandardTableSummaryRow = React.memo(
  function StandardTableSummaryRow<TItem>({
    items,
  }: StandardTableSummaryRowProps<TItem>) {
    const groupConfigsAndIds = useGroupConfigsAndIdsForRows();
    const {
      showRowCheckbox,
      enableExpandCollapse,
      columns,
      rowIndent,
    } = useStandardTableConfig();

    return (
      <tr className={styles.summaryRow}>
        {rowIndent && (
          <td>
            <Indent num={rowIndent} />
          </td>
        )}
        {enableExpandCollapse && <td />}
        {showRowCheckbox && <td />}
        {groupConfigsAndIds.map(({ groupConfig, groupId }, groupIndex) => (
          <React.Fragment key={groupId}>
            {getColumnsLimitedWithColSpan(groupConfig.columnOrder, columns).map(
              ({ columnId, colSpan }, index) => {
                return (
                  <SummaryCell
                    key={columnId}
                    colSpan={colSpan}
                    columnId={columnId}
                    items={items}
                    borderFromGroup={getCellBorderFromGroup(
                      groupIndex,
                      index,
                      groupConfig.borderLeft
                    )}
                    disableBorderLeft={groupIndex === 0 && index === 0}
                  />
                );
              }
            )}
          </React.Fragment>
        ))}
        {rowIndent && (
          <td>
            <Indent num={rowIndent} />
          </td>
        )}
        <td />
      </tr>
    );
  }
);
